'use client';

import { useEffect, useRef, useState } from 'react';

// QuickSearch-Typen werden automatisch durch TypeScript erkannt

export default function QuickSearchManual() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isInitialized, setIsInitialized] = useState(false);
  const [retryCount, setRetryCount] = useState(0);
  const maxRetries = 5;

  // QuickSearch Konfiguration mit Umgebungsvariablen
  const quickSearchConfig = {
    culture: process.env.NEXT_PUBLIC_QUICKSEARCH_CULTURE || "de-DE",
    url: "https://vogelsang-automobile.de/fahrzeugsuche-komponente-dev/",
    target: "/fahrzeuge",
    hash: "#!",
    hideOtherManufactueres: false,
    renameManufacturers: true,
    modelsWithoutFinds: 'hide',
    modelsWithCounter: false,
    sortManAlphabetic: false,
    api: {
      url: process.env.NEXT_PUBLIC_QUICKSEARCH_BASE_URI || "https://api.pixel-base.de/marketplace/v3-11365/",
      key: process.env.NEXT_PUBLIC_QUICKSEARCH_API_KEY || "0536fa11-99df-43f8-bf26-42af233f5478"
    }
  };

  // Funktion zum Laden eines Skripts
  const loadScript = (src: string): Promise<void> => {
    return new Promise((resolve, reject) => {
      
      // Prüfen, ob das Skript bereits geladen wurde
      const existingScript = document.querySelector(`script[src="${src}"]`);
      if (existingScript) {
        resolve();
        return;
      }
      
      const script = document.createElement('script');
      script.src = src;
      script.async = true;
      
      script.onload = () => {
        resolve();
      };
      
      script.onerror = (error) => {
        reject(new Error(`Fehler beim Laden von ${src}`));
      };
      
      document.head.appendChild(script);
    });
  };

  // Funktion zum Initialisieren von QuickSearch
  const initializeQuickSearch = async () => {
    try {
      
      // Globale Variablen setzen aus Umgebungsvariablen
      (window as any).baseUri = process.env.NEXT_PUBLIC_QUICKSEARCH_BASE_URI || "https://api.pixel-base.de/marketplace/v3-11365/";
      (window as any).culture = process.env.NEXT_PUBLIC_QUICKSEARCH_CULTURE || "de-DE";
      (window as any).apikey = process.env.NEXT_PUBLIC_QUICKSEARCH_API_KEY || "0536fa11-99df-43f8-bf26-42af233f5478";
      (window as any).marketplace = quickSearchConfig;
      
      // Prüfen, ob jQuery geladen ist
      if (!(window as any).jQuery) {
        await loadScript('https://code.jquery.com/jquery-3.6.0.min.js');
        (window as any).jQueryLoaded = true;
      }
      
      // Prüfen, ob QuickSearch geladen ist
      if (!(window as any).quicksearch) {
        await loadScript('/quicksearch-norequire_1.4.2.min.js');
        (window as any).quicksearchLoaded = true;
      }
      
      // Kurze Verzögerung für DOM-Bereitschaft
      await new Promise(resolve => setTimeout(resolve, 500));
      
      // Alte Instanz zurücksetzen, falls vorhanden
      if ((window as any).quicksearch && (window as any).quicksearch.initialized) {
        if (typeof (window as any).quicksearch.destroy === 'function') {
          (window as any).quicksearch.destroy();
        }
      }
      
      // QuickSearch initialisieren
      if ((window as any).quicksearch && (window as any).quicksearch.init) {
        (window as any).quicksearch.init((window as any).marketplace);
        (window as any).quicksearch.initialized = true;
        setIsInitialized(true);
        
        // Prüfen, ob die UI-Elemente korrekt erstellt wurden
        setTimeout(() => {
        }, 1000);
      } else {
        throw new Error('QuickSearch nicht verfügbar');
      }
    } catch (error) {
      
      // Retry-Logik
      if (retryCount < maxRetries) {
        setRetryCount(prev => prev + 1);
        setTimeout(() => initializeQuickSearch(), 1000);
      } else {
      }
    }
  };

  // Initialisierung beim ersten Rendern
  useEffect(() => {
    if (!isInitialized) {
      initializeQuickSearch();
    }
    
    // Event-Listener für Navigation
    const handleRouteChange = () => {
      if (window.location.pathname === '/') {
        setIsInitialized(false);
        setRetryCount(0);
        
        // Kurze Verzögerung für DOM-Bereitschaft
        setTimeout(() => {
          initializeQuickSearch();
        }, 500);
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
    
    return () => {
      // Aufräumen beim Unmount
      window.removeEventListener('popstate', handleRouteChange);
      window.history.pushState = originalPushState;
      window.history.replaceState = originalReplaceState;
    };
  }, [isInitialized, retryCount]);

  return (
    <div ref={containerRef} className="quicksearch-container bg-gray-50 p-4 rounded">
      <div className="quicksearch-form"></div>
      <div className="quicksearch-results mt-6"></div>
      {!isInitialized && retryCount >= maxRetries && (
        <div className="text-red-500 mt-4">
          QuickSearch konnte nicht geladen werden. Bitte laden Sie die Seite neu.
        </div>
      )}
    </div>
  );
}
