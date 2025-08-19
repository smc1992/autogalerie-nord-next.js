
import KommissionsHero from './KommissionsHero';
import WarumKommission from './WarumKommission';
import ProzessSchritte from './ProzessSchritte';
import FahrzeugBewertung from './FahrzeugBewertung';
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Kommissionsverkauf Hamburg - Auto professionell verkaufen | Autogalerie Nord",
  description: "Verkaufen Sie Ihr Auto über unseren professionellen Kommissionsverkauf! Maximaler Erlös, komplette Abwicklung, keine versteckten Kosten. Jetzt beraten lassen!",
  keywords: "Kommissionsverkauf Hamburg, Auto professionell verkaufen, Fahrzeug Kommission, maximaler Verkaufspreis, professionelle Vermarktung",
  openGraph: {
    title: "Kommissionsverkauf Hamburg - Auto professionell verkaufen",
    description: "Verkaufen Sie Ihr Auto professionell über unseren Kommissionsverkauf. Maximaler Erlös und komplette Abwicklung.",
    url: "https://autogalerie-nord.de/leistungen/kommissionsverkauf",
  },
};

export default function KommissionsverkaufPage() {
  return (
    <div className="min-h-screen">
      <KommissionsHero />
      <WarumKommission />
      <ProzessSchritte />
      <FahrzeugBewertung />
    </div>
  );
}