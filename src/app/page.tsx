import Campaigns from "@/components/campaign/Campaigns";
import Intro from "@/components/landing/Intro";
import MapaLanding from "@/components/landing/MapaLanding";


export default function Home() {
  return (
    <div>
      <Intro />
      <Campaigns/>
      <MapaLanding />
    </div>
  );
}
