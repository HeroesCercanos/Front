export interface CloudinaryMedia {
	public_id: string;
	secure_url: string;
	resource_type: 'image' | 'video' | 'raw';
	format: string;
	duration?: number;
	context?: {
		custom?: {
			title?: string;
			caption?: string;
		};
	};
}
