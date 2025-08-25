import type { Metadata } from "next";
import "./globals.css";
import Header from '../components/Header';
import Footer from '../components/Footer';
import CookieBanner from '../components/CookieBanner';

export const metadata: Metadata = {
  title: "Autogalerie Nord GmbH - Premium Autohändler in Stelle, bei Hamburg",
  description: "Ihr vertrauensvoller Partner für Gebrauchtwagen, Autoankauf, Finanzierung und Service in Stelle, bei Hamburg. Premium Fahrzeuge zu fairen Preisen. Jetzt Termin vereinbaren!",
  keywords: "Auto kaufen Stelle Hamburg, Gebrauchtwagen Stelle, Autoankauf Stelle Hamburg, Autofinanzierung, Autohändler Stelle, Premium Fahrzeuge Hamburg",
  authors: [{ name: "Autogalerie Nord GmbH" }],
  icons: {
    icon: '/favicon.ico',
    shortcut: '/favicon.ico',
    apple: '/apple-touch-icon.png',
  },
  openGraph: {
    title: "Autogalerie Nord GmbH - Premium Autohändler in Stelle, bei Hamburg",
    description: "Ihr vertrauensvoller Partner für Gebrauchtwagen, Autoankauf, Finanzierung und Service in Stelle, bei Hamburg. Premium Fahrzeuge zu fairen Preisen.",
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
  maximumScale: 5,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="de">
      <head>
        <meta name="theme-color" content="#dc2626" />
        
        {/* LCP-Optimierung: Hero-Bild preloaden */}
        <link
          rel="preload"
          href="/images/hero-premium.webp"
          as="image"
          type="image/webp"
          fetchPriority="high"
        />

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
        
        {/* Schema Markup für Website und Sitelinks */}
        <script type="application/ld+json" dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@graph": [
              {
                "@type": "Organization",
                "@id": "https://autogalerie-nord.de/#organization",
                "name": "Autogalerie Nord GmbH",
                "url": "https://autogalerie-nord.de",
                "logo": {
                  "@type": "ImageObject",
                  "url": "https://autogalerie-nord.de/images/logo.png"
                },
                "address": {
                  "@type": "PostalAddress",
                  "streetAddress": "Lüneburger Str. 30",
                  "addressLocality": "Stelle",
                  "addressRegion": "Niedersachsen",
                  "postalCode": "21435",
                  "addressCountry": "DE"
                },
                "contactPoint": {
                  "@type": "ContactPoint",
                  "telephone": "+49-41-745-969-70",
                  "contactType": "customer service",
                  "email": "info@autogalerie-nord.de"
                },
                "sameAs": [
                  "https://www.facebook.com/profile.php?id=61565890614324",
                  "https://www.instagram.com/autogalerie.nord.gmbh/",
                  "https://www.youtube.com/channel/UCJgqiKOxC-9VRx53LF8aZKg"
                ]
              },
              {
                "@type": "WebSite",
                "@id": "https://autogalerie-nord.de/#website",
                "url": "https://autogalerie-nord.de",
                "name": "Autogalerie Nord GmbH",
                "description": "Premium Autohändler in Stelle, bei Hamburg",
                "publisher": {
                  "@id": "https://autogalerie-nord.de/#organization"
                },
                "potentialAction": {
                  "@type": "SearchAction",
                  "target": "https://autogalerie-nord.de/fahrzeuge?search={search_term_string}",
                  "query-input": "required name=search_term_string"
                }
              },
              {
                "@type": "ItemList",
                "@id": "https://autogalerie-nord.de/#sitelinks",
                "name": "Hauptnavigation",
                "itemListElement": [
                  {
                    "@type": "SiteNavigationElement",
                    "position": 1,
                    "name": "Fahrzeuge",
                    "description": "Über 120 geprüfte Gebrauchtwagen",
                    "url": "https://autogalerie-nord.de/fahrzeuge"
                  },
                  {
                    "@type": "SiteNavigationElement",
                    "position": 2,
                    "name": "Autoankauf",
                    "description": "Ihr Auto schnell und sicher verkaufen",
                    "url": "https://autogalerie-nord.de/autoankauf"
                  },
                  {
                    "@type": "SiteNavigationElement",
                    "position": 3,
                    "name": "Finanzierung",
                    "description": "Günstige Autofinanzierung",
                    "url": "https://autogalerie-nord.de/leistungen/finanzierung"
                  },
                  {
                    "@type": "SiteNavigationElement",
                    "position": 4,
                    "name": "Zulassungsservice",
                    "description": "Komplette Fahrzeugzulassung",
                    "url": "https://autogalerie-nord.de/leistungen/zulassungsservice"
                  },
                  {
                    "@type": "SiteNavigationElement",
                    "position": 5,
                    "name": "Import & Export",
                    "description": "Fahrzeugimport und -export",
                    "url": "https://autogalerie-nord.de/leistungen/import-export"
                  },
                  {
                    "@type": "SiteNavigationElement",
                    "position": 6,
                    "name": "Kommissionsverkauf",
                    "description": "Fahrzeug in Kommission verkaufen",
                    "url": "https://autogalerie-nord.de/leistungen/kommissionsverkauf"
                  },
                  {
                    "@type": "SiteNavigationElement",
                    "position": 7,
                    "name": "Business Lösungen",
                    "description": "Lösungen für Geschäftskunden",
                    "url": "https://autogalerie-nord.de/businessloesungen"
                  },
                  {
                    "@type": "SiteNavigationElement",
                    "position": 8,
                    "name": "Service",
                    "description": "Werkstatt und Reparaturservice",
                    "url": "https://autogalerie-nord.de/service"
                  },
                  {
                    "@type": "SiteNavigationElement",
                    "position": 9,
                    "name": "Über Uns",
                    "description": "Unser Team und Unternehmen",
                    "url": "https://autogalerie-nord.de/ueber-uns"
                  },
                  {
                    "@type": "SiteNavigationElement",
                    "position": 10,
                    "name": "Kontakt",
                    "description": "Kontaktieren Sie uns",
                    "url": "https://autogalerie-nord.de/kontakt"
                  }
                ]
              }
            ]
          })
        }} />
        
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
