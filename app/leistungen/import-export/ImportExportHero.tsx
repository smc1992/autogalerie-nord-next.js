
'use client';
import { useLanguage } from '../../../context/LanguageContext';

export default function ImportExportHero() {
  const { dict } = useLanguage();
  return (
    <section className="relative bg-gradient-to-br from-gray-900 via-gray-800 to-red-900 min-h-[70vh] flex items-center overflow-hidden">
      {/* Background Image */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: `url('/images/Hero-Import und Export.webp')`
        }}
      >
        <div className="absolute inset-0 bg-black/60"></div>
      </div>

      {/* Content Container */}
      <div className="relative z-10 w-full pt-28 sm:pt-32">
        <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8">
          <div className="text-center md:text-left max-w-3xl">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">
              {dict.leistungen?.importExport?.heroTitle || 'Import & Export'}
            </h1>
            <p className="text-xl md:text-2xl text-gray-200 mb-8 leading-relaxed">
              {dict.leistungen?.importExport?.heroSubtitle || 'Komplette Abwicklung aller Behördengänge sowie Erstellung der Zollpapiere'}
            </p>
            
            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
              <a 
                href="tel:+4904174596970"
                className="bg-red-600 hover:bg-red-700 text-white px-8 py-4 rounded-lg font-semibold transition-all duration-300 transform hover:scale-105 hover:shadow-xl whitespace-nowrap cursor-pointer inline-flex items-center justify-center"
              >
                <i className="ri-phone-line mr-2"></i>
                {dict.leistungen?.importExport?.heroCtaPrimary || 'Jetzt beraten lassen'}
              </a>
              <a 
                href="#services"
                className="border-2 border-white text-white hover:bg-white hover:text-gray-900 px-8 py-4 rounded-lg font-semibold transition-all duration-300 transform hover:scale-105 whitespace-nowrap cursor-pointer inline-flex items-center justify-center"
              >
                <i className="ri-arrow-down-line mr-2"></i>
                {dict.leistungen?.importExport?.heroCtaSecondary || 'Services ansehen'}
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Decorative Elements */}
      <div className="absolute -bottom-20 -right-20 w-40 h-40 bg-red-600/20 rounded-full blur-3xl"></div>
      <div className="absolute -top-20 -left-20 w-60 h-60 bg-blue-600/10 rounded-full blur-3xl"></div>
    </section>
  );
}
