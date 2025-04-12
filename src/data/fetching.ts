import { AuthResult, withAuth, createAuthFetcher } from "./auth";

export interface UserDataWithOrgs {
  userData: UserData;
  orgs: any[];
}

export interface UserDataWithSheets {
  userData: UserData;
  sheets: ApiData[];
}

export interface UserData {
  id: string;
  display_name: string;
  email: string;
  account_status: string;
}

export interface ApiData {
  sheet_api_name: string;
  api_name_formatted: string; // user/api-name not user_api-name
  google_sheet_id: string;
  cdn_ttl: number;
  worksheets: string[];
  spreadsheet_title: string;
  frozen: boolean;
}

export const getUserSheets = async () => {
  return withAuth(createAuthFetcher<ApiData[]>(`/get-user-sheets`));
};

export async function getUserData(
  accountId?: string
): Promise<AuthResult<any>> {
  const query = accountId ? `?account_id=${accountId}` : "";
  return withAuth(createAuthFetcher<UserData>(`/get-account-data${query}`));
}

export async function getAccountApis(
  ownerId: string
): Promise<AuthResult<any>> {
  return withAuth(createAuthFetcher<any>(`/get-all-sheets/${ownerId}`));
}

export async function getUserDataWithOrgs(): Promise<
  AuthResult<UserDataWithOrgs>
> {
  const [user, orgs] = await Promise.all([getUserData(), getUserOrgs()]);

  if (user.status === "error" || orgs.status === "error") {
    const errors = [user, orgs]
      .filter(
        (result): result is { status: "error"; error: string } =>
          result.status === "error"
      )
      .map((result) => result.error);
    return { status: "error", error: errors.join(" ") };
  }

  if (user.status === "logged_out" || orgs.status === "logged_out") {
    return { status: "logged_out", data: null };
  }

  return {
    status: "logged_in",
    data: { userData: user.data, orgs: orgs.data },
  };
}

export const getOrgSheets = async (orgId: string) => {
  return withAuth(createAuthFetcher<any>(`/get-organization-sheets/${orgId}`));
};

export const getUserOrgs = async () => {
  return withAuth(createAuthFetcher<any[]>("/organizations"));
};

export async function getSheetAnalytics(accountId: string, apiName: string) {
  const startTime = new Date();
  const thirtyDaysAgo = new Date(startTime);
  thirtyDaysAgo.setDate(startTime.getDate() - 30);
  const dateParam = thirtyDaysAgo.toISOString();

  return withAuth(
    createAuthFetcher<any>(
      `/get-api-invocations?sheet_api_name=${apiName}&account_id=${accountId}&start_time=${dateParam}`
    )
  );
}

export async function getRoadmapItems() {
  const fetcher = async () => {
    try {
      const res = await fetch(
        "https://api.jedwal.co/api/117187395759203962885/energetic-flank?worksheet=Roadmap"
      );
      return res.json();
    } catch {
      throw new Error("Could not fetch roadmap items");
    }
  };

  return withAuth(fetcher);
}
