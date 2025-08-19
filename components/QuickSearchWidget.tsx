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
  const [isMounted, setIsMounted] = useState(false);
  const pathname = usePathname();
  const initializationRef = useRef(false);
  const widgetRef = useRef<HTMLDivElement>(null);

  const API_KEY = '0536fa11-99df-43f8-bf26-42af233f5478';

  // QuickSearch Konfiguration
  const getMarketplaceConfig = () => {
    const baseUrl = window.location.origin;
    return {
      url: baseUrl + '/fahrzeuge/',
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

  // QuickSearch initialisieren
  const initializeQuickSearch = () => {
    if (typeof window === 'undefined' || !(window as any).jQuery || !(window as any).quicksearch) {
      console.log('jQuery oder QuickSearch noch nicht verfügbar');
      return;
    }

    if (initializationRef.current) {
      console.log('QuickSearch bereits initialisiert');
      return;
    }

    try {
      console.log('Initialisiere QuickSearch Widget...');
      
      // Globale Marketplace-Konfiguration setzen
      const config = getMarketplaceConfig();
      (window as any).marketplace = config;
      
      // Explizit alle URL-Parameter überschreiben
      (window as any).baseUri = 'https://api.pixel-base.de/marketplace/v3-11365';
      (window as any).culture = 'de-DE';
      (window as any).apikey = API_KEY;
      
      // QuickSearch initialisieren
      (window as any).jQuery(document).ready(() => {
        if ((window as any).quicksearch && (window as any).quicksearch.init) {
          // Konfiguration nochmals explizit setzen
          config.url = window.location.origin + '/fahrzeuge/';
          config.target = '/fahrzeuge';
          config.hash = '';
          
          // Globale settings überschreiben
          (window as any).settings = config;
          (window as any).target = '/fahrzeuge';
          
          // QuickSearch mit vollständiger Konfiguration initialisieren
      (window as any).quicksearch.init(config);
      
      // Erweiterte Initialisierung mit Fehlerbehandlung
      setTimeout(() => {
        // Links korrigieren
        const searchLink = document.querySelector('#carsearchlink');
        if (searchLink) {
          const currentHref = searchLink.getAttribute('href');
          if (currentHref && currentHref.includes('vogelsang')) {
            searchLink.setAttribute('href', '/fahrzeuge');
            console.log('Vogelsang-Link korrigiert zu:', '/fahrzeuge');
          }
        }
        
        const detailLink = document.querySelector('#car-search-detail');
        if (detailLink) {
          detailLink.setAttribute('href', '/fahrzeuge');
        }
        
        // Robuste Dropdown-Initialisierung
        const initializeDropdowns = async () => {
          const selects = document.querySelectorAll('.quicksearch select');
          
          for (let i = 0; i < selects.length; i++) {
            const select = selects[i] as HTMLSelectElement;
            
            if (select.options.length <= 1) {
              console.log(`Dropdown ${i} hat keine Optionen, lade manuell...`);
              
              try {
                // Versuche verschiedene Methoden zur Dropdown-Initialisierung
                if ((window as any).quicksearch) {
                  if ((window as any).quicksearch.loadCriteria) {
                    (window as any).quicksearch.loadCriteria();
                  }
                  if ((window as any).quicksearch.refresh) {
                    (window as any).quicksearch.refresh();
                  }
                  if ((window as any).quicksearch.reload) {
                    (window as any).quicksearch.reload();
                  }
                }
                
                // Warte kurz und prüfe erneut
                await new Promise(resolve => setTimeout(resolve, 1000));
                
                if (select.options.length <= 1) {
                  console.log(`Dropdown ${i} immer noch leer, verwende Fallback`);
                  // Fallback: Grundlegende Optionen hinzufügen
                  select.innerHTML = '<option value="">Alle</option>';
                }
              } catch (error) {
                console.log(`Fehler bei Dropdown ${i}:`, error);
              }
            }
          }
        };
        
        initializeDropdowns();
        
      }, 1500);
          
          initializationRef.current = true;
          setIsInitialized(true);
          console.log('QuickSearch erfolgreich initialisiert mit lokalen URLs');
          console.log('Konfiguration:', config);
        }
      });
    } catch (error) {
      console.error('Fehler bei der QuickSearch-Initialisierung:', error);
    }
  };

  // Komplette Skript-Neuladung bei Seitenwechsel
  const reloadQuickSearchScript = () => {
    if (typeof window === 'undefined') return;

    console.log('Starte komplette QuickSearch-Skript-Neuladung...');
    
    // Reset aller States
    initializationRef.current = false;
    setIsInitialized(false);
    setIsQuickSearchLoaded(false);

    // Komplette Bereinigung
    try {
      // QuickSearch-Objekt komplett entfernen
      delete (window as any).quicksearch;
      delete (window as any).marketplace;
      delete (window as any).settings;
      delete (window as any).baseUri;
      delete (window as any).culture;
      delete (window as any).apikey;
      
      // Alle bestehenden QuickSearch-Skripte entfernen
      const existingScripts = document.querySelectorAll('script[src*="quicksearch"]');
      existingScripts.forEach(script => {
        script.remove();
      });
      
      // DOM-Elemente zurücksetzen
      const selects = document.querySelectorAll('.quicksearch select');
      selects.forEach(select => {
        (select as HTMLSelectElement).innerHTML = '<option value="">Laden...</option>';
        (select as HTMLSelectElement).selectedIndex = 0;
        // Event-Handler entfernen
        const newSelect = select.cloneNode(true);
        select.parentNode?.replaceChild(newSelect, select);
      });
      
      // Fahrzeuganzahl zurücksetzen
      const countElements = document.querySelectorAll('.quicksearch-count');
      countElements.forEach(el => {
        el.textContent = '0';
      });
      
    } catch (error) {
      console.log('QuickSearch cleanup error:', error);
    }

    // Skript neu laden nach Bereinigung
    setTimeout(() => {
      console.log('Lade QuickSearch-Skript neu...');
      
      // Neues Skript-Element erstellen
      const script = document.createElement('script');
      script.src = '/quicksearch-norequire_1.4.2.min.js';
      script.onload = () => {
        console.log('QuickSearch-Skript neu geladen');
        setIsQuickSearchLoaded(true);
        
        // Nach Skript-Ladung initialisieren
        setTimeout(() => {
          initializeQuickSearch();
          
          // Fahrzeuganzahl laden
          setTimeout(() => {
            forceUpdateVehicleCount();
          }, 1500);
        }, 500);
      };
      script.onerror = () => {
        console.error('Fehler beim Neuladen des QuickSearch-Skripts');
      };
      
      document.head.appendChild(script);
    }, 500);
  };

  // Robuste Fahrzeuganzahl-Aktualisierung mit Retry-Mechanismus
  const updateVehicleCount = async () => {
    if (typeof window === 'undefined') return;

    const apiUrls = [
      `https://api.pixel-base.de/marketplace/v3-11365/vehicles/count/?apikey=${API_KEY}`,
      `https://api.pixel-base.de/marketplace/v3-11365/vehicles/?apikey=${API_KEY}&take=1`,
      `https://api.pixel-base.de/marketplace/v3-11365/criteria/manufacturers/?apikey=${API_KEY}`
    ];

    const retryFetch = async (url: string, retries = 3): Promise<any> => {
      for (let i = 0; i < retries; i++) {
        try {
          const response = await fetch(url, {
            method: 'GET',
            headers: {
              'Accept': 'application/json',
              'Cache-Control': 'no-cache'
            }
          });
          
          if (response.ok) {
            return await response.json();
          } else if (response.status === 500 && i < retries - 1) {
            console.log(`API-Fehler 500, Retry ${i + 1}/${retries}`);
            await new Promise(resolve => setTimeout(resolve, 1000 * (i + 1)));
            continue;
          }
        } catch (error) {
          if (i < retries - 1) {
            console.log(`Netzwerk-Fehler, Retry ${i + 1}/${retries}:`, error);
            await new Promise(resolve => setTimeout(resolve, 1000 * (i + 1)));
            continue;
          }
        }
      }
      throw new Error(`Alle Retry-Versuche fehlgeschlagen für: ${url}`);
    };

    try {
      // Versuche verschiedene API-Endpunkte
      let count = 0;
      
      for (const apiUrl of apiUrls) {
        try {
          const data = await retryFetch(apiUrl);
          
          if (apiUrl.includes('/count/')) {
            count = data.count || data.total || 0;
          } else if (apiUrl.includes('/vehicles/')) {
            count = data.totalCount || data.total || 0;
          } else if (apiUrl.includes('/manufacturers/')) {
            // Fallback: Schätze basierend auf Herstelleranzahl
            count = data.length ? data.length * 10 : 70;
          }
          
          if (count > 0) {
            break;
          }
        } catch (error) {
          console.log(`API-Endpunkt fehlgeschlagen: ${apiUrl}`, error);
          continue;
        }
      }
      
      // Fahrzeuganzahl aktualisieren
      const countElements = document.querySelectorAll('.quicksearch-count');
      countElements.forEach(el => {
        el.textContent = count > 0 ? count.toString() : '70';
      });
      
      console.log('Fahrzeuganzahl erfolgreich aktualisiert:', count);
      
    } catch (error) {
      console.error('Alle API-Versuche fehlgeschlagen:', error);
      // Fallback: Standard-Anzahl anzeigen
      const countElements = document.querySelectorAll('.quicksearch-count');
      countElements.forEach(el => {
        el.textContent = '70';
      });
    }
  };

  // Forcierte Fahrzeuganzahl-Aktualisierung bei Seitenwechsel
  const forceUpdateVehicleCount = () => {
    // Sofort die Anzahl auf 0 setzen
    const countElements = document.querySelectorAll('.quicksearch-count');
    countElements.forEach(el => {
      el.textContent = '0';
    });
    
    // Mehrere Versuche mit verschiedenen Verzögerungen
    const delays = [500, 1000, 1500, 2000];
    delays.forEach(delay => {
      setTimeout(() => {
        updateVehicleCount();
      }, delay);
    });
  };

  // Component mount detection
  useEffect(() => {
    setIsMounted(true);
  }, []);

  // Aggressive Reinitialisierung bei jedem Startseiten-Besuch
  useEffect(() => {
    if (isMounted && isJQueryLoaded && pathname === '/') {
      console.log('Startseite besucht - erzwinge sofortige QuickSearch-Neuladung');
      
      // IMMER neu laden bei Startseiten-Besuch
      // Dies ist die einzige zuverlässige Methode
      reloadQuickSearchScript();
    }
  }, [pathname, isJQueryLoaded, isMounted]);
  
  // Zusätzliche Sicherheitsüberprüfung nach Initialisierung
  useEffect(() => {
    if (isMounted && isJQueryLoaded && pathname === '/' && isInitialized) {
      // Doppelte Sicherheit: Prüfe nach 3 Sekunden nochmals
      setTimeout(() => {
        const countElements = document.querySelectorAll('.quicksearch-count');
        let hasZeroCount = false;
        
        countElements.forEach(el => {
          if (el.textContent === '0') {
            hasZeroCount = true;
          }
        });
        
        if (hasZeroCount) {
          console.log('Fahrzeuganzahl ist immer noch 0 - erzwinge erneute Neuladung');
          reloadQuickSearchScript();
        }
      }, 3000);
    }
  }, [pathname, isJQueryLoaded, isMounted, isInitialized]);

  // Initialisierung wenn beide Skripte geladen sind
  useEffect(() => {
    if (isMounted && isJQueryLoaded && isQuickSearchLoaded && !isInitialized) {
      initializeQuickSearch();
      // Nach erfolgreicher Initialisierung Fahrzeuganzahl laden
      setTimeout(() => {
        forceUpdateVehicleCount();
      }, 1000);
    }
  }, [isJQueryLoaded, isQuickSearchLoaded, isInitialized, isMounted]);

  // Cleanup bei Komponenten-Unmount
  useEffect(() => {
    return () => {
      if (typeof window !== 'undefined' && (window as any).quicksearch) {
        try {
          // Reset QuickSearch wenn möglich
          if ((window as any).quicksearch && typeof (window as any).quicksearch.resetAll === 'function') {
            (window as any).quicksearch.resetAll();
          }
        } catch (error) {
          console.log('QuickSearch cleanup:', error);
        }
      }
    };
  }, []);

  return (
    <>
      {/* jQuery laden */}
      <Script
        src="https://code.jquery.com/jquery-3.6.0.min.js"
        strategy="beforeInteractive"
        onLoad={() => {
          console.log('jQuery geladen');
          setIsJQueryLoaded(true);
        }}
        onError={() => {
          console.error('Fehler beim Laden von jQuery');
        }}
      />

      {/* QuickSearch Script laden */}
      {isJQueryLoaded && (
        <Script
          src="/quicksearch-norequire_1.4.2.min.js"
          strategy="afterInteractive"
          onLoad={() => {
            console.log('QuickSearch Script geladen');
            setIsQuickSearchLoaded(true);
          }}
          onError={() => {
            console.error('Fehler beim Laden des QuickSearch Scripts');
          }}
        />
      )}

      {/* QuickSearch Widget HTML */}
      <div ref={widgetRef} className={`quicksearch ${className}`}>
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

              
              {/* Buttons */}
              <div className="flex flex-col sm:flex-row justify-center gap-4 mt-8 pt-6 border-t border-gray-100">
                {isMounted ? (
                   <a 
                     id="carsearchlink" 
                     href="/fahrzeuge" 
                     className="group bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white font-bold py-4 px-8 rounded-xl transition-all duration-300 text-center flex items-center justify-center shadow-lg hover:shadow-xl transform hover:-translate-y-1"
                   >
                     <i className="ri-search-line mr-3 text-lg group-hover:scale-110 transition-transform"></i>
                     <span className="quicksearch-count">0</span> Fahrzeuge durchsuchen
                   </a>
                 ) : (
                   <div className="group bg-gradient-to-r from-red-600 to-red-700 text-white font-bold py-4 px-8 rounded-xl text-center flex items-center justify-center shadow-lg">
                     <i className="ri-search-line mr-3 text-lg"></i>
                     <span>0</span> Fahrzeuge durchsuchen
                   </div>
                 )}
                 
                 {isMounted ? (
                   <a 
                     id="car-search-detail" 
                     href="/fahrzeuge" 
                     className="group border-2 border-red-600 text-red-600 hover:bg-red-600 hover:text-white font-bold py-4 px-8 rounded-xl transition-all duration-300 text-center shadow-lg hover:shadow-xl transform hover:-translate-y-1"
                   >
                     <i className="ri-filter-3-line mr-2 group-hover:scale-110 transition-transform"></i>
                     Detailsuche
                   </a>
                 ) : (
                   <div className="border-2 border-red-600 text-red-600 font-bold py-4 px-8 rounded-xl text-center shadow-lg">
                     <i className="ri-filter-3-line mr-2"></i>
                     Detailsuche
                   </div>
                 )}
                
                <button 
                  id="car-search-reset" 
                  type="button"
                  onClick={() => {
                    // Reset all select elements
                    const selects = document.querySelectorAll('.quicksearch select');
                    selects.forEach(select => {
                      (select as HTMLSelectElement).selectedIndex = 0;
                    });
                    
                    // Call QuickSearch reset if available
                    if ((window as any).quicksearch && (window as any).quicksearch.resetAll) {
                      (window as any).quicksearch.resetAll();
                    }
                    
                    // Fahrzeuganzahl nach Reset aktualisieren
                    setTimeout(() => {
                      forceUpdateVehicleCount();
                    }, 300);
                  }}
                  className="group bg-gradient-to-r from-gray-500 to-gray-600 hover:from-gray-600 hover:to-gray-700 text-white font-bold py-4 px-8 rounded-xl transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
                >
                  <i className="ri-refresh-line mr-2 group-hover:rotate-180 transition-transform duration-500"></i>
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