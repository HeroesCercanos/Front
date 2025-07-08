'use client';

import React from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { FAQItem } from '@/helpers/faqs';

interface Props {
	items: FAQItem[];
}

export default function FAQContent({ items }: Props) {
	const router = useRouter();
	const handleClick = (id: string) => router.push(`/faqs#${id}`);

	return (
		<main className='max-w-7xl mx-auto px-8 py-12 space-y-20'>
			<h1 className='text-3xl font-bold text-center'>Preguntas Frecuentes</h1>

			{items.map((faq) => (
				<section
					key={faq.id}
					id={faq.id}
					className='flex flex-col lg:flex-row items-start gap-6'
				>
					<div className='w-full lg:w-1/3 flex justify-center'>
						<Image
							src={faq.image}
							alt={faq.question}
							width={300}
							height={300}
							className='rounded-lg object-cover shadow-md'
						/>
					</div>

					<div className='w-full lg:w-2/3 space-y-4'>
						<button
							onClick={() => handleClick(faq.id)}
							className='text-3xl lg:text-4xl font-semibold text-left hover:underline'
						>
							{faq.question}
						</button>
						<p className='text-lg leading-relaxed text-gray-700'>{faq.answer}</p>
					</div>
				</section>
			))}
		</main>
	);
}
