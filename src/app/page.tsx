import Campaigns from '@/components/campaign/Campaigns';
import InfoSection from '@/components/landing/InfoSection';
import Intro from '@/components/landing/Intro';
import MapaLanding from '@/components/landing/MapaLanding';

export default function Home() {
	return (
		<div>
			<Intro />
			<Campaigns />
			<MapaLanding />
			<InfoSection />
		</div>
	);
}
