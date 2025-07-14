'use client';

import React, { useEffect, useState } from 'react';
import { fetchTrainings, CloudinaryMedia } from '@/lib/api';
import { TvMinimalPlay, Image as ImgIcon, FileText } from 'lucide-react';
import toast from 'react-hot-toast';

export default function UploadHistory() {
	const [list, setList] = useState<CloudinaryMedia[]>([]);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		fetchTrainings()
			.then(setList)
			.catch(() => toast.error('Error cargando historial'))
			.finally(() => setLoading(false));
	}, []);

	if (loading) return <p>Cargando...</p>;
	if (list.length === 0) return <p>No hay archivos.</p>;

	return (
		<ul className='space-y-4 max-h-64 overflow-auto'>
			{list.map((item) => {
				const icon =
					item.resource_type === 'video' ? (
						<TvMinimalPlay size={18} />
					) : item.format === 'pdf' ? (
						<FileText size={18} />
					) : (
						<ImgIcon size={18} />
					);
				return (
					<li
						key={item.public_id}
						className='flex items-center justify-between bg-gray-100 p-2 rounded'
					>
						<div className='flex items-center gap-2'>
							{icon}
							<span className='truncate'>
								{item.public_id.split('/').pop()}
							</span>
						</div>
						<button
							onClick={() => toast('Función editar no implementada')}
							className='text-sm text-blue-600 hover:underline'
						>
							Editar
						</button>
					</li>
				);
			})}
		</ul>
	);
}
