'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';

export default function HeroSection() {
  const [heroLoaded, setHeroLoaded] = useState(false);
  const [isClient, setIsClient] = useState(false);
  const [currentHeadline, setCurrentHeadline] = useState(0);

  // SEO-optimierte Headlines für den Slider
  const headlines = [
    {
      part1: "Ihr Traumauto",
      part2: "wartet bereits", 
      subtitle: "Über 120 Premium-Fahrzeuge sofort verfügbar"
    },
    {
      part1: "Gebrauchtwagen kaufen",
      part2: "leicht gemacht",
      subtitle: "Qualitätsgeprüfte Fahrzeuge • Faire Preise • Garantie"
    },
    {
      part1: "Premium Autohaus",
      part2: "in Stelle bei Hamburg",
      subtitle: "BMW • Mercedes • Audi • VW • Porsche direkt verfügbar"
    },
    {
      part1: "Sofort finanzieren",
      part2: "heute fahren",
      subtitle: "Flexible Finanzierung • Schnelle Zusage • Ohne Anzahlung"
    }
  ];

  useEffect(() => {
    setIsClient(true);
    const timer = setTimeout(() => setHeroLoaded(true), 500);
    
    // Headline Slider - wechselt alle 6 Sekunden
    const headlineInterval = setInterval(() => {
      setCurrentHeadline((prev) => (prev + 1) % headlines.length);
    }, 6000);

    return () => {
      clearTimeout(timer);
      clearInterval(headlineInterval);
    };
  }, []);

  const heroParticles = [
    { left: '15%', top: '20%', delay: '0s', duration: '4s' },
    { left: '85%', top: '15%', delay: '2s', duration: '5s' },
    { left: '25%', top: '80%', delay: '4s', duration: '4.5s' },
    { left: '75%', top: '70%', delay: '6s', duration: '4.2s' },
    { left: '45%', top: '25%', delay: '8s', duration: '5.2s' },
    { left: '65%', top: '85%', delay: '10s', duration: '4.8s' }
  ];

  return (
    <section 
      className="relative h-screen bg-cover bg-center bg-no-repeat overflow-hidden"
      style={{
        backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.4)), url('/images/hero-premium.webp')`
      }}
    >
      {/* Static background overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-black/50 via-transparent to-red-900/30"></div>
      
      {/* Fixed floating particles - only render on client and desktop */}
      {isClient && (
        <div className="absolute inset-0 hidden md:block">
          {heroParticles.map((particle, i) => (
            <div
              key={i}
              className="absolute w-2 h-2 bg-red-400/30 rounded-full animate-float"
              style={{
                left: particle.left,
                top: particle.top,
                animationDelay: particle.delay,
                animationDuration: particle.duration
              }}
            ></div>
          ))}
        </div>
      )}

      <div className="relative z-10 flex items-center h-full px-6 pt-20 md:pt-28 lg:pt-36 3xl:px-12 4xl:px-16">
        <div className={`w-full max-w-4xl 3xl:max-w-6xl 4xl:max-w-7xl transform transition-all duration-1000 ${
          heroLoaded ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
        }`}>
          {/* SEO-optimierte dynamische H1 Überschrift */}
          <div className="relative h-24 sm:h-32 md:h-40 lg:h-48 3xl:h-56 4xl:h-64 mb-4 sm:mb-6 3xl:mb-8 4xl:mb-10 overflow-hidden">
            {headlines.map((headline, index) => (
              <h1 
                key={index}
                className={`absolute inset-0 text-2xl sm:text-3xl md:text-5xl lg:text-6xl 3xl:text-7xl 4xl:text-8xl font-bold text-white leading-tight transition-all duration-1800 ease-in-out transform ${
                  index === currentHeadline 
                    ? 'translate-y-0 opacity-100 scale-100' 
                    : index < currentHeadline 
                      ? '-translate-y-full opacity-0 scale-98'
                      : 'translate-y-full opacity-0 scale-98'
                }`}
                style={{ 
                  transitionDelay: index === currentHeadline ? '500ms' : '0ms',
                  textShadow: '2px 2px 4px rgba(0,0,0,0.8), 0 0 8px rgba(0,0,0,0.6)'
                }}
              >
                {headline.part1}<br />
                <span className="text-red-400 font-extrabold" style={{
                  textShadow: '2px 2px 4px rgba(0,0,0,0.9), 0 0 12px rgba(220,38,38,0.4)'
                }}>
                  {headline.part2}
                </span>
              </h1>
            ))}
          </div>

          {/* Dynamischer Untertitel */}
          <div className="relative h-12 sm:h-16 3xl:h-20 4xl:h-24 mb-3 sm:mb-4 3xl:mb-6 4xl:mb-8 overflow-hidden">
            {headlines.map((headline, index) => (
              <p 
                key={index}
                className={`absolute inset-0 text-base sm:text-xl 3xl:text-2xl 4xl:text-3xl text-gray-100 transition-all duration-1500 ease-in-out transform ${
                  index === currentHeadline 
                    ? 'translate-x-0 opacity-100' 
                    : index < currentHeadline 
                      ? '-translate-x-full opacity-0'
                      : 'translate-x-full opacity-0'
                }`}
                style={{ 
                  transitionDelay: index === currentHeadline ? '800ms' : '0ms',
                  textShadow: '1px 1px 3px rgba(0,0,0,0.7)'
                }}
              >
                {headline.subtitle}
              </p>
            ))}
          </div>

          <p className={`text-lg sm:text-2xl 3xl:text-3xl 4xl:text-4xl font-semibold text-red-400 mb-3 sm:mb-4 3xl:mb-6 4xl:mb-8 transform transition-all duration-700 delay-600 ${
            heroLoaded ? 'translate-x-0 opacity-100' : '-translate-x-10 opacity-0'
          }`}
          style={{ textShadow: '1px 1px 3px rgba(0,0,0,0.7)' }}
          >
            BMW • Mercedes • Audi • VW • Porsche
          </p>
          <p className={`text-base sm:text-lg 3xl:text-xl 4xl:text-2xl text-red-100 mb-6 sm:mb-8 3xl:mb-10 4xl:mb-12 transform transition-all duration-700 delay-700 ${
            heroLoaded ? 'translate-x-0 opacity-100' : '-translate-x-10 opacity-0'
          }`}
          style={{ textShadow: '1px 1px 2px rgba(0,0,0,0.6)' }}
          >
            ✓ Faire Preise  ✓ Sofortige Finanzierung
          </p>
          <div className={`flex flex-col gap-4 sm:flex-row sm:gap-4 3xl:gap-6 4xl:gap-8 transform transition-all duration-700 delay-700 ${
            heroLoaded ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
          }`}>
            <Link href="/fahrzeuge" className="group bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white px-8 py-4 sm:px-10 sm:py-5 3xl:px-12 3xl:py-6 4xl:px-14 4xl:py-7 rounded-lg sm:rounded-xl font-bold text-base sm:text-lg 3xl:text-xl 4xl:text-2xl transition-all duration-300 cursor-pointer text-center transform hover:scale-105 hover:shadow-2xl w-full sm:w-auto">
              <span className="flex items-center justify-center">
                <i className="ri-car-line mr-2 sm:mr-3 text-lg sm:text-xl 3xl:text-2xl 4xl:text-3xl"></i>
                Alle Fahrzeuge ansehen
                <i className="ri-arrow-right-line ml-2 sm:ml-3 3xl:ml-4 4xl:ml-5 text-lg sm:text-xl 3xl:text-2xl 4xl:text-3xl transform group-hover:translate-x-2 transition-transform duration-300"></i>
              </span>
            </Link>
            <a 
              href="https://wa.me/4941717889111"
              target="_blank"
              rel="noopener noreferrer"
              className="group border-2 border-white text-white hover:bg-white hover:text-green-600 px-8 py-4 sm:px-8 sm:py-4 3xl:px-10 3xl:py-5 4xl:px-12 4xl:py-6 rounded-lg sm:rounded-xl font-semibold text-base sm:text-lg 3xl:text-xl 4xl:text-2xl transition-all duration-300 cursor-pointer text-center transform hover:scale-105 w-full sm:w-auto"
            >
              <span className="flex items-center justify-center">
                <i className="ri-whatsapp-line mr-2 3xl:mr-3 4xl:mr-4 text-lg sm:text-xl 3xl:text-2xl 4xl:text-3xl"></i>
                WhatsApp Chat
              </span>
            </a>
          </div>

          {/* Headline Indikator - nur auf Desktop */}
          <div className="hidden md:flex justify-center lg:justify-start mt-8 space-x-2">
            {headlines.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentHeadline(index)}
                className={`w-3 h-3 rounded-full transition-all duration-300 cursor-pointer ${
                  index === currentHeadline 
                    ? 'bg-red-500 scale-125' 
                    : 'bg-white/50 hover:bg-white/70'
                }`}
                aria-label={`Zur Überschrift ${index + 1} wechseln`}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 border-2 border-white/50 rounded-full flex justify-center">
          <div className="w-1 h-3 bg-white/70 rounded-full mt-2 animate-pulse"></div>
        </div>
      </div>
    </section>
  );
}