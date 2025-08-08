import { useEffect, useState } from 'react';
import { API_BASE_URL } from '@/config/api';

interface RawCampaign {
	id: number;
	subject: string;
	recipients: string;
	scheduledAt?: string;
	variables: string;
}

interface CampaignData {
	id: number;
	subject: string;
	recipients: string;
	scheduledAt?: string;
	variables: {
		titulo: string;
		parrafo1: string;
		parrafo2: string;
		cierre: string;
	};
}

export function useEmailCampaign(id?: string | string[]) {
	const [initialData, setInitialData] = useState<CampaignData | null>(null);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		if (!id) {
			setLoading(false);
			return;
		}

		async function fetchCampaign() {
			try {
				const res = await fetch(`${API_BASE_URL}/api/campaigns`, {
					credentials: 'include',
				});
				const data: RawCampaign[] = await res.json();
				const campaign = data.find((c) => c.id === Number(id));

				if (campaign) {
					setInitialData({
						id: campaign.id,
						subject: campaign.subject,
						recipients: campaign.recipients,
						scheduledAt: campaign.scheduledAt,
						variables: JSON.parse(campaign.variables),
					});
				}
			} catch {
			} finally {
				setLoading(false);
			}
		}

		fetchCampaign();
	}, [id]);

	return { initialData, loading };
}
