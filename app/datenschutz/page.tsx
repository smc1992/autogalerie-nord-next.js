import { Metadata } from 'next';

export const metadata: Metadata = {
  title: "Datenschutz - Autogalerie Nord GmbH | Datenschutzerklärung",
  description: "Datenschutzerklärung der Autogalerie Nord GmbH. Informationen zum Umgang mit personenbezogenen Daten gemäß DSGVO.",
  robots: {
    index: false,
    follow: false,
  },
  openGraph: {
    title: "Datenschutzerklärung - Autogalerie Nord GmbH",
    description: "Datenschutzerklärung und Informationen zum Datenschutz bei Autogalerie Nord GmbH Hamburg.",
    url: 'https://autogalerie-nord.de/datenschutz',
    siteName: 'Autogalerie Nord GmbH',
    locale: 'de_DE',
    type: 'website',
  },
};

export default function DatenschutzPage() {
  return (
    <div className="min-h-screen bg-white">
      <div className="container mx-auto px-4 py-24">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl font-bold text-gray-900 mb-8">Datenschutzerklärung</h1>
          <div className="prose prose-lg max-w-none">
            <p className="text-lg text-gray-600 mb-8">
              Diese Datenschutzerklärung klärt Sie über die Art, den Umfang und Zweck der Verarbeitung von 
              personenbezogenen Daten innerhalb unseres Onlineangebotes und der mit ihm verbundenen Webseiten, 
              Funktionen und Inhalte auf.
            </p>

            <h2 className="text-2xl font-semibold text-gray-800 mt-8 mb-4">1. Verantwortlicher</h2>
            <div className="bg-gray-50 p-6 rounded-lg mb-6">
              <p className="mb-2"><strong>Autogalerie Nord GmbH</strong></p>
              <p className="mb-2">Lüneburger Str. 30</p>
              <p className="mb-2">21435 Stelle</p>
              <p className="mb-2">Deutschland</p>
              <p className="mb-2">Telefon: +49 (0) 4174 596 97 70</p>
              <p className="mb-2">E-Mail: info@autogalerie-nord.de</p>
            </div>

            <h2 className="text-2xl font-semibold text-gray-800 mt-8 mb-4">2. Arten der verarbeiteten Daten</h2>
            <ul className="list-disc pl-6 mb-6">
              <li>Bestandsdaten (z.B. Namen, Adressen)</li>
              <li>Kontaktdaten (z.B. E-Mail, Telefonnummern)</li>
              <li>Inhaltsdaten (z.B. Texteingaben, Fotografien, Videos)</li>
              <li>Nutzungsdaten (z.B. besuchte Webseiten, Interesse an Inhalten, Zugriffszeiten)</li>
              <li>Meta-/Kommunikationsdaten (z.B. Geräte-Informationen, IP-Adressen)</li>
            </ul>

            <h2 className="text-2xl font-semibold text-gray-800 mt-8 mb-4">3. Zweck der Verarbeitung</h2>
            <ul className="list-disc pl-6 mb-6">
              <li>Zurverfügungstellung des Onlineangebotes, seiner Funktionen und Inhalte</li>
              <li>Beantwortung von Kontaktanfragen und Kommunikation mit Nutzern</li>
              <li>Sicherheitsmaßnahmen</li>
              <li>Reichweitenmessung/Marketing</li>
            </ul>

            <h2 className="text-2xl font-semibold text-gray-800 mt-8 mb-4">4. Verwendete Begrifflichkeiten</h2>
            <p className="mb-4">
              „Personenbezogene Daten" sind alle Informationen, die sich auf eine identifizierte oder identifizierbare 
              natürliche Person beziehen; als identifizierbar wird eine natürliche Person angesehen, die direkt oder 
              indirekt, insbesondere mittels Zuordnung zu einer Kennung wie einem Namen, zu einer Kennnummer, zu 
              Standortdaten, zu einer Online-Kennung oder zu einem oder mehreren besonderen Merkmalen identifiziert 
              werden kann.
            </p>

            <h2 className="text-2xl font-semibold text-gray-800 mt-8 mb-4">5. Maßgebliche Rechtsgrundlagen</h2>
            <p className="mb-4">
              Nach Maßgabe des Art. 13 DSGVO teilen wir Ihnen die Rechtsgrundlagen unserer Datenverarbeitungen mit. 
              Für Nutzer aus dem Geltungsbereich der Datenschutzgrundverordnung (DSGVO), d.h. der EU und des EWG, 
              gilt, sofern die Rechtsgrundlage in der Datenschutzerklärung nicht genannt wird, Folgendes:
            </p>

            <h2 className="text-2xl font-semibold text-gray-800 mt-8 mb-4">6. Zusammenarbeit mit Auftragsverarbeitern, Dritten und Drittanbietern</h2>
            <p className="mb-4">
              Sofern wir im Rahmen unserer Verarbeitung Daten gegenüber anderen Personen und Unternehmen 
              (Auftragsverarbeitern, Dritten oder Drittanbietern) offenbaren, sie an diese übermitteln oder ihnen 
              sonst Zugriff auf die Daten gewähren, erfolgt dies nur auf Grundlage einer gesetzlichen Erlaubnis, 
              Einwilligung der Betroffenen, eines rechtlichen Auftrags oder auf Grundlage unserer berechtigten 
              Interessen an einer effizienten und kostengünstigen Verwaltung unseres Geschäftsbetriebes.
            </p>

            <h2 className="text-2xl font-semibold text-gray-800 mt-8 mb-4">7. Übermittlungen in Drittländer</h2>
            <p className="mb-4">
              Sofern wir Daten in einem Drittland (d.h., außerhalb der Europäischen Union (EU), des Europäischen 
              Wirtschaftsraums (EWR)) verarbeiten oder die Verarbeitung im Rahmen der Inanspruchnahme von Diensten 
              Dritter oder der Offenlegung bzw. Übermittlung von Daten an andere Personen, Stellen oder Unternehmen 
              stattfindet, erfolgt dies nur im Einklang mit den gesetzlichen Vorgaben.
            </p>

            <h2 className="text-2xl font-semibold text-gray-800 mt-8 mb-4">8. Rechte der betroffenen Personen</h2>
            <p className="mb-4">Sie haben das Recht:</p>
            <ul className="list-disc pl-6 mb-6">
              <li>gemäß Art. 15 DSGVO Auskunft über Ihre von uns verarbeiteten personenbezogenen Daten zu verlangen</li>
              <li>gemäß Art. 16 DSGVO unverzüglich die Berichtigung unrichtiger oder Vervollständigung Ihrer bei uns gespeicherten personenbezogenen Daten zu verlangen</li>
              <li>gemäß Art. 17 DSGVO die Löschung Ihrer bei uns gespeicherten personenbezogenen Daten zu verlangen</li>
              <li>gemäß Art. 18 DSGVO die Einschränkung der Verarbeitung Ihrer personenbezogenen Daten zu verlangen</li>
              <li>gemäß Art. 20 DSGVO Ihre personenbezogenen Daten, die Sie uns bereitgestellt haben, in einem strukturierten, gängigen und maschinenlesebaren Format zu erhalten</li>
              <li>gemäß Art. 7 Abs. 3 DSGVO Ihre einmal erteilte Einwilligung jederzeit gegenüber uns zu widerrufen</li>
            </ul>

            <h2 className="text-2xl font-semibold text-gray-800 mt-8 mb-4">9. Löschung von Daten</h2>
            <p className="mb-4">
              Die von uns verarbeiteten Daten werden nach Maßgabe der gesetzlichen Vorgaben gelöscht oder in ihrer 
              Verarbeitung eingeschränkt. Sofern nicht im Rahmen dieser Datenschutzerklärung ausdrücklich angegeben, 
              werden die bei uns gespeicherten Daten gelöscht, sobald sie für ihre Zweckbestimmung nicht mehr 
              erforderlich sind und der Löschung keine gesetzlichen Aufbewahrungspflichten entgegenstehen.
            </p>

            <section className="mb-8">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">6. Cookies und Tracking-Technologien</h2>
              <p className="text-gray-700 mb-4">
                Unsere Website verwendet Cookies und ähnliche Tracking-Technologien, um die Benutzererfahrung zu verbessern 
                und den Website-Traffic zu analysieren.
              </p>
              <div className="bg-blue-50 rounded-lg p-6 mb-6">
                <h3 className="font-semibold text-blue-900 mb-3">Verwendete Cookie-Kategorien:</h3>
                <div className="space-y-3">
                  <div>
                    <h4 className="font-medium text-blue-800">Notwendige Cookies</h4>
                    <p className="text-blue-700 text-sm">Für die Grundfunktionen der Website erforderlich</p>
                  </div>
                  <div>
                    <h4 className="font-medium text-blue-800">Analyse-Cookies (Google Analytics)</h4>
                    <p className="text-blue-700 text-sm">Zur Analyse des Nutzerverhaltens und Verbesserung der Website</p>
                  </div>
                  <div>
                    <h4 className="font-medium text-blue-800">Marketing-Cookies (Facebook Pixel)</h4>
                    <p className="text-blue-700 text-sm">Für personalisierte Werbung und Remarketing</p>
                  </div>
                  <div>
                    <h4 className="font-medium text-blue-800">Präferenz-Cookies</h4>
                    <p className="text-blue-700 text-sm">Speichern Ihre Einstellungen und Präferenzen</p>
                  </div>
                </div>
              </div>

              <h3 className="text-lg font-semibold text-gray-900 mb-3">Externe Services</h3>
              <div className="space-y-4">
                <div>
                  <h4 className="font-medium text-gray-900">Google Fonts</h4>
                  <p className="text-gray-700 text-sm">
                    Wir verwenden Google Fonts zur Darstellung von Schriftarten. Dabei werden Daten an Google übertragen.
                    <br />Anbieter: Google LLC, 1600 Amphitheatre Parkway, Mountain View, CA 94043, USA
                  </p>
                </div>
                <div>
                  <h4 className="font-medium text-gray-900">Google Analytics</h4>
                  <p className="text-gray-700 text-sm">
                    Webanalysedienst zur Auswertung des Nutzerverhaltens (nur mit Ihrer Einwilligung).
                    <br />Anbieter: Google LLC, 1600 Amphitheatre Parkway, Mountain View, CA 94043, USA
                  </p>
                </div>
                <div>
                  <h4 className="font-medium text-gray-900">Facebook Pixel</h4>
                  <p className="text-gray-700 text-sm">
                    Tracking-Tool für Werbeanzeigen und Remarketing (nur mit Ihrer Einwilligung).
                    <br />Anbieter: Meta Platforms Ireland Limited, 4 Grand Canal Square, Dublin 2, Irland
                  </p>
                </div>
                <div>
                  <h4 className="font-medium text-gray-900">Google Maps</h4>
                  <p className="text-gray-700 text-sm">
                    Kartendienst zur Anzeige unseres Standorts.
                    <br />Anbieter: Google LLC, 1600 Amphitheatre Parkway, Mountain View, CA 94043, USA
                  </p>
                </div>
                <div>
                  <h4 className="font-medium text-gray-900">Automanager Integration</h4>
                  <p className="text-gray-700 text-sm">
                    Fahrzeugdatenbank und -verwaltungssystem zur Anzeige unserer Fahrzeuge.
                  </p>
                </div>
              </div>

              <div className="bg-green-50 rounded-lg p-4 mt-6">
                <p className="text-green-800 font-medium mb-2">
                  <i className="ri-settings-line mr-2"></i>
                  Cookie-Verwaltung
                </p>
                <p className="text-green-700 text-sm mb-3">
                  Sie können Ihre Cookie-Einstellungen jederzeit anpassen oder widerrufen.
                </p>
                <a 
                  href="/cookie-einstellungen" 
                  className="inline-flex items-center bg-green-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-green-700 transition-colors"
                >
                  <i className="ri-settings-3-line mr-2"></i>
                  Cookie-Einstellungen verwalten
                </a>
              </div>
            </section>

            <div className="bg-blue-50 p-6 rounded-lg mt-8">
              <h3 className="text-lg font-semibold text-blue-900 mb-2">Kontakt bei Datenschutzfragen</h3>
              <p className="text-blue-800">
                Bei Fragen zum Datenschutz kontaktieren Sie uns gerne unter: 
                <a href="mailto:info@autogalerie-nord.de" className="text-blue-600 hover:text-blue-800 underline ml-1">
                  info@autogalerie-nord.de
                </a>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}