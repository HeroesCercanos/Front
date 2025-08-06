'use client';

import Link from 'next/link';
import { Instagram, Facebook } from 'lucide-react';
import { useState } from 'react';
import AboutUsModal from './AboutUsModal';
import ReportPolicyModal from './PoliticasDeUso';

export default function Footer() {
	const [isAboutOpen, setIsAboutOpen] = useState(false);
	const [isPolicyOpen, setIsPolicyOpen] = useState(false);

	return (
		<footer className='bg-black text-white' role='contentinfo'>
			<AboutUsModal
				isOpen={isAboutOpen}
				onClose={() => setIsAboutOpen(false)}
			/>
			<ReportPolicyModal
				isOpen={isPolicyOpen}
				onClose={() => setIsPolicyOpen(false)}
			/>

			<div className='max-w-7xl mx-auto px-6 py-12 flex flex-col md:flex-row justify-between'>
				<div>
					<h1 className='text-2xl font-bold'>HÉROES CERCANOS</h1>
					<p className='uppercase mt-1 text-sm'>Doná. Ayudá. Salvá.</p>
					<ul className='pt-4 lg:pt-3'>
						<li>
							<button
								type='button'
								onClick={() => setIsAboutOpen(true)}
								aria-label='Acerca de nosotros'
								className='text-sm hover:underline focus:outline-none'
							>
								Acerca de nosotros
							</button>
						</li>
						<li className='pt-0.5 lg:pt-1'>
							<button
								type='button'
								onClick={() => setIsPolicyOpen(true)}
								aria-label='Política de uso de reportes'
								className='text-sm hover:underline focus:outline-none'
							>
								Política de uso de reportes
							</button>
						</li>
					</ul>
				</div>

				<nav aria-label='Links adicionales'>
					<h2 className='font-semibold mb-4 pt-3 lg:pt-0'>Links adicionales</h2>
					<ul className='space-y-1 lg:space-y-2'>
						<li>
							<Link href='/#campañas' className='hover:underline'>
								<p>Donaciones</p>
							</Link>
						</li>
						<li>
							<Link href='/#campañas' className='hover:underline'>
								<p>Campañas activas</p>
							</Link>
						</li>
						<li>
							<Link href='/trainings/videos' className='hover:underline'>
								<p>Capacitaciones</p>
							</Link>
						</li>
						<li>
							<Link href='/faqs' className='hover:underline'>
								<p>Preguntas frecuentes</p>
							</Link>
						</li>
					</ul>
				</nav>

				<section aria-labelledby='contact-heading'>
					<h2 id='contact-heading' className='font-semibold mb-4 pt-4 lg:pt-0'>
						Contacto
					</h2>
					<address className='not-italic text-sm space-y-1 lg:space-y-2'>
						<p>Cuartel General</p>
						<p>
							Colón 643
							<br />
							Monte Caseros,
							<br />
							Corrientes, Argentina
						</p>
						<p>Teléfono: (03775) 422207</p>
					</address>
				</section>

				<nav
					aria-label='Redes sociales'
					className='flex flex-col items-start md:items-end space-y-2 mt-6 md:mt-0'
				>
					<h2 className='font-semibold mb-4 text-left md:text-right'>
						Síguenos
					</h2>
					<div className='flex space-x-4'>
						<a
							href='https://www.instagram.com/bomberosmontecaseros/'
							target='_blank'
							rel='noopener noreferrer'
							aria-label='Instagram (abre en nueva pestaña)'
						>
							<Instagram size={24} />
						</a>
						<a
							href='https://www.facebook.com/bomberos.voluntarios.18041/'
							target='_blank'
							rel='noopener noreferrer'
							aria-label='Facebook (abre en nueva pestaña)'
						>
							<Facebook size={24} />
						</a>
					</div>
				</nav>
			</div>

			<hr className='border-gray-700' />

			<div className='max-w-7xl mx-auto px-6 py-4 text-center text-sm space-y-1'>
				<p>
					Proyecto final creado por estudiantes de{' '}
					<span className='font-semibold'>SoyHenry</span>
				</p>
				<p>© 2025 Héroes Cercanos. Todos los derechos reservados.</p>
			</div>
		</footer>
	);
}
