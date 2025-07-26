'use client';

import { Metronome } from 'ldrs/react';
import 'ldrs/react/Metronome.css';

export default function Spinner() {
	return (
		<div className='w-full h-full flex flex-col items-center justify-center space-y-4'>
			<Metronome size='40' speed='1.9' color='red' />
			<span className='text-lg font-medium'>Cargando...</span>
		</div>
	);
}
