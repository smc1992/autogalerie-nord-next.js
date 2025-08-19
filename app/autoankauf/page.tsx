
import type { Metadata } from "next";
import AutoankaufHero from './AutoankaufHero';
import VorteileSection from './VorteileSection';
import ProzessSection from './ProzessSection';
import KontaktSection from './KontaktSection';

export const metadata: Metadata = {
  title: "Auto verkaufen Hamburg - Fairer Autoankauf | Autogalerie Nord GmbH",
  description: "🚗 Auto schnell & fair verkaufen in Hamburg ✅ Sofortige Bewertung ✅ Bester Preis ✅ Unkomplizierte Abwicklung. Jetzt kostenlosen Termin vereinbaren!",
  keywords: "Auto verkaufen Hamburg, Autoankauf Hamburg, Fahrzeug verkaufen, Auto Ankauf, Gebrauchtwagen verkaufen, fairer Autoankauf",
  openGraph: {
    title: "Auto verkaufen Hamburg - Fairer Autoankauf",
    description: "Verkaufen Sie Ihr Auto schnell und fair in Hamburg. Sofortige Bewertung und bester Preis garantiert. Jetzt Termin vereinbaren!",
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
