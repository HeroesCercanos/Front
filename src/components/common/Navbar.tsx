'use client';

import Link from 'next/link';
import { LogIn, ChevronDown, UserRound, ArrowBigLeft } from 'lucide-react';
import { useState, useRef, useEffect } from 'react';
import { useAuth } from '@/context/AuthContext';
import LogOutButton from './LogOutButton';
import { usePathname } from 'next/navigation';

const Navbar = () => {
	const [openMenu, setOpenMenu] = useState<string | null>(null);
	const { userData } = useAuth();
	const navbarRef = useRef<HTMLDivElement>(null);

	const toggleMenu = (menu: string) => {
		setOpenMenu(openMenu === menu ? null : menu);
	};

	const pathname = usePathname();

	useEffect(() => {
		const handleClickOutside = (event: MouseEvent) => {
			if (
				navbarRef.current &&
				!navbarRef.current.contains(event.target as Node)
			) {
				setOpenMenu(null);
			}
		};

		document.addEventListener('mousedown', handleClickOutside);
		return () => {
			document.removeEventListener('mousedown', handleClickOutside);
		};
	}, []);

	const getDropdownClasses = (menu: string) => {
		const isOpen = openMenu === menu;
		return `
      absolute top-full mt-2 bg-white text-black shadow-lg rounded p-2 space-y-1 z-50 origin-top
      transform transition-all duration-300 ease-in-out
      ${
				isOpen
					? 'scale-y-100 opacity-100'
					: 'scale-y-0 opacity-0 pointer-events-none'
			}
    `;
	};

	return (
		<nav
			className='sticky top-0 z-50 bg-black text-white py-2 px-4 shadow-md'
			role='navigation'
			aria-label='Menú principal'
		>
			<div
				ref={navbarRef}
				className='max-w-7xl mx-auto flex flex-wrap justify-between items-center gap-y-2'
			>
				{' '}
				<ul className='flex flex-wrap gap-4 text-xs md:text-sm items-center'>
					{(pathname === '/dashboard' ||
						pathname.startsWith('/trainings/') ||
						pathname === '/faqs') && (
						<li className='flex items-center text-xs md:text-sm'>
							<Link
								href='/'
								className='flex items-center gap-1 hover:text-red-400 transition cursor-pointer'
								aria-label='Volver a la página principal'
							>
								<ArrowBigLeft size={18} />
							</Link>
						</li>
					)}

					{/* Oculta los botones si estás en una ruta admin */}
					{!pathname.startsWith('/admin') && (
						<>
							<li className='relative'>
								<button
									onClick={() => toggleMenu('donaciones')}
									className='flex items-center gap-1 hover:text-red-400 transition cursor-pointer'
									aria-haspopup='true'
									aria-expanded={openMenu === 'donaciones'}
									aria-controls='menu-donaciones'
								>
									<h2> Campañas </h2> <ChevronDown className='w-4 h-4' />
								</button>
								<div
									id='menu-donaciones'
									role='menu'
									aria-label='Submenú Donaciones y campañas'
									className={getDropdownClasses('donaciones')}
								>
									<Link
										role='menuitem'
										href='/#campañas'
										scroll={true}
										className='block hover:text-red-400 transition cursor-pointer'
									>
										<p>Campañas activas </p>
									</Link>
								</div>
							</li>

							<li className='relative'>
								<button
									onClick={() => toggleMenu('cuartel')}
									className='flex items-center gap-1 hover:text-red-400 transition cursor-pointer'
									aria-haspopup='true'
									aria-expanded={openMenu === 'cuartel'}
									aria-controls='menu-cuartel'
								>
									<p>Cuartel</p> <ChevronDown className='w-4 h-4' />
								</button>
								<div
									id='menu-cuartel'
									role='menu'
									aria-label='Submenú Cuartel'
									className={getDropdownClasses('cuartel')}
								>
									<Link
										role='menuitem'
										href='/#cuartel'
										scroll={true}
										className='block hover:text-red-400 transition cursor-pointer'
									>
										<p>¿Dónde estamos?</p>
									</Link>
								</div>
							</li>

							<li className='relative'>
								<button
									onClick={() => toggleMenu('info')}
									className='flex items-center gap-1 hover:text-red-400 transition cursor-pointer'
									aria-haspopup='true'
									aria-expanded={openMenu === 'info'}
									aria-controls='menu-info'
								>
									<p>Información</p>
									<ChevronDown className='w-4 h-4' />
								</button>
								<div
									id='menu-info'
									role='menu'
									aria-label='Submenú Información'
									className={getDropdownClasses('info')}
								>
									<Link
										role='menuitem'
										href='/#FAQ'
										scroll={true}
										className='block hover:text-red-400 transition cursor-pointer'
									>
										<p>Preguntas frecuentes</p>
									</Link>
									<Link
										role='menuitem'
										href='/trainings'
										scroll={true}
										className='block hover:text-red-400 transition cursor-pointer'
									>
										<p>Capacitaciones</p>
									</Link>
								</div>
							</li>
						</>
					)}
				</ul>
				{userData ? (
					<div className='flex items-center gap-4 mr-2'>
						{userData && (
							<Link
								href={userData.user.role === 'admin' ? '/admin' : '/dashboard'}
								aria-label='Ir al panel'
								className='cursor-pointer flex items-center gap-2 text-white hover:text-red-400 transition relative'
							>
								<UserRound size={18} />
								<h2 className='text-sm'>
									{userData.user.role === 'admin' ? 'Panel' : 'Mi cuenta'}
								</h2>
							</Link>
						)}
						<LogOutButton />
					</div>
				) : (
					<Link
						href='/login'
						aria-label='Iniciar sesión'
						className='cursor-pointer flex items-center gap-2 text-white hover:text-red-400 transition relative'
					>
						<LogIn size={18} />
						<h2 className='text-sm'>Iniciar sesión</h2>
					</Link>
				)}
			</div>
		</nav>
	);
};

export default Navbar;
