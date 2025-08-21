import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-red-900 flex items-center justify-center px-4">
      <div className="max-w-2xl mx-auto text-center">
        {/* Logo */}
        <div className="mb-8">
          <img 
            src="/images/logo.png" 
            alt="Autogalerie Nord Logo" 
            className="h-20 md:h-24 w-auto mx-auto"
          />
        </div>

        {/* 404 Nummer */}
        <div className="mb-8">
          <h1 className="text-8xl md:text-9xl font-bold text-white mb-4 tracking-wider">
            4<span className="text-red-500">0</span>4
          </h1>
          <div className="w-24 h-1 bg-red-600 mx-auto rounded-full"></div>
        </div>

        {/* Haupttext */}
        <div className="mb-12">
          <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">
            Seite nicht gefunden
          </h2>
          <p className="text-lg text-gray-300 mb-6 leading-relaxed">
            Die gesuchte Seite konnte leider nicht gefunden werden. <br className="hidden md:block" />
            Möglicherweise wurde sie verschoben oder existiert nicht mehr.
          </p>
        </div>

        {/* Auto Icon */}
        <div className="mb-8">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-red-600 rounded-full mb-4">
            <i className="ri-car-line text-3xl text-white"></i>
          </div>
        </div>

        {/* Navigation Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link 
            href="/"
            className="group bg-red-600 hover:bg-red-700 text-white px-8 py-4 rounded-xl font-semibold transition-all duration-300 transform hover:scale-105 hover:shadow-xl inline-flex items-center justify-center"
          >
            <i className="ri-home-line mr-2 text-lg"></i>
            Zur Startseite
            <i className="ri-arrow-right-line ml-2 transform group-hover:translate-x-1 transition-transform duration-300"></i>
          </Link>
          
          <Link 
            href="/fahrzeuge"
            className="group border-2 border-white text-white hover:bg-white hover:text-gray-900 px-8 py-4 rounded-xl font-semibold transition-all duration-300 transform hover:scale-105 inline-flex items-center justify-center"
          >
            <i className="ri-car-line mr-2 text-lg"></i>
            Fahrzeuge ansehen
          </Link>
        </div>

        {/* Kontakt Info */}
        <div className="mt-12 pt-8 border-t border-gray-700">
          <p className="text-gray-400 mb-4">Benötigen Sie Hilfe?</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <a 
              href="tel:+4941745969770"
              className="text-gray-300 hover:text-white transition-colors duration-300 flex items-center"
            >
              <i className="ri-phone-line mr-2"></i>
              041 745 969 70
            </a>
            <span className="hidden sm:block text-gray-600">•</span>
            <a 
              href="https://wa.me/4941717889111"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-300 hover:text-green-400 transition-colors duration-300 flex items-center"
            >
              <i className="ri-whatsapp-line mr-2"></i>
              WhatsApp Chat
            </a>
            <span className="hidden sm:block text-gray-600">•</span>
            <a 
              href="mailto:info@autogalerie-nord.de"
              className="text-gray-300 hover:text-white transition-colors duration-300 flex items-center"
            >
              <i className="ri-mail-line mr-2"></i>
              E-Mail
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}