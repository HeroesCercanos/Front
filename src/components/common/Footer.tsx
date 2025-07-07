import Link from 'next/link';
import { Instagram, Facebook } from 'lucide-react';

export default function Footer() {
	return (
		<footer className='bg-black text-white'>
			<div className='max-w-7xl mx-auto px-6 py-12 grid grid-cols-1 md:grid-cols-4 gap-8'>
				<div>
					<h1 className='text-2xl font-bold'>HÉROES CERCANOS</h1>
					<p className='uppercase mt-1 text-sm'>Doná. Ayudá. Salvá.</p>
				</div>

				<div>
					<h2 className='font-semibold mb-4'>Links adicionales</h2>
					<ul className='space-y-2'>
						<li>
							<Link href='#' className='hover:underline'>
								Donaciones
							</Link>
						</li>
						<li>
							<Link href='#' className='hover:underline'>
								Campañas activas
							</Link>
						</li>
						<li>
							<Link href='#' className='hover:underline'>
								Capacitaciones
							</Link>
						</li>
						<li>
							<Link href='#' className='hover:underline'>
								Contacto / Preguntas frecuentes
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
				<div>
					<h2 className='font-semibold mb-4'>Síguenos</h2>
					<div className='flex space-x-4'>
						<a
							href='https://www.instagram.com/bomberosmontecaseros/'
							aria-label='Instagram'
						>
							<Instagram size={24} />
						</a>
						<a
							href='https://www.facebook.com/bomberos.voluntarios.18041/'
							aria-label='Facebook'
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
