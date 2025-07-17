import { fetchSingleMedia } from '@/lib/cloudinaryClient';
import MediaPreview from '@/components/trainings/MediaPreview';
import { notFound } from 'next/navigation';

export default async function TrainingDetailPage({
	params,
}: {
	params: { publicId: string };
}) {
	const decodedId = decodeURIComponent(params.publicId);
	const media = await fetchSingleMedia(decodedId);
	if (!media) return notFound();
	return <MediaPreview media={media} />;
}
