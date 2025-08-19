
import type { Metadata } from "next";
import LeistungenHero from './LeistungenHero';
import LeistungenOverview from './LeistungenOverview';
import ContactSection from './ContactSection';

export const metadata: Metadata = {
  title: "Unsere Leistungen - Autogalerie Nord GmbH | Finanzierung, Service & mehr",
  description: "Entdecken Sie unser vollständiges Leistungsspektrum: Fahrzeugfinanzierung, Zulassungsservice, Import/Export und Kommissionsverkauf. Alles aus einer Hand!",
  keywords: "Autofinanzierung Hamburg, Zulassungsservice, Import Export Autos, Kommissionsverkauf, Autoleasing, Fahrzeugservice Hamburg",
  openGraph: {
    title: "Unsere Leistungen - Autogalerie Nord GmbH",
    description: "Fahrzeugfinanzierung, Zulassungsservice, Import/Export und Kommissionsverkauf. Professionelle Automotive-Services in Hamburg.",
    url: "https://autogalerie-nord.de/leistungen",
  },
};

export default function LeistungenPage() {
  return (
    <div className="min-h-screen">
      <LeistungenHero />
      <LeistungenOverview />
      <ContactSection />
    </div>
  );
}
