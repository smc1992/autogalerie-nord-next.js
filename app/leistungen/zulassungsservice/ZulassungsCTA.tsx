'use client';

export default function ZulassungsCTA() {
  return (
    <section className="py-20 bg-gradient-to-br from-gray-900 via-gray-800 to-black">
      <div className="max-w-4xl mx-auto px-4 md:px-6 lg:px-8 text-center">
        <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
          Bereit für Ihren stressfreien Autokauf?
        </h2>
        <p className="text-xl text-gray-300 mb-12 max-w-2xl mx-auto">
          Kontaktieren Sie uns und lassen Sie uns den Papierkram übernehmen!
        </p>
        
        <div className="flex flex-col sm:flex-row gap-6 justify-center">
          <a 
            href="tel:+4941745969770"
            className="bg-red-600 hover:bg-red-700 text-white px-12 py-5 rounded-lg font-bold text-xl transition-all duration-300 transform hover:scale-105 hover:shadow-xl whitespace-nowrap cursor-pointer inline-flex items-center justify-center"
          >
            04174 596 97 00
          </a>
          <a 
            href="mailto:info@autogalerie-nord.de"
            className="border-2 border-white text-white hover:bg-white hover:text-gray-900 px-8 py-5 rounded-lg font-semibold text-lg transition-all duration-300 transform hover:scale-105 whitespace-nowrap cursor-pointer inline-flex items-center justify-center"
          >
            <i className="ri-mail-line mr-2"></i>
            Kontakt aufnehmen
          </a>
        </div>
      </div>
    </section>
  );
}