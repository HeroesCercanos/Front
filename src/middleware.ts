
import { NextResponse, NextRequest } from "next/server";
import { jwtVerify } from "jose";

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // * CAMBIO AQUÍ: Leer del header Authorization *
  const authHeader = request.headers.get("authorization");
  const token = authHeader?.startsWith("Bearer ") ? authHeader.slice(7) : null;

  if (!token) {
    if (pathname === "/dashboard" || pathname.startsWith("/admin")) {
      const loginUrl = request.nextUrl.clone();
      loginUrl.pathname = "/login";
      return NextResponse.redirect(loginUrl);
    }
    return NextResponse.next();
  }

  try {
    const secret = new TextEncoder().encode(process.env.JWT_SECRET!);
    const { payload } = await jwtVerify(token, secret);
    const role = payload.role;

    if (pathname.startsWith("/admin") && role !== "admin") {
      const homeUrl = request.nextUrl.clone();
      homeUrl.pathname = "/";
      return NextResponse.redirect(homeUrl);
    }

    return NextResponse.next();
  } catch (error) {
    console.error("Error verificando token:", error);
    const loginUrl = request.nextUrl.clone();
    loginUrl.pathname = "/login";
    return NextResponse.redirect(loginUrl);
  }
}

export const config = {
  matcher: ["/dashboard", "/admin/:path*"]
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
