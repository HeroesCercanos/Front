
import { jwtVerify } from "jose";
import { NextRequest, NextResponse } from "next/server";

console.log("🚦 middleware cargado");
export const config = {
  matcher: ["/dashboard/:path*", "/admin/:path*"],
};

// middleware.ts
export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // lee primero del header, y si no, de la cookie "jwtToken"
  const authHeader = request.headers.get("authorization");
  const token = authHeader?.startsWith("Bearer ")
    ? authHeader.slice(7)
    : request.cookies.get("jwtToken")?.value;

  if (!token) {
    const loginUrl = request.nextUrl.clone();
    loginUrl.pathname = "/login";
    return NextResponse.redirect(loginUrl);
  }

  try {
    const secret = new TextEncoder().encode(process.env.JWT_SECRET!);
    const { payload } = await jwtVerify(token, secret);

    if (pathname.startsWith("/admin") && payload.role !== "admin") {
      const homeUrl = request.nextUrl.clone();
      homeUrl.pathname = "/";
      return NextResponse.redirect(homeUrl);
    }

    return NextResponse.next();
  } catch {
    const loginUrl = request.nextUrl.clone();
    loginUrl.pathname = "/login";
    return NextResponse.redirect(loginUrl);
  }
}

/* import { jwtVerify } from "jose";
import { NextRequest, NextResponse } from "next/server";


export const config = {
  matcher: [
    '/dashboard/:path*',
    '/admin/:path*'
  ],
}


// middleware.ts
export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // lee primero del header, y si no, de la cookie "jwtToken"
  const authHeader = request.headers.get("authorization");
  const token = authHeader?.startsWith("Bearer ")
    ? authHeader.slice(7)
    : request.cookies.get("jwtToken")?.value;

  if (!token) {
    const loginUrl = request.nextUrl.clone();
    loginUrl.pathname = "/login";
    return NextResponse.redirect(loginUrl);
  }

  try {
    const secret = new TextEncoder().encode(process.env.JWT_SECRET!);
    const { payload } = await jwtVerify(token, secret);

    if (pathname.startsWith("/admin") && payload.role !== "admin") {
      const homeUrl = request.nextUrl.clone();
      homeUrl.pathname = "/";
      return NextResponse.redirect(homeUrl);
    }

    return NextResponse.next();
  } catch {
    const loginUrl = request.nextUrl.clone();
    loginUrl.pathname = "/login";
    return NextResponse.redirect(loginUrl);
  }
}

 */