'use client';

import { CloudinaryMedia } from '@/interfaces/cloudinary.interface';
import ImageWithControls from '../trainings/ImageWithControls';

interface Props {
	media: CloudinaryMedia;
}

export default function MediaPreview({ media }: Props) {
	const isVideo = media.resource_type === 'video';
	const isPDF = media.format === 'pdf';
	const label = media.public_id.split('/').pop();

	return (
		<div className='w-full h-[90vh] max-w-5xl mx-auto px-6 py-12 flex flex-col items-center justify-center'>
			<h1 className='text-3xl font-semibold mb-6 text-center'>{label}</h1>

			{isPDF ? (
				<>
					<iframe
						src={media.secure_url}
						title={label || 'PDF'}
						className='w-full h-full rounded-2xl shadow-lg'
					/>
					<a
						href={`${media.secure_url}?response-content-disposition=attachment`}
						download
						className='inline-block bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition mt-4'
					>
						Descargar PDF
					</a>
				</>
			) : isVideo ? (
				<video
					src={media.secure_url}
					controls
					className='w-full h-full rounded-2xl shadow-lg object-cover'
				/>
			) : (
				<ImageWithControls src={media.secure_url} alt={label || 'image'} />
			)}
		</div>
	);
}
