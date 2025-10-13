'use client';

import Link from 'next/link';
import QuickSearchWidget from './components/QuickSearchWidget';
import GoogleReviews from './components/GoogleReviews';
import { useState, useEffect } from 'react';

export default function HomeClient() {
  const [isVisible, setIsVisible] = useState(false);
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
    setIsVisible(true);
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
    <>
      {/* Hero Section */}
      <section 
        className="relative h-screen bg-cover bg-center bg-no-repeat overflow-hidden"
        style={{
          backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.4)), url('/images/hero-premium.jpg')`
        }}
      >
        {/* Static background overlay - removed animation */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/50 via-transparent to-red-900/30"></div>
        
        {/* Fixed floating particles - only render on client */}
        {isClient && (
          <div className="absolute inset-0">
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

        <div className="relative z-10 flex items-center h-full px-6 pt-24 md:pt-0">
          <div className={`w-full max-w-4xl transform transition-all duration-1000 ${
            heroLoaded ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
          }`}>
            {/* SEO-optimierte dynamische H1 Überschrift */}
            <div className="relative h-32 md:h-40 lg:h-48 mb-6 overflow-hidden">
              {headlines.map((headline, index) => (
                <h1 
                  key={index}
                  className={`absolute inset-0 text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight transition-all duration-1800 ease-in-out transform uppercase ${
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
            <div className="relative h-16 mb-4 overflow-hidden">
              {headlines.map((headline, index) => (
                <p 
                  key={index}
                  className={`absolute inset-0 text-xl text-gray-100 transition-all duration-1500 ease-in-out transform ${
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

            <p className={`text-2xl font-semibold text-red-400 mb-4 transform transition-all duration-700 delay-600 ${
              heroLoaded ? 'translate-x-0 opacity-100' : '-translate-x-10 opacity-0'
            }`}
            style={{ textShadow: '1px 1px 3px rgba(0,0,0,0.7)' }}
            >
              BMW • Mercedes • Audi • VW • Porsche
            </p>
            <p className={`text-lg text-red-100 mb-8 transform transition-all duration-700 delay-700 ${
              heroLoaded ? 'translate-x-0 opacity-100' : '-translate-x-10 opacity-0'
            }`}
            style={{ textShadow: '1px 1px 2px rgba(0,0,0,0.6)' }}
            >
              ✓ Faire Preise  ✓ Sofortige Finanzierung  ✓ Garantie inklusive
            </p>
            <div className={`flex flex-col sm:flex-row gap-4 transform transition-all duration-700 delay-700 ${
              heroLoaded ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
            }`}>
              <Link href="/fahrzeuge" className="group bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white px-10 py-5 rounded-xl font-bold text-lg transition-all duration-300 whitespace-nowrap cursor-pointer text-center transform hover:scale-105 hover:shadow-2xl">
                <span className="flex items-center justify-center">
                  <i className="ri-car-line mr-3 text-xl"></i>
                  Jetzt Traumauto finden
                  <i className="ri-arrow-right-line ml-3 transform group-hover:translate-x-2 transition-transform duration-300"></i>
                </span>
              </Link>
              <a 
                href="tel:+4904174596970"
                className="group border-2 border-white text-white hover:bg-white hover:text-red-600 px-8 py-4 rounded-xl font-semibold transition-all duration-300 whitespace-nowrap cursor-pointer text-center transform hover:scale-105"
              >
                <span className="flex items-center justify-center">
                  <i className="ri-phone-line mr-2"></i>
                  041 745 969 70
                </span>
              </a>
            </div>

            {/* Headline Indikator */}
            <div className="flex justify-center lg:justify-start mt-8 space-x-2">
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

      {/* Quicksearch Section */}
      <div className="transform transition-all duration-700 hover:scale-[1.02]">
        <QuickSearchWidget />
      </div>

      {/* Google Reviews Section */}
      <GoogleReviews />

      {/* Services Section */}
      <section className="py-20 bg-gray-50 relative overflow-hidden">
        {/* Fixed background decoration - only render on client */}
        {isClient && (
          <>
            <div className="absolute top-0 right-0 w-96 h-96 bg-red-100 rounded-full -translate-y-48 translate-x-48 opacity-20"></div>
            <div className="absolute bottom-0 left-0 w-72 h-72 bg-blue-100 rounded-full translate-y-36 -translate-x-36 opacity-20"></div>
          </>
        )}

        <div className="px-6 max-w-6xl mx-auto relative z-10">
          <div className={`text-center mb-16 transform transition-all duration-700 ${
            isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
          }`}>
            <h2 className="text-4xl font-bold text-gray-900 mb-6">
              Unsere <span className="text-red-600 relative">
                Services
                <div className="absolute -bottom-2 left-0 w-full h-1 bg-red-600 rounded-full transform scale-x-0 animate-scaleX"></div>
              </span>
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[ 
              { icon: 'ri-car-line', title: 'Fahrzeugankauf', desc: 'Faire Preise und schnelle Abwicklung beim Ankauf Ihres Gebrauchtwagens.', delay: 0 },
              { icon: 'ri-tools-line', title: 'Werkstattservice', desc: 'Professionelle Wartung und Reparatur für alle Marken.', delay: 100 },
              { icon: 'ri-shield-check-line', title: 'Garantie', desc: 'Sorgenfrei fahren mit unseren umfassenden Garantiepaketen.', delay: 200 },
              { icon: 'ri-bank-card-line', title: 'Finanzierung', desc: 'Flexible und individuelle Finanzierungslösungen für Ihr Traumauto.', delay: 300 }
            ].map((service, index) => (
              <div
                key={index}
                className={`group bg-white rounded-lg p-8 text-center shadow-md hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-3 hover:scale-105 cursor-pointer animate-fadeInUp`}
                style={{ animationDelay: `${service.delay}ms` }}
              >
                <div className="w-16 h-16 flex items-center justify-center bg-red-100 rounded-full mx-auto mb-6 group-hover:bg-red-600 transition-all duration-300 transform group-hover:rotate-12">
                  <i className={`${service.icon} text-2xl text-red-600 group-hover:text-white transition-colors duration-300`}></i>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-4 group-hover:text-red-600 transition-colors duration-300">{service.title}</h3>
                <p className="text-gray-600 text-sm leading-relaxed group-hover:text-gray-700 transition-colors duration-300">
                  {service.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Section */}
      <section className="py-20 bg-white relative overflow-hidden">
        {/* Fixed animated background elements - only render on client */}
        {isClient && (
          <>
            <div className="absolute top-1/2 left-0 w-32 h-32 bg-gradient-to-r from-red-200 to-transparent rounded-full animate-pulse opacity-30"></div>
            <div className="absolute bottom-0 right-0 w-24 h-24 bg-gradient-to-l from-blue-200 to-transparent rounded-full animate-pulse opacity-30"></div>
          </>
        )}

        <div className="px-6 max-w-6xl mx-auto relative z-10">
          <div className="text-center mb-16 animate-fadeInUp">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Über <span className="text-red-600 animate-countUp">120</span> sofort verfügbare Fahrzeuge
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Finden Sie Ihren Traumwagen in wenigen Klicks aus einer großen Auswahl hochwertiger Fahrzeuge.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            <div className="group bg-gradient-to-br from-red-50 to-red-100 rounded-xl p-8 transform transition-all duration-500 hover:scale-105 hover:shadow-2xl animate-slideInLeft">
              <h3 className="text-2xl font-semibold text-gray-900 mb-4 group-hover:text-red-700 transition-colors duration-300">Flexible Finanzierung & Leasing</h3>
              <p className="text-gray-600 mb-6 group-hover:text-gray-700 transition-colors duration-300">
                Maßgeschneiderte Lösungen für Ihr Traumauto mit günstigen Konditionen und schneller Abwicklung.
              </p>
              <button className="group bg-red-600 hover:bg-red-700 text-white px-6 py-3 rounded-lg font-semibold transition-all duration-300 whitespace-nowrap cursor-pointer flex items-center transform hover:scale-105 hover:shadow-lg">
                <i className="ri-calculator-line mr-2 transform group-hover:rotate-12 transition-transform duration-300"></i>
                Jetzt finanzieren
              </button>
            </div>

            <div className="group bg-gradient-to-br from-gray-50 to-gray-100 rounded-xl p-8 transform transition-all duration-500 hover:scale-105 hover:shadow-2xl animate-slideInRight">
              <h3 className="text-2xl font-semibold text-gray-900 mb-6 group-hover:text-red-700 transition-colors duration-300">Weitere Services</h3>

              <div className="space-y-4">
                {[
                  'Inzahlungnahme Ihres Fahrzeugs',
                  'Garantie & Gewährleistung',
                  'Persönliche Beratung vor Ort',
                  'Zulassung & Überführung'
                ].map((service, index) => (
                  <div key={index} className="flex items-center group">
                    <i className="ri-check-line text-red-600 mr-3 transform group-hover:scale-125 transition-transform duration-300"></i>
                    <span className="text-gray-700 group-hover:text-red-700 transition-colors duration-300">{service}</span>
                  </div>
                ))}
              </div>

              <Link href="/service" className="group bg-red-600 hover:bg-red-700 text-white px-6 py-3 rounded-lg font-semibold transition-all duration-300 whitespace-nowrap cursor-pointer inline-flex items-center mt-6 transform hover:scale-105">
                Alle Services
                <i className="ri-arrow-right-line ml-2 transform group-hover:translate-x-2 transition-transform duration-300"></i>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="py-20 bg-gray-50 relative overflow-hidden">
        {/* Fixed animated background pattern - only render on client */}
        {isClient && (
          <div className="absolute inset-0 opacity-5">
            <div className="absolute top-10 sm:top-20 left-10 sm:left-20 w-6 h-6 sm:w-8 sm:h-8 border-2 border-red-500 rotate-45 animate-spin-slow"></div>
            <div className="absolute top-20 sm:top-40 right-16 sm:right-32 w-4 h-4 sm:w-6 sm:h-6 bg-blue-500 rounded-full animate-bounce"></div>
            <div className="absolute bottom-16 sm:bottom-32 left-1/4 w-6 h-6 sm:w-10 sm:h-10 border-2 border-green-500 rounded-full animate-pulse"></div>
          </div>
        )}

        <div className="px-6 max-w-6xl mx-auto relative z-10">
          <div className="text-center mb-16 animate-fadeInUp">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-6 leading-tight">
              <span className="text-red-600 relative inline-block">
                Autogalerie Nord
                <div className="absolute -bottom-1 left-0 w-full h-1 bg-red-600 rounded-full"></div>
              </span>
              <span className="block mt-2">- Ihr Spezialist in Sachen Jahreswagen oder Gebrauchtwagen in Stelle bei Hamburg</span>
            </h2>
            <p className="text-lg sm:text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
              Qualitäts-Fahrzeuge aller Marken vor Ort und auf Wunsch bestellt und individualisiert. Mercedes-Benz, Porsche, Jaguar, Range Rover, Audi, Skoda, Volkswagen, Seat und viele mehr. Finden Sie hier Ihren neuen Gebrauchten.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 sm:gap-12">
            <div className="group bg-white rounded-xl p-6 sm:p-8 shadow-md hover:shadow-2xl transform transition-all duration-500 hover:-translate-y-2 animate-slideInLeft">
              <div className="w-16 h-16 flex items-center justify-center bg-red-100 rounded-lg mb-6 group-hover:bg-red-600 transition-all duration-300 transform group-hover:rotate-6">
                <i className="ri-team-line text-3xl text-red-600 group-hover:text-white transition-colors duration-300"></i>
              </div>
              <h3 className="text-xl sm:text-2xl font-semibold text-gray-900 mb-4 group-hover:text-red-600 transition-colors duration-300">Über uns</h3>
              <p className="text-gray-600 mb-6 group-hover:text-gray-700 transition-colors duration-300 leading-relaxed">
                Wir sind ein Auto begeistertes, kreatives Team von gelernten Automobilkaufleuten, die sich darauf spezialisiert haben, Sie als Kunden umfassend in allen Fragen ums Thema Auto zu beraten.
              </p>
              <Link href="/ueber-uns" className="group bg-red-600 hover:bg-red-700 text-white px-4 sm:px-6 py-3 rounded-lg font-semibold transition-all duration-300 whitespace-nowrap cursor-pointer inline-flex items-center transform hover:scale-105 text-sm sm:text-base">
                ÜBER UNS
                <i className="ri-arrow-right-line ml-2 transform group-hover:translate-x-2 transition-transform duration-300"></i>
              </Link>
            </div>

            <div className="group bg-white rounded-xl p-6 sm:p-8 shadow-md hover:shadow-2xl transform transition-all duration-500 hover:-translate-y-2 animate-slideInRight">
              <div className="w-16 h-16 flex items-center justify-center bg-red-100 rounded-lg mb-6 group-hover:bg-red-600 transition-all duration-300 transform group-hover:rotate-6">
                <i className="ri-car-line text-3xl text-red-600 group-hover:text-white transition-colors duration-300"></i>
              </div>
              <h3 className="text-xl sm:text-2xl font-semibold text-gray-900 mb-4 group-hover:text-red-600 transition-colors duration-300">Unsere Fahrzeuge</h3>
              <p className="text-gray-600 mb-6 group-hover:text-gray-700 transition-colors duration-300 leading-relaxed">
                Wir haben ständig ein umfangreiches und Fahrzeugangebot aller Marken für Sie vor Ort. Sollte Ihr Wunschfahrzeug nicht dabei sein, sprechen Sie uns gern an, da wir ebenfalls individuelle Fahrzeugneubestellungen anbieten.
              </p>
              <Link href="/fahrzeuge" className="group bg-red-600 hover:bg-red-700 text-white px-3 sm:px-6 py-3 rounded-lg font-semibold transition-all duration-300 cursor-pointer inline-flex items-center transform hover:scale-105 text-xs sm:text-base leading-tight">
                <span className="whitespace-nowrap">UNSER FAHRZEUGANGEBOT</span>
                <i className="ri-arrow-right-line ml-2 transform group-hover:translate-x-2 transition-transform duration-300 flex-shrink-0"></i>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Why Autogalerie Nord Section */}
      <section className="py-20 bg-white relative overflow-hidden">
        {/* Fixed parallax background elements - only render on client */}
        {isClient && (
          <>
            <div className="absolute top-0 left-1/4 w-64 h-64 bg-gradient-radial from-red-100 to-transparent rounded-full opacity-30 animate-pulse"></div>
            <div className="absolute bottom-0 right-1/4 w-48 h-48 bg-gradient-radial from-blue-100 to-transparent rounded-full opacity-30 animate-pulse animation-delay-1000"></div>
          </>
        )}

        <div className="px-6 max-w-6xl mx-auto relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Left side - Image */}
            <div className="order-2 lg:order-1 animate-slideInLeft">
              <div className="relative group">
                <div className="absolute inset-0 bg-gradient-to-r from-red-500 to-blue-500 rounded-2xl transform rotate-3 group-hover:rotate-6 transition-transform duration-500 opacity-20"></div>
                <div className="relative rounded-2xl overflow-hidden shadow-2xl transform transition-all duration-500 group-hover:scale-105">
                  <img 
                    src="https://static.readdy.ai/image/5cb98375ce345c7331a1619afba21cba/77669189defb295efffb1e1a300f738f.jfif" 
                    alt="Autogalerie Nord Fahrzeuge" 
                    className="w-full h-auto object-cover transform transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                </div>
              </div>
            </div>

            {/* Right side - Content */}
            <div className="order-1 lg:order-2 animate-slideInRight">
              <h2 className="text-4xl font-bold text-gray-900 mb-8">
                Warum <span className="text-red-600 relative">
                  Autogalerie Nord?
                  <div className="absolute -bottom-2 left-0 w-full h-1 bg-red-600 rounded-full transform scale-x-0 animate-scaleX animation-delay-500"></div>
                </span>
              </h2>

              <div className="space-y-8">
                {[ 
                  { icon: 'ri-timer-line', title: 'Schnelle Verfügbarkeit', desc: 'Über 120 sofort verfügbare Fahrzeuge verschiedener Premiummarken in unserem Bestand.', delay: 0 },
                  { icon: 'ri-shield-check-line', title: 'Qualitätsgarantie', desc: 'Alle Fahrzeuge durchlaufen eine gründliche technische Prüfung durch unsere zertifizierten Experten.', delay: 200 },
                  { icon: 'ri-user-heart-line', title: 'Persönliche Beratung', desc: 'Unser erfahrenes Team berät Sie individuell und findet das perfekte Fahrzeug für Ihre Bedürfnisse.', delay: 400 }
                ].map((item, index) => (
                  <div 
                    key={index}
                    className={`flex items-start group animate-fadeInUp`}
                    style={{ animationDelay: `${item.delay}ms` }}
                  >
                    <div className="w-16 h-16 flex-shrink-0 flex items-center justify-center bg-red-100 rounded-full mr-6 group-hover:bg-red-600 transition-all duration-300 transform group-hover:scale-110 group-hover:rotate-12">
                      <i className={`${item.icon} text-2xl text-red-600 group-hover:text-white transition-colors duration-300`}></i>
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold text-gray-900 mb-3 group-hover:text-red-600 transition-colors duration-300">{item.title}</h3>
                      <p className="text-gray-600 leading-relaxed group-hover:text-gray-700 transition-colors duration-300">
                        {item.desc}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-8 animate-fadeInUp animation-delay-600">
                <Link href="/kontakt" className="group bg-red-600 hover:bg-red-700 text-white px-8 py-4 rounded-lg font-semibold transition-all duration-300 whitespace-nowrap cursor-pointer inline-flex items-center transform hover:scale-105 hover:shadow-2xl">
                  Jetzt beraten lassen
                  <i className="ri-arrow-right-line ml-3 transform group-hover:translate-x-2 transition-transform duration-300"></i>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-20px) rotate(180deg); }
        }
        @keyframes slideInLeft {
          from { transform: translateX(-50px); opacity: 0; }
          to { transform: translateX(0); opacity: 1; }
        }
        @keyframes slideInRight {
          from { transform: translateX(50px); opacity: 0; }
          to { transform: translateX(0); opacity: 1; }
        }
        @keyframes fadeInUp {
          from { transform: translateY(30px); opacity: 0; }
          to { transform: translateY(0); opacity: 1; }
        }
        @keyframes scaleX {
          from { transform: scaleX(0); }
          to { transform: scaleX(1); }
        }
        @keyframes countUp {
          from { transform: scale(1); }
          to { transform: scale(1.1); }
        }
        @keyframes spin-slow {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        @keyframes glow-pulse {
          0%, 100% { 
            text-shadow: 2px 2px 4px rgba(0,0,0,0.9), 0 0 12px rgba(220,38,38,0.4);
            transform: scale(1);
          }
          50% { 
            text-shadow: 2px 2px 4px rgba(0,0,0,0.9), 0 0 16px rgba(220,38,38,0.6);
            transform: scale(1.005);
          }
        }
        @keyframes pulse-button {
          0%, 100% { 
            box-shadow: 0 0 0 0 rgba(239, 68, 68, 0.7);
          }
          70% { 
            box-shadow: 0 0 0 10px rgba(239, 68, 68, 0);
          }
        }
        .animate-float { animation: float 4s ease-in-out infinite; }
        .animate-slideInLeft { animation: slideInLeft 0.8s ease-out forwards; }
        .animate-slideInRight { animation: slideInRight 0.8s ease-out forwards; }
        .animate-fadeInUp { animation: fadeInUp 0.8s ease-out forwards; }
        .animate-scaleX { animation: scaleX 1s ease-out forwards; }
        .animate-countUp { animation: countUp 0.5s ease-out alternate infinite; }
        .animate-spin-slow { animation: spin-slow 20s linear infinite; }
        .animate-glow-pulse { animation: glow-pulse 6s ease-in-out infinite; }
        .animate-pulse-button { animation: pulse-button 3s infinite; }
        .animation-delay-200 { animation-delay: 200ms; }
        .animation-delay-400 { animation-delay: 400ms; }
        .animation-delay-500 { animation-delay: 500ms; }
        .animation-delay-600 { animation-delay: 600ms; }
        .animation-delay-1000 { animation-delay: 1000ms; }
        .bg-gradient-radial { background: radial-gradient(circle, var(--tw-gradient-stops)); }
      `}</style>
    </>
  );
}