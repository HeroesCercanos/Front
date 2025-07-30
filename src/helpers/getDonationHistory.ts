import { API_BASE_URL } from '@/config/api';

export const getDonationHistory = async () => {
  const res = await fetch(`${API_BASE_URL}/donations/admin/history`, {
    credentials: 'include',
  });

  if (!res.ok) {
    throw new Error('Error al obtener el historial de donaciones');
  }

  return await res.json(); 
};
