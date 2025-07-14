import { CloudinaryMedia } from '@/interfaces/cloudinary.interface';
import MediaCard from './MediaCard';

export default function MediaGrid({ media }: { media: CloudinaryMedia[] }) {
	if (media.length === 0) return <p>No hay contenido disponible.</p>;

	return (
		<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 ">
			{media.map((item) => (
				<MediaCard key={item.public_id} item={item} />
			))}
		</div>
	);
}
