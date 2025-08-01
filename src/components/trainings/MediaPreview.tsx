'use client';

import React from 'react';
import { CloudinaryMedia } from '@/interfaces/cloudinary.interface';
import ImageWithControls from './ImageWithControls';
import DownloadLink from '@/helpers/DownloadLink';

interface Props {
	media: CloudinaryMedia;
}

export default function MediaPreview({ media }: Props) {
	const isVideo = media.resource_type === 'video';
	const isPDF = media.format === 'pdf';
	const isRaw = media.resource_type === 'raw' && !isPDF;
	const label = media.public_id.split('/').pop();

	return (
		<div className='w-full h-[90vh] max-w-5xl mx-auto px-6 py-12 flex flex-col items-center justify-center inset-shadow-sm inset-shadow-gray-400/20'>
			<h1 className='text-3xl font-semibold mb-6 text-center'>{label}</h1>

			{isVideo ? (
				<video
					src={media.secure_url}
					controls
					className='w-full max-h-[80vh] rounded-2xl shadow-lg object-contain'
				/>
			) : isPDF ? (
				<>
					<iframe
						src={media.secure_url}
						title={label || 'PDF Preview'}
						className='w-full h-full rounded-2xl shadow-lg'
						loading='lazy'
					/>
					<DownloadLink
						url={media.secure_url}
						filename={label || 'archivo.pdf'}
						className='inline-block bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition mt-4'
					>
						<p>Descargar PDF</p>
					</DownloadLink>
				</>
			) : isRaw ? (
				<DownloadLink
					url={media.secure_url}
					filename={label}
					className='inline-block'
				>
					<img
						src='/pdf-icon.png'
						alt='Descargar archivo'
						className='w-auto h-auto'
					/>
				</DownloadLink>
			) : (
				<ImageWithControls src={media.secure_url} alt={label || 'image'} />
			)}
		</div>
	);
}
