// middleware.ts
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const PUBLIC_FILE = /\.(.*)$/; // skip _next/static, favicon.ico, images, etc.

export function middleware(req: NextRequest) {
  const url = req.nextUrl.clone();
  const host = req.headers.get("host") || "";

  // Skip static/public assets
  if (PUBLIC_FILE.test(url.pathname) || url.pathname.includes("_next")) {
    return;
  }

  // Extract subdomain
  const [subdomain] = host.split(".");
  if (subdomain === "app") {
    url.pathname = `/app${url.pathname}`;
    return NextResponse.rewrite(url);
  }

  // Otherwise just continue without rewrite
  return;
}
