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
		if (
			pathname.startsWith('/admin') &&
			userData.user.role.toLowerCase() !== 'admin'
		) {
			router.push('/');
			return;
		}
		if (
			pathname.startsWith('/admin') &&
			userData.user.role.toLowerCase() !== 'admin'
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
