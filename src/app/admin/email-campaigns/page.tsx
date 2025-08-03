'use client';

import Sidebar from '@/components/adminDashboard/Sidebar';
import CampaignList from '@/components/adminDashboard/EmailCampaignList';

export default function CampaignListPage() {
	return (
		<div className='flex min-h-screen bg-white'>
			<Sidebar />
			<main className='flex-1 p-8'>
				<CampaignList />
			</main>
		</div>
	);
}
