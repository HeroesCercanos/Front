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
			<img ref={imgRef} src={src} alt={alt} className='w-full h-full object-contain' />
			<div className='absolute bottom-4 right-2 flex flex-col space-y-2 rounded-4xl p-0.5'>
				<button
					onClick={handleFullScreen}
					className='rounded-4xl hover:bg-white/40 transition'
					title='Fullscreen'
				>
					<Maximize2 size={22} className='text-white bg-gray-400/80 rounded-4xl p-1' />
				</button>
			</div>
		</div>
	);
}
