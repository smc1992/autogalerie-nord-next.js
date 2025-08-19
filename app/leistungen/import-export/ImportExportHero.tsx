
'use client';

export default function ImportExportHero() {
  return (
    <section className="relative bg-gradient-to-br from-gray-900 via-gray-800 to-red-900 min-h-[70vh] flex items-center overflow-hidden">
      {/* Background Image */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: `url('https://readdy.ai/api/search-image?query=International%20car%20shipping%20and%20export%20operation%2C%20luxury%20cars%20being%20loaded%20onto%20transport%20truck%20at%20modern%20logistics%20facility%2C%20professional%20automotive%20export%20business%2C%20car%20carrier%20with%20premium%20vehicles%2C%20global%20automotive%20trade%2C%20international%20shipping%20port%20with%20cars%2C%20modern%20logistics%20center%20with%20vehicles%20being%20prepared%20for%20export&width=1920&height=1080&seq=import-export-hero&orientation=landscape')`
        }}
      >
        <div className="absolute inset-0 bg-black/60"></div>
      </div>

      {/* Content Container */}
      <div className="relative z-10 w-full">
        <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8">
          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">
              Import & Export
            </h1>
            <p className="text-xl md:text-2xl text-gray-200 mb-8 leading-relaxed">
              Komplette Abwicklung aller Behördengänge sowie Erstellung der Zollpapiere
            </p>
            
            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4">
              <a 
                href="tel:+4941745969770"
                className="bg-red-600 hover:bg-red-700 text-white px-8 py-4 rounded-lg font-semibold transition-all duration-300 transform hover:scale-105 hover:shadow-xl whitespace-nowrap cursor-pointer inline-flex items-center justify-center"
              >
                <i className="ri-phone-line mr-2"></i>
                Jetzt beraten lassen
              </a>
              <a 
                href="#services"
                className="border-2 border-white text-white hover:bg-white hover:text-gray-900 px-8 py-4 rounded-lg font-semibold transition-all duration-300 transform hover:scale-105 whitespace-nowrap cursor-pointer inline-flex items-center justify-center"
              >
                <i className="ri-arrow-down-line mr-2"></i>
                Services ansehen
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Decorative Elements */}
      <div className="absolute -bottom-20 -right-20 w-40 h-40 bg-red-600/20 rounded-full blur-3xl"></div>
      <div className="absolute -top-20 -left-20 w-60 h-60 bg-blue-600/10 rounded-full blur-3xl"></div>
    </section>
  );
}
