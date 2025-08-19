'use client';

import React, { useEffect, useRef, useState } from 'react';
import { usePathname } from 'next/navigation';
import Script from 'next/script';

interface QuickSearchWidgetProps {
  className?: string;
}

export default function QuickSearchWidget({ className = '' }: QuickSearchWidgetProps) {
  const [isJQueryLoaded, setIsJQueryLoaded] = useState(false);
  const [isQuickSearchLoaded, setIsQuickSearchLoaded] = useState(false);
  const [isInitialized, setIsInitialized] = useState(false);
  const widgetRef = useRef<HTMLDivElement>(null);
  const pathname = usePathname();
  const initializationRef = useRef(false);

  const API_KEY = '0536fa11-99df-43f8-bf26-42af233f5478';

  // QuickSearch-Konfiguration
  const getQuickSearchSettings = () => {
    if (typeof window === 'undefined') {
      return {
        url: '/fahrzeuge/',
        renameManufacturers: true,
        culture: 'de-DE',
        hideOtherManufactueres: false,
        modelsWithoutFinds: 'hide',
        modelsWithCounter: false,
        sortManAlphabetic: false,
        target: '/fahrzeuge',
        hash: '',
        newWindow: false,
        debug: false,
        api: {
          url: 'https://api.pixel-base.de/marketplace/v3-11365/',
          key: API_KEY
        }
      };
    }
    
    return {
      url: window.location.origin + '/fahrzeuge/',
      renameManufacturers: true,
      culture: 'de-DE',
      hideOtherManufactueres: false,
      modelsWithoutFinds: 'hide',
      modelsWithCounter: false,
      sortManAlphabetic: false,
      target: '/fahrzeuge',
      hash: '',
      newWindow: false,
      debug: false,
      api: {
        url: 'https://api.pixel-base.de/marketplace/v3-11365/',
        key: API_KEY
      }
    };
  };

  // Container bereinigen und zurücksetzen
  const cleanupQuickSearchContainer = () => {
    if (typeof window === 'undefined') return;

    try {
      // Alle Select-Elemente zurücksetzen
      const selects = document.querySelectorAll('.quicksearch select');
      selects.forEach(select => {
        const selectElement = select as HTMLSelectElement;
        selectElement.innerHTML = '<option value="">Laden...</option>';
        selectElement.selectedIndex = 0;
        
        // Event-Handler entfernen durch Klonen
        const newSelect = selectElement.cloneNode(true) as HTMLSelectElement;
        selectElement.parentNode?.replaceChild(newSelect, selectElement);
      });

      // QuickSearch-spezifische Event-Handler entfernen
      if ((window as any).jQuery) {
        try {
          (window as any).jQuery('.quicksearch').off();
          (window as any).jQuery(document).off('.quicksearch');
          (window as any).jQuery(window).off('.quicksearch');
        } catch (e) {
          console.log('jQuery cleanup übersprungen:', e);
        }
      }

      // Fahrzeuganzahl zurücksetzen
      const countElements = document.querySelectorAll('.quicksearch-count');
      countElements.forEach(el => {
        el.textContent = '0';
      });

      console.log('QuickSearch Container bereinigt');
    } catch (error) {
      console.error('Fehler beim Container-Cleanup:', error);
    }
  };

  // QuickSearch initialisieren
  const initializeQuickSearch = () => {
    if (typeof window === 'undefined' || !isJQueryLoaded || !isQuickSearchLoaded) {
      console.log('QuickSearch: Abhängigkeiten noch nicht geladen');
      return;
    }

    if (initializationRef.current) {
      console.log('QuickSearch: Bereits initialisiert, überspringe');
      return;
    }

    try {
      console.log('QuickSearch: Starte Initialisierung...');
      
      // Externe AMM/Marketplace-Skripte blockieren
      if ((window as any).ammInfo) {
        console.log('AMM-System erkannt - deaktiviere externes Marketplace');
        delete (window as any).ammInfo;
      }
      
      // Container bereinigen vor Initialisierung
      cleanupQuickSearchContainer();

      // Globale Variablen setzen (überschreibt externe Systeme)
      const settings = getQuickSearchSettings();
      (window as any).marketplace = settings;
      (window as any).baseUri = settings.api.url;
      (window as any).culture = settings.culture;
      (window as any).apikey = settings.api.key;
      
      console.log('QuickSearch Settings gesetzt:', settings);

      // QuickSearch initialisieren
      if ((window as any).quicksearch && (window as any).quicksearch.init) {
        (window as any).jQuery(document).ready(() => {
          try {
            // Sicherstellen, dass unser QuickSearch das externe System überschreibt
            console.log('Initialisiere lokales QuickSearch-System...');
            (window as any).quicksearch.init(settings);
            console.log('QuickSearch erfolgreich initialisiert');
            
            // Event-Listener nur für QuickSearch-interne Updates
            if ((window as any).jQuery) {
              (window as any).jQuery(document).on('quicksearch:updated', () => {
                console.log('QuickSearch-Update-Event erkannt - verwende interne Logik');
                // Keine manuelle Aktualisierung - QuickSearch macht das selbst
              });
            }
            
            initializationRef.current = true;
            setIsInitialized(true);
            
            // Fahrzeuganzahl nach Initialisierung laden - einmalig und robust
            setTimeout(() => {
              console.log('Initiale Fahrzeuganzahl-Aktualisierung nach Initialisierung');
              updateVehicleCount(true); // Erzwinge direkte API-Abfrage
            }, 1500);
            
            // QuickSearch verwaltet die Fahrzeuganzahl selbst nach Initialisierung
            console.log('QuickSearch-Initialisierung abgeschlossen - interne Logik übernimmt Fahrzeuganzahl-Verwaltung');
            
            // Nach Initialisierung prüfen ob externe Systeme interferieren
            setTimeout(() => {
              if ((window as any).ammInfo) {
                console.warn('Externes AMM-System nach Initialisierung erkannt - Neuinitialisierung');
                (window as any).quicksearch.init(settings);
                // Nach Neuinitialisierung erneut Fahrzeuganzahl laden
                setTimeout(() => updateVehicleCount(), 1000);
              }
            }, 4000);
            
          } catch (error) {
            console.error('Fehler bei QuickSearch.init():', error);
          }
        });
      } else {
        console.error('QuickSearch-Objekt nicht verfügbar');
        console.log('Verfügbare globale Objekte:', Object.keys(window).filter(key => key.includes('quick') || key.includes('market')));
      }
    } catch (error) {
      console.error('Fehler bei QuickSearch-Initialisierung:', error);
    }
  };

  // Fahrzeuganzahl aktualisieren
  const updateVehicleCount = async (forceDirectAPI = false) => {
    if (typeof window === 'undefined') return;

    try {
      console.log('Starte Fahrzeuganzahl-Aktualisierung...', forceDirectAPI ? '(direkte API erzwungen)' : '');
      
      // Nur direkte API-Abfrage verwenden wenn explizit angefordert
      if (forceDirectAPI) {
        console.log('Verwende direkte API-Abfrage');
        
        const response = await fetch(`https://api.pixel-base.de/marketplace/v3-11365/vehicles/count/?apikey=${API_KEY}`);
        
        if (!response.ok) {
          throw new Error(`API-Fehler: ${response.status} ${response.statusText}`);
        }
        
        const data = await response.json();
        console.log('API-Antwort erhalten:', data);
        
        // Verschiedene mögliche Datenstrukturen prüfen
        let count;
        if (data.count !== undefined) {
          count = data.count;
        } else if (data.total !== undefined) {
          count = data.total;
        } else if (data.result && data.result.count !== undefined) {
          count = data.result.count;
        } else if (data.data && data.data.count !== undefined) {
          count = data.data.count;
        } else if (typeof data === 'number') {
          count = data;
        } else {
          console.warn('Unbekannte API-Antwortstruktur, verwende QuickSearch-interne Logik');
          // Keine Aktualisierung - QuickSearch verwaltet die Anzahl selbst
          return;
        }
        
        if (count === undefined || count === null || isNaN(count)) {
          console.warn('Ungültige Fahrzeuganzahl, verwende QuickSearch-interne Logik');
          return;
        }
        
        const countElements = document.querySelectorAll('.quicksearch-count');
        if (countElements.length === 0) {
          console.warn('Keine .quicksearch-count Elemente gefunden');
          return;
        }
        
        countElements.forEach(el => {
          el.textContent = count.toString();
        });
        
        console.log('Fahrzeuganzahl erfolgreich aktualisiert:', count, `(${countElements.length} Elemente)`);
      } else {
        // Verwende QuickSearch-interne Logik (Standard)
        if ((window as any).quicksearch && (window as any).quicksearch.update) {
          console.log('Verwende QuickSearch.update() - interne Logik');
          (window as any).quicksearch.update();
        } else {
          console.warn('QuickSearch.update() nicht verfügbar, verwende direkte API');
          await updateVehicleCount(true); // Rekursiver Aufruf mit direkter API
        }
      }
    } catch (error) {
         console.error('Fehler beim Laden der Fahrzeuganzahl:', error);
         console.log('Verwende QuickSearch-interne Logik für Fahrzeuganzahl-Verwaltung');
         // Kein Fallback - QuickSearch verwaltet die Anzahl selbst
       }
  };

  // Bei Routenwechsel prüfen und neu initialisieren
  useEffect(() => {
    if (pathname === '/') {
      console.log('Navigation zur Startseite erkannt');
      
      // Reset der Initialisierung bei Navigation
      initializationRef.current = false;
      setIsInitialized(false);
      
      // Prüfe und lade Skripte falls nötig
      const ensureScriptsLoaded = () => {
        const jqueryAvailable = typeof (window as any).jQuery !== 'undefined';
        const quicksearchAvailable = typeof (window as any).quicksearch !== 'undefined';
        
        console.log('Script-Status bei Navigation:');
        console.log('- jQuery verfügbar:', jqueryAvailable);
        console.log('- QuickSearch verfügbar:', quicksearchAvailable);
        
        // Aktualisiere States basierend auf tatsächlicher Verfügbarkeit
        if (jqueryAvailable && !isJQueryLoaded) {
          console.log('jQuery ist verfügbar, aktualisiere State');
          setIsJQueryLoaded(true);
        }
        if (quicksearchAvailable && !isQuickSearchLoaded) {
          console.log('QuickSearch ist verfügbar, aktualisiere State');
          setIsQuickSearchLoaded(true);
        }
        
        return { jqueryAvailable, quicksearchAvailable };
      };
      
      // Robuste Container-Suche mit mehreren Versuchen
      const attemptInitialization = (attempt = 1, maxAttempts = 10) => {
        const quicksearchContainer = document.querySelector('.quicksearch');
        const { jqueryAvailable, quicksearchAvailable } = ensureScriptsLoaded();
        
        console.log(`Initialisierungsversuch ${attempt}/${maxAttempts}`);
        console.log('Container gefunden:', !!quicksearchContainer);
        console.log('Scripts verfügbar:', { jqueryAvailable, quicksearchAvailable });
        
        if (quicksearchContainer && jqueryAvailable && quicksearchAvailable) {
          console.log('QuickSearch Container und Scripts gefunden, initialisiere...');
          initializeQuickSearch();
        } else if (attempt < maxAttempts) {
          console.log(`Versuch ${attempt} fehlgeschlagen, wiederhole in 300ms...`);
          setTimeout(() => attemptInitialization(attempt + 1, maxAttempts), 300);
        } else {
          console.error('QuickSearch konnte nach', maxAttempts, 'Versuchen nicht initialisiert werden');
          console.log('Debug Info:');
          console.log('- Container vorhanden:', !!document.querySelector('.quicksearch'));
          console.log('- jQuery verfügbar:', typeof (window as any).jQuery !== 'undefined');
          console.log('- QuickSearch verfügbar:', typeof (window as any).quicksearch !== 'undefined');
          console.log('- States:', { isJQueryLoaded, isQuickSearchLoaded });
        }
      };
      
      // Sofortige Prüfung und dann robuste Versuche
      ensureScriptsLoaded();
      const timer = setTimeout(() => {
        attemptInitialization();
      }, 100);

      return () => clearTimeout(timer);
    } else {
      // Cleanup bei Navigation weg von Startseite
      if (initializationRef.current) {
        console.log('Navigation weg von Startseite, bereinige QuickSearch');
        cleanupQuickSearchContainer();
        initializationRef.current = false;
        setIsInitialized(false);
      }
    }
  }, [pathname, isJQueryLoaded, isQuickSearchLoaded]);

  // Initialisierung wenn alle Skripte geladen sind mit Timeout-Schutz
  useEffect(() => {
    if (isJQueryLoaded && isQuickSearchLoaded && pathname === '/' && !initializationRef.current) {
      console.log('Alle Skripte geladen, starte Initialisierung...');
      const timer = setTimeout(() => {
        initializeQuickSearch();
      }, 500);
      return () => clearTimeout(timer);
    }
    
    // Timeout-Fallback: Wenn Skripte nach 10 Sekunden nicht geladen sind
    if (pathname === '/' && !initializationRef.current) {
      const timeoutTimer = setTimeout(() => {
        console.warn('Script-Loading-Timeout erreicht, prüfe Verfügbarkeit...');
        const jqueryAvailable = typeof (window as any).jQuery !== 'undefined';
        const quicksearchAvailable = typeof (window as any).quicksearch !== 'undefined';
        
        if (jqueryAvailable && !isJQueryLoaded) {
          console.log('jQuery verfügbar trotz Timeout, aktualisiere State');
          setIsJQueryLoaded(true);
        }
        if (quicksearchAvailable && !isQuickSearchLoaded) {
          console.log('QuickSearch verfügbar trotz Timeout, aktualisiere State');
          setIsQuickSearchLoaded(true);
        }
        
        // Versuche Initialisierung auch bei partieller Verfügbarkeit
        if (jqueryAvailable && quicksearchAvailable && !initializationRef.current) {
          console.log('Beide Skripte verfügbar, starte Timeout-Initialisierung');
          initializeQuickSearch();
        }
      }, 10000);
      
      return () => clearTimeout(timeoutTimer);
    }
  }, [isJQueryLoaded, isQuickSearchLoaded, pathname]);

  // Zusätzliche Überwachung der Script-Verfügbarkeit bei Navigation
  useEffect(() => {
    if (pathname === '/') {
      // Prüfe ob Skripte nach Navigation noch verfügbar sind
      const checkScripts = () => {
        const jqueryAvailable = typeof (window as any).jQuery !== 'undefined';
        const quicksearchAvailable = typeof (window as any).quicksearch !== 'undefined';
        
        console.log('Script-Verfügbarkeit nach Navigation:');
        console.log('- jQuery verfügbar:', jqueryAvailable);
        console.log('- QuickSearch verfügbar:', quicksearchAvailable);
        
        // Aktualisiere States falls Skripte verfügbar sind aber States falsch
        if (jqueryAvailable && !isJQueryLoaded) {
          console.log('jQuery ist verfügbar, aber State ist falsch - korrigiere');
          setIsJQueryLoaded(true);
        }
        if (quicksearchAvailable && !isQuickSearchLoaded) {
          console.log('QuickSearch ist verfügbar, aber State ist falsch - korrigiere');
          setIsQuickSearchLoaded(true);
        }
      };
      
      // Prüfe sofort und nach kurzer Verzögerung
      checkScripts();
      const timer = setTimeout(checkScripts, 300);
      
      return () => clearTimeout(timer);
    }
  }, [pathname, isJQueryLoaded, isQuickSearchLoaded]);

  // Externe Marketplace-Skripte blockieren und Script-Verfügbarkeit sicherstellen
  useEffect(() => {
    // Blockiere externe AMM/Marketplace-Skripte
    const blockExternalMarketplace = () => {
      // Überschreibe globale Funktionen die externe Skripte laden könnten
      if (typeof window !== 'undefined') {
        // Blockiere AMM-System
        (window as any).ammInfo = undefined;
        
        // Marketplace-Scripts sind auf der Fahrzeuge-Seite erwünscht
        console.log('Script-Blockierung für Marketplace deaktiviert');
      }
    };
    
    // Prüfe Script-Verfügbarkeit bei jeder Komponenten-Initialisierung
    const checkScriptAvailability = () => {
      if (typeof window !== 'undefined') {
        const jqueryAvailable = typeof (window as any).jQuery !== 'undefined';
        const quicksearchAvailable = typeof (window as any).quicksearch !== 'undefined';
        
        console.log('Initiale Script-Verfügbarkeit:');
        console.log('- jQuery:', jqueryAvailable);
        console.log('- QuickSearch:', quicksearchAvailable);
        
        // Aktualisiere States wenn Skripte bereits verfügbar sind
        if (jqueryAvailable) {
          setIsJQueryLoaded(true);
        }
        if (quicksearchAvailable) {
          setIsQuickSearchLoaded(true);
        }
      }
    };
    
    blockExternalMarketplace();
    checkScriptAvailability();
  }, []);
 
   // Cleanup bei Komponenten-Unmount
   useEffect(() => {
     return () => {
       if (initializationRef.current) {
         cleanupQuickSearchContainer();
         initializationRef.current = false;
       }
     };
   }, []);

  return (
    <>
      {/* jQuery laden - nur einmal, unabhängig von pathname */}
      <Script
        src="https://code.jquery.com/jquery-3.6.0.min.js"
        strategy="beforeInteractive"
        onLoad={() => {
          console.log('jQuery erfolgreich geladen');
          (window as any).$ = (window as any).jQuery;
          setIsJQueryLoaded(true);
        }}
        onError={(error) => {
          console.error('Fehler beim Laden von jQuery:', error);
          // Fallback: Prüfe ob jQuery bereits verfügbar ist
          setTimeout(() => {
            if (typeof (window as any).jQuery !== 'undefined') {
              console.log('jQuery bereits verfügbar (Fallback)');
              setIsJQueryLoaded(true);
            }
          }, 1000);
        }}
      />

      {/* QuickSearch Script laden - nur einmal, nach jQuery */}
      {isJQueryLoaded && (
        <Script
          src="/quicksearch-norequire_1.4.2.min.js"
          strategy="afterInteractive"
          onLoad={() => {
            console.log('QuickSearch Script erfolgreich geladen');
            setIsQuickSearchLoaded(true);
          }}
          onError={(error) => {
            console.error('Fehler beim Laden des QuickSearch Scripts:', error);
            // Fallback: Prüfe ob QuickSearch bereits verfügbar ist
            setTimeout(() => {
              if (typeof (window as any).quicksearch !== 'undefined') {
                console.log('QuickSearch bereits verfügbar (Fallback)');
                setIsQuickSearchLoaded(true);
              }
            }, 1000);
          }}
        />
      )}

      {/* QuickSearch Widget HTML */}
      <div 
        ref={widgetRef}
        className={`quicksearch relative ${className}`}
      >
        <section className="py-16 pb-24 md:pb-16 bg-gradient-to-br from-gray-50 to-gray-100 relative overflow-hidden">
          {/* Background decoration */}
          <div className="absolute top-0 right-0 w-96 h-96 bg-red-100 rounded-full -translate-y-48 translate-x-48 opacity-30"></div>
          <div className="absolute bottom-0 left-0 w-72 h-72 bg-blue-100 rounded-full translate-y-36 -translate-x-36 opacity-30"></div>
          
          <div className="container mx-auto px-6 relative z-10">
            <div className="max-w-6xl mx-auto">
              <div className="text-center mb-12">
                <h2 className="text-4xl font-bold text-gray-900 mb-4">
                  Finden Sie Ihr <span className="text-red-600 relative">
                    Traumauto
                    <div className="absolute -bottom-2 left-0 w-full h-1 bg-red-600 rounded-full"></div>
                  </span>
                </h2>
                <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                  Durchsuchen Sie unsere Premium-Fahrzeuge mit intelligenten Filtern
                </p>
              </div>
              
              {/* QuickSearch Widget HTML */}
              <div className="bg-white rounded-2xl shadow-2xl p-8 backdrop-blur-sm bg-white/95">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                  {/* Fahrzeugart */}
                  <div className="group">
                    <label htmlFor="fahrzeugart" className="block text-sm font-semibold text-gray-700 mb-3 group-hover:text-red-600 transition-colors">
                      <i className="ri-car-line mr-2"></i>Fahrzeugart
                    </label>
                    <select 
                      id="fahrzeugart" 
                      className="w-full p-4 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-red-500 focus:border-red-500 transition-all duration-300 hover:border-red-300 bg-white shadow-sm"
                    >
                      <option value="">Alle Fahrzeugarten</option>
                    </select>
                  </div>

                  {/* Hersteller */}
                  <div className="group">
                    <label htmlFor="hersteller" className="block text-sm font-semibold text-gray-700 mb-3 group-hover:text-red-600 transition-colors">
                      <i className="ri-building-line mr-2"></i>Hersteller
                    </label>
                    <select 
                      id="hersteller" 
                      className="w-full p-4 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-red-500 focus:border-red-500 transition-all duration-300 hover:border-red-300 bg-white shadow-sm"
                    >
                      <option value="">Alle Hersteller</option>
                    </select>
                  </div>

                  {/* Modell */}
                  <div className="group">
                    <label htmlFor="modell" className="block text-sm font-semibold text-gray-700 mb-3 group-hover:text-red-600 transition-colors">
                      <i className="ri-car-2-line mr-2"></i>Modell
                    </label>
                    <select 
                      id="modell" 
                      className="w-full p-4 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-red-500 focus:border-red-500 transition-all duration-300 hover:border-red-300 bg-white shadow-sm"
                    >
                      <option value="">Alle Modelle</option>
                    </select>
                  </div>

                  {/* Preis max */}
                  <div className="group">
                    <label htmlFor="preismax" className="block text-sm font-semibold text-gray-700 mb-3 group-hover:text-red-600 transition-colors">
                      <i className="ri-money-euro-circle-line mr-2"></i>Preis bis
                    </label>
                    <select 
                      id="preismax" 
                      className="w-full p-4 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-red-500 focus:border-red-500 transition-all duration-300 hover:border-red-300 bg-white shadow-sm"
                    >
                      <option value="">Alle Preise</option>
                      <option value="5000">5.000 €</option>
                      <option value="10000">10.000 €</option>
                      <option value="15000">15.000 €</option>
                      <option value="20000">20.000 €</option>
                      <option value="25000">25.000 €</option>
                      <option value="30000">30.000 €</option>
                      <option value="40000">40.000 €</option>
                      <option value="50000">50.000 €</option>
                      <option value="75000">75.000 €</option>
                      <option value="100000">100.000 €</option>
                    </select>
                  </div>

                  {/* Kilometer bis */}
                  <div className="group">
                    <label htmlFor="kilometerbis" className="block text-sm font-semibold text-gray-700 mb-3 group-hover:text-red-600 transition-colors">
                      <i className="ri-speedometer-line mr-2"></i>Kilometer bis
                    </label>
                    <select 
                      id="kilometerbis" 
                      className="w-full p-4 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-red-500 focus:border-red-500 transition-all duration-300 hover:border-red-300 bg-white shadow-sm"
                    >
                      <option value="">Alle Kilometer</option>
                      <option value="10000">10.000 km</option>
                      <option value="25000">25.000 km</option>
                      <option value="50000">50.000 km</option>
                      <option value="75000">75.000 km</option>
                      <option value="100000">100.000 km</option>
                      <option value="150000">150.000 km</option>
                      <option value="200000">200.000 km</option>
                    </select>
                  </div>

                  {/* Zulassung von */}
                  <div className="group">
                    <label htmlFor="zulassungvon" className="block text-sm font-semibold text-gray-700 mb-3 group-hover:text-red-600 transition-colors">
                      <i className="ri-calendar-line mr-2"></i>Zulassung von
                    </label>
                    <select 
                      id="zulassungvon" 
                      className="w-full p-4 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-red-500 focus:border-red-500 transition-all duration-300 hover:border-red-300 bg-white shadow-sm"
                    >
                      <option value="">Alle Jahre</option>
                    </select>
                  </div>

                  {/* Kraftstoff */}
                  <div className="group">
                    <label htmlFor="kraftstoff" className="block text-sm font-semibold text-gray-700 mb-3 group-hover:text-red-600 transition-colors">
                      <i className="ri-gas-station-line mr-2"></i>Kraftstoff
                    </label>
                    <select 
                      id="kraftstoff" 
                      className="w-full p-4 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-red-500 focus:border-red-500 transition-all duration-300 hover:border-red-300 bg-white shadow-sm"
                    >
                      <option value="">Alle Kraftstoffe</option>
                    </select>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex flex-col sm:flex-row gap-4 mt-8 justify-center">
                  {/* Suchen Button */}
                  <a 
                    id="carsearchlink"
                    href="/fahrzeuge"
                    className="bg-gradient-to-r from-red-600 to-red-700 text-white px-8 py-4 rounded-xl font-bold text-lg hover:from-red-700 hover:to-red-800 transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl flex items-center justify-center group"
                  >
                    <i className="ri-search-line mr-3 text-xl group-hover:animate-pulse"></i>
                    <span className="quicksearch-count">0</span> Fahrzeuge anzeigen
                  </a>

                  {/* Detailsuche Button */}
                  <a 
                    id="car-search-detail"
                    href="/fahrzeuge"
                    className="border-2 border-red-600 text-red-600 hover:bg-red-600 hover:text-white px-8 py-4 rounded-xl font-bold text-lg transition-all duration-300 shadow-lg hover:shadow-xl flex items-center justify-center group"
                  >
                    <i className="ri-filter-3-line mr-3 text-xl group-hover:animate-pulse"></i>
                    Erweiterte Suche
                  </a>

                  {/* Reset Button */}
                  <button 
                    id="car-search-reset"
                    type="button"
                    onClick={() => {
                      // Reset-Funktionalität
                      const selects = document.querySelectorAll('.quicksearch select');
                      selects.forEach(select => {
                        (select as HTMLSelectElement).selectedIndex = 0;
                      });
                      updateVehicleCount();
                    }}
                    className="bg-gray-100 text-gray-700 hover:bg-gray-200 px-6 py-4 rounded-xl font-semibold transition-all duration-300 shadow-lg hover:shadow-xl flex items-center justify-center group"
                  >
                    <i className="ri-refresh-line mr-2 text-lg group-hover:animate-spin"></i>
                    Zurücksetzen
                  </button>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}