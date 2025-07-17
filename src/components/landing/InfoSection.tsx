'use client';

import React from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { faqs } from '@/helpers/faqs';

export default function InfoSection() {
	const router = useRouter();
	const handleClick = (id: string) => router.push(`/faqs#${id}`);

	return (
		<section id='FAQ' className='w-full px-4 md:px-16 py-12 bg-gray-100'>
			<div className='max-w-7xl mx-auto px-4 md:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-2 gap-12 items-start'>
				<div className='w-full'>
					<div className='w-full bg-white rounded-xl shadow-lg overflow-hidden'>
						<div className='relative h-64 w-full'>
							<Image
								src='/infoSection.png'
								fill
								alt='Preguntas frecuentes'
								className='object-cover'
							/>
						</div>
						<div className='p-6'>
							<h3 className='text-2xl font-semibold mb-2 text-left'>
								Preguntas Frecuentes
							</h3>
							<p className='text-gray-600'>
								Aquí encontrarás respuestas claras a las dudas más comunes sobre
								cómo donar, ver necesidades y capacitarte.
							</p>
						</div>
					</div>
				</div>

				<div className='w-full space-y-4'>
					<h2 className='text-2xl font-bold mb-4 text-right'>
						INFORMACIÓN ÚTIL
					</h2>
					<div className='space-y-2'>
						{faqs.map((faq) => (
							<button
								key={faq.id}
								onClick={() => handleClick(faq.id)}
								className='w-full text-right p-4 cursor-pointer hover:bg-gray-50 transition'
							>
								<span className='text-lg font-medium text-gray-800'>
									{faq.question}
								</span>
							</button>
						))}

						<div className='text-right pt-2'>
							<button
								onClick={() => router.push('/faqs')}
					className='mt-10 bg-red-600 hover:bg-red-700 text-white font-bold py-3 px-6 rounded-full transition duration-300 cursor-pointer'
								aria-label='Ver todas las preguntas frecuentes'
							>
								<p>VER MÁS</p>
							</button>
						</div>
					</div>
				</div>
			</div>
		</section>
	);
}
