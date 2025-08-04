import { fetchTrainingMedia, filterMediaByType } from '@/lib/cloudinaryClient';
import MediaGrid from '@/components/trainings/MediaGrid';
import AuthProtected from '@/components/authProtected/authProtected';

export default async function VideosPage() {
	const media = await fetchTrainingMedia();
	const videos = filterMediaByType(media, 'video');

	return (
		<AuthProtected>
		<div className=''>
			<h1 className='text-2xl font-bold mb-4 pt-7 sm:pt-7'>Videos</h1>
			<MediaGrid media={videos} />
		</div>
		</AuthProtected>
	);
}
