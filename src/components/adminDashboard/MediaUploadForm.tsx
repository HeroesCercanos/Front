'use client';
import React, { FormEvent, useState, ChangeEvent } from 'react';
import { uploadMedia } from '@/lib/api';
import toast from 'react-hot-toast';

export default function MediaUploadForm({
	onSuccess,
}: {
	onSuccess: () => void;
}) {
	const [resourceType, setResourceType] = useState<'image' | 'video' | 'raw'>(
		'image'
	);
	const [file, setFile] = useState<File | null>(null);
	const [caption, setCaption] = useState('');
	const [loading, setLoading] = useState(false);

	const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
		if (e.currentTarget.files && e.currentTarget.files[0]) {
			setFile(e.currentTarget.files[0]);
		}
	};

	const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		if (!file) {
			toast.error('Seleccioná un archivo');
			return;
		}
		setLoading(true);
		const form = new FormData();
		form.append('resourceType', resourceType);
		form.append('file', file);
		form.append('caption', caption);
		try {
			await uploadMedia(form);
			toast.success('Archivo subido con éxito');
			onSuccess();
		} catch {
			toast.error('Error al subir');
		} finally {
			setLoading(false);
		}
	};

	return (
		<form onSubmit={handleSubmit} className='space-y-4'>
			<div>
				<label className='block font-medium mb-1'>Tipo de archivo</label>
				<select
					value={resourceType}
					onChange={(e: ChangeEvent<HTMLSelectElement>) =>
						setResourceType(e.target.value as 'image' | 'video' | 'raw')
					}
					className='w-full border rounded p-2'
				>
					<option value='image'>Imagen</option>
					<option value='video'>Video</option>
					<option value='raw'>PDF</option>
				</select>
			</div>
			<div>
				<label className='block font-medium mb-1'>Archivo</label>
				<div className='flex items-center'>
					<label
						htmlFor='file-input'
						className='cursor-pointer bg-gray-200 hover:bg-gray-300 text-gray-800 px-4 py-2 rounded'
					>
						{file ? file.name : 'Seleccionar archivo...'}
					</label>
					<input
						id='file-input'
						type='file'
						accept='image/*,video/*,application/pdf'
						onChange={handleFileChange}
						className='hidden'
					/>
				</div>
			</div>
			<div>
				<label className='block font-medium mb-1'>Texto descriptivo</label>
				<textarea
					value={caption}
					onChange={(e: ChangeEvent<HTMLTextAreaElement>) =>
						setCaption(e.target.value)
					}
					className='w-full border rounded p-2'
					placeholder='Ingresá un texto que se mostrará en la tarjeta'
				/>
			</div>
			<button
				type='submit'
				disabled={loading}
				className='w-full bg-red-600 text-white py-2 rounded hover:bg-red-700 transition'
			>
				{loading ? 'Subiendo...' : 'Enviar'}
			</button>
		</form>
	);
}
