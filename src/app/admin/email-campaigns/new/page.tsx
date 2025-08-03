'use client';

import React from 'react';
import Sidebar from '@/components/adminDashboard/Sidebar';
import EmailCampaignForm from '@/components/adminDashboard/EmailCampaignForm';

export default function CreateEmailCampaignPage() {
	return (
		<div className='flex min-h-screen bg-white'>
			<Sidebar />
			<main className='flex-1 p-8'>
				<h2 className='text-2xl font-bold text-gray-800 mb-6'>
					Crear campaña de mail
				</h2>
				<EmailCampaignForm />
			</main>
		</div>
	);
}
