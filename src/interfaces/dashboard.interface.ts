import { ICampaign } from '@/interfaces/campaign.interface'

export interface ICardProps {
	icon: React.ReactNode;
	title: string;
	description: string;
	buttonLabel: string;
	onClick: () => void;
	customButton?: React.ReactNode;
}

export interface IAlertBarProps {
	icon: React.ReactNode;
	message: string;
	actionLabel?: string;
	onAction?: () => void;
	variant?: 'info' | 'warning' | 'error';
}

export interface IVideo {
	id: string;
	title: string;
	url: string;
}

export interface IDashboardData {
	campaignsActive: ICampaign[];
	nearestStationUrl: string;
	videos: IVideo[];
}
