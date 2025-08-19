'use client';

import { useEffect, useRef } from 'react';
import Script from 'next/script';

// Import der QuickSearch-Typen
// QuickSearch-Typen werden automatisch durch TypeScript erkannt

export default function QuickSearchInline() {
  const containerRef = useRef<HTMLDivElement>(null);
  const initialized = useRef(false);

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

  // Initialisierung mit Inline-Script
  useEffect(() => {
    if (initialized.current) return;
    
    // Inline-Script für jQuery und QuickSearch
    const inlineScript = document.createElement('script');
    inlineScript.innerHTML = `
      // Funktion zum Laden eines Skripts
      function loadScript(src, callback) {
        console.log('Lade Skript:', src);
        var script = document.createElement('script');
        script.src = src;
        script.onload = callback;
        document.head.appendChild(script);
      }

      // Globale Variablen setzen
      window.baseUri = "https://api.pixel-base.de/marketplace/v3-11365/";
      window.culture = "de-DE";
      window.apikey = "0536fa11-99df-43f8-bf26-42af233f5478";
      window.marketplace = ${JSON.stringify(quickSearchConfig)};

      // jQuery laden, dann QuickSearch laden und initialisieren
      loadScript('https://code.jquery.com/jquery-3.6.0.min.js', function() {
        console.log('jQuery geladen');
        
        loadScript('/quicksearch-norequire_1.4.2.min.js', function() {
          console.log('QuickSearch geladen');
          
          // Kurze Verzögerung für DOM-Bereitschaft
          setTimeout(function() {
            try {
              console.log('Initialisiere QuickSearch...');
              
              // Alte Instanz zurücksetzen, falls vorhanden
              if (window.quicksearch && window.quicksearch.initialized) {
                console.log('Alte QuickSearch-Instanz wird zurückgesetzt...');
                if (typeof window.quicksearch.destroy === 'function') {
                  window.quicksearch.destroy();
                }
              }
              
              // QuickSearch initialisieren
              if (window.quicksearch && window.quicksearch.init) {
                window.quicksearch.init(window.marketplace);
                window.quicksearch.initialized = true;
                console.log('QuickSearch erfolgreich initialisiert');
                
                // Prüfen, ob die UI-Elemente korrekt erstellt wurden
                setTimeout(function() {
                  var formElements = document.querySelectorAll('.quicksearch-form select');
                  var searchLink = document.querySelector('#carsearchlink');
                  console.log('Anzahl der Select-Elemente:', formElements.length);
                  console.log('Such-Link gefunden:', searchLink !== null);
                }, 1000);
              } else {
                console.error('QuickSearch nicht verfügbar');
              }
            } catch (error) {
              console.error('Fehler bei der Initialisierung von QuickSearch:', error);
            }
          }, 500);
        });
      });
    `;
    
    // Inline-Script einfügen
    document.head.appendChild(inlineScript);
    initialized.current = true;
    
    // Event-Listener für Navigation
    const handleRouteChange = () => {
      if (window.location.pathname === '/') {
        console.log('Zurück auf Startseite, QuickSearch wird neu initialisiert...');
        
        // Kurze Verzögerung für DOM-Bereitschaft
        setTimeout(() => {
          try {
            if (window.quicksearch && window.quicksearch.init) {
              // Alte Instanz zurücksetzen, falls vorhanden
              if (window.quicksearch.initialized) {
                console.log('Alte QuickSearch-Instanz wird zurückgesetzt...');
                if (typeof window.quicksearch.destroy === 'function') {
                  window.quicksearch.destroy();
                }
              }
              
              // QuickSearch neu initialisieren
              window.quicksearch.init(quickSearchConfig);
              window.quicksearch.initialized = true;
              console.log('QuickSearch erfolgreich neu initialisiert');
            }
          } catch (error) {
            console.error('Fehler bei der Neuinitialisierung von QuickSearch:', error);
          }
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
  }, []);

  return (
    <div ref={containerRef} className="quicksearch-container bg-gray-50 p-4 rounded">
      <div className="quicksearch-form"></div>
      <div className="quicksearch-results mt-6"></div>
    </div>
  );
}
