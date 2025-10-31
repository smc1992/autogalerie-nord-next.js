'use client';
import { useLanguage } from '../../../context/LanguageContext';

export default function KommissionsHero() {
  const { dict } = useLanguage();
  const d: any = dict;
  return (
    <section 
      className="relative min-h-[600px] flex items-center overflow-hidden"
      style={{
        backgroundImage: `url('/images/kommission-hero.webp')`
      }}
    >
      <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/60 to-black/30"></div>
      
      <div className="relative w-full pt-28 sm:pt-32 px-4 md:px-6 lg:px-8">
        <div className="w-full max-w-6xl mx-auto">
          <div className="text-center lg:text-left max-w-3xl">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6">
              {d.leistungen?.consignment?.heroTitle || 'Verkaufen Sie Ihr Auto'}
            </h1>
            <p className="text-xl md:text-2xl text-gray-200 mb-8 leading-relaxed">
              {d.leistungen?.consignment?.heroSubtitle || 'Professioneller Kommissionsverkauf mit maximaler Reichweite und bestem Preis'}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <a 
                href="tel:+4904174596970"
                className="bg-red-600 hover:bg-red-700 text-white px-8 py-4 rounded-lg font-semibold transition-all duration-300 transform hover:scale-105 hover:shadow-xl whitespace-nowrap cursor-pointer inline-flex items-center justify-center"
              >
                <i className="ri-phone-line mr-2"></i>
                {d.leistungen?.ctaCall || 'Jetzt anrufen'}
              </a>
              <button 
                onClick={() => {
                  const formElement = document.getElementById('fahrzeugbewertung');
                  if (formElement) {
                    formElement.scrollIntoView({ behavior: 'smooth' });
                  }
                }}
                className="border-2 border-white text-white hover:bg-white hover:text-gray-900 px-8 py-4 rounded-lg font-semibold transition-all duration-300 transform hover:scale-105 whitespace-nowrap cursor-pointer"
              >
                {d.leistungen?.consignment?.ctaEvaluate || 'Fahrzeug bewerten'}
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}