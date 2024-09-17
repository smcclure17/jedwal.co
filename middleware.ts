import { NextResponse, NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const url = request.nextUrl.clone();
  const { pathname, host } = url;

  // Check if the host is app.jedwal.co
  if (host === "app.jedwal.co") {
    // If it is, we want to serve content from /app
    url.pathname = `/app${pathname}`;
    return NextResponse.rewrite(url);
  }

  // Check if the pathname starts with /app and the host is jedwal.co
  if (pathname.startsWith("/app") && host === "jedwal.co") {
    // If it does, we want to redirect to app.jedwal.co
    url.host = "app.jedwal.co";
    url.pathname = pathname.replace(/^\/app/, "");
    return NextResponse.redirect(url);
  }

  // For all other cases, continue with the request as is
  return NextResponse.next();
}

export const config = {
  matcher: [
    // Match all paths
    "/((?!api|_next/static|_next/image|favicon.ico).*)",
  ],
};
