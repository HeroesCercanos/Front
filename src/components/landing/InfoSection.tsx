'use client';

import React, { useMemo } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { faqs } from '@/helpers/faqs';
import TTSButton from "@/components/common/TTSButton"; // Importamos el botón TTS
import { FaUniversalAccess } from 'react-icons/fa'; // Importamos el ícono

export default function InfoSection() {
    const router = useRouter();
    const handleClick = (id: string) => router.push(`/faqs#${id}`);

    // Usamos useMemo para consolidar el texto y evitar recálculos innecesarios
    const consolidatedText = useMemo(() => {
        const faqsText = faqs.map(faq => `Pregunta: ${faq.question}`).join(' ');
        
        return `
            Información Útil y Preguntas Frecuentes. 
            Aquí encontrarás respuestas claras a las dudas más comunes sobre
            cómo donar, ver necesidades y capacitarte. 
            Información útil. 
            Preguntas frecuentes recientes: ${faqsText}.
        `;
    }, []); // El array de dependencias está vacío porque 'faqs' no cambia en este componente.

    return (
        <section
            id='FAQ'
            role='region'
            aria-labelledby='info-heading'
            className='w-full px-4 md:px-16 py-12 bg-gray-100 relative' // Agregamos 'relative'
        >
            {/* Botón de TTS posicionado en la esquina superior derecha */}
            <div className="absolute top-4 right-4">
                <TTSButton 
                    text={consolidatedText} 
                    icon={<FaUniversalAccess size={24} />} 
                    ariaLabel="Leer información útil y preguntas frecuentes"
                />
            </div>
            
            <h2 id='info-heading' className='sr-only'>
                Información Útil y Preguntas Frecuentes
            </h2>

            <div className='max-w-7xl mx-auto px-4 md:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-2 gap-12 items-start'>
                <div className='w-full'>
                    <div className='w-full bg-white rounded-xl shadow-lg overflow-hidden'>
                        <div className='relative h-64 w-full'>
                            <Image
                                src='/infoSection.png'
                                fill
                                alt='Ilustración de Preguntas Frecuentes'
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
                    <h2 className='text-2xl font-bold mb-4 text-left md:text-right'>
                        INFORMACIÓN ÚTIL
                    </h2>
                    <nav
                        aria-label='Preguntas frecuentes recientes'
                        className='space-y-2'
                    >
                        {faqs.map((faq) => (
                            <button
                                key={faq.id}
                                onClick={() => handleClick(faq.id)}
                                className='w-full text-left md:text-right p-4 hover:bg-gray-50 transition'
                                aria-label={`Ir a la pregunta: ${faq.question}`}
                            >
                                <span className='text-lg font-medium text-gray-800'>
                                    {faq.question}
                                </span>
                            </button>
                        ))}
                    </nav>

                    <div className=' text-left md:text-right pt-2'>
                        <button
                            onClick={() => router.push('/faqs')}
                            className='mt-10 bg-red-600 hover:bg-red-700 text-white font-bold py-3 px-6 rounded-full transition duration-300 cursor-pointer'
                            aria-label='Ver todas las preguntas frecuentes'
                        >
                            VER MÁS
                        </button>
                    </div>
                </div>
            </div>
        </section>
    );
}