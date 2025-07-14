import { fetchTrainingMedia } from '@/lib/cloudinaryClient';
import MediaGrid from '@/components/trainings/MediaGrid';

export default async function TrainingsPage() {
	const media = await fetchTrainingMedia();

	return (
		<main className="max-w-5xl mx-auto px-6 py-12">
			<h1 className="text-3xl font-bold mb-8">Categorias</h1>
			<MediaGrid media={media} />
		</main>
	);
}
