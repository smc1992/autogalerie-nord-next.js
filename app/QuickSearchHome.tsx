'use client';

import { useEffect, useState } from 'react';
import Script from 'next/script';
import { usePathname } from 'next/navigation';

// QuickSearch Komponente für die Startseite
export default function QuickSearchHome() {
  const pathname = usePathname();
  const [jQueryLoaded, setJQueryLoaded] = useState(false);
  const [quickSearchLoaded, setQuickSearchLoaded] = useState(false);
  const [initialized, setInitialized] = useState(false);
  
  // QuickSearch Konfiguration
  const quickSearchConfig = {
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

  // QuickSearch initialisieren, nachdem beide Skripte geladen wurden
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
      
      // QuickSearch zerstören, falls vorhanden
      if (window.quicksearch && typeof window.quicksearch.destroy === 'function') {
        window.quicksearch.destroy();
      }
    };
  }, [jQueryLoaded, quickSearchLoaded]);
  
  // Pfadänderungen überwachen
  useEffect(() => {
    if (pathname === '/') {
      console.log('Auf Startseite, prüfe QuickSearch-Status...');
      if (jQueryLoaded && quickSearchLoaded) {
        initializeQuickSearch();
      }
    }
  }, [pathname, jQueryLoaded, quickSearchLoaded]);
  
  // Funktion zur Initialisierung von QuickSearch
  const initializeQuickSearch = () => {
    if (typeof window === 'undefined' || !window.quicksearch) return;
    
    // Kurze Verzögerung, um sicherzustellen, dass DOM bereit ist
    setTimeout(() => {
      try {
        // Alte Instanz zurücksetzen, falls vorhanden
        if (window.quicksearch.initialized) {
          console.log('QuickSearch wird zurückgesetzt...');
          
          // Filterzustände zurücksetzen
          if (window.quicksearch.reset && typeof window.quicksearch.reset === 'function') {
            window.quicksearch.reset();
          }
          
          // Oder komplett neu initialisieren
          if (window.quicksearch.destroy && typeof window.quicksearch.destroy === 'function') {
            window.quicksearch.destroy();
          }
        }
        
        // QuickSearch initialisieren
        console.log('QuickSearch wird initialisiert mit:', quickSearchConfig);
        window.quicksearch.init(quickSearchConfig);
        window.quicksearch.initialized = true;
        setInitialized(true);
        console.log('QuickSearch erfolgreich initialisiert');
      } catch (error) {
        console.error('Fehler bei der Initialisierung von QuickSearch:', error);
      }
    }, 100);
  };
  
  // Handler für Routenänderungen
  const handleRouteChange = () => {
    console.log('Route geändert, aktueller Pfad:', window.location.pathname);
    if (window.location.pathname === '/') {
      console.log('Zurück auf Startseite, QuickSearch wird neu initialisiert...');
      initializeQuickSearch();
    }
  };

  return (
    <>
      {/* jQuery laden */}
      <Script
        src="https://code.jquery.com/jquery-3.6.0.min.js"
        strategy="beforeInteractive"
        onLoad={() => {
          console.log('jQuery wurde geladen');
          setJQueryLoaded(true);
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
        />
      )}

      {/* QuickSearch Container */}
      <div id="quicksearch-container" className="my-8 p-4 bg-gray-100 rounded-lg">
        {/* Hier werden die QuickSearch-Elemente eingefügt */}
        <div className="quicksearch-form"></div>
        <div className="quicksearch-results"></div>
      </div>
    </>
  );
}
