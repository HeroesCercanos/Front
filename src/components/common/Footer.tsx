import Link from 'next/link';
import { Instagram, Facebook } from 'lucide-react';

export default function Footer() {
	return (
		<footer className='bg-black text-white'>
			<div className='max-w-7xl mx-auto px-6 py-12 flex flex-col md:flex-row justify-between'>
				<div>
					<h1 className='text-2xl font-bold'>HÉROES CERCANOS</h1>
					<p className='uppercase mt-1 text-sm'>Doná. Ayudá. Salvá.</p>
				</div>

				<div>
					<h2 className='font-semibold mb-4'>Links adicionales</h2>
					<ul className='space-y-2'>
						<li>
							<Link href='/#campañas' className='hover:underline'>
								<p>Donaciones</p>
							</Link>
						</li>
						<li>
							<Link href='/#campañas' className='hover:underline'>
								<p>Campañas activas </p>
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
				</div>

				<div>
					<h2 className='font-semibold mb-4'>Contacto</h2>
					<address className='not-italic space-y-2 text-sm'>
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
				</div>
				<div className='flex flex-col items-end space-y-2'>
					<h2 className='font-semibold mb-4 text-right'>Síguenos</h2>
					<div className='flex space-x-4 '>
						<a
							href='https://www.instagram.com/bomberosmontecaseros/'
							target='_blank'
							rel='noopener noreferrer'
							aria-label='Instagram (se abre en nueva pestaña)'
						>
							<Instagram size={24} />
						</a>
						<a
							href='https://www.facebook.com/bomberos.voluntarios.18041/'
							target='_blank'
							rel='noopener noreferrer'
							aria-label='Facebook (se abre en nueva pestaña)'
						>
							<Facebook size={24} />
						</a>
					</div>
				</div>
			</div>

			<hr className='border-gray-700' />

			<div className='max-w-7xl mx-auto px-6 py-4 text-center text-sm space-y-1'>
				<p>
					Proyecto final creado por estudiantes de{' '}
					{<span className='font-semibold'>SoyHenry</span>}
				</p>
				<p>© 2025 Héroes Cercanos. Todos los derechos reservados.</p>
			</div>
		</footer>
	);
}
