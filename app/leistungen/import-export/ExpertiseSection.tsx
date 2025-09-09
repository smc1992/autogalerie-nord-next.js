
'use client';

export default function ExpertiseSection() {
  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8">
        {/* Hero Content */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
            Tax Free Cars
          </h2>
          <div className="max-w-4xl mx-auto">
            <p className="text-lg text-gray-600 leading-relaxed mb-8">
              Wir verfügen über langjährige Erfahrung im Export-Geschäft weltweit. Der Verkauf von Fahrzeugen an Privat- oder Firmen-Kunden innerhalb oder außerhalb der EU gehört zu unserem Geschäft. Wir sprechen fließend Englisch und beraten unsere ausländischen Kunden täglich.
            </p>
          </div>
        </div>

        {/* Expertise Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          <div className="bg-gradient-to-br from-red-50 to-red-100 p-8 rounded-2xl text-center">
            <div className="w-16 h-16 flex items-center justify-center bg-red-600 rounded-full mx-auto mb-6">
              <i className="ri-money-dollar-circle-line text-2xl text-white"></i>
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-4">Netto Export Verkäufe</h3>
            <p className="text-gray-700 leading-relaxed">
              Netto Export Verkäufe sind bei uns möglich - profitieren Sie von unserer Expertise im internationalen Fahrzeughandel.
            </p>
          </div>

          <div className="bg-gradient-to-br from-red-50 to-red-100 p-8 rounded-2xl text-center">
            <div className="w-16 h-16 flex items-center justify-center bg-red-600 rounded-full mx-auto mb-6">
              <i className="ri-translate-2 text-2xl text-white"></i>
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-4">Mehrsprachige Beratung</h3>
            <p className="text-gray-700 leading-relaxed">
              Wir sprechen fließend Englisch und beraten unsere ausländischen Kunden täglich mit professioneller Kompetenz.
            </p>
          </div>

          <div className="bg-gradient-to-br from-red-50 to-red-100 p-8 rounded-2xl text-center">
            <div className="w-16 h-16 flex items-center justify-center bg-red-600 rounded-full mx-auto mb-6">
              <i className="ri-earth-line text-2xl text-white"></i>
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-4">EU & Weltweit</h3>
            <p className="text-gray-700 leading-relaxed">
              Verkauf an Privat- und Firmenkunden innerhalb und außerhalb der EU - wir kennen alle Bestimmungen.
            </p>
          </div>
        </div>

        {/* Features */}
        <div className="bg-gradient-to-r from-gray-50 to-gray-100 rounded-3xl p-12">
          <h3 className="text-2xl md:text-3xl font-bold text-gray-900 mb-8 text-center">
            Weltweite Export-Expertise
          </h3>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <div className="text-center">
              <div className="w-12 h-12 flex items-center justify-center bg-red-600 rounded-full mx-auto mb-4">
                <i className="ri-global-line text-white text-lg"></i>
              </div>
              <h4 className="font-semibold text-gray-900 mb-2">Internationale Expertise</h4>
            </div>
            
            <div className="text-center">
              <div className="w-12 h-12 flex items-center justify-center bg-red-600 rounded-full mx-auto mb-4">
                <i className="ri-time-line text-white text-lg"></i>
              </div>
              <h4 className="font-semibold text-gray-900 mb-2">Langjährige Export-Erfahrung</h4>
            </div>
            
            <div className="text-center">
              <div className="w-12 h-12 flex items-center justify-center bg-red-600 rounded-full mx-auto mb-4">
                <i className="ri-ship-line text-white text-lg"></i>
              </div>
              <h4 className="font-semibold text-gray-900 mb-2">Weltweite Abwicklung</h4>
            </div>
            
            <div className="text-center">
              <div className="w-12 h-12 flex items-center justify-center bg-red-600 rounded-full mx-auto mb-4">
                <i className="ri-chat-3-line text-white text-lg"></i>
              </div>
              <h4 className="font-semibold text-gray-900 mb-2">Englischsprachige Beratung</h4>
            </div>
          </div>
          
          <div className="text-center mt-8">
            <div className="inline-flex items-center bg-red-600 text-white px-6 py-3 rounded-lg font-semibold">
              <i className="ri-price-tag-3-line mr-2"></i>
              Tax Free Verkäufe
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
