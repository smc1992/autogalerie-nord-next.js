'use client';
import { useLanguage } from '../../context/LanguageContext';

export default function KontaktHero() {
  const { dict } = useLanguage();
  return (
    <section 
      className="relative h-96 bg-cover bg-center bg-no-repeat"
      style={{
        backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url('/images/Hero Kontakt.webp')`
      }}
    >
      <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/40 to-red-900/40"></div>
      
      <div className="relative z-10 flex items-center h-full pt-28 sm:pt-32 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-6 animate-fadeInUp">
            {dict.kontakt.title}
          </h1>
          <p className="text-xl md:text-2xl text-gray-200 max-w-3xl mx-auto animate-fadeInUp animation-delay-300">
            {dict.kontakt.subtitle}
          </p>
        </div>
      </div>
    </section>
  );
}