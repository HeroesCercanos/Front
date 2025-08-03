'use client';

type Props = {
	isOpen: boolean;
	onClose: () => void;
	subject: string;
	html: string;
};

export default function EmailPreviewModal({
	isOpen,
	onClose,
	subject,
	html,
}: Props) {
	if (!isOpen) return null;

	return (
		<div className='fixed inset-0 bg-black/30 backdrop-blur-sm z-50 flex items-center justify-center'>
			<div className='bg-white p-6 rounded-lg max-w-3xl w-full relative shadow-lg'>
				<button
					className='absolute top-2 right-3 text-gray-600 hover:text-red-600 text-xl'
					onClick={onClose}
				>
					&times;
				</button>
				<h3 className='text-xl font-bold mb-4'>
					{subject || 'Previsualización'}
				</h3>
				<div
					className='prose max-w-full overflow-y-auto max-h-[60vh]'
					dangerouslySetInnerHTML={{ __html: html }}
				/>
			</div>
		</div>
	);
}
