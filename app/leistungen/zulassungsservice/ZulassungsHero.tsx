'use client';

export default function ZulassungsHero() {
  return (
    <section className="relative bg-gradient-to-br from-gray-900 via-gray-800 to-black min-h-[500px] flex items-center overflow-hidden">
      {/* Background Image */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: `url('https://readdy.ai/api/search-image?query=Professional%20automotive%20registration%20office%2C%20car%20registration%20documents%20and%20license%20plates%20on%20desk%2C%20modern%20administrative%20office%20environment%2C%20official%20vehicle%20registration%20paperwork%2C%20clean%20organized%20government%20office%2C%20professional%20car%20registration%20service%20desk%20with%20documents%20and%20stamps&width=1920&height=800&seq=zulassung-hero&orientation=landscape')`
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/60 to-black/40"></div>
      </div>

      <div className="relative w-full px-4 md:px-6 lg:px-8">
        <div className="w-full max-w-6xl mx-auto">
          <div className="text-center lg:text-left max-w-3xl">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6">
              Zulassungs
              <span className="text-red-500 ml-3 animate-pulse">service</span>
            </h1>
            <p className="text-xl md:text-2xl text-gray-200 mb-8 leading-relaxed">
              Wir kümmern uns gerne um die Zulassung Ihres Autos
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <a 
                href="tel:+4941745969770"
                className="bg-red-600 hover:bg-red-700 text-white px-8 py-4 rounded-lg font-semibold transition-all duration-300 transform hover:scale-105 hover:shadow-xl whitespace-nowrap cursor-pointer inline-flex items-center justify-center"
              >
                <i className="ri-phone-line mr-2"></i>
                Jetzt anrufen
              </a>
              <button className="border-2 border-white text-white hover:bg-white hover:text-gray-900 px-8 py-4 rounded-lg font-semibold transition-all duration-300 transform hover:scale-105 whitespace-nowrap cursor-pointer">
                Mehr erfahren
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}