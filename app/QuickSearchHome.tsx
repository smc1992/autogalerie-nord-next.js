'use client';

import { useEffect, useState, useMemo } from 'react';
import Script from 'next/script';
import { usePathname } from 'next/navigation';
import { useLanguage } from '../context/LanguageContext';

// QuickSearch Komponente für die Startseite
export default function QuickSearchHome() {
  const pathname = usePathname();
  const { language } = useLanguage();
  const [jQueryLoaded, setJQueryLoaded] = useState(false);
  const [quickSearchLoaded, setQuickSearchLoaded] = useState(false);
  const [initialized, setInitialized] = useState(false);

  const culture = useMemo(() => {
    const cultureMap: Record<string, string> = { de: 'de-DE', en: 'en-GB', es: 'es-ES', fr: 'fr-FR' };
    return cultureMap[language] || 'de-DE';
  }, [language]);
  
  // QuickSearch Konfiguration – dynamische Kultur aus LanguageContext
  const quickSearchConfig = useMemo(() => ({
    culture,
    url: 'https://vogelsang-automobile.de/fahrzeugsuche-komponente-dev/',
    target: '/vehicles',
    hash: '#!',
    hideOtherManufactueres: false,
    renameManufacturers: true,
    modelsWithoutFinds: 'hide',
    modelsWithCounter: false,
    sortManAlphabetic: false,
    api: {
      url: 'https://api.pixel-base.de/marketplace/v3-11365/',
      key: 'DEIN_API_KEY'
    }
  }), [culture]);

  // QuickSearch initialisieren, nachdem beide Skripte geladen wurden
  useEffect(() => {
    if (!jQueryLoaded || !quickSearchLoaded) return;
    if (pathname !== '/') return;

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
  }, [jQueryLoaded, quickSearchLoaded, pathname]);

  // QuickSearch initialisieren
  const initializeQuickSearch = () => {
    if (typeof window === 'undefined' || !window.quicksearch || pathname !== '/') return;

    try {
      // Alte Instanz zurücksetzen, falls vorhanden
      if (window.quicksearch.initialized) {
        if (window.quicksearch.destroy && typeof window.quicksearch.destroy === 'function') {
          window.quicksearch.destroy();
        } else if (window.quicksearch.reset && typeof window.quicksearch.reset === 'function') {
          window.quicksearch.reset();
        }
        window.quicksearch.initialized = false;
      }

      window.quicksearch.init(quickSearchConfig as any);
      window.quicksearch.initialized = true;
      setInitialized(true);
    } catch (error) {
      console.error('Fehler bei der Initialisierung von QuickSearch:', error);
    }
  };

  // Handler für Routenänderungen
  const handleRouteChange = () => {
    if (window.location.pathname === '/') {
      initializeQuickSearch();
    }
  };

  // Nur auf der Startseite die Skripte laden
  const isHomepage = pathname === '/';

  if (!isHomepage) {
    return null;
  }

  return (
    <div className="min-h-screen">
      {/* jQuery laden */}
      <Script
        src="https://code.jquery.com/jquery-3.6.0.min.js"
        strategy="beforeInteractive"
        onLoad={() => setJQueryLoaded(true)}
        onError={(e) => console.error('Fehler beim Laden von jQuery:', e)}
      />

      {/* QuickSearch laden, nachdem jQuery geladen wurde */}
      {jQueryLoaded && (
        <Script
          src="/quicksearch.js"
          strategy="afterInteractive"
          onLoad={() => setQuickSearchLoaded(true)}
          onError={(e) => console.error('Fehler beim Laden von QuickSearch:', e)}
        />
      )}

      {/* QuickSearch Marketplace Konfiguration ins Fenster injizieren */}
      {jQueryLoaded && quickSearchLoaded && (
        <Script id="quicksearch-marketplace-config" strategy="afterInteractive">
          {`
            window.marketplace = ${JSON.stringify(quickSearchConfig)};
          `}
        </Script>
      )}

      {/* QuickSearch Container */}
      <section className="py-12 bg-white">
        <div className="container mx-auto px-4">
          <div id="quicksearch-container" className="bg-gray-50 p-6 rounded-lg shadow-md">
            <div className="quicksearch-form"></div>
            <div className="quicksearch-results mt-6"></div>
          </div>
        </div>
      </section>
    </div>
  );
}
