
'use client';

import { useState } from 'react';
import FinanzierungsPopup from '../../../components/FinanzierungsPopup';
import { useLanguage } from '../../../context/LanguageContext';

export default function FinanzierungHero() {
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const { dict } = useLanguage();
  const d = dict as any;
  return (
    <section 
      className="relative min-h-[700px] flex items-center bg-cover bg-center bg-no-repeat overflow-hidden"
      style={{
        backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.4)), url('/images/Hero-Autofinanzierung.webp')`
      }}
    >
      <div className="relative w-full px-4 md:px-6 lg:px-8">
        <div className="w-full max-w-6xl mx-auto">
          <div className="text-center lg:text-left max-w-4xl">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">
              {d.leistungen?.finance?.heroTitle || 'Ihr Traumauto finanzieren'}
            </h1>
            <p className="text-xl md:text-2xl text-gray-200 mb-8 leading-relaxed">
              {d.leistungen?.finance?.heroSubtitle || 'Günstige Konditionen • Schnelle Bearbeitung • Flexible Laufzeiten'}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <a 
                href="tel:+4904174596970"
                className="bg-red-600 hover:bg-red-700 text-white px-8 py-4 rounded-lg font-semibold transition-all duration-300 transform hover:scale-105 hover:shadow-xl whitespace-nowrap cursor-pointer inline-flex items-center justify-center"
              >
                <i className="ri-phone-line mr-2"></i>
                {d.leistungen?.heroCtaConsult || 'Beratung anfordern'}
              </a>
              <button 
                onClick={() => setIsPopupOpen(true)}
                className="border-2 border-white text-white hover:bg-white hover:text-gray-900 px-8 py-4 rounded-lg font-semibold transition-all duration-300 transform hover:scale-105 whitespace-nowrap cursor-pointer inline-flex items-center justify-center"
              >
                <i className="ri-calculator-line mr-2"></i>
                {d.leistungen?.finance?.heroCtaPrimary || 'Finanzierung berechnen'}
              </button>
            </div>
          </div>
        </div>
      </div>
      
      <FinanzierungsPopup 
        isOpen={isPopupOpen} 
        onClose={() => setIsPopupOpen(false)} 
      />
    </section>
  );
}
