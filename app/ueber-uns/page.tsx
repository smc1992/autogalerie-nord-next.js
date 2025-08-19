
import type { Metadata } from "next";
import UeberUnsHero from './UeberUnsHero';
import WillkommenSection from './WillkommenSection';
import WerteSection from './WerteSection';
import TeamSection from './TeamSection';
import KontaktSection from './KontaktSection';

export const metadata: Metadata = {
  title: "Über uns - Autogalerie Nord GmbH | Ihr vertrauensvoller Autohändler",
  description: "Lernen Sie unser erfahrenes Team kennen. Seit Jahren Ihr vertrauensvoller Partner für Premium-Fahrzeuge in Hamburg. Qualität, Service und Vertrauen stehen im Mittelpunkt.",
  keywords: "Autohändler Hamburg Team, Über Autogalerie Nord, Firmengeschichte, erfahrenes Team, vertrauensvoller Partner",
  openGraph: {
    title: "Über uns - Autogalerie Nord GmbH",
    description: "Lernen Sie unser erfahrenes Team kennen. Ihr vertrauensvoller Partner für Premium-Fahrzeuge in Hamburg.",
    url: "https://autogalerie-nord.de/ueber-uns",
  },
};

export default function UeberUnsPage() {
  return (
    <div className="min-h-screen">
      <UeberUnsHero />
      <WillkommenSection />
      <WerteSection />
      <TeamSection />
      <KontaktSection />
    </div>
  );
}
