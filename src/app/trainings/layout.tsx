'use client';

import Link from 'next/link';
import { TvMinimalPlay, Image as ImageIcon, FileText } from 'lucide-react';

export default function TrainingsLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<div className='flex min-h-screen'>
			<aside className='w-64 bg-black text-white h-screen flex flex-col justify-between'>
				<nav className='px-6 py-8 space-y-6'>
					<h2 className='text-xl font-semibold mb-4'>Contenido Educativo</h2>
					<ul className='space-y-4'>
						<li>
							<Link
								href='/trainings/videos'
								className='flex items-center gap-3 text-white hover:text-red-400 transition'
							>
								<TvMinimalPlay size={18} />
								Videos
							</Link>
						</li>
						<li>
							<Link
								href='/trainings/images'
								className='flex items-center gap-3 text-white hover:text-red-400 transition'
							>
								<ImageIcon size={18} />
								Imágenes
							</Link>
						</li>
						<li>
							<Link
								href='/trainings/pdfs'
								className='flex items-center gap-3 text-white hover:text-red-400 transition'
							>
								<FileText size={18} />
								PDFs
							</Link>
						</li>
					</ul>
				</nav>
			</aside>

			<main className='flex-1 p-6 bg-gray-50'>{children}</main>
		</div>
	);
}
