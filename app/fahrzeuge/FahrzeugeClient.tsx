'use client';

import { useEffect } from 'react';
import MarketplaceEmbed from '../../components/MarketplaceEmbed';
// import MarketplaceEmbedProxy from '../../components/MarketplaceEmbedProxy';

export default function FahrzeugeClient() {

  useEffect(() => {
    console.log('🚗 Fahrzeuge page loaded - Marketplace integration with Next.js Script component');
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 fahrzeuge-page">

      
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-red-600 to-red-700 text-white py-20 fahrzeuge-hero">
        <div className="max-w-6xl mx-auto px-6 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            Über 120 Premium-Fahrzeuge
          </h1>
          <p className="text-xl text-red-100 mb-8 max-w-3xl mx-auto">
            Entdecken Sie unsere große Auswahl an hochwertigen Gebrauchtwagen, 
            Jahreswagen und Neuwagen zu fairen Preisen.
          </p>
          <div className="flex justify-center">
            <a 
              href="/kontakt" 
              className="border-2 border-white text-white hover:bg-white hover:text-red-600 px-8 py-4 rounded-lg font-semibold transition-colors duration-300 whitespace-nowrap"
            >
              Beratung vereinbaren
            </a>
          </div>
        </div>
      </section>

      {/* Marketplace Container */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Unser Fahrzeugbestand
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Durchsuchen Sie unseren aktuellen Bestand an Premium-Fahrzeugen. 
              Alle Fahrzeuge sind sofort verfügbar und können besichtigt werden.
            </p>
          </div>
          
          {/* AUTOMANAGER Marketplace mit Router-Events-Reinitialisierung */}
          {/* Original AUTOMANAGER (mit API-Problemen) */}
          {/* <MarketplaceEmbed
            apiKey="0536fa11-99df-43f8-bf26-42af233f5478"
            imprint="https://autogalerie-nord.de/impressum"
            terms=""
            privacy="https://autogalerie-nord.de/datenschutz"
          /> */}
          
          {/* Original AUTOMANAGER mit Router-Events-Reinitialisierung */}
          <MarketplaceEmbed
            apiKey="0536fa11-99df-43f8-bf26-42af233f5478"
            imprint="https://autogalerie-nord.de/impressum"
            terms=""
            privacy="https://autogalerie-nord.de/datenschutz"
          />
        </div>
      </section>

      {/* Service Section */}
      <section className="bg-white py-16">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Unser Service für Sie
            </h2>
            <p className="text-xl text-gray-600">
              Professionelle Beratung und umfassender Service rund um Ihr Fahrzeug
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center p-6 rounded-lg border border-gray-200 hover:shadow-lg transition-shadow duration-300">
              <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Qualitätsprüfung</h3>
              <p className="text-gray-600">Jedes Fahrzeug wird von unseren Experten gründlich geprüft</p>
            </div>
            
            <div className="text-center p-6 rounded-lg border border-gray-200 hover:shadow-lg transition-shadow duration-300">
              <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Finanzierung</h3>
              <p className="text-gray-600">Flexible Finanzierungslösungen für jeden Bedarf</p>
            </div>
            
            <div className="text-center p-6 rounded-lg border border-gray-200 hover:shadow-lg transition-shadow duration-300">
              <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192L5.636 18.364M12 2.25a9.75 9.75 0 11-9.75 9.75A9.75 9.75 0 0112 2.25z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Garantie</h3>
              <p className="text-gray-600">Umfassende Garantieleistungen für Ihre Sicherheit</p>
            </div>
          </div>
          
          <div className="text-center mt-12">
            <div className="grid md:grid-cols-2 gap-6">
              <a 
                href="/leistungen/finanzierung" 
                className="bg-red-600 text-white px-8 py-4 rounded-lg font-semibold hover:bg-red-700 transition-colors duration-300 inline-block"
              >
                Finanzierung anfragen
              </a>
              <a 
                href="/kontakt" 
                className="border-2 border-red-600 text-red-600 hover:bg-red-600 hover:text-white px-8 py-4 rounded-lg font-semibold transition-colors duration-300 inline-block"
              >
                Persönliche Beratung
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}