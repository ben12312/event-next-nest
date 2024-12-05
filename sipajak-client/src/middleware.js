import { NextResponse } from "next/server";

// This function can be marked `async` if using `await` inside
export function middleware(request) {
  const loginPath = ["/login", "/api/login"];

  if (loginPath.some((v) => v === request.nextUrl.pathname)) {
    return NextResponse.next();
  } else {
    const accessToken = request.cookies.get("accessToken");
    if (!accessToken) {
      return NextResponse.redirect(new URL("/login", request.url));
    } else {
      return NextResponse.next();
    }
  }
}

// See "Matching Paths" below to learn more
export const config = {
  matcher: ["/login", "/api/:function*"]
};
