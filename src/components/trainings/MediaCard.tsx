'use client';

import React, { useState } from 'react';
import { CloudinaryMedia } from '@/interfaces/cloudinary.interface';
import ImageWithControls from './ImageWithControls';
import DownloadLink from '@/helpers/DownloadLink';

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
		<div className='relative block rounded-lg inset-shadow-sm inset-shadow-gray-400/20 drop-shadow-lg hover:shadow-lg transition transform hover:-translate-y-1 bg-white overflow-hidden'>
			<div className='bg-black flex items-center justify-center w-full h-80'>
				{isVideo ? (
					<video
						src={item.secure_url}
						className='max-h-[80vh] object-contain'
						muted
						playsInline
						controls
					/>
				) : isPDF ? (
					<img
						src='/pdf-icon.png'
						alt='PDF'
						className='w-full h-full object-contain'
					/>
				) : isRaw ? (
					<DownloadLink
						url={item.secure_url}
						filename={title}
						className='inline-block'
					>
						<img
							src='/pdf-icon.png'
							alt='Descargar archivo'
							className='w-98 h-80 bg-gray-100'
						/>
					</DownloadLink>
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
						<p>Ver Información</p>
					</button>
				</div>
			) : (
				<div className='absolute inset-0 bg-white p-4 flex flex-col justify-between'>
					<div className='overflow-auto text-sm text-gray-700'>
						<p>{description}</p>
					</div>
					{isRaw && (
						<DownloadLink
							url={item.secure_url}
							filename={title}
							className='mt-4 text-red-600 hover:underline'
						>
							<p>Descargar archivo</p>
						</DownloadLink>
					)}
					<button
						onClick={() => setShowDesc(false)}
						className='mt-4 bg-red-600 hover:bg-red-700 text-white py-2 rounded-lg'
					>
						<p>Volver</p>
					</button>
				</div>
			)}
		</div>
	);
}
