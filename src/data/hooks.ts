"use client";
import { useQuery } from "@tanstack/react-query";
import { QueryClient } from "@tanstack/react-query";
import config from "@/config";
import { AuthResult } from "./auth";

// Create a client

// Function to fetch user data
async function fetchUserData(accountId?: string): Promise<AuthResult<any>> {
  const query = accountId ? `?account_id=${accountId}` : "";
  try {
    const res = await fetch(`${config.apiUrl}/get-account-data${query}`, {
      credentials: "include",
    });

    if (res.status === 401) {
      return { status: "logged_out", data: null };
    }
    if (res.status === 403) {
      return { status: "error", error: "Not authorized for this account" };
    }
    if (!res.ok) {
      return { status: "error", error: `HTTP Error: ${res.status}` };
    }

    const data = await res.json();
    return { status: "logged_in", data };
  } catch (error) {
    console.error("Error fetching user data:", error);
    return {
      status: "error",
      error: error instanceof Error ? error.message : "Unknown error occurred",
    };
  }
}

// Function to fetch user organizations
async function fetchUserOrgs(): Promise<AuthResult<any[]>> {
  try {
    const res = await fetch(`${config.apiUrl}/organizations`, {
      credentials: "include",
    });

    if (res.status === 401) {
      return { status: "logged_out", data: null };
    }
    if (res.status === 403) {
      return { status: "error", error: "Not authorized" };
    }
    if (!res.ok) {
      return { status: "error", error: `HTTP Error: ${res.status}` };
    }

    const data = await res.json();
    return { status: "logged_in", data };
  } catch (error) {
    console.error("Error fetching user orgs:", error);
    return {
      status: "error",
      error: error instanceof Error ? error.message : "Unknown error occurred",
    };
  }
}

// React Query hook for user data
export function useUserData(accountId?: string) {
  return useQuery({
    queryKey: ["userData", accountId],
    queryFn: () => fetchUserData(accountId),
    staleTime: 1000 * 60 * 5, // 5 minutes
  });
}

// React Query hook for user organizations
export function useUserOrgs() {
  return useQuery({
    queryKey: ["userOrgs"],
    queryFn: fetchUserOrgs,
    staleTime: 1000 * 60 * 5, // 5 minutes
  });
}

// Combined hook for user data with organizations
export function useUserDataWithOrgs() {
  const userDataQuery = useUserData();
  const userOrgsQuery = useUserOrgs();

  const isLoading = userDataQuery.isLoading || userOrgsQuery.isLoading;
  const isError = userDataQuery.isError || userOrgsQuery.isError;

  // Combine the results
  let result: AuthResult<{ userData: any; orgs: any[] }> | undefined;

  if (isLoading) {
    // Return undefined while loading
  } else if (isError) {
    const errors = [userDataQuery.error, userOrgsQuery.error]
      .filter(Boolean)
      .map((err) => String(err));

    result = { status: "error", error: errors.join(" ") };
  } else if (
    userDataQuery.data?.status === "logged_out" ||
    userOrgsQuery.data?.status === "logged_out"
  ) {
    result = { status: "logged_out", data: null };
  } else if (
    userDataQuery.data?.status === "logged_in" &&
    userOrgsQuery.data?.status === "logged_in"
  ) {
    result = {
      status: "logged_in",
      data: {
        userData: userDataQuery.data.data,
        orgs: userOrgsQuery.data.data,
      },
    };
  }

  return {
    data: result,
    isLoading,
    isError,
  };
}
