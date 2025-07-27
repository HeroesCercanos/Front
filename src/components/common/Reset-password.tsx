'use client';

import { useState, useEffect } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { toast } from 'react-hot-toast';
import { API_BASE_URL } from '@/config/api';

export default function ResetPasswordPage() {
    const searchParams = useSearchParams();
    const router = useRouter();
    const token = searchParams.get('token');

    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (!token) {
            toast.error('Token inválido o ausente');
        }
    }, [token]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!token) {
            toast.error('Token faltante');
            return;
        }

        if (newPassword !== confirmPassword) {
            toast.error('Las contraseñas no coinciden');
            return;
        }

        setLoading(true);

        try {
            const res = await fetch(`${API_BASE_URL}/auth/reset-password`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ token, newPassword }),
            });

            if (!res.ok) {
                const data = await res.json();
                throw new Error(data.message || 'Error al restablecer la contraseña');
            }

            toast.success('✅ Contraseña actualizada correctamente');
            router.push('/login'); // o la ruta que uses para iniciar sesión
        } catch (err: any) {
            toast.error(err.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="max-w-md mx-auto mt-20 p-6 border rounded-xl shadow bg-white">
            <h1 className="text-2xl font-bold mb-4">Restablecer contraseña</h1>

            <form onSubmit={handleSubmit} className="space-y-4">
                <input
                    type="password"
                    placeholder="Nueva contraseña"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    required
                    className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
                />

                <input
                    type="password"
                    placeholder="Confirmar contraseña"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    required
                    className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
                />

                <button
                    type="submit"
                    disabled={loading}
                    className="w-full py-2 bg-red-600 text-white rounded hover:bg-red-700"
                >
                    {loading ? 'Procesando...' : 'Guardar nueva contraseña'}
                </button>
            </form>
        </div>
    );
}