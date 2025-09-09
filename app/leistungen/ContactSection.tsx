
'use client';

export default function ContactSection() {
  return (
    <section className="py-20 bg-gradient-to-br from-gray-900 via-gray-800 to-black">
      <div className="max-w-4xl mx-auto px-4 md:px-6 lg:px-8 text-center">
        <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
          Bereit für den nächsten Schritt?
        </h2>
        <p className="text-xl text-gray-300 mb-12 max-w-2xl mx-auto">
          Kontaktieren Sie uns noch heute und lassen Sie sich von unseren Experten beraten. Wir finden die perfekte Lösung für Sie.
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          <div className="text-center">
            <div className="w-16 h-16 flex items-center justify-center bg-red-600 rounded-full mx-auto mb-4">
              <i className="ri-phone-line text-2xl text-white"></i>
            </div>
            <h3 className="text-lg font-semibold text-white mb-2">Telefon</h3>
            <a 
              href="tel:+4904174596970" 
              className="text-red-400 hover:text-red-300 transition-colors duration-300 cursor-pointer"
            >
              +49 41 745 969 70
            </a>
          </div>
          
          <div className="text-center">
            <div className="w-16 h-16 flex items-center justify-center bg-red-600 rounded-full mx-auto mb-4">
              <i className="ri-whatsapp-line text-2xl text-white"></i>
            </div>
            <h3 className="text-lg font-semibold text-white mb-2">WhatsApp</h3>
            <a 
              href="https://wa.me/4941717889111" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-red-400 hover:text-red-300 transition-colors duration-300 cursor-pointer"
            >
              Jetzt schreiben
            </a>
          </div>
          
          <div className="text-center">
            <div className="w-16 h-16 flex items-center justify-center bg-red-600 rounded-full mx-auto mb-4">
              <i className="ri-mail-line text-2xl text-white"></i>
            </div>
            <h3 className="text-lg font-semibold text-white mb-2">E-Mail</h3>
            <a 
              href="mailto:info@autogalerie-nord.de" 
              className="text-red-400 hover:text-red-300 transition-colors duration-300 cursor-pointer"
            >
              info@autogalerie-nord.de
            </a>
          </div>
        </div>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <a 
            href="tel:+4904174596970"
            className="bg-red-600 hover:bg-red-700 text-white px-8 py-4 rounded-lg font-semibold transition-all duration-300 transform hover:scale-105 hover:shadow-xl whitespace-nowrap cursor-pointer inline-flex items-center justify-center"
          >
            <i className="ri-phone-line mr-2"></i>
            Beratungstermin vereinbaren
          </a>
          <a 
            href="https://wa.me/4941717889111" 
            target="_blank" 
            rel="noopener noreferrer"
            className="border-2 border-white text-white hover:bg-white hover:text-gray-900 px-8 py-4 rounded-lg font-semibold transition-all duration-300 transform hover:scale-105 whitespace-nowrap cursor-pointer inline-flex items-center justify-center"
          >
            <i className="ri-whatsapp-line mr-2"></i>
            WhatsApp Chat
          </a>
        </div>
      </div>
    </section>
  );
}
