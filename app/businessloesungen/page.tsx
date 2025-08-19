
import type { Metadata } from "next";
import BusinessHero from './BusinessHero';
import BusinessServices from './BusinessServices';
import BusinessStats from './BusinessStats';
import BusinessContact from './BusinessContact';
import BusinessCTA from './BusinessCTA';

export const metadata: Metadata = {
  title: "Business-Lösungen - Flottenmanagement & Firmenwagen | Autogalerie Nord",
  description: "Professionelle Business-Lösungen für Unternehmen: Flottenmanagement, Firmenwagen, Leasing & Finanzierung. Maßgeschneiderte Automotive-Services für Ihr Business.",
  keywords: "Flottenmanagement Hamburg, Firmenwagen, Business Leasing, Unternehmensautos, Firmenfahrzeuge, gewerbliche Finanzierung",
  openGraph: {
    title: "Business-Lösungen - Flottenmanagement & Firmenwagen",
    description: "Professionelle Business-Lösungen: Flottenmanagement, Firmenwagen, Leasing. Maßgeschneiderte Services für Unternehmen.",
    url: "https://autogalerie-nord.de/businessloesungen",
  },
};

export default function BusinessPage() {
  return (
    <div className="min-h-screen">
      <BusinessHero />
      <BusinessServices />
      <BusinessStats />
      <BusinessContact />
      <BusinessCTA />
    </div>
  );
}
