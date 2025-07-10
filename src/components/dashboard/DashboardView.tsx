'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import {
	TvMinimalPlay,
	Gift,
	ClipboardList,
	MapPin,
	FlameKindling,
} from 'lucide-react';
import DashboardCard from '@/components/dashboard/DashboardCard';
import AlertBar from '@/components/dashboard/AlertBar';
import { useDashboardData } from '@/helpers/useDashboardData';
import DonateButton from '@/components/common/DonateButton';

export default function DashboardView() {
	const { data, isLoading } = useDashboardData();
	const router = useRouter();

	if (isLoading || !data) {
		return (
			<div className='flex items-center justify-center h-64'>
				<p className='text-gray-500'>Cargando dashboard...</p>
			</div>
		);
	}

	return (
		<main className='max-w-7xl mx-auto px-6 py-12 space-y-8'>
			<header className='space-y-2'>
				<h1 className='text-3xl font-bold'>¡Hola, user!</h1>
				<p className='text-gray-600'>
					Gracias por formar parte de Héroes Cercanos
				</p>
			</header>

			<div className='grid grid-cols-1 md:grid-cols-3 gap-6'>
				<DonateButton>
					<DashboardCard
						icon={<Gift size={80} />}
						title='Quiero hacer una donación'
						description='Doná a nuestro cuartel'
						buttonLabel='Donar ahora'
						onClick={() => {}}
					/>
				</DonateButton>

				<DashboardCard
					icon={<ClipboardList size={80} />}
					title='Ver mis donaciones'
					description='Revisá tu historial y el impacto generado'
					buttonLabel='Historial'
					onClick={() => router.push('/historial')}
				/>
				<DashboardCard
					icon={<TvMinimalPlay size={80} />}
					title='Capacitación disponible'
					description='Mirá los vídeos de formación'
					buttonLabel='Ver contenido'
					onClick={() => router.push('/capacitaciones')}
				/>
			</div>

			{data.campaignsActive.length > 0 && (
				<AlertBar
					icon={<FlameKindling />}
					message={`Campaña activa: ${data.campaignsActive[0].title}`}
					actionLabel='Ver campaña'
					onAction={() => router.push('#campañas')}
				/>
			)}

			<AlertBar
				icon={<MapPin />}
				message='Nuestro cuartel: Colón 643, Monte Caseros'
				actionLabel='Ver en Maps'
				onAction={() =>
					window.open(data.nearestStationUrl, '_blank', 'noopener')
				}
			/>

			{/* mapear vídeos */}
		</main>
	);
}
