'use client';

import { API_BASE_URL } from '@/config/api';
import React, { useState } from 'react';

const DonationForm = () => {
	const [amount, setAmount] = useState('');
	const [description, setDescription] = useState('');
	const [success, setSuccess] = useState(false);
	const [error, setError] = useState('');
	const [loading, setLoading] = useState(false);

	const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		setSuccess(false);
		setError('');
		setLoading(true);

		try {
			const res = await fetch(
				`$${API_BASE_URL}/donations`,
				{
					method: 'POST',
					headers: {
						'Content-Type': 'application/json',
					},
					credentials: 'include',
					body: JSON.stringify({
						amount: Number(amount),
						description,
					}),
				}
			);

			if (!res.ok) {
				const data = await res.json();
				throw new Error(data.message || 'Error al enviar la donación');
			}

			setSuccess(true);
			setAmount('');
			setDescription('');
		} catch (err: any) {
			setError(err.message || 'Ocurrió un error al enviar la donación');
		} finally {
			setLoading(false);
		}
	};

	return (
		<form
			onSubmit={handleSubmit}
			className='space-y-4 p-4 w-full max-w-md'
			aria-label='Formulario de donación'
		>
			<div>
				{' '}
				{/* // TODO: Acá estará MP */}
				<label htmlFor='amount' className='block font-semibold text-sm'>
					Monto
				</label>
				<input
					type='number'
					id='amount'
					name='amount'
					value={amount}
					onChange={(e) => setAmount(e.target.value)}
					className='mt-1 block w-full rounded border-gray-300 shadow-sm'
					placeholder='Ej: 5000'
					aria-label='Monto de la donación'
					aria-required='false'
				/>
			</div>

			<div>
				<label htmlFor='description' className='block font-semibold text-sm'>
					Descripción
				</label>
				<textarea
					id='description'
					name='description'
					value={description}
					onChange={(e) => setDescription(e.target.value)}
					className='mt-1 block w-full rounded border-gray-300 shadow-sm'
					rows={3}
					placeholder='Describe brevemente la donación'
					aria-label='Descripción de la donación'
				/>
			</div>

			<button
				type='submit'
				className='bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded w-full cursor-pointer disabled:opacity-50'
				aria-label='Enviar donación'
				disabled={loading}
			>
				{loading ? 'Enviando...' : 'Enviar donación'}
			</button>

			{success && (
				<p className='text-green-600 text-sm text-center font-medium'>
					¡Donación enviada con éxito!
				</p>
			)}

			{error && (
				<p className='text-red-600 text-sm text-center font-medium'>{error}</p>
			)}
		</form>
	);
};

export default DonationForm;
