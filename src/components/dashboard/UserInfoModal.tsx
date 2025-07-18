'use client';
import React, { useState } from 'react';
import { IUserInfo } from '@/interfaces/AuthInterfaces/userInfo.interface';
import { Pencil, X } from 'lucide-react';
import { useAuth } from '@/context/AuthContext';
import { API_BASE_URL } from '@/config/api';

interface Props {
	user: IUserInfo;
	onClose: () => void;
}

export default function UserInfoModal({ user, onClose }: Props) {
	const { userData, setUserData } = useAuth();

	const [isEditing, setIsEditing] = useState(false);
	const [form, setForm] = useState<IUserInfo>(user);
	const [isSaving, setIsSaving] = useState(false);
	const [fieldErrors, setFieldErrors] = useState<{ [key: string]: string }>({});

	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const { name, value } = e.target;
		setForm({ ...form, [name]: value });

		if (name === 'phone') {
			const phoneRegex = /^[0-9]{7,}$/;
			setFieldErrors((prev) => ({
				...prev,
				phone: !phoneRegex.test(value)
					? 'El teléfono debe tener solo números y al menos 7 dígitos.'
					: '',
			}));
		}
	};

	const handleSave = async () => {
		const phoneValue = form.phone || '';
		const phoneRegex = /^[0-9]{7,}$/;
		if (!phoneRegex.test(phoneValue)) {
			setFieldErrors((prev) => ({
				...prev,
				phone: 'El teléfono debe tener solo números y al menos 7 dígitos.',
			}));
			return;
		}

		try {
			setIsSaving(true);
			setFieldErrors({});

			const res = await fetch(
				`${API_BASE_URL}/users/${user.id}`,
				{
					method: 'PUT',
					headers: {
						'Content-Type': 'application/json',
						Authorization: `Bearer ${localStorage.getItem('jwtToken')}`,
					},
					body: JSON.stringify(form),
				}
			);

			if (!res.ok) throw new Error('Error al guardar los cambios');

			if (userData) {
				setUserData({
					...userData,
					user: {
						...userData.user,
						...form,
					},
				});
			}

			setIsEditing(false);
			alert('Datos actualizados con éxito');
		} catch (err) {
			console.error(err);
			alert(
				(err as Error).message || 'Ocurrió un error al guardar los cambios.'
			);
		} finally {
			setIsSaving(false);
		}
	};

	const fields: { key: keyof IUserInfo; label: string }[] = [
		{ key: 'name', label: 'Nombre' },
		{ key: 'email', label: 'Correo electrónico' },
		{ key: 'phone', label: 'Teléfono' },
		{ key: 'address', label: 'Domicilio' },
	];

	return (
		<div className='fixed inset-0 z-[999] flex items-center justify-center backdrop-blur-sm bg-black/30'>
			<div className='bg-white rounded-2xl shadow-xl p-6 w-full max-w-lg space-y-4'>
				<div className='flex items-center justify-between mb-2'>
					<button
						onClick={() => setIsEditing(!isEditing)}
						className='text-gray-600 hover:text-gray-800'
					>
						<Pencil size={20} />
					</button>
					<h2 className='text-2xl font-semibold'>Mis datos personales</h2>
					<button
						onClick={onClose}
						className='text-gray-600 hover:text-gray-800'
					>
						<X size={20} />
					</button>
				</div>

				<div className='space-y-3'>
					{fields.map(({ key, label }) => (
						<div key={key as string}>
							<label className='block text-sm font-medium text-gray-700'>
								{label}
							</label>
							{isEditing ? (
								<>
									<input
										type={key === 'phone' ? 'tel' : 'text'}
										name={key}
										value={form[key] || ''}
										onChange={handleChange}
										pattern={key === 'phone' ? '\\d{7,}' : undefined}
										title={
											key === 'phone'
												? 'Solo números y mínimo 7 dígitos'
												: undefined
										}
										className='mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring focus:border-red-500'
									/>
									{fieldErrors.phone && key === 'phone' && (
										<p className='text-red-600 text-sm mt-1'>
											{fieldErrors.phone}
										</p>
									)}
								</>
							) : (
								<p className='mt-1 text-gray-800'>
									{user[key] || 'No especificado'}
								</p>
							)}
						</div>
					))}
				</div>

				<div className='text-right space-x-2'>
					{isEditing && (
						<button
							onClick={handleSave}
							disabled={isSaving}
							className='bg-red-600 hover:bg-red-700 text-white font-semibold py-2 px-4 rounded-lg disabled:opacity-50'
						>
							{isSaving ? 'Guardando...' : 'Guardar cambios'}
						</button>
					)}
				</div>
			</div>
		</div>
	);
}
