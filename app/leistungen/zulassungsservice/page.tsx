
import type { Metadata } from "next";
import ZulassungsHero from './ZulassungsHero';
import ServiceOverview from './ServiceOverview';
import ProcessSection from './ProcessSection';
import ServiceFeatures from './ServiceFeatures';
import ZulassungsCTA from './ZulassungsCTA';

export const metadata: Metadata = {
  title: "Zulassungsservice Hamburg - KFZ-Zulassung & Ummeldung | Autogalerie Nord",
  description: "Professioneller Zulassungsservice für Ihr Fahrzeug! Anmeldung, Ummeldung, Abmeldung - wir erledigen alle Formalitäten schnell und zuverlässig für Sie.",
  keywords: "Zulassungsservice Hamburg, KFZ Zulassung, Auto anmelden, Ummeldung, Abmeldung, Kennzeichen reservieren",
  openGraph: {
    title: "Zulassungsservice Hamburg - KFZ-Zulassung & Ummeldung",
    description: "Professioneller Zulassungsservice: Anmeldung, Ummeldung, Abmeldung. Wir erledigen alle Formalitäten für Sie.",
    url: "https://autogalerie-nord.de/leistungen/zulassungsservice",
  },
};

export default function ZulassungsservicePage() {
  return (
    <div className="min-h-screen">
      <ZulassungsHero />
      <ServiceOverview />
      <ProcessSection />
      <ServiceFeatures />
      <ZulassungsCTA />
    </div>
  );
}