'use client';

import React, { useState } from 'react';
import Sidebar from './Sidebar';
import UploadModal from './UploadModal';
import UploadHistory from './UploadHistory';

export default function TrainingView() {
	const [isModalOpen, setIsModalOpen] = useState(false);

	return (
		<div className='flex h-screen'>
			<Sidebar />
			<section className='w-full mt-6 ml-6 mr-6'>
				<h2 className='text-2xl font-bold mb-4 text-gray-800'>
					Capacitaciones
				</h2>
				<div className='grid md:grid-cols-2 lg:grid-cols-3 gap-6'>
					<div className='bg-gray-100 p-6 rounded-lg shadow-inner drop-shadow-lg flex flex-col justify-between'>
						<div>
							<h3 className='text-xl font-semibold mb-2'>
								Subir nuevo archivo
							</h3>
							<p className='text-gray-700 text-sm'>
								Agrega imágenes, videos o PDFs a la plataforma.
							</p>
						</div>
						<button
							onClick={() => setIsModalOpen(true)}
							className='mt-4 bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded transition cursor-pointer'
						>
							Subir archivo
						</button>
					</div>

					<div className='bg-gray-100 p-6 rounded-lg shadow-inner drop-shadow-lg flex flex-col'>
						<h3 className='text-xl font-semibold mb-4'>
							Historial de archivos
						</h3>
						<UploadHistory />
					</div>
				</div>

				{isModalOpen && <UploadModal onClose={() => setIsModalOpen(false)} />}
			</section>
		</div>
	);
}
