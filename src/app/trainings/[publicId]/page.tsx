import { fetchSingleMedia } from '@/lib/cloudinaryClient';
import MediaPreview from '@/components/trainings/MediaPreview';
import { notFound } from 'next/navigation';
import type { CloudinaryMedia } from '@/interfaces/cloudinary.interface';

interface PageProps {
	params: { publicId: string };
}

export default async function TrainingDetailPage({ params }: PageProps) {
	const decodedId = decodeURIComponent(params.publicId);
	const media: CloudinaryMedia | null = await fetchSingleMedia(decodedId);

	if (!media) return notFound();

	return <MediaPreview media={media} />;
}
