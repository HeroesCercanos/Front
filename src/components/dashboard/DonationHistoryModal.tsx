'use client';
import { useEffect, useState } from 'react';
import { X } from 'lucide-react';
import { API_BASE_URL } from '@/config/api';
import { useAuth } from '@/context/AuthContext';
import { IDonation } from '@/interfaces/donation.interface';
import LoadingSpinner from '../common/Spinner';

interface Props {
	onClose: () => void;
}

export default function DonationHistoryModal({ onClose }: Props) {
	const { userData } = useAuth();
	const [donations, setDonations] = useState<IDonation[]>([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState<string | null>(null);

	useEffect(() => {
		const fetchDonations = async () => {
			try {
				const res = await fetch(
					`${API_BASE_URL}/donations/user/${userData?.user.id}/history`,
					{ credentials: 'include' }
				);
				if (!res.ok) {
					throw new Error('No se pudo obtener el historial de donaciones.');
				}
				const data = await res.json();
				setDonations(data);
			} catch (err: any) {
				setError(err.message);
			} finally {
				setLoading(false);
			}
		};

		if (userData?.user.id) fetchDonations();
	}, [userData?.user.id]);

	return (
		<div className='fixed inset-0 z-[999] flex items-center justify-center backdrop-blur-sm bg-black/30'>
			<div className='bg-white rounded-2xl shadow-xl p-6 w-full max-w-2xl space-y-4'>
				<div className='flex items-center justify-between'>
					<h2 className='text-xl font-bold'>Historial de Donaciones</h2>
					<button onClick={onClose}>
						<X />
					</button>
				</div>

				{loading ? (
					<LoadingSpinner />
				) : error ? (
					<p className='text-red-600'>{error}</p>
				) : donations.length === 0 ? (
					<p>No realizaste ninguna donación aún.</p>
				) : (
					<ul className='space-y-3'>
						{donations.map((don) => (
							<li
								key={don.id}
								className='p-3 border rounded-lg flex justify-between'
							>
								<div>
									<p className='font-medium'>Monto: ${don.amount}</p>
									<p className='text-sm text-gray-500'>
										Fecha: {new Date(don.createdAt).toLocaleDateString()}
									</p>
								</div>
								<p className='text-sm italic text-gray-600'>
									{don.message || 'Sin mensaje'}
								</p>
							</li>
						))}
					</ul>
				)}
			</div>
		</div>
	);
}
