import { API_BASE_URL } from '@/config/api';

export interface CloudinaryMedia {
  public_id:     string;
  secure_url:    string;
  resource_type: 'image' | 'video' | 'raw';
  format:        string;
  duration?:     number;
  caption?:      string;
}

export async function fetchTrainings(): Promise<CloudinaryMedia[]> {
  const res = await fetch(`${API_BASE_URL}/cloudinary/trainings`, {
    cache: 'no-store',
    // ADDED: enviar la cookie HttpOnly con el JWT al servidor
    credentials: 'include',
  });
  if (!res.ok) throw new Error('Failed to load trainings');
  return res.json();
}

export async function uploadMedia(
  formData: FormData
): Promise<CloudinaryMedia> {
  // REMOVED: lectura de token de localStorage
  // const token = localStorage.getItem('jwtToken');

  const res = await fetch(`${API_BASE_URL}/cloudinary/upload`, {
    method: 'POST',
    // ADDED: enviar la cookie HttpOnly con el JWT al servidor
    credentials: 'include',
    body: formData,
    // REMOVED: header Authorization con el token
    // headers: { Authorization: Bearer ${token} },
  });
  if (!res.ok) throw new Error('Upload failed');
  return res.json();
}

/* import { API_BASE_URL } from '@/config/api';

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
	});
	if (!res.ok) throw new Error('Failed to load trainings');
	return res.json();
}

export async function uploadMedia(
	formData: FormData
): Promise<CloudinaryMedia> {
	const token = localStorage.getItem('jwtToken');

	const res = await fetch(`${API_BASE_URL}/cloudinary/upload`, {
		method: 'POST',
		body: formData,
		headers: { Authorization: `Bearer ${token}` },
	});
	if (!res.ok) throw new Error('Upload failed');
	return res.json();
}
 */