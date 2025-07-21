// import { useState, useEffect } from 'react';
// import { getMockDashboardData } from './mockData';
// import { IDashboardData } from '@/interfaces/dashboard.interface';

// export function useDashboardData(): {
// 	data: IDashboardData | null;
// 	isLoading: boolean;
// } {
// 	const [data, setData] = useState<IDashboardData | null>(null);
// 	const [isLoading, setLoading] = useState(true);

// 	useEffect(() => {
// 		const mock = getMockDashboardData();
// 		setData({
// 			campaignsActive: mock.campaignsActive,
// 			nearestStationUrl: mock.stationUrl,
// 			videos: mock.videos,
// 		});
// 		setLoading(false);
// 	}, []);

// 	return { data, isLoading };
// }
