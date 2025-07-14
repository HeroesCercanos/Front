import { fetchTrainingMedia, filterMediaByType } from '@/lib/cloudinaryClient';
import MediaGrid from '@/components/trainings/MediaGrid';

export default async function VideosPage() {
	const media = await fetchTrainingMedia();
	const videos = filterMediaByType(media, 'video');

	return (
		<div className=''>
			<h1 className='text-2xl font-bold mb-4'>Videos</h1>
			<MediaGrid media={videos} />
		</div>
	);
}
