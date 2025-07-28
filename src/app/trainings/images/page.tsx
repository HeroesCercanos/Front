import { fetchTrainingMedia, filterMediaByType } from '@/lib/cloudinaryClient';
import MediaGrid from '@/components/trainings/MediaGrid';

export default async function ImagesPage() {
	const media = await fetchTrainingMedia();
	const images = filterMediaByType(media, 'image');

	return (
		<>
			<h1 className='text-2xl font-bold mb-4 pt-7 sm:pt-7'>Imágenes</h1>
			<MediaGrid media={images} />
		</>
	);
}
