'use client';
import React, { FormEvent, useState } from 'react';
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
	const [title, setTitle] = useState('');
	const [caption, setCaption] = useState('');
	const [loading, setLoading] = useState(false);

	const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		if (!file) {
			toast.error('Seleccioná un archivo');
			return;
		}

		toast.custom((t) => (
			<div className='bg-white border border-gray-300 rounded p-6 shadow-md w-full max-w-sm'>
				<p className='mb-2'>¿Confirmás subir este archivo?</p>
				<div className='flex justify-end gap-2'>
					<button
						onClick={() => toast.dismiss(t.id)}
						className='px-3 py-1 bg-gray-200 text-sm rounded'
					>
						Cancelar
					</button>
					<button
						onClick={async () => {
							toast.dismiss(t.id);
							setLoading(true);
							const form = new FormData();
							form.append('resourceType', resourceType);
							form.append('file', file);
							form.append('title', title);
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
						}}
						className='px-3 py-1 bg-red-600 text-white text-sm rounded'
					>
						Subir
					</button>
				</div>
			</div>
		));
	};

	return (
		<form onSubmit={handleSubmit} className='space-y-4'>
			<div>
				<label className='block font-medium mb-1'>Tipo de archivo</label>
				<select
					value={resourceType}
					onChange={(e) => setResourceType(e.target.value as any)}
					className='w-full border rounded p-2'
				>
					<option value='image'>Imagen</option>
					<option value='video'>Video</option>
				</select>
			</div>
			<div>
				<label className='block font-medium mb-1'>Archivo</label>
				<div className='flex items-center'>
					<label
						htmlFor='file-input'
						className='cursor-pointer bg-gray-200 hover:bg-gray-300 px-4 py-2 rounded'
					>
						{file ? file.name : 'Seleccionar archivo...'}
					</label>
					<input
						id='file-input'
						type='file'
						accept='image/*,video/*'
						onChange={(e) => setFile(e.currentTarget.files?.[0] || null)}
						className='hidden'
					/>
				</div>
			</div>
			<div>
				<label className='block font-medium mb-1'>Título</label>
				<input
					type='text'
					value={title}
					onChange={(e) => setTitle(e.target.value)}
					className='w-full border rounded p-2'
					placeholder='Título de la imagen o video'
				/>
			</div>
			<div>
				<label className='block font-medium mb-1'>Texto descriptivo</label>
				<textarea
					value={caption}
					onChange={(e) => setCaption(e.target.value)}
					className='w-full border rounded p-2'
					rows={3}
					placeholder='Descripción detallada'
				/>
			</div>
			<button
				type='submit'
				disabled={loading || !file || !title}
				className='w-full bg-red-600 text-white py-2 rounded hover:bg-red-700 transition'
			>
				{loading ? 'Subiendo...' : 'Enviar'}
			</button>
		</form>
	);
}
