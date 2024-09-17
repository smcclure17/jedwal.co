// middleware.ts
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export const getValidSubdomain = (host?: string | null) => {
  let subdomain: string | null = null;
  if (!host && typeof window !== "undefined") {
    // On client side, get the host from window
    host = window.location.host;
  }
  if (host && host.includes(".")) {
    const candidate = host.split(".")[0];
    if (candidate && !candidate.includes("localhost")) {
      // Valid candidate
      subdomain = candidate;
    }
  }
  return subdomain;
};

// RegExp for public files
const PUBLIC_FILE = /\.(.*)$/; // Files

export async function middleware(req: NextRequest) {
  const url = req.nextUrl.clone();

  // Skip public files
  if (PUBLIC_FILE.test(url.pathname) || url.pathname.includes("_next")) return;

  const host = req.headers.get("host");
  const subdomain = getValidSubdomain(host);

  // TODO: fix this
  if (subdomain !== "jedwal") {
    url.pathname = `/${subdomain}${url.pathname}`;
  }

  const response = NextResponse.rewrite(url);
  response.headers.set("Access-Control-Allow-Origin", "https://api.jedwal.co");
  response.headers.set("Access-Control-Allow-Credentials", "true");
  response.headers.set(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, DELETE, OPTIONS"
  );
  response.headers.set(
    "Access-Control-Allow-Headers",
    "Content-Type, Authorization"
  );

  return response;
}
