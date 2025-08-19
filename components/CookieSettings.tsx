
'use client';

import { useState, useEffect } from 'react';

interface CookieConsent {
  necessary: boolean;
  analytics: boolean;
  marketing: boolean;
  preferences: boolean;
}

export default function CookieSettings() {
  const [consent, setConsent] = useState<CookieConsent>({
    necessary: true,
    analytics: false,
    marketing: false,
    preferences: false
  });
  const [showSuccess, setShowSuccess] = useState(false);

  useEffect(() => {
    const savedConsent = localStorage.getItem('cookie-consent');
    if (savedConsent) {
      setConsent(JSON.parse(savedConsent));
    }
  }, []);

  const handleConsentChange = (type: keyof CookieConsent) => {
    if (type === 'necessary') return;
    setConsent(prev => ({
      ...prev,
      [type]: !prev[type]
    }));
  };

  const handleSave = () => {
    localStorage.setItem('cookie-consent', JSON.stringify(consent));
    setShowSuccess(true);
    setTimeout(() => setShowSuccess(false), 3000);
    
    // Seite neu laden um Scripts zu aktivieren/deaktivieren
    window.location.reload();
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
    setShowSuccess(true);
    setTimeout(() => setShowSuccess(false), 3000);
    window.location.reload();
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
    setShowSuccess(true);
    setTimeout(() => setShowSuccess(false), 3000);
    window.location.reload();
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <div className="bg-white rounded-xl shadow-lg p-8">
        <div className="flex items-center mb-6">
          <div className="w-12 h-12 flex items-center justify-center bg-blue-100 rounded-lg mr-4">
            <i className="ri-settings-3-line text-2xl text-blue-600"></i>
          </div>
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Cookie-Einstellungen</h1>
            <p className="text-gray-600">Verwalten Sie Ihre Cookie-Präferenzen</p>
          </div>
        </div>

        {showSuccess && (
          <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-6">
            <div className="flex items-center">
              <div className="w-6 h-6 flex items-center justify-center mr-3">
                <i className="ri-check-line text-green-600"></i>
              </div>
              <p className="text-green-800 font-medium">
                Ihre Cookie-Einstellungen wurden erfolgreich gespeichert.
              </p>
            </div>
          </div>
        )}

        <div className="space-y-6">
          <div className="border border-gray-200 rounded-lg p-6">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className="text-lg font-semibold text-gray-900">Notwendige Cookies</h3>
                <p className="text-sm text-gray-600 mt-1">
                  Diese Cookies sind für das ordnungsgemäße Funktionieren der Website erforderlich.
                </p>
              </div>
              <div className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-medium">
                Immer aktiv
              </div>
            </div>
            <div className="bg-gray-50 rounded-lg p-4">
              <h4 className="font-medium text-gray-900 mb-2">Was wird gespeichert:</h4>
              <ul className="text-sm text-gray-600 space-y-1">
                <li>• Session-IDs für die Navigation</li>
                <li>• Sicherheits-Token für Formulare</li>
                <li>• Grundlegende Website-Funktionen</li>
                <li>• Cookie-Einstellungen</li>
              </ul>
            </div>
          </div>

          <div className="border border-gray-200 rounded-lg p-6">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className="text-lg font-semibold text-gray-900">Analyse-Cookies</h3>
                <p className="text-sm text-gray-600 mt-1">
                  Helfen uns zu verstehen, wie Besucher mit der Website interagieren.
                </p>
              </div>
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
            <div className="bg-gray-50 rounded-lg p-4">
              <h4 className="font-medium text-gray-900 mb-2">Verwendete Services:</h4>
              <ul className="text-sm text-gray-600 space-y-1">
                <li>• Google Analytics - Besucherstatistiken</li>
                <li>• Seitenaufrufe und Verweildauer</li>
                <li>• Geräte- und Browser-Informationen</li>
                <li>• Geografische Daten (anonymisiert)</li>
              </ul>
            </div>
          </div>

          <div className="border border-gray-200 rounded-lg p-6">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className="text-lg font-semibold text-gray-900">Marketing-Cookies</h3>
                <p className="text-sm text-gray-600 mt-1">
                  Werden verwendet, um Ihnen relevante Werbung zu zeigen.
                </p>
              </div>
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
            <div className="bg-gray-50 rounded-lg p-4">
              <h4 className="font-medium text-gray-900 mb-2">Verwendete Services:</h4>
              <ul className="text-sm text-gray-600 space-y-1">
                <li>• Facebook Pixel - Werbeanzeigen</li>
                <li>• Remarketing und Zielgruppen</li>
                <li>• Conversion-Tracking</li>
                <li>• Personalisierte Werbung</li>
              </ul>
            </div>
          </div>

          <div className="border border-gray-200 rounded-lg p-6">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className="text-lg font-semibold text-gray-900">Präferenz-Cookies</h3>
                <p className="text-sm text-gray-600 mt-1">
                  Speichern Ihre Einstellungen für eine personalisierte Erfahrung.
                </p>
              </div>
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
            <div className="bg-gray-50 rounded-lg p-4">
              <h4 className="font-medium text-gray-900 mb-2">Was wird gespeichert:</h4>
              <ul className="text-sm text-gray-600 space-y-1">
                <li>• Spracheinstellungen</li>
                <li>• Layout-Präferenzen</li>
                <li>• Suchfilter und Sortierungen</li>
                <li>• Favoriten und Merkzettel</li>
              </ul>
            </div>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 mt-8 pt-6 border-t border-gray-200">
          <button
            onClick={handleSave}
            className="bg-blue-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors whitespace-nowrap"
          >
            Einstellungen speichern
          </button>
          
          <button
            onClick={handleAcceptAll}
            className="border border-blue-600 text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-blue-50 transition-colors whitespace-nowrap"
          >
            Alle akzeptieren
          </button>
          
          <button
            onClick={handleRejectAll}
            className="border border-gray-300 text-gray-700 px-8 py-3 rounded-lg font-semibold hover:bg-gray-50 transition-colors whitespace-nowrap"
          >
            Alle ablehnen
          </button>
        </div>

        <div className="mt-6 p-4 bg-blue-50 rounded-lg">
          <h4 className="font-medium text-blue-900 mb-2">Weitere Informationen</h4>
          <p className="text-sm text-blue-800">
            Detaillierte Informationen zur Datenverarbeitung finden Sie in unserer{' '}
            <a href="/datenschutz" className="underline hover:no-underline">
              Datenschutzerklärung
            </a>. 
            Bei Fragen können Sie uns jederzeit über unser{' '}
            <a href="/kontakt" className="underline hover:no-underline">
              Kontaktformular
            </a> erreichen.
          </p>
        </div>
      </div>
    </div>
  );
}
