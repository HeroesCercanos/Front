'use client';

import React from 'react';

type DownloadLinkProps = {
	url: string;
	filename?: string;
	children: React.ReactNode;
	className?: string;
};

export default function DownloadLink({
	url,
	filename,
	children,
	className,
}: DownloadLinkProps) {
	return (
		<a
			href={`${url}?fl_attachment=true`}
			download={filename}
			target='_blank'
			rel='noopener noreferrer'
			className={className}
		>
			{children}
		</a>
	);
}
