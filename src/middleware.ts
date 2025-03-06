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
  const host = req.headers.get("host");

  // Special case for app subdomain redirect
  if (host === "app.jedwal.co" && url.pathname === "/") {
    return NextResponse.redirect(new URL("/user", req.url));
  }

  // Skip public files
  if (PUBLIC_FILE.test(url.pathname) || url.pathname.includes("_next")) return;

  const subdomain = getValidSubdomain(host);

  // TODO: fix this
  if (subdomain !== "jedwal" && subdomain !== null) {
    url.pathname = `/${subdomain}${url.pathname}`;
  }

  return NextResponse.rewrite(url);
}
