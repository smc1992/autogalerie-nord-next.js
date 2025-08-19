
import type { Metadata } from "next";
import ServiceHero from './ServiceHero';
import ServiceKategorien from './ServiceKategorien';
import WarumWerkstatt from './WarumWerkstatt';

export const metadata: Metadata = {
  title: "KFZ-Werkstatt Hamburg - Professioneller Autoservice | Autogalerie Nord",
  description: "Zuverlässiger KFZ-Service in Hamburg: Inspektion, Reparatur, Wartung & mehr. Erfahrene Mechaniker für alle Marken. Jetzt Werkstatt-Termin buchen!",
  keywords: "KFZ Werkstatt Hamburg, Autoreparatur Hamburg, Autoservice, Inspektion, Wartung, TÜV, Reifenwechsel, Ölwechsel",
  openGraph: {
    title: "KFZ-Werkstatt Hamburg - Professioneller Autoservice",
    description: "Zuverlässiger KFZ-Service: Inspektion, Reparatur, Wartung. Erfahrene Mechaniker für alle Marken in Hamburg.",
    url: "https://autogalerie-nord.de/service",
  },
};

export default function ServicePage() {
  return (
    <div className="min-h-screen">
      <ServiceHero />
      <ServiceKategorien />
      <WarumWerkstatt />
    </div>
  );
}