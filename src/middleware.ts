
import { NextResponse, NextRequest } from 'next/server';
import { jwtVerify } from 'jose';

export async function middleware(request: NextRequest) {
	const { pathname } = request.nextUrl;

	// 1) Defino qué prefijos quiero proteger
	const protectedPrefixes = ['/dashboard', '/admin'];
	const isProtected = protectedPrefixes.some(
		(prefix) => pathname === prefix || pathname.startsWith(prefix + '/')
	);
	if (!isProtected) {
		// rutas públicas
		return NextResponse.next();
	}

	// 2) Extraigo el token (cookie o header)
	const cookieToken = request.cookies.get('jwtToken')?.value;
	const authHeader = request.headers.get('authorization') ?? '';
	const headerToken = authHeader.startsWith('Bearer ')
		? authHeader.split(' ')[1]
		: undefined;
	const token = cookieToken || headerToken;

	// 3) Si no hay token, voy a login
	if (!token) {
		const loginUrl = request.nextUrl.clone();
		loginUrl.pathname = '/login';
		return NextResponse.redirect(loginUrl);
	}

	// 4) Verifico JWT
	try {
		const secret = new TextEncoder().encode(process.env.JWT_SECRET!);
		await jwtVerify(token, secret);
		return NextResponse.next();
	} catch {
		const loginUrl = request.nextUrl.clone();
		loginUrl.pathname = '/login';
		return NextResponse.redirect(loginUrl);
	}
}

export const config = {
	matcher: [
		'/dashboard', // /dashboard exacto
		'/dashboard/:path', // /dashboard/...
		'/admin', // /admin exacto
		'/admin/:path', // /admin/...
	],
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
