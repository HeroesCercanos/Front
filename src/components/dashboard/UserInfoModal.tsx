'use client';
import React, { useState } from 'react';
import {
	IUserInfo,
	IUserFormValues,
} from '@/interfaces/AuthInterfaces/userInfo.interface';
import { Pencil, X, Eye, EyeOff } from 'lucide-react';
import { useAuth } from '@/context/AuthContext';
import { toast } from 'react-hot-toast';
import { API_BASE_URL } from '@/config/api';

interface Props {
	user: IUserInfo;
	onClose: () => void;
}

export default function UserInfoModal({ user, onClose }: Props) {
	const { userData, setUserData } = useAuth();

	const [isEditing, setIsEditing] = useState(false);
	const [form, setForm] = useState<IUserFormValues>({
		id: user.id,
		name: user.name || '',
		email: user.email || '',
		phone: user.phone || '',
		address: user.address || '',
		role: user.role,
		password: '',
		confirmPassword: '',
	});
	const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});
	const [showPassword, setShowPassword] = useState(false);
	const [showConfirm, setShowConfirm] = useState(false);
	const [isSaving, setIsSaving] = useState(false);

	const validators: Record<string, (v: string) => string> = {
		name: (v) => (v.trim() ? '' : 'Nombre requerido'),
		phone: (v) =>
			/^[0-9]{7,}$/.test(v)
				? ''
				: 'Teléfono inválido (solo números, mínimo 7 dígitos).',
		address: (v) => (/^.{5,}$/.test(v) ? '' : 'Dirección demasiado corta.'),
		password: (v) =>
			/^.{6,}$/.test(v) ? '' : 'Contraseña mínimo 6 caracteres.',
		confirmPassword: (v) =>
			v === form.password ? '' : 'Las contraseñas no coinciden.',
	};

	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const { name, value } = e.target;
		setForm((prev) => ({ ...prev, [name]: value }));
		if (validators[name]) {
			setFieldErrors((prev) => ({
				...prev,
				[name]: validators[name](value),
			}));
		}
	};

	const handleSave = () => {
		const errors: Partial<Record<keyof IUserFormValues, string>> = {};
		(['name', 'phone', 'address'] as (keyof IUserFormValues)[]).forEach((k) => {
			const msg = validators[k]?.((form[k] || '') as string);
			if (msg) errors[k] = msg;
		});

		if (form.password || form.confirmPassword) {
			(['password', 'confirmPassword'] as (keyof IUserFormValues)[]).forEach(
				(k) => {
					const msg = validators[k]?.((form[k] || '') as string);
					if (msg) errors[k] = msg;
				}
			);
		}
		if (Object.keys(errors).length) {
			setFieldErrors(errors);
			return;
		}

		toast.custom((t) => (
			<div
				className={`bg-white p-4 rounded-xl shadow-lg ${
					t.visible ? 'animate-enter' : 'animate-leave'
				}`}
			>
				<h3 className='font-semibold mb-2'>¿Confirmás los cambios?</h3>
				<div className='flex justify-end gap-2'>
					<button
						onClick={() => {
							toast.dismiss(t.id);
							doSave();
						}}
						className='px-4 py-2 bg-red-600 text-white rounded'
					>
						Sí, guardar
					</button>
					<button
						onClick={() => toast.dismiss(t.id)}
						className='px-4 py-2 bg-gray-200 rounded'
					>
						Cancelar
					</button>
				</div>
			</div>
		));
	};

	const doSave = async () => {
		setIsSaving(true);
		try {
			const payload: Partial<IUserFormValues> = {
				name: form.name,
				phone: form.phone,
				address: form.address,
			};
			if (form.password) payload.password = form.password;

			const res = await fetch(`${API_BASE_URL}/users/${user.id}`, {
				method: 'PUT',
				credentials: 'include',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify(payload),
			});
			if (!res.ok) throw new Error('Error al guardar');
			
			const updated = await res.json();
			setUserData?.({
				...userData!,
				user: { ...userData!.user, ...updated },
			});

			setIsEditing(false);

			setForm((prev) => ({ ...prev, password: '', confirmPassword: '' }));

			toast.success('Datos actualizados');
		} catch (err) {
			console.error(err);
			toast.error('Error guardando');
		} finally {
			setIsSaving(false);
		}
	};

	return (
		<div className='fixed inset-0 z-[999] flex items-center justify-center backdrop-blur-sm bg-black/30'>
			<div className='bg-white rounded-2xl shadow-xl p-6 w-full max-w-lg space-y-4'>
				<div className='flex items-center justify-between'>
					<button onClick={() => setIsEditing(!isEditing)}>
						<Pencil />
					</button>
					<h2 className='text-2xl font-semibold'>Mis datos personales</h2>
					<button onClick={onClose}>
						<X />
					</button>
				</div>
				<div className='space-y-3'>
					<div>
						<label>Nombre</label>
						{isEditing ? (
							<>
								<input
									name='name'
									value={form.name}
									onChange={handleChange}
									className='mt-1 block w-full border rounded p-2 focus:outline-none'
								/>
								{fieldErrors.name && (
									<p className='text-red-600'>{fieldErrors.name}</p>
								)}
							</>
						) : (
							<p>{user.name}</p>
						)}
					</div>
					<div>
						<label>Correo electrónico</label>
						<input
							value={user.email}
							disabled
							className='mt-1 block w-full border rounded p-2 bg-gray-100'
						/>
					</div>
					<div>
						<label>Teléfono</label>
						{isEditing ? (
							<>
								<input
									name='phone'
									value={form.phone}
									onChange={handleChange}
									className='mt-1 block w-full border rounded p-2 focus:outline-none'
								/>
								{fieldErrors.phone && (
									<p className='text-red-600'>{fieldErrors.phone}</p>
								)}
							</>
						) : (
							<p>{user.phone || 'No especificado'}</p>
						)}
					</div>
					<div>
						<label>Domicilio</label>
						{isEditing ? (
							<>
								<input
									name='address'
									value={form.address}
									onChange={handleChange}
									className='mt-1 block w-full border rounded p-2 focus:outline-none'
								/>
								{fieldErrors.address && (
									<p className='text-red-600'>{fieldErrors.address}</p>
								)}
							</>
						) : (
							<p>{user.address || 'No especificado'}</p>
						)}
					</div>
					{isEditing && (
						<>
							<div className='relative'>
								<label>Nueva contraseña</label>
								<input
									type={showPassword ? 'text' : 'password'}
									name='password'
									value={form.password || ''}
									onChange={handleChange}
									className='mt-1 block w-full border rounded p-2 pr-10 h-10 focus:outline-none'
								/>
								<button
									type='button'
									className='absolute inset-y-0 right-2 top-1/2 flex items-center'
									onClick={() => setShowPassword((p) => !p)}
								>
									{showPassword ? (
										<EyeOff className='w-5 h-5' />
									) : (
										<Eye className='w-5 h-5' />
									)}
								</button>
							</div>

							<div className='relative'>
								<label>Confirmar contraseña</label>
								<input
									type={showConfirm ? 'text' : 'password'}
									name='confirmPassword'
									value={form.confirmPassword || ''}
									onChange={handleChange}
									className='mt-1 block w-full border rounded p-2 pr-10 h-10 focus:outline-none'
								/>
								<button
									type='button'
									className='absolute inset-y-0 right-2 top-1/2 flex items-center'
									onClick={() => setShowConfirm((p) => !p)}
								>
									{showConfirm ? (
										<EyeOff className='w-5 h-5' />
									) : (
										<Eye className='w-5 h-5' />
									)}
								</button>
								{fieldErrors.confirmPassword && (
									<p className='text-red-600'>{fieldErrors.confirmPassword}</p>
								)}
							</div>
						</>
					)}
				</div>
				{isEditing && (
					<div className='text-right'>
						<button
							onClick={handleSave}
							disabled={isSaving}
							className='bg-red-600 text-white py-2 px-4 rounded disabled:opacity-50'
						>
							{isSaving ? 'Guardando...' : 'Guardar cambios'}
						</button>
					</div>
				)}
			</div>
		</div>
	);
}
