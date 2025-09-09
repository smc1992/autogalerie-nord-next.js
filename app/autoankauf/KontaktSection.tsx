
'use client';

export default function KontaktSection() {
  return (
    <section className="py-20 bg-white">
      <div className="max-w-6xl mx-auto px-4 md:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
            Kontaktieren Sie <span className="text-red-600">uns</span>
          </h2>
          <p className="text-xl text-gray-600">
            Haben Sie Fragen oder möchten Sie Ihr Fahrzeug verkaufen? Wir sind für Sie da!
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Telefon */}
          <div className="group bg-gray-50 rounded-2xl p-8 text-center hover:bg-red-50 transition-all duration-300 transform hover:-translate-y-2 hover:shadow-xl">
            <div className="w-20 h-20 flex items-center justify-center bg-red-100 rounded-full mx-auto mb-6 group-hover:bg-red-600 transition-all duration-300 transform group-hover:scale-110">
              <i className="ri-phone-line text-3xl text-red-600 group-hover:text-white transition-colors duration-300"></i>
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-4 group-hover:text-red-600 transition-colors duration-300">
              Telefon
            </h3>
            <a 
              href="tel:+4904174596970"
              className="text-lg text-gray-600 hover:text-red-600 transition-colors duration-300 cursor-pointer block font-medium"
            >
              041 745 969 70
            </a>
          </div>

          {/* E-Mail */}
          <div className="group bg-gray-50 rounded-2xl p-8 text-center hover:bg-red-50 transition-all duration-300 transform hover:-translate-y-2 hover:shadow-xl">
            <div className="w-20 h-20 flex items-center justify-center bg-red-100 rounded-full mx-auto mb-6 group-hover:bg-red-600 transition-all duration-300 transform group-hover:scale-110">
              <i className="ri-mail-line text-3xl text-red-600 group-hover:text-white transition-colors duration-300"></i>
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-4 group-hover:text-red-600 transition-colors duration-300">
              E-Mail
            </h3>
            <a 
              href="mailto:info@autogalerie-nord.de"
              className="text-lg text-gray-600 hover:text-red-600 transition-colors duration-300 cursor-pointer block break-all"
            >
              info@autogalerie-nord.de
            </a>
          </div>

          {/* Adresse */}
          <div className="group bg-gray-50 rounded-2xl p-8 text-center hover:bg-red-50 transition-all duration-300 transform hover:-translate-y-2 hover:shadow-xl">
            <div className="w-20 h-20 flex items-center justify-center bg-red-100 rounded-full mx-auto mb-6 group-hover:bg-red-600 transition-all duration-300 transform group-hover:scale-110">
              <i className="ri-map-pin-line text-3xl text-red-600 group-hover:text-white transition-colors duration-300"></i>
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-4 group-hover:text-red-600 transition-colors duration-300">
              Adresse
            </h3>
            <div className="text-lg text-gray-600 group-hover:text-gray-700 transition-colors duration-300">
              <div>Lüneburger Str. 30</div>
              <div>21435 Stelle</div>
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="mt-16 text-center bg-gradient-to-r from-red-50 to-red-100 rounded-3xl p-12">
          <h3 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">
            Bereit für den Verkauf?
          </h3>
          <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto">
            Kontaktieren Sie uns noch heute und erhalten Sie eine kostenlose, unverbindliche Bewertung Ihres Fahrzeugs.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a 
              href="tel:+4904174596970"
              className="bg-red-600 hover:bg-red-700 text-white px-8 py-4 rounded-lg font-semibold transition-all duration-300 transform hover:scale-105 hover:shadow-xl whitespace-nowrap cursor-pointer inline-flex items-center justify-center"
            >
              <i className="ri-phone-line mr-2"></i>
              Jetzt anrufen
            </a>
            <a 
              href="https://autogalerie-nord.de/fahrzeuge#!/tradein"
              className="border-2 border-red-600 text-red-600 hover:bg-red-600 hover:text-white px-8 py-4 rounded-lg font-semibold transition-all duration-300 transform hover:scale-105 whitespace-nowrap cursor-pointer inline-flex items-center justify-center"
            >
              <i className="ri-file-text-line mr-2"></i>
              Fahrzeug anbieten
            </a>
          </div>
        </div>
      </div>

    </section>
  );
}
