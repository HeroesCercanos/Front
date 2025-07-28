'use client';

import TrainingSidebar from '@/components/dashboard/TrainingSidebar';

export default function TrainingsLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<div className='flex min-h-screen relative'>
			<TrainingSidebar />
			<main className='flex-1 p-6 bg-gray-50'>{children}</main>
		</div>
	);
}
