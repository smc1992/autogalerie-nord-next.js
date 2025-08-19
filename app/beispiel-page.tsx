'use client';

import { useEffect, useState } from 'react';
import Script from 'next/script';
import { usePathname } from 'next/navigation';

// QuickSearch Konfiguration
const QUICKSEARCH_CONFIG = {
  culture: "de-DE",
  url: "https://vogelsang-automobile.de/fahrzeugsuche-komponente-dev/",
  target: "/vehicles",
  hash: "#!",
  hideOtherManufactueres: false,
  renameManufacturers: true,
  modelsWithoutFinds: 'hide',
  modelsWithCounter: false,
  sortManAlphabetic: false,
  api: {
    url: "https://api.pixel-base.de/marketplace/v3-11365/",
    key: "DEIN_API_KEY"
  }
};

export default function Home() {
  const pathname = usePathname();
  const [jQueryLoaded, setJQueryLoaded] = useState(false);
  const [quickSearchLoaded, setQuickSearchLoaded] = useState(false);
  const [isHomepage, setIsHomepage] = useState(false);
  
  // Prüfen, ob wir auf der Startseite sind
  useEffect(() => {
    setIsHomepage(pathname === '/');
  }, [pathname]);

  // QuickSearch initialisieren, nachdem jQuery und QuickSearch geladen wurden
  useEffect(() => {
    // Nur auf der Startseite ausführen
    if (!isHomepage || !jQueryLoaded || !quickSearchLoaded) return;
    
    // QuickSearch initialisieren oder reinitialisieren
    if (typeof window !== 'undefined' && window.quicksearch) {
      console.log('QuickSearch wird initialisiert...');
      
      // Zurücksetzen des Zustands, um alte Filter zu entfernen
      if (window.quicksearch.initialized) {
        console.log('QuickSearch wird zurückgesetzt...');
        
        // Alte Instanz bereinigen, falls nötig
        if (typeof window.quicksearch.destroy === 'function') {
          window.quicksearch.destroy();
        }
        
        // Zurücksetzen des initialisierten Status
        window.quicksearch.initialized = false;
      }
      
      // Kurze Verzögerung, um sicherzustellen, dass DOM bereit ist
      setTimeout(() => {
        window.quicksearch.init(QUICKSEARCH_CONFIG);
        console.log('QuickSearch erfolgreich initialisiert');
      }, 100);
    }
  }, [isHomepage, jQueryLoaded, quickSearchLoaded]);

  // Nur auf der Startseite die Skripte laden
  if (!isHomepage) {
    return (
      <div className="min-h-screen">
        {/* Hier kommt der Inhalt der Nicht-Startseite */}
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      {/* jQuery laden */}
      <Script
        src="https://code.jquery.com/jquery-3.6.0.min.js"
        strategy="beforeInteractive"
        onLoad={() => {
          console.log('jQuery wurde geladen');
          setJQueryLoaded(true);
        }}
        onError={(e) => {
          console.error('Fehler beim Laden von jQuery:', e);
        }}
      />

      {/* QuickSearch laden, nachdem jQuery geladen wurde */}
      {jQueryLoaded && (
        <Script
          src="/quicksearch.js"
          strategy="afterInteractive"
          onLoad={() => {
            console.log('QuickSearch wurde geladen');
            setQuickSearchLoaded(true);
          }}
          onError={(e) => {
            console.error('Fehler beim Laden von QuickSearch:', e);
          }}
        />
      )}

      {/* QuickSearch Container */}
      <div id="quicksearch-container" className="my-8 p-4 bg-gray-100 rounded-lg">
        {/* Hier werden die QuickSearch-Elemente eingefügt */}
        <div className="quicksearch-form"></div>
        <div className="quicksearch-results"></div>
      </div>

      {/* Weitere Inhalte der Startseite */}
      <div className="mt-8">
        <h2 className="text-2xl font-bold">Willkommen auf unserer Startseite</h2>
        <p className="mt-4">
          Hier finden Sie unsere besten Fahrzeuge. Nutzen Sie die Suchfunktion oben, um Ihr Traumauto zu finden.
        </p>
      </div>
    </div>
  );
}
