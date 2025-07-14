export interface CloudinaryMedia {
	public_id: string;
	secure_url: string;
	resource_type: 'image' | 'video' | 'raw';
	format: string;
	duration?: number;
    caption?: string;
}

export async function fetchTrainings(): Promise<CloudinaryMedia[]> {
	const res = await fetch('/cloudinary/trainings', { cache: 'no-store' });
	if (!res.ok) throw new Error('Failed to load trainings');
	return res.json();
}

export async function uploadMedia(
	formData: FormData
): Promise<CloudinaryMedia> {
	const res = await fetch('/cloudinary/upload', {
		method: 'POST',
		body: formData,
	});
	if (!res.ok) throw new Error('Upload failed');
	return res.json();
}
