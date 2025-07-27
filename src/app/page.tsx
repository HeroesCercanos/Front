import Campaigns from '@/components/campaign/Campaigns';
import InfoSection from '@/components/landing/InfoSection';
import Intro from '@/components/landing/Intro';
import MapaLanding from '@/components/landing/MapaLanding';
import MarketingSection from '@/components/landing/MarketingSection';


export default function Home() {
	return (
		<div>
			<Intro />
			<MarketingSection/>
			<Campaigns />			
			<MapaLanding />			
			<InfoSection />
		</div>
	);
}
