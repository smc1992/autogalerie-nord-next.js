'use client';

import { useEffect, useState, useRef } from 'react';
import Script from 'next/script';
import { usePathname } from 'next/navigation';

// Import der QuickSearch-Typen
// QuickSearch-Typen werden automatisch durch TypeScript erkannt

export default function HomePage() {
  const pathname = usePathname();
  const [jQueryLoaded, setJQueryLoaded] = useState(false);
  const [quickSearchLoaded, setQuickSearchLoaded] = useState(false);
  const quickSearchInitialized = useRef(false);
  
  // QuickSearch Konfiguration
  const quickSearchConfig: MarketplaceConfig = {
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
      key: "0536fa11-99df-43f8-bf26-42af233f5478"
    }
  };

  // QuickSearch initialisieren
  const initializeQuickSearch = () => {
    if (typeof window === 'undefined' || !window.quicksearch) return;
    
    // Wenn wir nicht auf der Startseite sind, nichts tun
    if (pathname !== '/') return;
    
    console.log('QuickSearch wird initialisiert...');
    
    // Kurze Verzögerung, um sicherzustellen, dass DOM bereit ist
    setTimeout(() => {
      try {
        // Alte Instanz zurücksetzen, falls vorhanden
        if (window.quicksearch.initialized) {
          console.log('QuickSearch wird zurückgesetzt...');
          
          // Wenn eine destroy-Methode existiert, diese aufrufen
          if (window.quicksearch.destroy && typeof window.quicksearch.destroy === 'function') {
            window.quicksearch.destroy();
          }
          
          // Oder wenn eine reset-Methode existiert, diese aufrufen
          else if (window.quicksearch.reset && typeof window.quicksearch.reset === 'function') {
            window.quicksearch.reset();
          }
          
          window.quicksearch.initialized = false;
        }
        
        // QuickSearch initialisieren
        window.quicksearch.init(quickSearchConfig);
        window.quicksearch.initialized = true;
        quickSearchInitialized.current = true;
        console.log('QuickSearch erfolgreich initialisiert');
      } catch (error) {
        console.error('Fehler bei der Initialisierung von QuickSearch:', error);
      }
    }, 100);
  };
  
  // Handler für Routenänderungen
  const handleRouteChange = () => {
    if (window.location.pathname === '/') {
      console.log('Zurück auf Startseite, QuickSearch wird neu initialisiert...');
      initializeQuickSearch();
    }
  };

  // Initialisierung nach dem Laden beider Skripte
  useEffect(() => {
    if (!jQueryLoaded || !quickSearchLoaded) return;
    
    console.log('Beide Skripte geladen, QuickSearch wird initialisiert...');
    initializeQuickSearch();
    
    // Event-Listener für Navigation hinzufügen
    window.addEventListener('popstate', handleRouteChange);
    
    // History API überschreiben, um Client-seitige Navigation zu erkennen
    const originalPushState = window.history.pushState;
    const originalReplaceState = window.history.replaceState;
    
    window.history.pushState = function() {
      originalPushState.apply(this, arguments as any);
      handleRouteChange();
    };
    
    window.history.replaceState = function() {
      originalReplaceState.apply(this, arguments as any);
      handleRouteChange();
    };
    
    return () => {
      // Aufräumen beim Unmount
      window.removeEventListener('popstate', handleRouteChange);
      window.history.pushState = originalPushState;
      window.history.replaceState = originalReplaceState;
    };
  }, [jQueryLoaded, quickSearchLoaded]);
  
  // Pfadänderungen überwachen
  useEffect(() => {
    if (pathname === '/' && jQueryLoaded && quickSearchLoaded) {
      console.log('Auf Startseite, prüfe QuickSearch-Status...');
      initializeQuickSearch();
    }
  }, [pathname, jQueryLoaded, quickSearchLoaded]);

  return (
    <div className="min-h-screen">
      {/* jQuery mit höchster Priorität laden */}
      <Script
        id="jquery-script"
        src="https://code.jquery.com/jquery-3.6.0.min.js"
        strategy="beforeInteractive"
        onLoad={() => {
          console.log('jQuery wurde geladen');
          setJQueryLoaded(true);
          
          // Globale Variable setzen
          if (typeof window !== 'undefined') {
            // TypeScript-sicherer Ansatz für benutzerdefinierte Eigenschaften
            (window as any).jQueryLoaded = true;
          }
        }}
      />

      {/* QuickSearch direkt laden, ohne auf jQuery zu warten */}
      <Script
        id="quicksearch-script"
        src="/quicksearch-norequire_1.4.2.min.js"
        strategy="beforeInteractive"
        onLoad={() => {
          console.log('QuickSearch wurde geladen');
          setQuickSearchLoaded(true);
        }}
      />
      
      {/* Initialisierungsskript mit globalen Variablen */}
      <Script
        id="init-globals"
        strategy="beforeInteractive"
        dangerouslySetInnerHTML={{
          __html: `
            // Globale Variablen setzen
            window.baseUri = "https://api.pixel-base.de/marketplace/v3-11365/";
            window.culture = "de-DE";
            window.apikey = "0536fa11-99df-43f8-bf26-42af233f5478";
            window.marketplace = ${JSON.stringify(quickSearchConfig)};
          `
        }}
      />
      
      {/* Initialisierungsskript für QuickSearch */}
      <Script
        id="quicksearch-init"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
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
            
            // Starte Initialisierung
            setTimeout(initQuickSearch, 300);
            
            // Zusätzlicher Fallback für SPA-Navigation
            window.addEventListener('load', function() {
              console.log('Seite vollständig geladen, prüfe QuickSearch-Status');
              if (!window.quicksearch || !window.quicksearch.initialized) {
                console.log('QuickSearch nicht initialisiert, versuche erneut');
                setTimeout(initQuickSearch, 500);
              }
            });
          `
        }}
      />

      {/* Hero Section */}
      <section className="bg-gray-100 py-16">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl font-bold mb-6">Willkommen bei Autogalerie Nord</h1>
          <p className="text-xl mb-8">Finden Sie Ihr Traumauto in unserem umfangreichen Fahrzeugangebot.</p>
        </div>
      </section>

      {/* QuickSearch Container */}
      <section className="py-12 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl font-semibold mb-6">Fahrzeugsuche</h2>
          <div id="quicksearch-container" className="bg-gray-50 p-6 rounded-lg shadow-md">
            {/* Hier werden die QuickSearch-Elemente eingefügt */}
            <div className="quicksearch-form"></div>
            <div className="quicksearch-results mt-6"></div>
          </div>
        </div>
      </section>

      {/* Weitere Inhalte der Startseite */}
      <section className="py-12 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl font-semibold mb-6">Unsere Services</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-lg shadow">
              <h3 className="text-xl font-semibold mb-3">Fahrzeugankauf</h3>
              <p>Wir kaufen Ihr Fahrzeug zu fairen Konditionen.</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow">
              <h3 className="text-xl font-semibold mb-3">Finanzierung</h3>
              <p>Flexible Finanzierungsmöglichkeiten für Ihr neues Auto.</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow">
              <h3 className="text-xl font-semibold mb-3">Service</h3>
              <p>Professioneller Service und Wartung für Ihr Fahrzeug.</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
