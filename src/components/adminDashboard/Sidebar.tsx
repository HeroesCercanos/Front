'use client';

import { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import {
	LayoutDashboard,
	Flag,
	FileText,
	PlayCircle,
	ArrowBigLeft,
	UserRoundSearch,
	Menu,
	X,
	Users,
	BarChart3,
	MailPlus,
} from 'lucide-react';

const Sidebar = () => {
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
				className='md:hidden p-2 bg-white rounded-full shadow absolute top-1 left-3 z-30'
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
				<nav className='px-6 py-8 space-y-6 flex flex-col mb-4 pt-13 sm:pt-10 lg:pt-1 md:pt-1'>
					<Link
						href='/admin'
						className='flex items-center gap-2 hover:text-red-400'
					>
						<LayoutDashboard size={18} />
						<p className='text-sm'>Inicio</p>
					</Link>
					<Link
						href='/admin/metrics'
						className='flex items-center gap-2 hover:text-red-400'
					>
						<BarChart3 size={18} />
						<p className='text-sm'>Métricas</p>
					</Link>
					<Link
						href='/admin/campaigns'
						className='flex items-center gap-2 hover:text-red-400'
					>
						<Flag size={18} />
						<p className='text-sm'>Campañas</p>
					</Link>
					<Link
						href='/admin/reports'
						className='flex items-center gap-2 hover:text-red-400'
					>
						<FileText size={18} />
						<p className='text-sm'>Reportes</p>
					</Link>
					<Link
						href='/admin/training'
						className='flex items-center gap-2 hover:text-red-400'
					>
						<PlayCircle size={18} />
						<p className='text-sm'>Capacitaciones</p>
					</Link>
					<Link
						href='/admin/users'
						className='flex items-center gap-2 hover:text-red-400'
					>
						<Users size={18} />
						<p className='text-sm'>Gestión de usuarios</p>
					</Link>
					<Link
						href='/admin/email-campaigns'
						className='flex items-center gap-2 hover:text-red-400'
					>
						<MailPlus size={18} />
						<p className='text-sm'>Campañas por correo</p>
					</Link>

					<Link
						href='/dashboard'
						className='flex items-center gap-2 hover:text-red-400'
					>
						<UserRoundSearch size={18} />
						<p className='text-sm'>Vista del usuario</p>
					</Link>
					<Link href='/' className='flex items-center gap-2 hover:text-red-400'>
						<ArrowBigLeft size={18} />
						<p className='text-sm'>Volver</p>
					</Link>
				</nav>
			</aside>
		</div>
	);
};

export default Sidebar;
