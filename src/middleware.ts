import { NextResponse, NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (
    (pathname === "/dashboard") &&
    !request.cookies.get("jwtToken")?.value
  ) {
    const url = request.nextUrl.clone();
    url.pathname = "/login";
    return NextResponse.redirect(url);
  } else {
    NextResponse.next();
  }
}
