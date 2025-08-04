'use client';
import React from 'react';
import MediaUploadForm from './MediaUploadForm';

type Props = {
	onClose: () => void;
	onUploadSuccess?: () => void;
};

export default function UploadModal({ onClose, onUploadSuccess }: Props) {
	return (
		<div className='fixed inset-0 bg-black/30 flex items-center justify-center z-50'>
			<div className='bg-white rounded-2xl p-8 w-full max-w-lg shadow-lg relative'>
				<button
					onClick={onClose}
					className='absolute top-4 right-4 text-gray-500 hover:text-red-600 text-2xl'
					aria-label='Cerrar'
				>
					&times;
				</button>
				<h3 className='text-xl font-bold mb-6 text-center'>Subir archivo</h3>
				<MediaUploadForm
					onSuccess={() => {
						onClose();
						onUploadSuccess?.();
					}}
				/>
			</div>
		</div>
	);
}
