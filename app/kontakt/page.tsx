
import type { Metadata } from "next";
import KontaktHero from './KontaktHero';
import KontaktInfo from './KontaktInfo';
import KontaktForm from './KontaktForm';

export const metadata: Metadata = {
  title: "Kontakt - Autogalerie Nord GmbH Hamburg | Jetzt Termin vereinbaren",
  description: "Kontaktieren Sie uns für eine persönliche Beratung!  041745969770  info@autogalerie-nord.de  Hamburg. Öffnungszeiten, Anfahrt & WhatsApp-Kontakt.",
  keywords: "Kontakt Autogalerie Nord, Autohändler Hamburg Kontakt, Termin vereinbaren, Öffnungszeiten, Anfahrt Hamburg",
  openGraph: {
    title: "Kontakt - Autogalerie Nord GmbH Hamburg",
    description: "Kontaktieren Sie uns für eine persönliche Beratung! Telefon, E-Mail, WhatsApp. Jetzt Termin vereinbaren.",
    url: "https://autogalerie-nord.de/kontakt",
  },
};

export default function KontaktPage() {
  return (
    <div className="min-h-screen">
      <KontaktHero />
      <KontaktInfo />
      <KontaktForm />
    </div>
  );
}
