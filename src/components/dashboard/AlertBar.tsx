import { IAlertBarProps } from '@/interfaces/dashboard.interface';

export default function AlertBar({
	icon,
	message,
	actionLabel,
	onAction,
}: IAlertBarProps) {
	return (
		<div className='flex items-center bg-white rounded-full px-6 py-3 space-x-4 shadow-inner drop-shadow-lg'>
			<div className='text-xl'>{icon}</div>
			<span className='flex-1 font-medium'>{message}</span>
			{actionLabel && onAction && (
				<button
					onClick={onAction}
					className='font-semibold cursor-pointer underline hover:text-red-600'
				>
					{actionLabel}
				</button>
			)}
		</div>
	);
}
