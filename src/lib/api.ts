import { API_BASE_URL } from '@/config/api';

export interface CloudinaryMedia {
	public_id: string;
	secure_url: string;
	resource_type: 'image' | 'video' | 'raw';
	format: string;
	duration?: number;
	caption?: string;
}

export async function fetchTrainings(): Promise<CloudinaryMedia[]> {
	const res = await fetch(`${API_BASE_URL}/cloudinary/trainings`, {
		cache: 'no-store',
		credentials: 'include',
	});
	if (!res.ok) throw new Error('Failed to load trainings');
	return res.json();
}

export async function uploadMedia(
	formData: FormData
): Promise<CloudinaryMedia> {
	const token = localStorage.getItem('jwtToken');
	console.log('TOKEN', token);

	const res = await fetch(`${API_BASE_URL}/cloudinary/upload`, {
		method: 'POST',
		body: formData,
		credentials: 'include',
	});
	if (!res.ok) throw new Error('Upload failed');
	return res.json();
}
