
import type { Metadata } from "next";
import FinanzierungHero from './FinanzierungHero';
import PartnerSection from './PartnerSection';
import VorteileSection from './VorteileSection';
import ProzessSection from './ProzessSection';
import WarumSection from './WarumSection';

export const metadata: Metadata = {
  title: "Autofinanzierung Hamburg - Günstige KFZ-Finanzierung | Autogalerie Nord",
  description: "Flexible Autofinanzierung zu Top-Konditionen! Schnelle Zusage, individuelle Laufzeiten, faire Zinsen. Traumauto jetzt finanzieren - auch ohne Anzahlung möglich!",
  keywords: "Autofinanzierung Hamburg, KFZ Finanzierung, Auto Kredit, Fahrzeugfinanzierung, günstige Zinssätze, ohne Anzahlung",
  openGraph: {
    title: "Autofinanzierung Hamburg - Günstige KFZ-Finanzierung",
    description: "Flexible Autofinanzierung zu Top-Konditionen! Schnelle Zusage und faire Zinsen. Jetzt Traumauto finanzieren.",
    url: "https://autogalerie-nord.de/leistungen/finanzierung",
  },
};

export default function FinanzierungPage() {
  return (
    <div className="min-h-screen">
      <FinanzierungHero />
      <VorteileSection />
      <PartnerSection />
      <ProzessSection />
      <WarumSection />
    </div>
  );
}