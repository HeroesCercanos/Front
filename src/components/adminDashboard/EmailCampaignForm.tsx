'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { API_BASE_URL } from '@/config/api';
import EmailPreviewModal from './EmailPreviewModal';
import toast from 'react-hot-toast';
import DatePicker from 'react-datepicker';
import { registerLocale } from 'react-datepicker';
import { es } from 'date-fns/locale';
import 'react-datepicker/dist/react-datepicker.css';
import { isToday } from 'date-fns';
import { useMemo } from 'react';

registerLocale('es', es);

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
	const [titulo, setTitulo] = useState('');
	const [parrafo1, setParrafo1] = useState('');
	const [parrafo2, setParrafo2] = useState('');
	const [cierre, setCierre] = useState('');
	const [previewOpen, setPreviewOpen] = useState(false);
	const [templateOpen, setTemplateOpen] = useState(false);
	const [scheduledDate, setScheduledDate] = useState<Date | null>(null);
	const [now, setNow] = useState(new Date());

	useEffect(() => {
		if (initialData) {
			setSubject(initialData.subject || '');
			setRecipients(initialData.recipients || '');
			setTitulo(initialData.variables?.titulo || '');
			setParrafo1(initialData.variables?.parrafo1 || '');
			setParrafo2(initialData.variables?.parrafo2 || '');
			setCierre(initialData.variables?.cierre || '');
		}
	}, [initialData]);

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();

		toast.custom((t) => (
			<div className='bg-white border border-gray-300 rounded p-4 shadow-md'>
				<p className='mb-2'>
					{initialData
						? '¿Estás seguro de actualizar esta campaña?'
						: '¿Estás seguro de crear esta campaña?'}
				</p>
				<div className='flex justify-end gap-2'>
					<button
						onClick={() => toast.dismiss(t.id)}
						className='px-3 py-1 bg-gray-200 rounded'
					>
						<p>Cancelar</p>
					</button>
					<button
						onClick={async () => {
							toast.dismiss(t.id);
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
											scheduledAt: scheduledDate
												? scheduledDate.toISOString()
												: undefined,
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
						}}
						className='px-3 py-1 bg-red-600 text-white rounded'
					>
						{initialData ? 'Actualizar' : 'Crear'}
					</button>
				</div>
			</div>
		));
	};

	const previewHtml = `
		<h1>${titulo}</h1>
		<p>${parrafo1}</p>
		<p>${parrafo2}</p>
		<p>${cierre}</p>
	`;

	useEffect(() => {
		const interval = setInterval(() => {
			setNow(new Date());
		}, 15 * 1000);

		return () => clearInterval(interval);
	}, []);

	const minTime = useMemo(() => {
		if (scheduledDate && isToday(scheduledDate)) {
			const rounded = new Date(now);
			const minutes = rounded.getMinutes();
			const roundedMinutes = Math.ceil(minutes / 15) * 15;
			rounded.setMinutes(roundedMinutes, 0, 0);
			return rounded;
		}
		return new Date(new Date().setHours(7, 0, 0, 0));
	}, [scheduledDate, now]);

	return (
		<>
			<form onSubmit={handleSubmit} className='space-y-6'>
				<div>
					<p className='text-sm text-gray-700'>
						Nota: para saber que se debe poner en cada campo, consulta el botón
						de ver plantilla de abajo.
					</p>
					<label className='block font-medium mb-1'>Asunto</label>
					<input
						type='text'
						className='w-full border border-gray-300 shadow-inner shadow-gray-300 rounded p-2 hover:border hover:border-gray-500 focus:shadow-gray-50'
						value={subject}
						onChange={(e) => setSubject(e.target.value)}
						required
					/>
				</div>

				<div>
					<label className='block font-medium mb-1'>Destinatarios</label>
					<textarea
						className='w-full border border-gray-300 shadow-inner shadow-gray-300 rounded p-2 hover:border hover:border-gray-500 focus:shadow-gray-50'
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
						className='w-full border border-gray-300 shadow-inner shadow-gray-300 rounded p-2 hover:border hover:border-gray-500 focus:shadow-gray-50'
						placeholder='Completar con {{titulo}} de la plantilla'
						value={titulo}
						onChange={(e) => setTitulo(e.target.value)}
						required
					/>
				</div>

				<div>
					<label className='block font-medium mb-1'>Primer párrafo</label>
					<textarea
						className='w-full border border-gray-300 shadow-inner shadow-gray-300 rounded p-2 hover:border hover:border-gray-500 focus:shadow-gray-50'
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
						className='w-full border border-gray-300 shadow-inner shadow-gray-300 rounded p-2 hover:border hover:border-gray-500 focus:shadow-gray-50'
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
						className='w-full border border-gray-300 shadow-inner shadow-gray-300 rounded p-2 hover:border hover:border-gray-500 focus:shadow-gray-50'
						placeholder='Completar con {{cierre}} de la plantilla'
						value={cierre}
						onChange={(e) => setCierre(e.target.value)}
						required
					/>
				</div>

				<div>
					<label className='block font-medium mb-1'>Programar envío</label>
					<DatePicker
						locale='es'
						selected={scheduledDate}
						onChange={(date: Date | null) => setScheduledDate(date)}
						showTimeSelect
						timeFormat='HH:mm'
						timeIntervals={15}
						dateFormat='dd/MM/yyyy HH:mm'
						placeholderText='Seleccionar fecha y hora'
						timeCaption='Hora'
						minDate={new Date()}
						minTime={minTime}
						maxTime={new Date(new Date().setHours(22, 0, 0, 0))}
						className='w-full border border-gray-300 shadow-inner shadow-gray-300 rounded p-2 hover:border hover:border-gray-500 focus:shadow-gray-50'
						popperPlacement='bottom-end'
					/>
				</div>

				<div className='flex flex-col sm:flex-row gap-4'>
					<button
						type='button'
						onClick={() => setPreviewOpen(true)}
						className='px-4 py-2 rounded bg-gray-500 text-white hover:bg-gray-700 transition'
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
