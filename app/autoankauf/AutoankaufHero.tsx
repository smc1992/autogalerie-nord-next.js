
'use client';

import { useState } from 'react';
import AutoankaufPopup from '../../components/AutoankaufPopup';

export default function AutoankaufHero() {
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  return (
    <section 
      className="relative min-h-[700px] flex items-center bg-cover bg-center bg-no-repeat overflow-hidden"
      style={{
        backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.4)), url('/images/Hero-Autoankauf.webp')`
      }}
    >
      <div className="relative w-full px-4 md:px-6 lg:px-8">
        <div className="w-full max-w-6xl mx-auto">
          <div className="text-center lg:text-left max-w-4xl">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">
              Wir kaufen 
              <span className="text-red-500 block lg:inline lg:ml-3">Ihr Auto</span>
            </h1>
            <p className="text-xl md:text-2xl text-gray-200 mb-8 leading-relaxed">
              Faire Bewertung • Schnelle Abwicklung • Sofortige Barauszahlung
            </p>
            <div className="flex justify-center lg:justify-start">
              <button 
                onClick={() => setIsPopupOpen(true)}
                className="bg-red-600 hover:bg-red-700 text-white px-10 py-5 rounded-xl font-bold text-lg transition-all duration-300 transform hover:scale-105 hover:shadow-xl whitespace-nowrap cursor-pointer inline-flex items-center justify-center"
              >
                <i className="ri-money-dollar-circle-line mr-3 text-xl"></i>
                Jetzt Fahrzeug verkaufen
                <i className="ri-arrow-right-line ml-3 transform group-hover:translate-x-2 transition-transform duration-300"></i>
              </button>
            </div>
          </div>
        </div>
      </div>
      
      <AutoankaufPopup 
        isOpen={isPopupOpen} 
        onClose={() => setIsPopupOpen(false)} 
      />
    </section>
  );
}
