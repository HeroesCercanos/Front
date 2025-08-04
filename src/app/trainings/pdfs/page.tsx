import { fetchTrainingMedia, filterMediaByType } from '@/lib/cloudinaryClient';
import MediaGrid from '@/components/trainings/MediaGrid';
import AuthProtected from '@/components/authProtected/authProtected';

export default async function PdfsPage() {
	const media = await fetchTrainingMedia();
	const pdfs = filterMediaByType(media, 'pdf');

	return (
		<>
		<AuthProtected>
			<h1 className='text-2xl font-bold mb-4 pt-7 sm:pt-7'>PDFs</h1>
			<MediaGrid media={pdfs} />
			</AuthProtected>
		</>
	);
}
