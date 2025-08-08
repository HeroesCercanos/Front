'use client';

import { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { patchMedia } from '@/lib/api';
import { CloudinaryMedia } from '@/interfaces/cloudinary.interface';
import toast from 'react-hot-toast';

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

	useEffect(() => {
		if (media) {
			setTitle(media.context?.custom?.title || '');
			setCaption(media.context?.custom?.caption || '');
		}
	}, [media]);

	if (!isOpen) return null;

	const handleConfirmSubmit = async () => {
		setIsLoading(true);
		try {
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

			toast.success('Cambios guardados correctamente');
			onSuccess(updatedItem);
			onClose();
		} catch {
			toast.error('No se pudo guardar los cambios');
		} finally {
			setIsLoading(false);
		}
	};

	const handleSubmit = () => {
		toast.custom((t) => (
			<div
				className={`bg-white rounded-xl shadow-lg p-6 border border-gray-200 w-[90%] max-w-md ${
					t.visible ? 'animate-enter' : 'animate-leave'
				}`}
			>
				<h2 className='text-lg font-semibold text-gray-800 mb-2'>
					¿Guardar cambios?
				</h2>
				<p className='text-gray-600 mb-4'>
					Esto actualizará el título y la descripción del archivo.
				</p>
				<div className='flex justify-center gap-4'>
					<button
						onClick={() => {
							toast.dismiss(t.id);
							handleConfirmSubmit();
						}}
						className='px-4 py-2 rounded-md bg-red-600 text-white font-semibold hover:bg-red-700 transition'
					>
						Guardar cambios
					</button>
					<button
						onClick={() => toast.dismiss(t.id)}
						className='px-4 py-2 rounded-md bg-gray-300 text-gray-800 font-medium hover:bg-gray-400 transition'
					>
						Cancelar
					</button>
				</div>
			</div>
		));
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

				<h2 className='text-xl font-bold mb-4 text-center'>Editar Media</h2>

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
