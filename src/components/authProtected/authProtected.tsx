'use client';

import { useEffect } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';

interface Props {
	children: React.ReactNode;
}

const AuthProtected = ({ children }: Props) => {
	const router = useRouter();
	const pathname = usePathname();
	const { userData, loading } = useAuth();

	useEffect(() => {
		if (loading) return;
		if (!userData) {
			router.push('/login');
			return;
		}
		const role = userData.user.role.toLowerCase();

		// Protege /admin solo para admin
		if (pathname.startsWith('/admin') && role !== 'admin') {
			router.push('/');
			return;
		}

		// Protege rutas especiales bajo /trainings solo para admin
		if (
			(pathname.startsWith('/trainings/videos') ||
				pathname.startsWith('/trainings/images')) &&
			role !== 'admin'
		) {
			router.push('/');
			return;
		}
	}, [userData, loading, pathname, router]);

	if (loading) return null;

	if (!userData) return null;

	return <>{children}</>;
};

export default AuthProtected;
