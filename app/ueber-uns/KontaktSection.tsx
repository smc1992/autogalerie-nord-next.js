'use client';

export default function KontaktSection() {
  return (
    <section className="py-20 bg-gradient-to-br from-gray-900 via-gray-800 to-black">
      <div className="max-w-4xl mx-auto px-4 md:px-6 lg:px-8 text-center">
        <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
          Kontaktieren Sie uns
        </h2>
        <p className="text-xl text-gray-300 mb-12 max-w-2xl mx-auto">
          Haben Sie Fragen oder möchten Sie einen Termin vereinbaren? Wir freuen uns auf Ihren Besuch!
        </p>
        
        {/* Contact Methods */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          <div className="group bg-white/5 backdrop-blur-sm rounded-2xl p-8 border border-white/10 hover:border-red-500/50 transition-all duration-300">
            <div className="w-16 h-16 flex items-center justify-center bg-red-600 rounded-full mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
              <i className="ri-phone-line text-2xl text-white"></i>
            </div>
            <h3 className="text-xl font-semibold text-white mb-4">Telefonisch erreichen</h3>
            <a 
              href="tel:+4904174596970" 
              className="text-2xl text-red-400 hover:text-red-300 transition-colors duration-300 cursor-pointer font-semibold"
            >
              041 745 969 70
            </a>
            <p className="text-gray-400 mt-2">Mo-Fr 8:00-18:00 Uhr</p>
          </div>
          
          <div className="group bg-white/5 backdrop-blur-sm rounded-2xl p-8 border border-white/10 hover:border-red-500/50 transition-all duration-300">
            <div className="w-16 h-16 flex items-center justify-center bg-red-600 rounded-full mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
              <i className="ri-mail-line text-2xl text-white"></i>
            </div>
            <h3 className="text-xl font-semibold text-white mb-4">E-Mail schreiben</h3>
            <a 
              href="mailto:info@autogalerie-nord.de" 
              className="text-xl text-red-400 hover:text-red-300 transition-colors duration-300 cursor-pointer"
            >
              info@autogalerie-nord.de
            </a>
            <p className="text-gray-400 mt-2">Schnelle Antwort garantiert</p>
          </div>
        </div>

        {/* Location Info */}
        <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-8 border border-white/10 mb-12">
          <div className="w-16 h-16 flex items-center justify-center bg-red-600 rounded-full mx-auto mb-6">
            <i className="ri-map-pin-line text-2xl text-white"></i>
          </div>
          <h3 className="text-xl font-semibold text-white mb-4">Besuchen Sie uns</h3>
          <p className="text-gray-300 text-lg">Stelle bei Hamburg</p>
          <p className="text-gray-400 mt-2">Über 120 Fahrzeuge vor Ort verfügbar</p>
        </div>
        
        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <a 
            href="tel:+4904174596970"
            className="bg-red-600 hover:bg-red-700 text-white px-8 py-4 rounded-lg font-semibold transition-all duration-300 transform hover:scale-105 hover:shadow-xl whitespace-nowrap cursor-pointer inline-flex items-center justify-center"
          >
            <i className="ri-phone-line mr-2"></i>
            Jetzt anrufen
          </a>
          <a 
            href="mailto:info@autogalerie-nord.de"
            className="border-2 border-white text-white hover:bg-white hover:text-gray-900 px-8 py-4 rounded-lg font-semibold transition-all duration-300 transform hover:scale-105 whitespace-nowrap cursor-pointer inline-flex items-center justify-center"
          >
            <i className="ri-mail-line mr-2"></i>
            E-Mail senden
          </a>
        </div>
      </div>
    </section>
  );
}