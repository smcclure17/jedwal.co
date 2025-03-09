import config from "@/config";
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
  name: string;
  email: string;
  api_count: number;
  premium: boolean;
}

export interface ApiData {
  api_name: string;
  uuid: string;
  api_name_formatted: string; // user/api-name not user_api-name
  sheet_id: string;
  cdn_ttl: number;
  worksheets: string[];
  spreadsheet_name: string;
  frozen: boolean;
}

export const getUserSheets = async () => {
  return withAuth(createAuthFetcher<ApiData[]>(`/get-user-sheets`));
};

export async function getUserData(): Promise<AuthResult<UserData>> {
  return withAuth(createAuthFetcher<UserData>("/get-user-data"));
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

export async function getSheetAnalytics(apiName: string) {
  const startTime = new Date();
  const thirtyDaysAgo = new Date(startTime);
  thirtyDaysAgo.setDate(startTime.getDate() - 30);
  const dateParam = thirtyDaysAgo.toISOString();

  return withAuth(
    createAuthFetcher<any>(
      `/get-api-invocations?sheet_api_id=${apiName}&start_time=${dateParam}`
    )
  );
}

export async function getUserDataWithSheets(): Promise<
  AuthResult<UserDataWithSheets>
> {
  const [user, sheets] = await Promise.all([getUserData(), getUserSheets()]);

  if (user.status === "error" || sheets.status === "error") {
    const errors = [user, sheets]
      .filter(
        (result): result is { status: "error"; error: string } =>
          result.status === "error"
      )
      .map((result) => result.error);
    return { status: "error", error: errors.join(" ") };
  }

  if (user.status === "logged_out" || sheets.status === "logged_out") {
    return { status: "logged_out", data: null };
  }

  return {
    status: "logged_in",
    data: { userData: user.data, sheets: sheets.data },
  };
}
