
import type { Metadata } from "next";
import ImportExportHero from './ImportExportHero';
import ExpertiseSection from './ExpertiseSection';
import ServicesGrid from './ServicesGrid';

export const metadata: Metadata = {
  title: "Auto Import & Export Hamburg - Internationale Fahrzeugbeschaffung",
  description: "Professioneller Import & Export von Fahrzeugen weltweit. Verzollung, Logistik, komplette Abwicklung. Ihr Partner für internationale Automobilgeschäfte.",
  keywords: "Auto Import Hamburg, Fahrzeug Export, internationale Fahrzeugbeschaffung, Verzollung, Logistik, weltweiter Autohandel",
  openGraph: {
    title: "Auto Import & Export Hamburg - Internationale Fahrzeugbeschaffung",
    description: "Professioneller Import & Export von Fahrzeugen weltweit. Verzollung, Logistik und komplette Abwicklung.",
    url: "https://autogalerie-nord.de/leistungen/import-export",
  },
};

export default function ImportExportPage() {
  return (
    <div className="min-h-screen">
      <ImportExportHero />
      <ExpertiseSection />
      <ServicesGrid />
    </div>
  );
}
