import Campaigns from '@/components/campaign/Campaigns';
import InfoSection from '@/components/landing/InfoSection';
import Intro from '@/components/landing/Intro';
import MapaLanding from '@/components/landing/MapaLanding';
import LoginGoogle from '@/components/loginGoogle/LoginGoogle';

export default function Home() {
	return (
		<div>
			<LoginGoogle/>
			<Intro />
			<Campaigns />
			<MapaLanding />
			<InfoSection />
		</div>
	);
}
