'use client';

import { useRef } from 'react';
import { Maximize2 } from 'lucide-react';

interface Props {
	src: string;
	alt?: string;
}

interface SafariImageElement extends HTMLImageElement {
	webkitRequestFullScreen?: () => void;
}

export default function ImageWithControls({ src, alt }: Props) {
	const imgRef = useRef<SafariImageElement>(null);

	const handleFullScreen = () => {
		const el = imgRef.current;
		if (!el) return;
		if (el.requestFullscreen) {
			el.requestFullscreen();
		} else if (el.webkitRequestFullScreen) {
			el.webkitRequestFullScreen();
		}
	};

	return (
		<div className='relative w-full h-full'>
			<img ref={imgRef} src={src} alt={alt} className='w-full h-full' />
			<div className='absolute bottom-4 right-4 flex flex-col space-y-2'>
				<button
					onClick={handleFullScreen}
					className='p-2 rounded-full hover:bg-gray-500 transition'
					title='Fullscreen'
				>
					<Maximize2 size={20} className='text-gray-200' />
				</button>
				<a
					href={src}
					download
					className='p-2 rounded-full hover:bg-gray-500 transition'
					title='Descargar imagen'
				></a>
			</div>
		</div>
	);
}
