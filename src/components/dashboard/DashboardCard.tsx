import { ICardProps } from '@/interfaces/dashboard.interface';

export default function DashboardCard({
	icon,
	title,
	description,
	buttonLabel,
	onClick,
	customButton,
}: ICardProps) {
	return (
		<div className='z-0 bg-white p-6 rounded-2xl shadow-inner shadow-gray-200 drop-shadow-lg flex flex-col items-center text-center space-y-4'>
			<div>{icon}</div>
			<h3 className='text-xl font-semibold'>{title}</h3>
			<p className='text-gray-600'>{description}</p>
			{customButton ? (
				customButton
			) : (
				<button
					onClick={onClick}
					className='mt-4 bg-red-600 hover:bg-red-700 text-white font-semibold py-2 px-4 rounded-lg'
				>
					{buttonLabel}
				</button>
			)}
		</div>
	);
}
