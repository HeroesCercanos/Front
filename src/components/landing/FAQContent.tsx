'use client';

import React from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { FAQItem } from '@/helpers/faqs';
import TTSButton from "@/components/common/TTSButton"; 
import { FaHeadphones } from 'react-icons/fa'; 

interface Props {
    items: FAQItem[];
}

export default function FAQContent({ items }: Props) {
    const router = useRouter();
    const handleClick = (id: string) => router.push(`/faqs#${id}`);

    return (
        <main className='max-w-7xl mx-auto px-8 py-12 space-y-20'>
            <h1 className='text-3xl font-bold text-center'>Preguntas Frecuentes</h1>

            {items.map((faq) => {
                const faqText = `${faq.question}. ${faq.answer}.`;
                
                return (
                    <section
                        key={faq.id}
                        id={faq.id}
                        className='flex flex-col lg:flex-row items-start gap-6 relative' 
                    >
                        <div className='absolute top-0 right-0 p-4 lg:p-0'>
                            <TTSButton 
                                text={faqText} 
                                icon={<FaHeadphones size={24} />} 
                                ariaLabel={`Leer pregunta y respuesta: ${faq.question}`}
                            />
                        </div>

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
                                className='text-3xl lg:text-2xl font-semibold text-left hover:underline cursor-pointer'
                            >
                                {faq.question}
                            </button>
                            <p className='text-m leading-relaxed text-gray-700'>{faq.answer}</p>
                        </div>
                    </section>
                );
            })}
        </main>
    );
}