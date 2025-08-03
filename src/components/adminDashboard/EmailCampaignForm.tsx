'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { API_BASE_URL } from '@/config/api';
import EmailPreviewModal from './EmailPreviewModal';
import toast from 'react-hot-toast';

type Props = {
	initialData?: {
		id: number;
		subject: string;
		recipients: string;
		scheduledAt?: string;
		variables: {
			titulo: string;
			parrafo1: string;
			parrafo2: string;
			cierre: string;
		};
	};
	onSuccess?: () => void;
};

export default function EmailCampaignForm({ initialData, onSuccess }: Props) {
	const router = useRouter();
	const [subject, setSubject] = useState('');
	const [recipients, setRecipients] = useState('');
	const [scheduledAt, setScheduledAt] = useState('');
	const [titulo, setTitulo] = useState('');
	const [parrafo1, setParrafo1] = useState('');
	const [parrafo2, setParrafo2] = useState('');
	const [cierre, setCierre] = useState('');
	const [previewOpen, setPreviewOpen] = useState(false);
	const [templateOpen, setTemplateOpen] = useState(false);

	useEffect(() => {
		if (initialData) {
			setSubject(initialData.subject || '');
			setRecipients(initialData.recipients || '');
			setScheduledAt(
				initialData.scheduledAt
					? new Date(initialData.scheduledAt).toISOString().slice(0, 16)
					: ''
			);
			setTitulo(initialData.variables?.titulo || '');
			setParrafo1(initialData.variables?.parrafo1 || '');
			setParrafo2(initialData.variables?.parrafo2 || '');
			setCierre(initialData.variables?.cierre || '');
		}
	}, [initialData]);

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();

		const confirmed = confirm(
			initialData
				? '¿Estás seguro de actualizar esta campaña?'
				: '¿Estás seguro de crear esta campaña?'
		);
		if (!confirmed) return;

		const emails = recipients
			.split(',')
			.map((email) => email.trim())
			.filter((e) => e);

		try {
			const res = await fetch(
				initialData
					? `${API_BASE_URL}/api/campaigns/${initialData.id}`
					: `${API_BASE_URL}/api/campaigns`,
				{
					method: initialData ? 'PATCH' : 'POST',
					headers: { 'Content-Type': 'application/json' },
					credentials: 'include',
					body: JSON.stringify({
						subject,
						recipients: emails,
						scheduledAt: scheduledAt || undefined,
						titulo,
						parrafo1,
						parrafo2,
						cierre,
					}),
				}
			);
			if (!res.ok) {
				throw new Error('Error al guardar la campaña');
			}
			toast.success(
				initialData
					? 'Campaña actualizada exitosamente'
					: 'Campaña creada exitosamente'
			);

			if (onSuccess) onSuccess();
			else router.push('/admin/email-campaigns');
		} catch (err) {
			console.error(err);
			toast.error('Hubo un error al guardar la campaña');
		}
	};

	const previewHtml = `
		<h1>${titulo}</h1>
		<p>${parrafo1}</p>
		<p>${parrafo2}</p>
		<p>${cierre}</p>
	`;

	return (
		<>
			<form onSubmit={handleSubmit} className='space-y-6'>
				<div>
					<label className='block font-medium mb-1'>Asunto</label>
					<input
						type='text'
						className='w-full border rounded p-2'
						value={subject}
						onChange={(e) => setSubject(e.target.value)}
						required
					/>
				</div>

				<div>
					<label className='block font-medium mb-1'>Destinatarios</label>
					<textarea
						className='w-full border rounded p-2'
						rows={2}
						value={recipients}
						onChange={(e) => setRecipients(e.target.value)}
						placeholder='Separar por coma, o dejar vacío para enviar a todos'
					/>
				</div>

				<hr className='my-4' />

				<div>
					<label className='block font-medium mb-1'>Título del correo</label>
					<input
						type='text'
						className='w-full border rounded p-2'
						placeholder='Completar con {{titulo}} de la plantilla'
						value={titulo}
						onChange={(e) => setTitulo(e.target.value)}
						required
					/>
				</div>

				<div>
					<label className='block font-medium mb-1'>Primer párrafo</label>
					<textarea
						className='w-full border rounded p-2'
						placeholder='Completar con {{parrafo1}} de la plantilla'
						rows={2}
						value={parrafo1}
						onChange={(e) => setParrafo1(e.target.value)}
						required
					/>
				</div>

				<div>
					<label className='block font-medium mb-1'>Segundo párrafo</label>
					<textarea
						className='w-full border rounded p-2'
						placeholder='Completar con {{parrafo2}} de la plantilla'
						rows={2}
						value={parrafo2}
						onChange={(e) => setParrafo2(e.target.value)}
						required
					/>
				</div>

				<div>
					<label className='block font-medium mb-1'>Cierre</label>
					<input
						type='text'
						className='w-full border rounded p-2'
						placeholder='Completar con {{cierre}} de la plantilla'
						value={cierre}
						onChange={(e) => setCierre(e.target.value)}
						required
					/>
				</div>

				<div>
					<label className='block font-medium mb-1'>
						Programar envío (opcional)
					</label>
					<input
						type='datetime-local'
						className='w-full border rounded p-2'
						value={scheduledAt}
						onChange={(e) => setScheduledAt(e.target.value)}
					/>
				</div>

				<div className='flex flex-col sm:flex-row gap-4'>
					<button
						type='button'
						onClick={() => setPreviewOpen(true)}
						className='px-4 py-2 rounded bg-gray-600 text-white hover:bg-gray-700 transition'
					>
						Previsualizar
					</button>
					<button
						type='button'
						onClick={() => setTemplateOpen(true)}
						className='px-4 py-2 rounded bg-red-600 text-white hover:bg-red-700 transition'
					>
						Ver plantilla
					</button>
					<button
						type='submit'
						className='px-4 py-2 rounded bg-red-600 text-white hover:bg-red-700 transition'
					>
						{initialData ? 'Actualizar campaña' : 'Crear campaña'}
					</button>
				</div>
			</form>

			<EmailPreviewModal
				isOpen={previewOpen}
				onClose={() => setPreviewOpen(false)}
				subject={subject}
				html={previewHtml}
			/>

			{templateOpen && (
				<div className='fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50'>
					<div className='bg-white p-4 rounded shadow max-w-lg w-full relative'>
						<button
							onClick={() => setTemplateOpen(false)}
							className='absolute top-2 right-2 text-gray-500 hover:text-black'
						>
							✕
						</button>
						<img
							src='/template.png'
							alt='Vista previa plantilla'
							className='w-full h-auto rounded'
						/>
					</div>
				</div>
			)}
		</>
	);
}
