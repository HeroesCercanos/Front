import AdminDashboardView from '@/components/adminDashboard/AdminDashboardView';
import AuthProtected from '@/components/authProtected/authProtected';
import React from 'react';

const admin = () => {
	return (
		<AuthProtected>
			<div>
				<AdminDashboardView />
			</div>
		</AuthProtected>
	);
};

export default admin;
