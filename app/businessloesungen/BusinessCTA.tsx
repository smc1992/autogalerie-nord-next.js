
export default function BusinessCTA() {
  return (
    <section 
      className="relative py-20 bg-cover bg-center bg-no-repeat"
      style={{
        backgroundImage: `linear-gradient(135deg, rgba(220, 38, 38, 0.9), rgba(239, 68, 68, 0.8)), url('/images/Hero-Business.webp')`
      }}
    >
      <div className="container mx-auto px-6 relative z-10">
        <div className="text-center max-w-4xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6 leading-tight">
            Bereit für den <span className="text-red-200">nächsten Schritt?</span>
          </h2>
          <p className="text-xl text-gray-100 mb-12 leading-relaxed">
            Vereinbaren Sie noch heute einen kostenlosen Beratungstermin und entdecken Sie, wie wir Ihren Fuhrpark optimieren können.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
            <a
              href="tel:+4941745969770"
              className="group bg-white hover:bg-gray-100 text-red-600 px-8 py-4 rounded-lg font-semibold transition-all duration-300 transform hover:scale-105 hover:shadow-xl cursor-pointer whitespace-nowrap flex items-center"
            >
              <i className="ri-phone-fill mr-3 text-xl transform group-hover:rotate-12 transition-transform duration-300"></i>
              <div className="text-left">
                <div className="text-sm text-gray-600">Jetzt anrufen</div>
                <div className="font-bold">+49 41 745 969 70</div>
              </div>
            </a>
            
            <a
              href="mailto:info@autogalerie-nord.de"
              className="group bg-red-700 hover:bg-red-800 text-white px-8 py-4 rounded-lg font-semibold transition-all duration-300 transform hover:scale-105 hover:shadow-xl cursor-pointer whitespace-nowrap flex items-center"
            >
              <i className="ri-mail-send-fill mr-3 text-xl transform group-hover:rotate-12 transition-transform duration-300"></i>
              <div className="text-left">
                <div className="text-sm text-red-200">E-Mail senden</div>
                <div className="font-bold">info@autogalerie-nord.de</div>
              </div>
            </a>
          </div>
          
          <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div className="group">
              <div className="w-16 h-16 bg-white bg-opacity-20 rounded-full flex items-center justify-center mx-auto mb-4 transform group-hover:scale-110 transition-all duration-300">
                <i className="ri-time-line text-white text-2xl"></i>
              </div>
              <h3 className="text-lg font-semibold text-white mb-2">Schnelle Antwort</h3>
              <p className="text-gray-200 text-sm">Antwort innerhalb von 24 Stunden</p>
            </div>
            
            <div className="group">
              <div className="w-16 h-16 bg-white bg-opacity-20 rounded-full flex items-center justify-center mx-auto mb-4 transform group-hover:scale-110 transition-all duration-300">
                <i className="ri-hand-heart-line text-white text-2xl"></i>
              </div>
              <h3 className="text-lg font-semibold text-white mb-2">Kostenlose Beratung</h3>
              <p className="text-gray-200 text-sm">Unverbindliche Erstberatung</p>
            </div>
            
            <div className="group">
              <div className="w-16 h-16 bg-white bg-opacity-20 rounded-full flex items-center justify-center mx-auto mb-4 transform group-hover:scale-110 transition-all duration-300">
                <i className="ri-award-line text-white text-2xl"></i>
              </div>
              <h3 className="text-lg font-semibold text-white mb-2">Maßgeschneidert</h3>
              <p className="text-gray-200 text-sm">Individuelle Lösungen für Sie</p>
            </div>
          </div>
        </div>
      </div>
      
      {/* Decorative elements */}
      <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-white to-transparent opacity-10 rounded-full translate-x-16 -translate-y-16"></div>
      <div className="absolute bottom-0 left-0 w-24 h-24 bg-gradient-to-tr from-white to-transparent opacity-10 rounded-full -translate-x-12 translate-y-12"></div>
    </section>
  );
}
