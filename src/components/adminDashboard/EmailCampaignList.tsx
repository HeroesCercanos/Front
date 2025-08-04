'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { API_BASE_URL } from '@/config/api';
import { Pencil, Trash2, Send, Repeat } from 'lucide-react';
import toast from 'react-hot-toast';
// import { useRouter } from 'next/navigation';

type Campaign = {
	id: string;
	subject: string;
	status: 'draft' | 'scheduled' | 'sent';
	createdAt: string;
	scheduledAt?: string;
};

export default function EmailCampaignList() {
	const [campaigns, setCampaigns] = useState<Campaign[]>([]);
	// const router = useRouter();

	const fetchCampaigns = async () => {
		try {
			const res = await fetch(`${API_BASE_URL}/api/campaigns`, {
				credentials: 'include',
			});
			const data = await res.json();
			if (Array.isArray(data)) {
				setCampaigns(data);
			} else {
				setCampaigns([]);
			}
		} catch (err) {
			console.error(err);
			setCampaigns([]);
		}
	};

	useEffect(() => {
		fetchCampaigns();
	}, []);

	const handleDelete = async (id: string) => {
		if (!confirm('¿Estás seguro de eliminar esta campaña?')) return;
		try {
			await fetch(`${API_BASE_URL}/api/campaigns/${id}`, {
				method: 'DELETE',
				credentials: 'include',
			});
			toast.success('Campaña eliminada');
			fetchCampaigns();
		} catch {
			toast.error('Error al eliminar campaña');
		}
	};

	const handleSendNow = async (id: string) => {
		if (!confirm('¿Estás seguro de enviar esta campaña ahora?')) return;

		try {
			const res = await fetch(`${API_BASE_URL}/api/campaigns/${id}/send-now`, {
				method: 'POST',
				credentials: 'include',
			});
			if (!res.ok) throw new Error();
			toast.success('Correo enviado');
			fetchCampaigns();
		} catch (err) {
			console.error(err);
			toast.error('Error al enviar ahora');
		}
	};

	const handleResend = async (id: string) => {
		if (!confirm('¿Querés reenviar esta campaña?')) return;
		try {
			const res = await fetch(`${API_BASE_URL}/api/campaigns/${id}/resend`, {
				method: 'POST',
				credentials: 'include',
			});
			if (!res.ok) throw new Error();
			toast.success('Correo reenviado');
		} catch {
			toast.error('Error al reenviar');
		}
	};

	const statusLabels: Record<Campaign['status'], string> = {
		draft: 'Borrador',
		scheduled: 'Programada',
		sent: 'Enviada',
	};

	return (
		<>
			<div className='flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4 mb-6'>
				<h2 className='text-2xl font-bold text-gray-800 pt-2 md:pt-1'>Campañas de correo</h2>
				<Link
					href='/admin/email-campaigns/new'
					className='self-start sm:self-auto bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 transition'
				>
					<p>Nuevo correo</p>
				</Link>
			</div>

			<div className='grid gap-4'>
				{campaigns.map((c) => (
					<div key={c.id} className='bg-gray-100 p-4 rounded shadow relative'>
						<h3 className='text-lg font-semibold'>{c.subject}</h3>
						<p className='text-sm text-gray-600'>
							Estado: <strong>{statusLabels[c.status]}</strong>
						</p>
						{c.scheduledAt && (
							<p className='text-sm text-gray-600'>
								Programada para: {new Date(c.scheduledAt).toLocaleString()}
							</p>
						)}
						<p className='text-xs text-gray-500'>
							Creada el: {new Date(c.createdAt).toLocaleString()}
						</p>

						<div className='absolute top-3 right-4 flex gap-2'>
							<Link
								href={`/admin/email-campaigns/${c.id}/edit`}
								className='text-blue-600 hover:text-blue-800'
								title='Editar'
							>
								<Pencil size={18} />
							</Link>
							<button
								onClick={() => handleDelete(c.id)}
								className='text-red-600 hover:text-red-800'
								title='Eliminar'
							>
								<Trash2 size={18} />
							</button>

							{c.status === 'scheduled' && (
								<button
									onClick={() => handleSendNow(c.id)}
									className='text-green-600 hover:text-green-800'
									title='Enviar ahora'
								>
									<Send size={18} />
								</button>
							)}

							{c.status === 'sent' && (
								<button
									onClick={() => handleResend(c.id)}
									className='text-purple-600 hover:text-purple-800'
									title='Reenviar'
								>
									<Repeat size={18} />
								</button>
							)}
						</div>
					</div>
				))}
			</div>
		</>
	);
}
