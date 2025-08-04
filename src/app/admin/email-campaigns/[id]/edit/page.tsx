'use client';

import Sidebar from '@/components/adminDashboard/Sidebar';
import EmailCampaignForm from '@/components/adminDashboard/EmailCampaignForm';
import { useParams } from 'next/navigation';
import { useEmailCampaign } from '@/helpers/useEmailCampaigns';
import AuthProtected from '@/components/authProtected/authProtected';

export default function EditEmailCampaignPage() {
	const { id } = useParams();
	const { initialData, loading } = useEmailCampaign(id);

	if (!id) return <p className='p-4 text-red-500'>ID no encontrado.</p>;
	if (loading) return <p className='p-4'>Cargando...</p>;
	if (!initialData)
		return <p className='p-4 text-red-500'>No se encontró la campaña.</p>;

	return (
		<AuthProtected>
		<div className='flex min-h-screen bg-white'>
			<Sidebar />
			<main className='flex-1 p-8'>
				<h1 className='text-3xl font-bold mb-6'>Editar campaña</h1>
				<EmailCampaignForm initialData={initialData} />
			</main>
		</div>
		</AuthProtected>
	);
}
