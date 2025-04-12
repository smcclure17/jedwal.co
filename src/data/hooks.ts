"use client";

import { useQuery, useQueries } from "@tanstack/react-query";
import config from "@/config";

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

export interface UserDataWithOrgs {
  userData: UserData;
  orgs: any[];
}

export interface UserDataWithSheets {
  userData: UserData;
  sheets: ApiData[];
}

/**
 * Custom error class for HTTP errors
 */
export class HttpError extends Error {
  statusCode: number;

  constructor(message: string, statusCode: number) {
    super(message);
    this.statusCode = statusCode;
    this.name = "HttpError";
  }
}

/**
 * Base fetcher function for authenticated API calls
 */
async function fetchWithAuth<T>(apiRoute: string): Promise<T> {
  const res = await fetch(`${config.apiUrl}${apiRoute}`, {
    credentials: "include", // Includes cookies in the request
  });

  if (!res.ok) {
    if (res.status === 401) {
      throw new HttpError("Not authenticated", 401);
    } else if (res.status === 403) {
      throw new HttpError("Not authorized", 403);
    } else if (res.status === 404) {
      throw new Error("Resource not found");
    } else {
      throw new Error(`HTTP Error: ${res.status}`);
    }
  }

  return (await res.json()) as T;
}

/**
 * Get user sheets
 */
export function useUserSheets() {
  return useQuery({
    queryKey: ["userSheets"],
    queryFn: () => fetchWithAuth<ApiData[]>("/get-user-sheets"),
    staleTime: 300 * 1000
  });
}

/**
 * Get user data
 */
export function useUserData(accountId?: string) {
  const query = accountId ? `?account_id=${accountId}` : "";

  return useQuery({
    queryKey: ["userData", accountId],
    queryFn: () => fetchWithAuth<UserData>(`/get-account-data${query}`),
    staleTime: 300 * 1000
  });
}

/**
 * Get account APIs
 */
export function useAccountApis(ownerId: string) {
  return useQuery({
    queryKey: ["accountApis", ownerId],
    queryFn: () => fetchWithAuth<any>(`/get-all-sheets/${ownerId}`),
    enabled: !!ownerId, // Only run when ownerId is provided
  });
}

/**
 * Get user organizations
 */
export function useUserOrgs() {
  return useQuery({
    queryKey: ["userOrgs"],
    queryFn: () => fetchWithAuth<any[]>("/organizations"),
  });
}

/**
 * Get user data with organizations
 */
export function useUserDataWithOrgs() {
  // Use parallel queries
  const results = useQueries({
    queries: [
      {
        queryKey: ["userData"],
        queryFn: () => fetchWithAuth<UserData>("/get-account-data"),
      },
      {
        queryKey: ["userOrgs"],
        queryFn: () => fetchWithAuth<any[]>("/organizations"),
      },
    ],
  });

  const [userDataQuery, userOrgsQuery] = results;

  // Combine the results
  return useQuery({
    queryKey: ["userDataWithOrgs"],
    queryFn: () => {
      if (userDataQuery.data && userOrgsQuery.data) {
        return {
          userData: userDataQuery.data,
          orgs: userOrgsQuery.data,
        } as UserDataWithOrgs;
      }
      throw new Error("Failed to load user data or organizations");
    },
    enabled: Boolean(userDataQuery.data && userOrgsQuery.data),
  });
}

/**
 * Get organization sheets
 */
export function useOrgSheets(orgId: string) {
  return useQuery({
    queryKey: ["orgSheets", orgId],
    queryFn: () => fetchWithAuth<any>(`/get-organization-sheets/${orgId}`),
    enabled: !!orgId,
  });
}

/**
 * Get sheet analytics
 */
export function useSheetAnalytics(accountId: string, apiName: string) {
  return useQuery({
    queryKey: ["sheetAnalytics", accountId, apiName],
    queryFn: () => {
      const startTime = new Date();
      const thirtyDaysAgo = new Date(startTime);
      thirtyDaysAgo.setDate(startTime.getDate() - 30);
      const dateParam = thirtyDaysAgo.toISOString();

      return fetchWithAuth<any>(
        `/get-api-invocations?sheet_api_name=${apiName}&account_id=${accountId}&start_time=${dateParam}`
      );
    },
    enabled: !!(accountId && apiName),
  });
}

/**
 * Get roadmap items
 */
export function useRoadmapItems() {
  return useQuery({
    queryKey: ["roadmapItems"],
    queryFn: async () => {
      try {
        const res = await fetch(
          "https://api.jedwal.co/api/117187395759203962885/energetic-flank?worksheet=Roadmap"
        );
        if (!res.ok) {
          throw new Error(`HTTP error: ${res.status}`);
        }
        return await res.json();
      } catch (error) {
        throw new Error("Could not fetch roadmap items");
      }
    },
  });
}
