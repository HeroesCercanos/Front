import { fetchTrainingMedia, filterMediaByType } from '@/lib/cloudinaryClient';
import MediaGrid from '@/components/trainings/MediaGrid';

export default async function PdfsPage() {
	const media = await fetchTrainingMedia();
	const pdfs = filterMediaByType(media, 'pdf');

	return (
		<>
			<h1 className='text-2xl font-bold mb-4'>PDFs</h1>
			<MediaGrid media={pdfs} />
		</>
	);
}
