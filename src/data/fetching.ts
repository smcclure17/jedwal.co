import config from "@/config";
import { cookies } from "next/headers";

export interface UserData {
  id: string;
  name: string;
  email: string;
  api_count: number;
  premium: boolean;
}

export interface ApiData {
  api_name: string;
  sheet_id: string;
  cdn_ttl: number;
  worksheets: string[];
  spreadsheet_name: string;
  frozen: boolean;
}

export type UserStatus = "logged_in" | "logged_out" | "loading" | "error";

export interface DataOrError<T> {
  data?: T;
  error?: Error;
}

export const getUserSheets = async () => {
  const cookieStore = await cookies();
  const allCookies = cookieStore.getAll();

  const cookieHeader = allCookies
    .map((cookie) => `${cookie.name}=${cookie.value}`)
    .join("; ");

  const res = await fetch(`${config.apiUrl}/get-user-sheets`, {
    headers: {
      Cookie: cookieHeader,
    },
  });

  if (res.status === 401) return null;
  if (res.status !== 200)
    throw new Error(`Failed to fetch user sheets. Error: ${res.statusText}`);

  const data = await res.json();
  return data as ApiData[];
};

export const getApiData = async (apiName: string | null) => {
  if (!apiName) return null;

  const cookieStore = await cookies();
  const allCookies = cookieStore.getAll();

  const cookieHeader = allCookies
    .map((cookie) => `${cookie.name}=${cookie.value}`)
    .join("; ");

  const res = await fetch(`${config.apiUrl}/get-api-info?name=${apiName}`, {
    headers: {
      Cookie: cookieHeader,
    },
  });

  if (res.status === 404) return null;
  if (res.status !== 200) throw new Error("Failed to fetch API data");

  const data = await res.json();
  return data as ApiData;
};

export async function getUserData(): Promise<{
  userData: UserData | null;
  status: UserStatus;
}> {
  const cookieStore = await cookies();
  const allCookies = cookieStore.getAll();

  const cookieHeader = allCookies
    .map((cookie) => `${cookie.name}=${cookie.value}`)
    .join("; ");

  const res = await fetch(`${config.apiUrl}/get-user-data`, {
    headers: {
      Cookie: cookieHeader,
    },
  });

  if (res.status === 401) return { userData: null, status: "logged_out" };
  if (res.status !== 200) throw new Error("Failed to fetch user data");

  const userData = (await res.json()) as UserData;
  return { userData, status: userData === null ? "logged_out" : "logged_in" };
}

export async function getSheetAnalytics(apiName: string) {
  const cookieStore = await cookies();
  const allCookies = cookieStore.getAll();

  const cookieHeader = allCookies
    .map((cookie) => `${cookie.name}=${cookie.value}`)
    .join("; ");

  const startTime = new Date();
  const thirtyDaysAgo = new Date(startTime);
  thirtyDaysAgo.setDate(startTime.getDate() - 30);
  const dateParam = thirtyDaysAgo.toISOString();

  const res = await fetch(
    `${config.apiUrl}/get-api-invocations?api_name=${apiName}&start_time=${dateParam}`,
    {
      headers: {
        Cookie: cookieHeader,
      },
    }
  );

  if (res.status === 404) return null;
  if (res.status !== 200) throw new Error("Failed to fetch API data");

  const data = await res.json();
  return data as any;
}

export async function getOrgData(orgId: string) {
  const cookieStore = await cookies();
  const allCookies = cookieStore.getAll();

  const cookieHeader = allCookies
    .map((cookie) => `${cookie.name}=${cookie.value}`)
    .join("; ");

  const res = await fetch(`${config.apiUrl}/organization/${orgId}`, {
    headers: {
      Cookie: cookieHeader,
    },
  });

  if (res.status === 401) return null;
  if (res.status !== 200) throw new Error("Failed to fetch user data");

  return res.json();
}

export const getOrgSheets = async (orgId: string) => {
  const cookieStore = await cookies();
  const allCookies = cookieStore.getAll();

  const cookieHeader = allCookies
    .map((cookie) => `${cookie.name}=${cookie.value}`)
    .join("; ");

  const res = await fetch(`${config.apiUrl}/get-organization-sheets/${orgId}`, {
    headers: {
      Cookie: cookieHeader,
    },
  });

  if (res.status === 401) return null;
  if (res.status !== 200)
    throw new Error(`Failed to fetch user sheets. Error: ${res.statusText}`);

  return res.json();
};

export const getUserOrgs = async (): Promise<any[] | null> => {
  const cookieStore = await cookies();
  const allCookies = cookieStore.getAll();

  const cookieHeader = allCookies
    .map((cookie) => `${cookie.name}=${cookie.value}`)
    .join("; ");

  const res = await fetch(`${config.apiUrl}/organizations`, {
    headers: {
      Cookie: cookieHeader,
    },
  });

  if (res.status === 401) return null;
  if (res.status !== 200)
    throw new Error(`Failed to fetch user orgs. Error: ${res.statusText}`);

  return res.json();
};
