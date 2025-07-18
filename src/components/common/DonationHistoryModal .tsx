// 'use client';
// import React, { useEffect, useState } from 'react';
// import { X } from 'lucide-react';
// import { getUserDonationHistory } from '@/services/donations';
// import { IDonation } from '@/interfaces/';

// interface Props {
// 	onClose: () => void;
// }

// export default function DonationHistoryModal({ onClose }: Props) {
// 	const [donations, setDonations] = useState<IDonation[]>([]);
// 	const [loading, setLoading] = useState(true);

// 	useEffect(() => {
// 		const fetchDonations = async () => {
// 			try {
// 				const data = await getUserDonationHistory();
// 				setDonations(data);
// 			} catch (error) {
// 				console.error('Error al cargar donaciones', error);
// 			} finally {
// 				setLoading(false);
// 			}
// 		};
// 		fetchDonations();
// 	}, []);

// 	return (
// 		<div className='fixed inset-0 z-[999] flex items-center justify-center backdrop-blur-sm bg-black/30'>
// 			<div className='bg-white rounded-2xl shadow-xl p-6 w-full max-w-lg space-y-4'>
// 				<div className='flex items-center justify-between mb-2'>
// 					<div className='w-5' />{' '}
// 					{/* Espaciador para alinear con botón cerrar */}
// 					<h2 className='text-2xl font-semibold text-center flex-grow'>
// 						Mis Donaciones
// 					</h2>
// 					<button
// 						onClick={onClose}
// 						className='text-gray-600 hover:text-gray-800'
// 					>
// 						<X size={20} />
// 					</button>
// 				</div>

// 				{loading ? (
// 					<p className='text-center text-gray-500'>Cargando donaciones...</p>
// 				) : donations.length === 0 ? (
// 					<div className='text-center text-gray-600'>
// 						<p>No realizaste donaciones todavía.</p>
// 						<p className='text-sm text-gray-400 mt-1'>
// 							¡Podés hacer tu primera desde el dashboard!
// 						</p>
// 					</div>
// 				) : (
// 					<ul className='space-y-3 max-h-64 overflow-y-auto'>
// 						{donations.map((donation) => (
// 							<li
// 								key={donation.id}
// 								className='bg-gray-100 rounded-lg p-4 shadow-sm'
// 							>
// 								<p className='font-semibold text-red-700'>
// 									${donation.amount} ARS
// 								</p>
// 								<p className='text-sm text-gray-600'>
// 									Fecha: {new Date(donation.createdAt).toLocaleDateString()}
// 								</p>
// 							</li>
// 						))}
// 					</ul>
// 				)}
// 			</div>
// 		</div>
// 	);
// }
