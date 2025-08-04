'use client';

import { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import {
	TvMinimalPlay,
	Image as ImageIcon,
	Menu,
	X,
} from 'lucide-react';

export default function TrainingSidebar() {
	const [isOpen, setIsOpen] = useState(false);
	const sidebarRef = useRef<HTMLDivElement>(null);

	const toggleSidebar = () => setIsOpen((prev) => !prev);

	useEffect(() => {
		const handleClickOutside = (event: MouseEvent) => {
			if (
				sidebarRef.current &&
				!sidebarRef.current.contains(event.target as Node)
			) {
				setIsOpen(false);
			}
		};
		document.addEventListener('mousedown', handleClickOutside);
		return () => document.removeEventListener('mousedown', handleClickOutside);
	}, []);

	return (
		<div className='relative'>
			<button
				onClick={toggleSidebar}
				className='md:hidden p-2 bg-white rounded-full shadow absolute top-4 left-4 z-30'
				aria-label='Abrir menú'
			>
				{isOpen ? <X size={24} /> : <Menu size={24} />}
			</button>

			<aside
				ref={sidebarRef}
				className={`absolute md:relative top-0 left-0 min-h-screen w-64 bg-black text-white transform transition-transform duration-300 ease-in-out z-20
					${isOpen ? 'translate-x-0' : '-translate-x-full'}
					md:translate-x-0 md:flex`}
			>
				<nav className='px-6 py-8 space-y-6 flex flex-col'>
					<h2 className='text-xl font-semibold mb-4 pt-7 sm:pt-7 lg:pt-1 md:pt-1'>
						Contenido Educativo
					</h2>
					<Link
						href='/trainings/videos'
						className='flex items-center gap-3 hover:text-red-400'
					>
						<TvMinimalPlay size={18} /> Videos
					</Link>
					<Link
						href='/trainings/images'
						className='flex items-center gap-3 hover:text-red-400'
					>
						<ImageIcon size={18} /> Imágenes
					</Link>
				</nav>
			</aside>
		</div>
	);
}
