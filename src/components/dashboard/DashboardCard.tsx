import { ICardProps } from '@/interfaces/dashboard.interface';
import DonateButton from '../common/DonateButton';

export default function DashboardCard({
	icon,
	title,
	description,
	buttonLabel,
	onClick,
}: ICardProps) {
	return (
		<div className='bg-gray-100 p-6 rounded-lg flex flex-col items-center text-center space-y-4 shadow-inner drop-shadow-lg'>
			<div className='text-4xl'>{icon}</div>
			<h3 className='text-2xl font-semibold'>{title}</h3>
			<p className='text-gray-700'>{description}</p>
			<DonateButton>
				<button
					onClick={onClick}
					className='mt-auto cursor-pointer bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded transition'
				>
					{buttonLabel}
				</button>
			</DonateButton>
		</div>
	);
}
