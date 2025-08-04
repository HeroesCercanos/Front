import { NextResponse, NextRequest } from "next/server";
import { jwtVerify } from "jose";


export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // only protect /dashboard and /admin
  if (
    pathname === "/dashboard" ||
    pathname.startsWith("/dashboard/") ||
    pathname === "/admin" ||
    pathname.startsWith("/admin/")
  ) {
    // 1) intenta leer la cookie HttpOnly jwtToken
    const token = request.cookies.get("jwtToken")?.value;
    if (!token) {
      const loginUrl = request.nextUrl.clone();
      loginUrl.pathname = "/login";
      return NextResponse.redirect(loginUrl);
    }

    try {
      // 2) verifica el JWT
      const secret = new TextEncoder().encode(process.env.JWT_SECRET!);
      const { payload } = await jwtVerify(token, secret);
      const role = (payload as any).role;

      // 3) si entra a /admin y no es admin, lo manda a home
      if (pathname.startsWith("/admin") && role !== "admin") {
        const homeUrl = request.nextUrl.clone();
        homeUrl.pathname = "/dashboard";
        return NextResponse.redirect(homeUrl);
      }

      // 4) todo OK
      return NextResponse.next();
    } catch {
      // token expirado o inválido
      const loginUrl = request.nextUrl.clone();
      loginUrl.pathname = "/login";
      return NextResponse.redirect(loginUrl);
    }
  }

  // no es ruta protegida
  return NextResponse.next();
}

export const config = {
  // IMPORTANTE: el matcher es relativo al root y debe incluir sub-paths
  matcher: ["/dashboard", "/dashboard/:path", "/admin", "/admin/:path"],
};
