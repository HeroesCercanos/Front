'use client';
import { CloudinaryMedia } from '@/interfaces/cloudinary.interface';
import ImageWithControls from './ImageWithControls';

export default function MediaCard({ item }: { item: CloudinaryMedia }) {
	const isVideo = item.resource_type === 'video';
	const isPDF = item.format === 'pdf';
	const label = item.public_id.split('/').pop();

	if (isPDF) {
		return (
			<div className='block border rounded-2xl shadow-md hover:shadow-lg transition transform hover:-translate-y-1 bg-white overflow-hidden'>
				<div className='h-48 flex items-center justify-center bg-gray-100'>
					<img
						src='/pdf-icon.png'
						alt='PDF'
						className='w-16 h-16 object-contain'
					/>
				</div>
				<div className='p-4 text-center'>
					<p className='text-sm font-medium text-gray-800 truncate mb-2'>
						{label}
					</p>
					<a
						href={item.secure_url.replace('/upload/', '/upload/fl_attachment/')}
						download
						rel='noopener noreferrer'
						className='inline-block bg-red-600 text-white font-medium px-4 py-2 rounded-lg hover:bg-red-700 transition'
					>
						Descargar PDF
					</a>
				</div>
			</div>
		);
	}

	return (
		<div className='block border rounded-2xl w-full h-full transition transform hover:-translate-y-1 bg-gray-100 overflow-hidden'>
			<div className='bg-black/5 h-48 overflow-hidden'>
				{isVideo ? (
					<video
						src={item.secure_url}
						className='w-full h-full object-cover'
						muted
						playsInline
						controls
					/>
				) : (
					<ImageWithControls src={item.secure_url} alt={label || 'media'} />
				)}
			</div>
			<div className='p-4'>
				<p className='text-sm font-medium text-gray-800 truncate'>{label}</p>
			</div>
		</div>
	);
}
