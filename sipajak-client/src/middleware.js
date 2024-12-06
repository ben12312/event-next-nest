import { NextResponse } from "next/server";
import { getCookies } from 'next-client-cookies/server';

// This function can be marked `async` if using `await` inside
export async function middleware(request) {
  const cookies = await getCookies();
  let accessToken = cookies.get('token');
  
  if (accessToken) {
    if (request.nextUrl.pathname == '/login') return NextResponse.redirect(new URL("/", request.url));
    else return NextResponse.next();
  } else {
    if (request.nextUrl.pathname == '/register') return NextResponse.next();
    else if (request.nextUrl.pathname == '/login') return NextResponse.next();
    else return NextResponse.redirect(new URL("/login", request.url))
  }
}

// See "Matching Paths" below to learn more
export const config = {
  matcher: ["/login", "/"]
};
