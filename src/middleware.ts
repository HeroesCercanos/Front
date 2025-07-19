import { NextResponse, NextRequest } from 'next/server';
import { jwtVerify } from 'jose';

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Solo protegemos /dashboard y /admin
  if (
    pathname === '/dashboard' ||
    pathname.startsWith('/dashboard/') ||
    pathname.startsWith('/admin')
  ) {
    // 1) Intento cookie
    const cookieToken = request.cookies.get('jwtToken')?.value;

    // 2) Intento header
    const authHeader = request.headers.get('authorization') ?? '';
    const headerToken =
      authHeader.startsWith('Bearer ')
        ? authHeader.split(' ')[1]
        : undefined;

    const token = cookieToken || headerToken;
    if (!token) {
      const loginUrl = request.nextUrl.clone();
      loginUrl.pathname = '/login';
      return NextResponse.redirect(loginUrl);
    }

    try {
      const secret = new TextEncoder().encode(process.env.JWT_SECRET!);
      await jwtVerify(token, secret); // lanza si inválido/expirado
      return NextResponse.next();
    } catch {
      const loginUrl = request.nextUrl.clone();
      loginUrl.pathname = '/login';
      return NextResponse.redirect(loginUrl);
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/dashboard', '/dashboard/:path', '/admin/:path'],
};




// import { NextResponse, NextRequest } from "next/server";
// import { jwtVerify } from "jose";

// export async function middleware(request: NextRequest) {
//   const { pathname } = request.nextUrl;
//   const token = request.cookies.get("jwtToken")?.value;

//   if (!token) {
//     // Si no hay token, redirigir a login para rutas privadas
//     if (pathname === "/dashboard" || pathname.startsWith("/admin")) {
//       const loginUrl = request.nextUrl.clone();
//       loginUrl.pathname = "/login";
//       return NextResponse.redirect(loginUrl);
//     }
//     return NextResponse.next();
//   }

//   try {
//     const secret = new TextEncoder().encode(process.env.JWT_SECRET!);
//     const { payload } = await jwtVerify(token, secret);
//     const role = payload.role;

//     // 🔒 Solo admin puede acceder a /admin y subrutas
//     if (pathname.startsWith("/admin") && role !== "admin") {
//       const homeUrl = request.nextUrl.clone();
//       homeUrl.pathname = "/";
//       return NextResponse.redirect(homeUrl);
//     }

//     return NextResponse.next();
//   } catch (error) {
//     console.error("Error verificando token:", error);
//     const loginUrl = request.nextUrl.clone();
//     loginUrl.pathname = "/login";
//     return NextResponse.redirect(loginUrl);
//   }
// }

// export const config = {
//   matcher: ["/dashboard", "/admin/:path*"]
// };
