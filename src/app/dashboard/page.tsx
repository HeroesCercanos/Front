'use client';
import AuthProtected from '@/components/authProtected/authProtected';
import DashboardView from '@/components/dashboard/DashboardView';

export default function Page() {
	return (
		<AuthProtected>
			<div>
				<DashboardView />
			</div>
		</AuthProtected>
	);
}
