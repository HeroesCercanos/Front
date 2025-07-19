
import { NextResponse, NextRequest } from 'next/server'
import { jwtVerify } from 'jose'

export const config = {
  matcher: ['/dashboard/:path*', '/admin/:path*'],
}

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl

  // 1) Obtener token desde header o cookie (elige la que uses realmente)
  const authHeader = request.headers.get('authorization')
  const token =
    authHeader?.startsWith('Bearer ') 
      ? authHeader.slice(7) 
      : request.cookies.get('token')?.value

  // 2) Rutas públicas
  if (!token) {
    // Si la ruta requiere auth, redirige a /login
    const loginUrl = request.nextUrl.clone()
    loginUrl.pathname = '/login'
    return NextResponse.redirect(loginUrl)
  }

  try {
    // 3) Verificar token
    const secret = new TextEncoder().encode(process.env.JWT_SECRET!)
    const { payload } = await jwtVerify(token, secret)

    // 4) Control de roles en /admin
    if (pathname.startsWith('/admin') && payload.role !== 'admin') {
      const homeUrl = request.nextUrl.clone()
      homeUrl.pathname = '/'
      return NextResponse.redirect(homeUrl)
    }

    // 5) Todo ok: continúa al contenido
    return NextResponse.next()
  } catch (err) {
    // Token inválido o expirado → login
    console.error('Token inválido:', err)
    const loginUrl = request.nextUrl.clone()
    loginUrl.pathname = '/login'
    return NextResponse.redirect(loginUrl)
  }
}


/* import { NextResponse, type NextRequest } from "next/server";
import { jwtVerify } from "jose";

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Leer token del header Authorization Bearer o de cookie "jwtToken"
  const authHeader = request.headers.get("authorization");
  let token: string | null = null;

  if (authHeader?.startsWith("Bearer ")) {
    token = authHeader.slice(7);
  } else {
    token = request.cookies.get("jwtToken")?.value ?? null;
  }

  // Definir rutas protegidas
  const protectedPaths = ["/dashboard"];
  const adminPathsPrefix = "/admin";

  // Verificar si la ruta es protegida
  const isProtected = protectedPaths.includes(pathname) || pathname.startsWith(adminPathsPrefix);

  // Si no hay token y la ruta es protegida, redirigir a login
  if (!token && isProtected) {
    const loginUrl = request.nextUrl.clone();
    loginUrl.pathname = "/login";
    return NextResponse.redirect(loginUrl);
  }

  // Si hay token, intentar validar
  if (token) {
    try {
      const secret = new TextEncoder().encode(process.env.JWT_SECRET!);
      const { payload } = await jwtVerify(token, secret);

      const role = payload.role;

      // Si ruta admin y rol no es admin, redirigir a "/"
      if (pathname.startsWith(adminPathsPrefix) && role !== "admin") {
        const homeUrl = request.nextUrl.clone();
        homeUrl.pathname = "/";
        return NextResponse.redirect(homeUrl);
      }

      // Token válido y permisos OK
      return NextResponse.next();
    } catch (error) {
      console.error("Token inválido o expirado:", error);
      const loginUrl = request.nextUrl.clone();
      loginUrl.pathname = "/login";
      return NextResponse.redirect(loginUrl);
    }
  }

  // Rutas no protegidas o sin token
  return NextResponse.next();
}

export const config = {
  matcher: ["/dashboard", "/admin/:path*"],
}; */


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
