import { NextResponse, NextRequest } from 'next/server';
import { jwtVerify } from 'jose';

export async function middleware(request: NextRequest) {

	const { pathname } = request.nextUrl;

	// proteger /dashboard, /admin y /trainings
	if (
		pathname === '/dashboard' ||
		pathname === '/admin' ||
		pathname === '/trainings' ||
		pathname === '/trainings/videos' ||
		pathname === '/trainings/images' ||
		pathname === '/admin/campaigns' ||
		pathname === '/admin/email-campaigns' ||
		pathname === '/admin/metrics' ||
		pathname === '/admin/reports' ||
		pathname === '/admin/training' ||
		pathname === '/admin/users'
	) {
		const token = request.cookies.get('jwtToken')?.value;

		if (!token) {
			const loginUrl = request.nextUrl.clone();
			loginUrl.pathname = '/login';
			return NextResponse.redirect(loginUrl);
		}

		try {
			const secret = new TextEncoder().encode(process.env.JWT_SECRET!);
			const { payload } = await jwtVerify(token, secret);
			const role = (payload as any).role;

			// redirigir a /dashboard si intenta entrar a /admin sin rol
			if (pathname.startsWith('/admin') && role !== 'admin') {
				const homeUrl = request.nextUrl.clone();
				homeUrl.pathname = '/dashboard';
				return NextResponse.redirect(homeUrl);
			}

			return NextResponse.next();
		} catch {
			const loginUrl = request.nextUrl.clone();
			loginUrl.pathname = '/login';
			return NextResponse.redirect(loginUrl);
		}
	}

	// no es ruta protegida
	return NextResponse.next();
}

export const config = {
	matcher: [
		'/dashboard',
		'/admin',
		'/admin/metrics',
		'/admin/reports',
		'/admin/campaigns',
		'/admin/users',
		'/admin/trainings',
		'/admin/email-campaigns',
		'/trainings',
		'/trainings/videos',
		'/trainings/images',
	],
};

		
		