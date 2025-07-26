'use client';

import { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { patchMedia } from '@/lib/api';
import { CloudinaryMedia } from '@/interfaces/cloudinary.interface';

interface EditMediaModalProps {
	isOpen: boolean;
	onClose: () => void;
	media: CloudinaryMedia;
	onSuccess: (updatedItem: CloudinaryMedia) => void;
}

export default function EditMediaModal({
	isOpen,
	onClose,
	media,
	onSuccess,
}: EditMediaModalProps) {
	const [title, setTitle] = useState('');
	const [caption, setCaption] = useState('');
	const [isLoading, setIsLoading] = useState(false);
	const [error, setError] = useState('');

	useEffect(() => {
		if (media) {
			console.log('EditMediaModal recibió media:', media);
			setTitle(media.context?.custom?.title || '');
			setCaption(media.context?.custom?.caption || '');
		}
	}, [media]);

	if (!isOpen) return null;

	const handleSubmit = async () => {
		console.log('Intentando enviar edición...');
		setIsLoading(true);
		setError('');

		try {
			console.log('Llamando a patchMedia con:', {
				publicId: media.public_id,
				title,
				caption,
			});

			await patchMedia(media.public_id.split('/').pop()!, { title, caption });

			const updatedItem = {
				...media,
				context: {
					custom: {
						title,
						caption,
					},
				},
			};

			console.log('Edición exitosa. Resultado:', updatedItem);
			onSuccess(updatedItem);
			onClose();
		} catch (err) {
			console.error('Error al guardar los cambios:', err);
			setError('No se pudo guardar los cambios');
		} finally {
			setIsLoading(false);
		}
	};

	return createPortal(
		<div
			className='fixed inset-0 z-[999] flex items-center justify-center backdrop-blur-sm bg-black/30'
			role='dialog'
			aria-modal='true'
		>
			<div className='bg-white rounded-lg p-6 max-w-md w-full relative shadow-lg'>
				<button
					onClick={onClose}
					className='absolute top-2 right-2 text-gray-500 hover:text-red-600 text-xl'
					aria-label='Cerrar modal'
				>
					&times;
				</button>

				<h2 className='text-xl font-bold mb-4 text-center'>
					<p>Editar Media</p>
				</h2>

				<div className='mb-4'>
					<label className='block text-sm font-medium'>
						<h3>Título</h3>
					</label>
					<input
						type='text'
						value={title}
						onChange={(e) => setTitle(e.target.value)}
						className='w-full border rounded p-2 mt-1'
					/>
				</div>

				<div className='mb-4'>
					<label className='block text-sm font-medium'>Descripción</label>
					<textarea
						value={caption}
						onChange={(e) => setCaption(e.target.value)}
						className='w-full border rounded p-2 mt-1'
					/>
				</div>

				{error && <p className='text-red-500 text-sm mb-2'>{error}</p>}

				<div className='flex justify-end space-x-2'>
					<button
						className='bg-red-600 text-white px-4 py-2 rounded'
						onClick={handleSubmit}
						disabled={isLoading}
					>
						{isLoading ? 'Guardando...' : 'Guardar'}
					</button>
				</div>
			</div>
		</div>,
		document.body
	);
}
