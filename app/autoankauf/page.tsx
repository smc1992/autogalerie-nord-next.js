
import type { Metadata } from "next";
import AutoankaufHero from './AutoankaufHero';
import VorteileSection from './VorteileSection';
import ProzessSection from './ProzessSection';
import KontaktSection from './KontaktSection';

export const metadata: Metadata = {
  title: "Autoankauf Informationen - Ihr Auto fair verkaufen | Autogalerie Nord GmbH",
  description: "🚗 Informationen zum fairen Autoankauf in Hamburg ✅ Unser Bewertungsprozess ✅ Ihre Vorteile ✅ Transparente Abwicklung. Jetzt direkt Fahrzeug bewerten!",
  keywords: "Autoankauf Informationen, Auto verkaufen Hamburg, Fahrzeugbewertung, Autoankauf Prozess, fairer Autoankauf",
  openGraph: {
    title: "Autoankauf Informationen - Ihr Auto fair verkaufen",
    description: "Erfahren Sie alles über unseren fairen Autoankauf-Prozess. Transparente Bewertung und beste Preise in Hamburg.",
    url: "https://autogalerie-nord.de/autoankauf",
  },
};

export default function AutoankaufPage() {
  return (
    <div className="min-h-screen">
      <AutoankaufHero />
      <VorteileSection />
      <ProzessSection />
      <KontaktSection />
    </div>
  );
}
