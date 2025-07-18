'use client';

import { useAuth } from '@/context/AuthContext';
import Sidebar from '@/components/adminDashboard/Sidebar';
import AdminStatsView from './AdminStatsView';
import DonationHistory from './DonationHistory';

const AdminDashboardView = () => {
	const { userData } = useAuth();
	console.log('AuthContext userData:', userData);
	return (
		<div className='flex flex-col md:flex-row min-h-screen'>
			<aside className='w-full md:w-64 bg-gray-100'>
				<Sidebar />
			</aside>

			<div className='flex-1 bg-white'>
				<main className='p-4 md:p-8'>
					<h2 className='text-2xl md:text-3xl font-semibold mb-1'>
						¡Hola, {userData?.user.name}!
					</h2>
					<p className='text-gray-600 mb-6'>GRACIAS POR TU SERVICIO</p>

					<AdminStatsView />
					<DonationHistory />
				</main>
			</div>
		</div>
	);
};

export default AdminDashboardView;
