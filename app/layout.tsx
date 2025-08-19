import type { Metadata } from "next";
import "./globals.css";
import Header from '../components/Header';
import Footer from '../components/Footer';
import CookieBanner from '../components/CookieBanner';

export const metadata: Metadata = {
  title: "Autogalerie Nord GmbH - Premium Autohändler in Hamburg",
  description: "Ihr vertrauensvoller Partner für Gebrauchtwagen, Autoankauf, Finanzierung und Service in Hamburg. Premium Fahrzeuge zu fairen Preisen. Jetzt Termin vereinbaren!",
  keywords: "Auto kaufen Hamburg, Gebrauchtwagen Hamburg, Autoankauf Hamburg, Autofinanzierung, Autohändler Hamburg, Premium Fahrzeuge",
  authors: [{ name: "Autogalerie Nord GmbH" }],
  openGraph: {
    title: "Autogalerie Nord GmbH - Premium Autohändler in Hamburg",
    description: "Ihr vertrauensvoller Partner für Gebrauchtwagen, Autoankauf, Finanzierung und Service in Hamburg. Premium Fahrzeuge zu fairen Preisen.",
    url: "https://autogalerie-nord.de",
    siteName: "Autogalerie Nord GmbH",
    type: "website",
    locale: "de_DE",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  alternates: {
    canonical: "https://autogalerie-nord.de",
  },
};

export const viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="de">
      <head>
        <link rel="icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <meta name="theme-color" content="#dc2626" />
        <link href="https://fonts.googleapis.com/css2?family=Pacifico&display=swap" rel="stylesheet" />
        <link
          href="https://cdn.jsdelivr.net/npm/remixicon@3.5.0/fonts/remixicon.css"
          rel="stylesheet"
        />
        
        {/* jQuery direkt einbinden */}
        <script src="https://code.jquery.com/jquery-3.6.0.min.js"></script>
        
        {/* QuickSearch direkt einbinden */}
        <script src="/quicksearch-norequire_1.4.2.min.js"></script>
        
        {/* Chat-Widget einbinden */}
        <script async defer src="https://app.chatbot-smc.de/js/widget/knvkqmx3rs1hs1eh/float.js"></script>
        
        {/* Globale Variablen und Initialisierung */}
        <script dangerouslySetInnerHTML={{
          __html: `
            // Globale Variablen setzen
            window.baseUri = "https://api.pixel-base.de/marketplace/v3-11365/";
            window.culture = "de-DE";
            window.apikey = "0536fa11-99df-43f8-bf26-42af233f5478";
            window.marketplace = {
              culture: "de-DE",
              url: "/fahrzeuge/",
              target: "/fahrzeuge",
              hash: "",
              hideOtherManufactueres: false,
              renameManufacturers: true,
              modelsWithoutFinds: 'hide',
              modelsWithCounter: false,
              sortManAlphabetic: false,
              api: {
                url: "https://api.pixel-base.de/marketplace/v3-11365/",
                key: "0536fa11-99df-43f8-bf26-42af233f5478"
              }
            };
            
            // URL dynamisch setzen wenn window verfügbar ist
            if (typeof window !== 'undefined') {
              window.marketplace.url = window.location.origin + "/fahrzeuge/";
            }
            
            // Initialisierungsfunktion
            function initQuickSearch() {
              if (window.jQuery && window.quicksearch && window.quicksearch.init) {
                console.log('QuickSearch wird initialisiert');
                if (window.quicksearch.initialized) {
                  try {
                    window.quicksearch.destroy();
                    console.log('Alte QuickSearch-Instanz zerstört');
                  } catch (e) {
                    console.error('Fehler beim Zerstören der alten Instanz:', e);
                  }
                }
                try {
                  window.quicksearch.init(window.marketplace);
                  window.quicksearch.initialized = true;
                  console.log('QuickSearch erfolgreich initialisiert');
                } catch (e) {
                  console.error('Fehler bei der Initialisierung von QuickSearch:', e);
                }
              } else {
                console.log('QuickSearch oder jQuery noch nicht verfügbar, versuche erneut in 300ms');
                setTimeout(initQuickSearch, 300);
              }
            }
            
            // Initialisierung nach dem Laden der Seite
            document.addEventListener('DOMContentLoaded', function() {
              setTimeout(initQuickSearch, 300);
            });
            
            // Zusätzlicher Fallback
            window.addEventListener('load', function() {
              if (!window.quicksearch || !window.quicksearch.initialized) {
                console.log('QuickSearch nicht initialisiert, versuche erneut');
                setTimeout(initQuickSearch, 500);
              }
            });
          `
        }} />
      </head>
      <body className="font-klavika antialiased">
        <Header />
        <main>{children}</main>
        <Footer />
        <CookieBanner />
      </body>
    </html>
  );
}
