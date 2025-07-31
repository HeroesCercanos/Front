'use client';

import { useAuth } from '@/context/AuthContext';
import { CircleX } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { toast } from 'react-hot-toast';
import React from 'react';
import { API_BASE_URL } from '@/config/api';
import useSpeech from '@/helpers/useSpeech'; 

const LogOutButton = () => {
    const router = useRouter();
    const { setUserData } = useAuth();

    const confirmText = '¿Estás seguro? Vas a cerrar tu sesión actual.';
    const logoutSuccessText = 'Has cerrado la sesión. Redirigiendo a la página de inicio.';
    const logoutCancelText = 'Acción cancelada. Continuas con la sesión iniciada.';
    const logOutButtonText = 'Cerrar sesión';

    const { speak: speakConfirmToast } = useSpeech(confirmText);
    const { speak: speakLogoutSuccess } = useSpeech(logoutSuccessText);
    const { speak: speakLogoutCancel } = useSpeech(logoutCancelText);
    const { speak: speakButton } = useSpeech(logOutButtonText);

    const handleLogout = async () => {
        try {
            await fetch(`${API_BASE_URL}/auth/logout`, {
                method: 'POST',
                credentials: 'include',
            });
        } catch (err) {
            console.warn('Logout server error', err);
        }

        setUserData(null);
        speakLogoutSuccess();
        router.replace('/login');
        window.location.href = '/login';
    };

    const showConfirmLogout = () => {
        toast.custom((t) => (
            <div
                className={`bg-white rounded-xl shadow-lg p-6 border border-gray-200 w-[90%] max-w-md ${
                    t.visible ? 'animate-enter' : 'animate-leave'
                }`}
            >
                <h2 className='text-lg font-semibold text-gray-800 mb-2'>
                    ¿Estás seguro?
                </h2>
                <p className='text-gray-600 mb-4'>Vas a cerrar tu sesión actual.</p>
                <div className='flex justify-center gap-4'>
                    <button
                        onClick={() => {
                            toast.dismiss(t.id);
                            handleLogout();
                        }}
                        className='px-4 py-2 rounded-md bg-red-600 text-white font-semibold hover:bg-red-700 transition cursor-pointer'
                    >
                        Sí, cerrar sesión
                    </button>
                    <button
                        onClick={() => {
                            toast.dismiss(t.id);
                            speakLogoutCancel(); 
                        }}
                        className='px-4 py-2 rounded-md bg-gray-300 text-gray-800 font-medium hover:bg-gray-400 transition cursor-pointer'
                    >
                        Cancelar
                    </button>
                </div>
            </div>
        ));
        speakConfirmToast();
    };

    return (
        <button
            onClick={showConfirmLogout}
            className='cursor-pointer flex items-center gap-2 mr-12 text-white hover:text-red-400 transition relative'
        >
            <CircleX size={18} />
            <h2 className='text-sm'>Cerrar sesión</h2>
            
        </button>
    );
};

export default LogOutButton;