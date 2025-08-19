'use client';

import { useEffect, useRef, useState } from 'react';
import Script from 'next/script';

// Import der QuickSearch-Typen
// QuickSearch-Typen werden automatisch durch TypeScript erkannt

export default function QuickSearchDirect() {
  const [jQueryLoaded, setJQueryLoaded] = useState(false);
  const [quickSearchLoaded, setQuickSearchLoaded] = useState(false);
  const [initialized, setInitialized] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const initAttempts = useRef(0);

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
      key: "0536fa11-99df-43f8-bf26-42af233f5478"
    }
  };

  // Funktion zum Initialisieren von QuickSearch
  const initQuickSearch = () => {
    if (initAttempts.current > 10) {
      console.error('Zu viele Initialisierungsversuche, Abbruch');
      return;
    }
    
    initAttempts.current += 1;
    console.log(`Initialisierungsversuch ${initAttempts.current}`);
    
    if (typeof window === 'undefined') {
      console.log('Window ist nicht definiert');
      return;
    }
    
    // Prüfen, ob jQuery und QuickSearch verfügbar sind
    const hasJQuery = typeof window.jQuery !== 'undefined';
    const hasQuickSearch = typeof (window as any).quicksearch !== 'undefined';
    
    console.log(`jQuery verfügbar: ${hasJQuery}, QuickSearch verfügbar: ${hasQuickSearch}`);
    
    if (!hasJQuery || !hasQuickSearch) {
      console.log('jQuery oder QuickSearch noch nicht verfügbar, versuche erneut in 500ms');
      setTimeout(initQuickSearch, 500);
      return;
    }
    
    // Globale Variablen setzen
    window.baseUri = "https://api.pixel-base.de/marketplace/v3-11365/";
    window.culture = "de-DE";
    window.apikey = "0536fa11-99df-43f8-bf26-42af233f5478";
    window.marketplace = quickSearchConfig;
    
    try {
      // Alte Instanz zurücksetzen, falls vorhanden
      if (window.quicksearch.initialized) {
        console.log('Alte QuickSearch-Instanz wird zurückgesetzt...');
        try {
          if (typeof window.quicksearch.destroy === 'function') {
            window.quicksearch.destroy();
            console.log('Alte QuickSearch-Instanz erfolgreich zerstört');
          }
        } catch (e) {
          console.error('Fehler beim Zerstören der alten Instanz:', e);
        }
      }
      
      // QuickSearch initialisieren
      console.log('Initialisiere QuickSearch mit Konfiguration:', quickSearchConfig);
      window.quicksearch.init(quickSearchConfig);
      window.quicksearch.initialized = true;
      setInitialized(true);
      console.log('QuickSearch erfolgreich initialisiert');
      
      // Prüfen, ob die UI-Elemente korrekt erstellt wurden
      setTimeout(() => {
        const formElements = document.querySelectorAll('.quicksearch-form select');
        const searchLink = document.querySelector('#carsearchlink');
        console.log(`Anzahl der Select-Elemente: ${formElements.length}`);
        console.log(`Such-Link gefunden: ${searchLink !== null}`);
      }, 1000);
      
    } catch (error) {
      console.error('Fehler bei der Initialisierung von QuickSearch:', error);
      setTimeout(initQuickSearch, 1000);
    }
  };

  // Manuelles Laden der Skripte als Fallback
  const loadScriptsManually = () => {
    console.log('Lade Skripte manuell...');
    
    // jQuery laden
    const jQueryScript = document.createElement('script');
    jQueryScript.src = 'https://code.jquery.com/jquery-3.6.0.min.js';
    jQueryScript.async = false;
    jQueryScript.onload = () => {
      console.log('jQuery manuell geladen');
      setJQueryLoaded(true);
      
      // QuickSearch laden, nachdem jQuery geladen wurde
      const quickSearchScript = document.createElement('script');
      quickSearchScript.src = '/quicksearch-norequire_1.4.2.min.js';
      quickSearchScript.async = false;
      quickSearchScript.onload = () => {
        console.log('QuickSearch manuell geladen');
        setQuickSearchLoaded(true);
        
        // QuickSearch initialisieren
        setTimeout(initQuickSearch, 500);
      };
      document.head.appendChild(quickSearchScript);
    };
    document.head.appendChild(jQueryScript);
  };

  // Initialisierung nach dem Laden beider Skripte
  useEffect(() => {
    if (jQueryLoaded && quickSearchLoaded && !initialized) {
      console.log('Beide Skripte geladen, initialisiere QuickSearch...');
      setTimeout(initQuickSearch, 500);
    }
  }, [jQueryLoaded, quickSearchLoaded, initialized]);

  // Event-Listener für Navigation
  useEffect(() => {
    const handleRouteChange = () => {
      if (window.location.pathname === '/') {
        console.log('Zurück auf Startseite, QuickSearch wird neu initialisiert...');
        setTimeout(initQuickSearch, 500);
      }
    };

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
    
    // Fallback: Manuelles Laden der Skripte nach 3 Sekunden, wenn sie nicht automatisch geladen wurden
    const fallbackTimer = setTimeout(() => {
      if (!jQueryLoaded || !quickSearchLoaded) {
        console.log('Skripte wurden nicht automatisch geladen, versuche manuelles Laden...');
        loadScriptsManually();
      }
    }, 3000);
    
    return () => {
      // Aufräumen beim Unmount
      clearTimeout(fallbackTimer);
      window.removeEventListener('popstate', handleRouteChange);
      window.history.pushState = originalPushState;
      window.history.replaceState = originalReplaceState;
    };
  }, []);

  return (
    <>
      {/* jQuery laden */}
      <Script
        id="jquery-script"
        src="https://code.jquery.com/jquery-3.6.0.min.js"
        strategy="beforeInteractive"
        onLoad={() => {
          console.log('jQuery wurde geladen');
          setJQueryLoaded(true);
        }}
      />

      {/* QuickSearch laden */}
      <Script
        id="quicksearch-script"
        src="/quicksearch-norequire_1.4.2.min.js"
        strategy="beforeInteractive"
        onLoad={() => {
          console.log('QuickSearch wurde geladen');
          setQuickSearchLoaded(true);
        }}
      />
      
      {/* Initialisierungsskript */}
      <Script
        id="init-globals"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
            // Globale Variablen setzen
            window.baseUri = "https://api.pixel-base.de/marketplace/v3-11365/";
            window.culture = "de-DE";
            window.apikey = "0536fa11-99df-43f8-bf26-42af233f5478";
          `
        }}
      />
      
      <div ref={containerRef} className="quicksearch-container bg-gray-50 p-4 rounded">
        <div className="quicksearch-form"></div>
        <div className="quicksearch-results mt-6"></div>
      </div>
    </>
  );
}
