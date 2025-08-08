'use client';
import React, { useEffect, useState } from 'react';
import { fetchTrainings, deleteMedia } from '@/lib/api';
import { Trash2, Pencil } from 'lucide-react';
import toast from 'react-hot-toast';
import { CloudinaryMedia } from '@/interfaces/cloudinary.interface';
import EditMediaModal from '@/components/adminDashboard/EditMediaModal';

export default function UploadHistory() {
	const [list, setList] = useState<CloudinaryMedia[]>([]);
	const [loading, setLoading] = useState(true);
	const [isEditOpen, setIsEditOpen] = useState(false);
	const [selectedMedia, setSelectedMedia] = useState<CloudinaryMedia | null>(
		null
	);

	useEffect(() => {
		fetchTrainings()
			.then((data) => setList(data.reverse()))
			.catch(() => toast.error('Error cargando historial'))
			.finally(() => setLoading(false));
	}, []);

	const handleDelete = (publicId: string, title?: string) => {
		toast.custom((t) => (
			<div
				className={`bg-white rounded-xl shadow-lg p-6 border border-gray-200 w-[90%] max-w-md ${
					t.visible ? 'animate-enter' : 'animate-leave'
				}`}
			>
				<h2 className='text-lg font-semibold text-gray-800 mb-2'>
					¿Eliminar archivo?
				</h2>
				<p className='text-gray-600 mb-4'>
					Vas a eliminar <strong>{title || 'este archivo'}</strong>. Esta acción
					no se puede deshacer.
				</p>
				<div className='flex justify-center gap-4'>
					<button
						onClick={async () => {
							toast.dismiss(t.id);
							try {
								await deleteMedia(publicId);
								setList((prev) => prev.filter((i) => i.public_id !== publicId));
								toast.success('Archivo eliminado con éxito.');
							} catch {
								toast.error('Error al eliminar archivo.');
							}
						}}
						className='px-4 py-2 rounded-md bg-red-600 text-white font-semibold hover:bg-red-700 transition'
					>
						<p>Sí, eliminar</p>
					</button>
					<button
						onClick={() => toast.dismiss(t.id)}
						className='px-4 py-2 rounded-md bg-gray-300 text-gray-800 font-medium hover:bg-gray-400 transition'
					>
						<p>Cancelar</p>
					</button>
				</div>
			</div>
		));
	};

	const openEditModal = (media: CloudinaryMedia) => {
		setSelectedMedia(media);
		setIsEditOpen(true);
	};

	if (loading) return <p>Cargando...</p>;
	if (list.length === 0) return <p>No hay archivos.</p>;

	return (
		<>
			<ul className='space-y-4 max-h-64 overflow-auto'>
				{list.map((item) => {
					const isVideo = item.resource_type === 'video';
					const isPDF = item.format === 'pdf';
					const title =
						item.context?.custom?.title ||
						item.context?.custom?.caption ||
						item.public_id.split('/').pop()!;
					const thumb = isPDF ? '/pdf-icon.png' : item.secure_url;

					return (
						<li
							key={item.public_id}
							className='flex items-center justify-between bg-gray-100 p-2 rounded'
						>
							<div className='flex items-center gap-3'>
								{isVideo ? (
									<video
										src={item.secure_url}
										className='w-12 h-12 object-cover rounded'
										muted
										playsInline
									/>
								) : (
									<img
										src={thumb}
										alt={title}
										className='w-12 h-12 object-contain rounded'
									/>
								)}
								<span className='truncate max-w-[200px]'>{title}</span>
							</div>
							<div className='flex items-center gap-2'>
								<button
									onClick={() => openEditModal(item)}
									className='text-blue-600 hover:underline'
								>
									<Pencil size={16} />
								</button>
								<button
									onClick={() =>
										handleDelete(item.public_id.split('/').pop()!, title)
									}
									className='text-red-600 hover:underline'
								>
									<Trash2 size={16} />
								</button>
							</div>
						</li>
					);
				})}
			</ul>

			{selectedMedia && (
				<EditMediaModal
					isOpen={isEditOpen}
					onClose={() => setIsEditOpen(false)}
					media={selectedMedia}
					onSuccess={(updatedItem) => {
						setList((prev) =>
							prev.map((i) =>
								i.public_id === updatedItem.public_id ? updatedItem : i
							)
						);
					}}
				/>
			)}
		</>
	);
}
