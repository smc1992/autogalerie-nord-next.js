
'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

interface CookieConsent {
  necessary: boolean;
  analytics: boolean;
  marketing: boolean;
  preferences: boolean;
}

export default function CookieBanner() {
  const [showBanner, setShowBanner] = useState(false);
  const [showDetails, setShowDetails] = useState(false);
  const [consent, setConsent] = useState<CookieConsent>({
    necessary: true,
    analytics: false,
    marketing: false,
    preferences: false
  });

  useEffect(() => {
    const savedConsent = localStorage.getItem('cookie-consent');
    if (!savedConsent) {
      setShowBanner(true);
    } else {
      const parsed = JSON.parse(savedConsent);
      setConsent(parsed);
      loadScripts(parsed);
    }
  }, []);

  const loadScripts = (consentData: CookieConsent) => {
    if (consentData.analytics) {
      // Google Analytics
      const gtag = document.createElement('script');
      gtag.async = true;
      gtag.src = 'https://www.googletagmanager.com/gtag/js?id=GA_MEASUREMENT_ID';
      document.head.appendChild(gtag);

      const gtagConfig = document.createElement('script');
      gtagConfig.innerHTML = `
        window.dataLayer = window.dataLayer || [];
        function gtag(){dataLayer.push(arguments);}
        gtag('js', new Date());
        gtag('config', 'GA_MEASUREMENT_ID');
      `;
      document.head.appendChild(gtagConfig);
    }

    if (consentData.marketing) {
      // Facebook Pixel
      const fbPixel = document.createElement('script');
      fbPixel.innerHTML = `
        !function(f,b,e,v,n,t,s)
        {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
        n.callMethod.apply(n,arguments):n.queue.push(arguments)};
        if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
        n.queue=[];t=b.createElement(e);t.async=!0;
        t.src=v;s=b.getElementsByTagName(e)[0];
        s.parentNode.insertBefore(t,s)}(window, document,'script',
        'https://connect.facebook.net/en_US/fbevents.js');
        fbq('init', 'YOUR_PIXEL_ID');
        fbq('track', 'PageView');
      `;
      document.head.appendChild(fbPixel);
    }
  };

  const handleAcceptAll = () => {
    const allConsent = {
      necessary: true,
      analytics: true,
      marketing: true,
      preferences: true
    };
    setConsent(allConsent);
    localStorage.setItem('cookie-consent', JSON.stringify(allConsent));
    loadScripts(allConsent);
    setShowBanner(false);
  };

  const handleRejectAll = () => {
    const minimalConsent = {
      necessary: true,
      analytics: false,
      marketing: false,
      preferences: false
    };
    setConsent(minimalConsent);
    localStorage.setItem('cookie-consent', JSON.stringify(minimalConsent));
    setShowBanner(false);
  };

  const handleSavePreferences = () => {
    localStorage.setItem('cookie-consent', JSON.stringify(consent));
    loadScripts(consent);
    setShowBanner(false);
    setShowDetails(false);
  };

  const handleConsentChange = (type: keyof CookieConsent) => {
    if (type === 'necessary') return;
    setConsent(prev => ({
      ...prev,
      [type]: !prev[type]
    }));
  };

  if (!showBanner) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg shadow-xl p-6 w-full max-w-4xl">
        {!showDetails ? (
          <div className="p-6">
            <div className="flex items-start justify-between mb-4">
              <div className="w-8 h-8 flex items-center justify-center">
                <i className="ri-cookie-line text-2xl text-blue-600"></i>
              </div>
              <button
                onClick={() => setShowBanner(false)}
                className="w-8 h-8 flex items-center justify-center text-gray-400 hover:text-gray-600"
                aria-label="Cookie-Banner schließen"
              >
                <i className="ri-close-line text-xl"></i>
              </button>
            </div>
            
            <h3 className="text-xl font-bold text-gray-900 mb-3">
              Wir verwenden Cookies
            </h3>
            
            <p className="text-gray-600 mb-4 leading-relaxed">
              Wir verwenden Cookies und ähnliche Technologien, um Ihnen die bestmögliche Nutzererfahrung zu bieten. 
              Dazu gehören technisch notwendige Cookies sowie optionale Cookies für Analyse und Marketing. 
              Sie können Ihre Einstellungen jederzeit anpassen.
            </p>

            <div className="bg-gray-50 rounded-lg p-4 mb-6">
              <h4 className="font-semibold text-gray-900 mb-2">Verwendete Services:</h4>
              <div className="grid grid-cols-2 gap-2 text-sm text-gray-600">
                <div>• Google Fonts</div>
                <div>• Google Analytics</div>
                <div>• Facebook Pixel</div>
                <div>• Automanager Integration</div>
                <div>• Google Maps</div>
                <div>• Technische Cookies</div>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-3">
              <button
                onClick={handleAcceptAll}
                className="bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors whitespace-nowrap"
              >
                Alle akzeptieren
              </button>
              
              <button
                onClick={() => setShowDetails(true)}
                className="border border-gray-300 text-gray-700 px-6 py-3 rounded-lg font-semibold hover:bg-gray-50 transition-colors whitespace-nowrap"
              >
                Einstellungen
              </button>
              
              <button
                onClick={handleRejectAll}
                className="text-gray-600 px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors whitespace-nowrap"
              >
                Nur notwendige
              </button>
            </div>

            <p className="text-xs text-gray-500 mt-4">
              Weitere Informationen finden Sie in unserer{' '}
              <Link href="/datenschutz" className="text-blue-600 hover:underline">
                Datenschutzerklärung
              </Link>
            </p>
          </div>
        ) : (
          <div className="p-6 max-h-[80vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-bold text-gray-900">Cookie-Einstellungen</h3>
              <button
                onClick={() => setShowDetails(false)}
                className="w-8 h-8 flex items-center justify-center text-gray-400 hover:text-gray-600"
                aria-label="Zurück zu Cookie-Banner"
              >
                <i className="ri-arrow-left-line text-xl"></i>
              </button>
            </div>

            <div className="space-y-6">
              <div className="border border-gray-200 rounded-lg p-4">
                <div className="flex items-center justify-between mb-2">
                  <h4 className="font-semibold text-gray-900">Notwendige Cookies</h4>
                  <div className="bg-green-100 text-green-800 px-2 py-1 rounded text-xs font-medium">
                    Immer aktiv
                  </div>
                </div>
                <p className="text-sm text-gray-600 mb-3">
                  Diese Cookies sind für das ordnungsgemäße Funktionieren der Website erforderlich und können nicht deaktiviert werden.
                </p>
                <div className="text-xs text-gray-500">
                  <strong>Verwendet für:</strong> Session-Management, Sicherheit, Grundfunktionen
                </div>
              </div>

              <div className="border border-gray-200 rounded-lg p-4">
                <div className="flex items-center justify-between mb-2">
                  <h4 className="font-semibold text-gray-900">Analyse-Cookies</h4>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={consent.analytics}
                      onChange={() => handleConsentChange('analytics')}
                      className="sr-only peer"
                    />
                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                  </label>
                </div>
                <p className="text-sm text-gray-600 mb-3">
                  Helfen uns zu verstehen, wie Besucher mit der Website interagieren, um die Benutzererfahrung zu verbessern.
                </p>
                <div className="text-xs text-gray-500">
                  <strong>Services:</strong> Google Analytics, Besucherstatistiken
                </div>
              </div>

              <div className="border border-gray-200 rounded-lg p-4">
                <div className="flex items-center justify-between mb-2">
                  <h4 className="font-semibold text-gray-900">Marketing-Cookies</h4>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={consent.marketing}
                      onChange={() => handleConsentChange('marketing')}
                      className="sr-only peer"
                    />
                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                  </label>
                </div>
                <p className="text-sm text-gray-600 mb-3">
                  Werden verwendet, um Ihnen relevante Werbung zu zeigen und die Effektivität von Werbekampagnen zu messen.
                </p>
                <div className="text-xs text-gray-500">
                  <strong>Services:</strong> Facebook Pixel, Remarketing, Werbeanzeigen
                </div>
              </div>

              <div className="border border-gray-200 rounded-lg p-4">
                <div className="flex items-center justify-between mb-2">
                  <h4 className="font-semibold text-gray-900">Präferenz-Cookies</h4>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={consent.preferences}
                      onChange={() => handleConsentChange('preferences')}
                      className="sr-only peer"
                    />
                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                  </label>
                </div>
                <p className="text-sm text-gray-600 mb-3">
                  Speichern Ihre Einstellungen und Präferenzen, um Ihnen eine personalisierte Erfahrung zu bieten.
                </p>
                <div className="text-xs text-gray-500">
                  <strong>Verwendet für:</strong> Spracheinstellungen, Layout-Präferenzen
                </div>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-3 mt-8 pt-6 border-t border-gray-200">
              <button
                onClick={handleSavePreferences}
                className="bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors whitespace-nowrap"
              >
                Auswahl speichern
              </button>
              
              <button
                onClick={handleAcceptAll}
                className="border border-gray-300 text-gray-700 px-6 py-3 rounded-lg font-semibold hover:bg-gray-50 transition-colors whitespace-nowrap"
              >
                Alle akzeptieren
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
