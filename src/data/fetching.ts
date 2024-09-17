import config from "@/config";
import { cookies } from "next/headers";

export interface UserData {
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

export interface UserSheet {
  api_name: string;
  spreadsheet_name: string;
  sheet_id: string;
  frozen: boolean;
}

export const getUserSheets = async () => {
  const cookieStore = cookies();
  const allCookies = cookieStore.getAll();
  console.log("getUserSheets Cookies: ", allCookies);

  const cookieHeader = allCookies
    .map((cookie) => `${cookie.name}=${cookie.value}`)
    .join("; ");

  const res = await fetch(`${config.apiUrl}/get-user-sheets`, {
    headers: {
      Cookie: cookieHeader,
    },
  });

  console.log("SENT FROM", res.headers);

  if (res.status === 401) return null;
  if (res.status !== 200)
    throw new Error(`Failed to fetch user sheets. Error: ${res.statusText}`);

  const data = await res.json();
  return data as UserSheet[];
};

export const getApiData = async (apiName: string | null) => {
  if (!apiName) return null;

  const cookieStore = cookies();
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
  const cookieStore = cookies();
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
