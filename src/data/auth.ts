import config from "@/config";
import { cookies } from "next/headers";

export type AuthStatus = "logged_in" | "logged_out" | "error";

export type AuthResult<T> =
  | { status: "logged_in"; data: T }
  | { status: "logged_out"; data: null }
  | { status: "error"; error: string };

/**
 * Specialized Error class that carries HTTP status code information
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
 * Wraps an authenticated API call in a standardized AuthResult type
 * @param fetcher - Async function that makes the API call
 * @returns AuthResult with appropriate status and data
 */
export async function withAuth<T>(
  fetcher: () => Promise<T>
): Promise<AuthResult<T>> {
  try {
    const data = await fetcher();
    return { status: "logged_in", data };
  } catch (error) {
    // Check if this is an HTTP 401 error
    if (error instanceof HttpError && error.statusCode === 401) {
      return { status: "logged_out", data: null };
    }

    console.error("Auth error:", error);
    return {
      status: "error",
      error: error instanceof Error ? error.message : "Unknown error occurred",
    };
  }
}

/**
 * Helper function to fetch data with authentication and handle response
 * @param url - The URL to fetch from
 * @returns An authenticated fetch response handler
 */
export function createAuthFetcher<T>(apiRoute: string) {
  return async (): Promise<T> => {
    const cookieStore = await cookies();
    const allCookies = cookieStore.getAll();

    const cookieHeader = allCookies
      .map((cookie) => `${cookie.name}=${cookie.value}`)
      .join("; ");

    try {
      const res = await fetch(`${config.apiUrl}${apiRoute}`, {
        headers: {
          Cookie: cookieHeader,
        },
      });

      if (res.status === 401) throw new HttpError("Not authenticated", 401);
      if (res.status === 404) throw new Error("Resource not found");
      if (res.status !== 200) throw new Error(`HTTP Error: ${res.status}`);

      return (await res.json()) as T;
    } catch (error) {
      throw new Error(`Unknown Error: ${error}`);
    }
  };
}
