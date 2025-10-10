import type { Metadata } from "next";
import "./globals.css";
import Header from '../components/Header';
import Footer from '../components/Footer';
import Script from 'next/script';
import dynamic from 'next/dynamic';

// CookieBanner nur clientseitig rendern, um SSR-Mismatches zu vermeiden
const CookieBanner = dynamic(() => import('../components/CookieBanner'), { ssr: false });

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
        
        {/* Externe Skripte werden nicht global geladen, um Hydration-Konflikte zu vermeiden.*/}
        
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
        

      </head>
      <body className="font-klavika antialiased" suppressHydrationWarning>
        <Header />
        <main>{children}</main>
        <Footer />
        <CookieBanner />
      </body>
    </html>
  );
}
