
import type { Metadata } from "next";
import FahrzeugeClient from './FahrzeugeClient';

export const metadata: Metadata = {
  title: "Gebrauchtwagen Hamburg - Premium Fahrzeuge kaufen | Autogalerie Nord",
  description: "🚗 Über 120 geprüfte Gebrauchtwagen in Hamburg ✅ BMW, Mercedes, Audi & mehr ✅ Faire Preise ✅ Finanzierung möglich. Jetzt Traumauto finden!",
  keywords: "Gebrauchtwagen Hamburg, Auto kaufen Hamburg, BMW Hamburg, Mercedes Hamburg, Audi Hamburg, Premiumfahrzeuge",
  openGraph: {
    title: "Gebrauchtwagen Hamburg - Premium Fahrzeuge kaufen",
    description: "Über 120 geprüfte Gebrauchtwagen: BMW, Mercedes, Audi & mehr. Faire Preise und Finanzierung möglich.",
    url: "https://autogalerie-nord.de/fahrzeuge",
  },
};

export default function FahrzeugePage() {
  return <FahrzeugeClient />;
}
