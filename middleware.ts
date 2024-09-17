// import { NextResponse } from "next/server";
// import type { NextRequest } from "next/server";

// export function middleware(request: NextRequest) {
//   const hostname = request.headers.get("host");
//   const pathname = request.nextUrl.pathname;

//   // Check if the hostname matches 'app.jedwal.co'
//   if (hostname === "app.jedwal.co") {
//     // Rewrite the URL to '/app' followed by the original pathname

//     const url = request.nextUrl;
//     if (url.pathname == "/app") {
//       url.host = "jedwal.co";
//       url.hostname = "jedwal.co";
//       return NextResponse.rewrite(url);
//     }

//     return NextResponse.rewrite(new URL(`/app${pathname}`, request.url));
//   }

//   return NextResponse.next();
// }

// // Only run the middleware for specific paths (optional)
// export const config = {
//   matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
// };
