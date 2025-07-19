
import { API_BASE_URL } from '@/config/api';
import { CloudinaryMedia } from '@/interfaces/cloudinary.interface';

/**
 * Obtiene todos los trainings.
 * Ahora enviamos la cookie HttpOnly con el JWT para autenticación.
 */
export async function fetchTrainingMedia(): Promise<CloudinaryMedia[]> {
  const res = await fetch(`${API_BASE_URL}/cloudinary/trainings`, {
    cache:       'no-store',
    // ADDED: para que el navegador envíe la cookie jwtToken HTTP-Only
    credentials: 'include',
  });
  if (!res.ok) return [];
  return res.json();
}

/**
 * Obtiene un único media por publicId.
 * Ahora enviamos la cookie HttpOnly con el JWT para autenticación.
 */
export async function fetchSingleMedia(
  publicId: string
): Promise<CloudinaryMedia | null> {
const res = await fetch(
  `${API_BASE_URL}/cloudinary/trainings/${encodeURIComponent(publicId)}`,
  {
    cache: 'no-store',
    credentials: 'include',
  }
);
  if (!res.ok) return null;
  return res.json();
}

/**
 * No changes needed here, el filtrado es puramente local.
 */
export function filterMediaByType(
  media: CloudinaryMedia[],
  type: 'video' | 'image' | 'pdf'
): CloudinaryMedia[] {
  switch (type) {
    case 'video':
      return media.filter((item) => item.resource_type === 'video');
    case 'image':
      return media.filter(
        (item) =>
          item.resource_type === 'image' && item.format.toLowerCase() !== 'pdf'
      );
    case 'pdf':
      return media.filter((item) => item.format.toLowerCase() === 'pdf');
    default:
      return [];
  }
}


/* import { API_BASE_URL } from '@/config/api';
import { CloudinaryMedia } from '@/interfaces/cloudinary.interface';



export async function fetchTrainingMedia(): Promise<CloudinaryMedia[]> {
	const res = await fetch(`${API_BASE_URL}/cloudinary/trainings`, {
		cache: 'no-store',
	});
	if (!res.ok) return [];
	return res.json();
}

export async function fetchSingleMedia(
	publicId: string
): Promise<CloudinaryMedia | null> {
	const res = await fetch(
		`${API_BASE_URL}/cloudinary/trainings/${encodeURIComponent(publicId)}`,
		{ cache: 'no-store' }
	);
	if (!res.ok) return null;
	return res.json();
}

export function filterMediaByType(
	media: CloudinaryMedia[],
	type: 'video' | 'image' | 'pdf'
): CloudinaryMedia[] {
	switch (type) {
		case 'video':
			return media.filter((item) => item.resource_type === 'video');
		case 'image':
			return media.filter(
				(item) =>
					item.resource_type === 'image' && item.format.toLowerCase() !== 'pdf'
			);
		case 'pdf':
			return media.filter((item) => item.format.toLowerCase() === 'pdf');
		default:
			return [];
	}
}
 */