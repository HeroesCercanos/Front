'use client';
import React, { useState } from 'react';
import { CloudinaryMedia } from '@/interfaces/cloudinary.interface';
import ImageWithControls from './ImageWithControls';

export default function MediaCard({ item }: { item: CloudinaryMedia }) {
	const [showDesc, setShowDesc] = useState(false);
	const isVideo = item.resource_type === 'video';
	const isPDF = item.format === 'pdf';
	const isRaw = item.resource_type === 'raw' && !isPDF;

	const title =
		item.context?.custom?.title ||
		item.context?.custom?.caption ||
		item.public_id.split('/').pop()!;

	const description =
		item.context?.custom?.caption ||
		item.context?.custom?.title ||
		'Sin descripción';

	return (
		<div className='relative block border rounded-2xl shadow-md hover:shadow-lg transition transform hover:-translate-y-1 bg-white overflow-hidden'>
			<div className='h-48 bg-gray-100 flex items-center justify-center'>
				{isVideo ? (
					<video
						src={item.secure_url}
						className='w-full h-full object-cover'
						muted
						playsInline
						controls
					/>
				) : isPDF ? (
					<img
						src='/pdf-icon.png'
						alt='PDF'
						className='w-16 h-16 object-contain'
					/>
				) : isRaw ? (
					<a
						href={`${item.secure_url}?response-content-disposition=attachment`}
						target='_blank'
						rel='noopener noreferrer'
						className='text-6xl'
					>
						📄
					</a>
				) : (
					<ImageWithControls src={item.secure_url} alt={title} />
				)}
			</div>

			{!showDesc ? (
				<div className='p-4 text-center'>
					<p className='text-sm font-medium text-gray-800 truncate mb-2'>
						{title}
					</p>
					<button
						onClick={() => setShowDesc(true)}
						className='text-red-600 hover:underline text-sm'
					>
						Ver Información
					</button>
				</div>
			) : (
				<div className='absolute inset-0 bg-white p-4 flex flex-col justify-between'>
					<div className='overflow-auto text-sm text-gray-700'>
						{description}
					</div>
					{isRaw && (
						<a
							href={`${item.secure_url}?response-content-disposition=attachment`}
							target='_blank'
							rel='noopener noreferrer'
							className='mt-4 text-blue-600 hover:underline'
						>
							Descargar archivo
						</a>
					)}
					<button
						onClick={() => setShowDesc(false)}
						className='mt-4 bg-red-600 hover:bg-red-700 text-white py-2 rounded'
					>
						Volver
					</button>
				</div>
			)}
		</div>
	);
}
