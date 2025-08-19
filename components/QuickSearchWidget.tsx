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
          
          (window as any).quicksearch.init(config);
          
          // Nach der Initialisierung nochmals Links korrigieren
          setTimeout(() => {
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
          }, 1000);
          
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

  // Re-initialisierung bei Seitenwechsel
  const reinitializeQuickSearch = () => {
    if (typeof window === 'undefined') return;

    // Reset der Initialisierung
    initializationRef.current = false;
    setIsInitialized(false);

    // QuickSearch komplett zurücksetzen
    if ((window as any).quicksearch) {
      try {
        if (typeof (window as any).quicksearch.resetAll === 'function') {
          (window as any).quicksearch.resetAll();
        }
        // Fahrzeuganzahl zurücksetzen
        const countElements = document.querySelectorAll('.quicksearch-count');
        countElements.forEach(el => {
          el.textContent = '0';
        });
      } catch (error) {
        console.log('QuickSearch reset error:', error);
      }
    }

    // Kurze Verzögerung für DOM-Updates
    setTimeout(() => {
      initializeQuickSearch();
      // Nach Initialisierung Fahrzeuganzahl neu laden
      setTimeout(() => {
        updateVehicleCount();
      }, 500);
    }, 100);
  };

  // Fahrzeuganzahl aktualisieren
  const updateVehicleCount = () => {
    if (typeof window === 'undefined') return;

    try {
      // API-Aufruf für Fahrzeuganzahl
      const apiUrl = `https://api.pixel-base.de/marketplace/v3-11365/vehicles/count/?apikey=${API_KEY}`;
      
      fetch(apiUrl)
        .then(response => response.json())
        .then(data => {
          const count = data.count || data.total || 0;
          const countElements = document.querySelectorAll('.quicksearch-count');
          countElements.forEach(el => {
            el.textContent = count.toString();
          });
          console.log('Fahrzeuganzahl aktualisiert:', count);
        })
        .catch(error => {
          console.error('Fehler beim Laden der Fahrzeuganzahl:', error);
          // Fallback: Standard-Anzahl anzeigen
          const countElements = document.querySelectorAll('.quicksearch-count');
          countElements.forEach(el => {
            el.textContent = '70';
          });
        });
    } catch (error) {
      console.error('Fehler bei updateVehicleCount:', error);
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

  // Überwachung von Seitenwechseln
  useEffect(() => {
    if (isMounted && isJQueryLoaded && isQuickSearchLoaded) {
      console.log('Seitenwechsel erkannt, re-initialisiere QuickSearch');
      reinitializeQuickSearch();
      // Zusätzliche forcierte Aktualisierung
      setTimeout(() => {
        forceUpdateVehicleCount();
      }, 1000);
    }
  }, [pathname, isJQueryLoaded, isQuickSearchLoaded, isMounted]);

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