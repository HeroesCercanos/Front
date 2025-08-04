'use client';

import React, { useState } from 'react';
import Sidebar from './Sidebar';
import UploadModal from './UploadModal';
import UploadHistory from './UploadHistory';
import toast from 'react-hot-toast';

export default function TrainingView() {
	const [isModalOpen, setIsModalOpen] = useState(false);

	const handleUploadSuccess = () => {
		toast.success('Archivo subido exitosamente');
		setIsModalOpen(false);
	};

	return (
		<div className='flex min-h-screen flex-col md:flex-row'>
			<aside className='w-full md:w-64 bg-black text-black'>
				<Sidebar />
			</aside>

			<section className='flex-1 p-6 bg-gray-50 flex flex-col gap-6 pt-10 md:pt-8'>
				<h2 className='text-2xl font-bold text-gray-800'>Capacitaciones</h2>

				<div className='bg-gray-100 p-6 rounded-lg shadow-inner drop-shadow-lg flex flex-col justify-between w-full'>
					<div>
						<h3 className='text-xl font-semibold mb-2'>Subir nuevo archivo</h3>
						<p className='text-gray-700 text-sm'>
							Agrega imágenes o videos a la plataforma.
						</p>
					</div>
					<button
						onClick={() => setIsModalOpen(true)}
						className='mt-4 bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded transition cursor-pointer w-full'
					>
						Subir archivo
					</button>
				</div>

				<div className='bg-gray-100 p-6 rounded-lg shadow-inner drop-shadow-lg flex flex-col w-full'>
					<h3 className='text-xl font-semibold mb-4'>Historial de archivos</h3>
					<UploadHistory />
				</div>

				{isModalOpen && (
					<UploadModal
						onClose={() => setIsModalOpen(false)}
						onUploadSuccess={handleUploadSuccess}
					/>
				)}
			</section>
		</div>
	);
}
