'use client';

import React, { useEffect, useRef, useState } from 'react';
import { usePathname } from 'next/navigation';

interface QuickSearchWidgetProps {
  className?: string;
}

export default function QuickSearchWidget({ className = '' }: QuickSearchWidgetProps) {
  const [isMounted, setIsMounted] = useState(false);
  const [isInitialized, setIsInitialized] = useState(false);
  const widgetRef = useRef<HTMLDivElement>(null);
  const pathname = usePathname();

  const API_KEY = '0536fa11-99df-43f8-bf26-42af233f5478';

  // Fahrzeuganzahl aktualisieren
  const updateVehicleCount = async () => {
    if (typeof window === 'undefined') return;

    try {
      const response = await fetch(`https://api.pixel-base.de/marketplace/v3-11365/vehicles/count/?apikey=${API_KEY}`);
      const data = await response.json();
      const count = data.count || data.total || 70;
      
      const countElements = document.querySelectorAll('.quicksearch-count');
      countElements.forEach(el => {
        el.textContent = count.toString();
      });
      
      console.log('Fahrzeuganzahl aktualisiert:', count);
    } catch (error) {
      console.error('Fehler beim Laden der Fahrzeuganzahl:', error);
      const countElements = document.querySelectorAll('.quicksearch-count');
      countElements.forEach(el => {
        el.textContent = '70';
      });
    }
  };

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    // Cleanup-Funktion nach FahrzeugeClient-Vorbild
    const cleanup = () => {
      // Bestehende Skripte entfernen
      const existingScripts = document.querySelectorAll('script[src*="quicksearch"], script[src*="jquery"]');
      existingScripts.forEach(script => script.remove());

      // QuickSearch-Globals bereinigen
      if (typeof window !== 'undefined' && (window as any).jQuery) {
        try {
          (window as any).jQuery('.quicksearch').empty();
          (window as any).jQuery(window).off('.quicksearch');
          (window as any).jQuery(document).off('.quicksearch');
        } catch (e) {
          console.log('jQuery cleanup übersprungen');
        }
      }

      // QuickSearch-Objekte löschen
      if (typeof window !== 'undefined') {
        delete (window as any).quicksearch;
        delete (window as any).marketplace;
        delete (window as any).baseUri;
        delete (window as any).culture;
        delete (window as any).apikey;
      }
    };

    // QuickSearch initialisieren (nach FahrzeugeClient-Muster)
    const initializeQuickSearch = async () => {
      try {
        cleanup();

        // Warten bis DOM bereit ist
        if (document.readyState !== 'complete') {
          await new Promise<void>(resolve => {
            const handleLoad = () => {
              window.removeEventListener('load', handleLoad);
              resolve();
            };
            window.addEventListener('load', handleLoad);
          });
        }

        // jQuery laden falls nicht vorhanden
        if (typeof window !== 'undefined' && !(window as any).jQuery) {
          await new Promise<void>((resolve, reject) => {
            const script = document.createElement('script');
            script.src = 'https://code.jquery.com/jquery-3.6.0.min.js';
            script.crossOrigin = 'anonymous';
            script.integrity = 'sha256-/xUj+3OJU5yExlq6GSYGSHk7tPXikynS7ogEvDej/m4=';
            script.onload = () => {
              (window as any).$ = (window as any).jQuery;
              console.log('jQuery erfolgreich geladen');
              resolve();
            };
            script.onerror = (error) => {
              console.error('Fehler beim Laden von jQuery:', error);
              reject(error);
            };
            document.head.appendChild(script);
          });
        }

        // QuickSearch-Skript laden
        await new Promise<void>((resolve, reject) => {
          const script = document.createElement('script');
          script.src = '/quicksearch-norequire_1.4.2.min.js';
          script.async = true;

          const timeout = setTimeout(() => {
            console.error('QuickSearch-Skript Timeout');
            reject(new Error('Script loading timeout'));
          }, 10000);

          script.onload = () => {
            clearTimeout(timeout);
            console.log('QuickSearch-Skript erfolgreich geladen');
            setTimeout(() => {
              resolve();
            }, 1000);
          };

          script.onerror = (error) => {
            clearTimeout(timeout);
            console.error('QuickSearch-Skript Fehler:', error);
            reject(error);
          };

          document.head.appendChild(script);
        });

        // QuickSearch konfigurieren und initialisieren
        if (typeof window !== 'undefined' && (window as any).quicksearch) {
          const config = {
            url: window.location.origin + '/fahrzeuge/',
            renameManufacturers: true,
            culture: 'de-DE',
            hideOtherManufactueres: false,
            modelsWithoutFinds: 'hide',
            modelsWithCounter: false,
            sortManAlphabetic: false,
            target: '/fahrzeuge',
            hash: '',
            api: {
              url: 'https://api.pixel-base.de/marketplace/v3-11365/',
              key: API_KEY
            }
          };

          // Globale Variablen setzen
          (window as any).marketplace = config;
          (window as any).baseUri = config.api.url;
          (window as any).culture = config.culture;
          (window as any).apikey = config.api.key;

          // jQuery document ready verwenden
          (window as any).jQuery(document).ready(() => {
            try {
              (window as any).quicksearch.init(config);
              console.log('QuickSearch erfolgreich initialisiert');
              setIsInitialized(true);
              
              // Fahrzeuganzahl nach Initialisierung laden
              setTimeout(() => {
                updateVehicleCount();
              }, 2000);
            } catch (error) {
              console.error('Fehler bei QuickSearch-Initialisierung:', error);
            }
          });
        }

        console.log('QuickSearch-Initialisierung abgeschlossen');

      } catch (error) {
        console.error('Fehler bei QuickSearch-Initialisierung:', error);
      }
    };

    // Nur auf Startseite initialisieren
    if (isMounted && pathname === '/') {
      const initTimer = setTimeout(() => {
        initializeQuickSearch();
      }, 100);

      return () => {
        clearTimeout(initTimer);
        cleanup();
      };
    }
  }, [pathname, isMounted]);

  // Zusätzliche Sicherheitsüberprüfung für Fahrzeuganzahl
  useEffect(() => {
    if (isMounted && pathname === '/' && isInitialized) {
      // Prüfe nach 3 Sekunden ob Fahrzeuganzahl korrekt angezeigt wird
      const checkTimer = setTimeout(() => {
        const countElements = document.querySelectorAll('.quicksearch-count');
        let hasZeroCount = false;
        
        countElements.forEach(el => {
          if (el.textContent === '0') {
            hasZeroCount = true;
          }
        });
        
        if (hasZeroCount) {
          console.log('Fahrzeuganzahl ist immer noch 0 - aktualisiere erneut');
          updateVehicleCount();
        }
      }, 3000);
      
      return () => clearTimeout(checkTimer);
    }
  }, [pathname, isMounted, isInitialized]);

  // Cleanup bei Komponenten-Unmount
  useEffect(() => {
    return () => {
      if (typeof window !== 'undefined') {
        // QuickSearch-Objekte bereinigen
        delete (window as any).quicksearch;
        delete (window as any).marketplace;
        delete (window as any).baseUri;
        delete (window as any).culture;
        delete (window as any).apikey;
      }
    };
  }, []);

  return (
    <div 
      ref={widgetRef}
      className={`quicksearch relative ${className}`}
    >
      {/* QuickSearch Widget HTML - Dokumentations-konforme Struktur */}
      <div className="bg-white rounded-2xl shadow-2xl p-8 backdrop-blur-sm bg-white/95">
        {/* QuickSearch-konforme HTML-Struktur - DIREKT im .quicksearch Container */}
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
              // QuickSearch resetAll verwenden (offizielle Methode)
              if ((window as any).quicksearch && (window as any).quicksearch.resetAll) {
                (window as any).quicksearch.resetAll();
                console.log('QuickSearch resetAll() aufgerufen');
              } else {
                // Fallback: Manuelle Reset der Select-Elemente
                const selects = document.querySelectorAll('.quicksearch select');
                selects.forEach(select => {
                  (select as HTMLSelectElement).selectedIndex = 0;
                });
              }
              
              // Fahrzeuganzahl nach Reset aktualisieren
              setTimeout(() => {
                if ((window as any).quicksearch && (window as any).quicksearch.update) {
                  (window as any).quicksearch.update();
                } else {
                  updateVehicleCount();
                }
              }, 300);
            }}
            className="bg-gray-100 text-gray-700 hover:bg-gray-200 px-6 py-4 rounded-xl font-semibold transition-all duration-300 shadow-lg hover:shadow-xl flex items-center justify-center group"
          >
            <i className="ri-refresh-line mr-2 text-lg group-hover:animate-spin"></i>
            Zurücksetzen
          </button>
        </div>
      </div>
    </div>
  );
}