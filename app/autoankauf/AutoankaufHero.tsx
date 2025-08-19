
export default function AutoankaufHero() {
  return (
    <section 
      className="relative min-h-[700px] flex items-center bg-cover bg-center bg-no-repeat overflow-hidden"
      style={{
        backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.4)), url('/images/Hero-Autoankauf.webp')`
      }}
    >
      <div className="relative w-full px-4 md:px-6 lg:px-8">
        <div className="w-full max-w-6xl mx-auto">
          <div className="text-center lg:text-left max-w-4xl">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">
              Wir kaufen 
              <span className="text-red-500 block lg:inline lg:ml-3">Ihr Auto</span>
            </h1>
            <p className="text-xl md:text-2xl text-gray-200 mb-8 leading-relaxed">
              Faire Bewertung • Schnelle Abwicklung • Sofortige Barauszahlung
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <a 
                href="tel:+4941745969770"
                className="bg-red-600 hover:bg-red-700 text-white px-8 py-4 rounded-lg font-semibold transition-all duration-300 transform hover:scale-105 hover:shadow-xl whitespace-nowrap cursor-pointer inline-flex items-center justify-center"
              >
                <i className="ri-phone-line mr-2"></i>
                041 745 969 70
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
        </div>
      </div>
    </section>
  );
}
