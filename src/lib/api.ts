import { API_BASE_URL } from '@/config/api';
import { CloudinaryMedia } from '@/interfaces/cloudinary.interface';

async function handleApiError(res: Response): Promise<never> {
	const errorData = await res.json().catch(() => ({}));
	throw new Error(errorData?.message || 'Request failed');
}

export async function fetchTrainings(): Promise<CloudinaryMedia[]> {
	const res = await fetch(`${API_BASE_URL}/cloudinary/trainings`, {
		cache: 'no-store',
		credentials: 'include',
	});
	if (!res.ok) return handleApiError(res);
	const data: CloudinaryMedia[] = await res.json();
	return data;
}

export async function uploadMedia(
	formData: FormData
): Promise<CloudinaryMedia> {
	const res = await fetch(`${API_BASE_URL}/cloudinary/upload`, {
		method: 'POST',
		credentials: 'include',
		body: formData,
	});
	if (!res.ok) return handleApiError(res);
	return res.json();
}

export async function deleteMedia(publicId: string): Promise<void> {
	const res = await fetch(
		`${API_BASE_URL}/cloudinary/trainings/${encodeURIComponent(publicId)}`,
		{ method: 'DELETE', credentials: 'include' }
	);
	if (!res.ok) {
		throw new Error('Error eliminando media');
	}
}

export async function patchMedia(
	publicId: string,
	updates: { title?: string; caption?: string }
): Promise<CloudinaryMedia> {
	const res = await fetch(
		`${API_BASE_URL}/cloudinary/trainings/${encodeURIComponent(publicId)}`,
		{
			method: 'PATCH',
			credentials: 'include',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify(updates),
		}
	);
	if (!res.ok) {
		throw new Error('Error actualizando media');
	}
	return res.json();
}
