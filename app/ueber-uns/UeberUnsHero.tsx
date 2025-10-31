
'use client';
import { useLanguage } from '../../context/LanguageContext';

export default function UeberUnsHero() {
  const { dict } = useLanguage();
  return (
    <section 
      className="relative h-screen bg-cover bg-center bg-no-repeat flex items-center"
      style={{
        backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url('/images/Hero-Über uns.webp')`
      }}
    >
      <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-transparent to-red-900/40"></div>
      
      <div className="relative z-10 w-full max-w-6xl mx-auto pt-28 sm:pt-32 px-4 md:px-6 lg:px-8">
        <div className="text-center md:text-left max-w-3xl">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">
            {dict.ueberuns.heroTitle}
          </h1>
          <p className="text-xl md:text-2xl text-gray-200 mb-8 leading-relaxed">
            {dict.ueberuns.heroSubtitle}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
            <a 
              href="tel:+4904174596970"
              className="bg-red-600 hover:bg-red-700 text-white px-8 py-4 rounded-lg font-semibold transition-all duration-300 whitespace-nowrap cursor-pointer text-center transform hover:scale-105 hover:shadow-2xl inline-flex items-center justify-center"
            >
              <i className="ri-phone-line mr-2"></i>
              {dict.ueberuns.ctaContactNow}
            </a>
            <a 
              href="#team"
              className="border-2 border-white text-white hover:bg-white hover:text-gray-900 px-8 py-4 rounded-lg font-semibold transition-all duration-300 whitespace-nowrap cursor-pointer text-center transform hover:scale-105 inline-flex items-center justify-center"
            >
              <i className="ri-team-line mr-2"></i>
              {dict.ueberuns.ctaMeetTeam}
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
