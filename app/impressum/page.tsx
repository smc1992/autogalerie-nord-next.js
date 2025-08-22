
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: "Impressum - Autogalerie Nord GmbH | Rechtliche Informationen",
  description: "Impressum und rechtliche Informationen der Autogalerie Nord GmbH. Kontaktdaten, Geschäftsführung und weitere Pflichtangaben.",
  robots: {
    index: false,
    follow: false,
  },
  openGraph: {
    title: "Impressum - Autogalerie Nord GmbH",
    description: "Rechtliche Informationen und Kontaktdaten der Autogalerie Nord GmbH Hamburg.",
    url: 'https://autogalerie-nord.de/impressum',
    siteName: 'Autogalerie Nord GmbH',
    locale: 'de_DE',
    type: 'website',
  },
};

export default function ImpressumPage() {
  return (
    <div className="min-h-screen bg-white">
      <div className="container mx-auto px-4 py-24">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl font-bold text-gray-900 mb-8">Impressum</h1>
          
          <div className="prose prose-lg max-w-none">
            <h2 className="text-2xl font-semibold text-gray-800 mt-8 mb-4">Angaben gemäß § 5 TMG</h2>
            <div className="bg-gray-50 p-6 rounded-lg mb-6">
              <p className="mb-2"><strong>Autogalerie Nord GmbH</strong></p>
              <p className="mb-2">Lüneburger Str. 30</p>
              <p className="mb-2">21435 Stelle</p>
              <p className="mb-2">Deutschland</p>
            </div>

            <h2 className="text-2xl font-semibold text-gray-800 mt-8 mb-4">Vertreten durch</h2>
            <p className="mb-4">Geschäftsführer: Galip Alkan</p>

            <h2 className="text-2xl font-semibold text-gray-800 mt-8 mb-4">Kontakt</h2>
            <div className="bg-gray-50 p-6 rounded-lg mb-6">
              <p className="mb-2">Telefon: +49 (0) 41 745 969 70</p>
              <p className="mb-2">E-Mail: info@autogalerie-nord.de</p>
            </div>

            <h2 className="text-2xl font-semibold text-gray-800 mt-8 mb-4">Registereintrag</h2>
            <p className="mb-2">Eintragung im Handelsregister.</p>
            <p className="mb-2">Registergericht: Amtsgericht Lüneburg</p>
            <p className="mb-2">Registernummer: HRB 206353</p>

            <h2 className="text-2xl font-semibold text-gray-800 mt-8 mb-4">Umsatzsteuer-ID</h2>
            <p className="mb-4">Umsatzsteuer-Identifikationsnummer gemäß § 27 a Umsatzsteuergesetz: DE307285920</p>

            <h2 className="text-2xl font-semibold text-gray-800 mt-8 mb-4">Verantwortlich für den Inhalt nach § 55 Abs. 2 RStV</h2>
            <div className="bg-gray-50 p-6 rounded-lg mb-6">
              <p className="mb-2">Galip Alkan</p>
              <p className="mb-2">Lüneburger Str. 30</p>
              <p className="mb-2">21435 Stelle</p>
            </div>

            <h2 className="text-2xl font-semibold text-gray-800 mt-8 mb-4">Haftungsausschluss</h2>
            
            <h3 className="text-xl font-semibold text-gray-700 mt-6 mb-3">Haftung für Inhalte</h3>
            <p className="mb-4">
              Als Diensteanbieter sind wir gemäß § 7 Abs.1 TMG für eigene Inhalte auf diesen Seiten nach den 
              allgemeinen Gesetzen verantwortlich. Nach §§ 8 bis 10 TMG sind wir als Diensteanbieter jedoch nicht 
              unter der Verpflichtung, übermittelte oder gespeicherte fremde Informationen zu überwachen oder nach 
              Umständen zu forschen, die auf eine rechtswidrige Tätigkeit hinweisen.
            </p>

            <h3 className="text-xl font-semibold text-gray-700 mt-6 mb-3">Haftung für Links</h3>
            <p className="mb-4">
              Unser Angebot enthält Links zu externen Webseiten Dritter, auf deren Inhalte wir keinen Einfluss haben. 
              Deshalb können wir für diese fremden Inhalte auch keine Gewähr übernehmen. Für die Inhalte der verlinkten 
              Seiten ist stets der jeweilige Anbieter oder Betreiber der Seiten verantwortlich.
            </p>

            <h3 className="text-xl font-semibold text-gray-700 mt-6 mb-3">Urheberrecht</h3>
            <p className="mb-4">
              Die durch die Seitenbetreiber erstellten Inhalte und Werke auf diesen Seiten unterliegen dem deutschen 
              Urheberrecht. Die Vervielfältigung, Bearbeitung, Verbreitung und jede Art der Verwertung außerhalb der 
              Grenzen des Urheberrechtes bedürfen der schriftlichen Zustimmung des jeweiligen Autors bzw. Erstellers.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
