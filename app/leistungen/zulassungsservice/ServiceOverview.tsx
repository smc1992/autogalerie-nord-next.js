'use client';

export default function ServiceOverview() {
  return (
    <section id="service-overview" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8">
        {/* Hero Section */}
        <div className="text-center mb-20">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
            Kein Papierkram, keine Warteschlangen
          </h2>
          <div className="max-w-4xl mx-auto">
            <p className="text-lg text-gray-600 mb-6 leading-relaxed">
              Sie haben keine Lust auf Warteschlangen und darauf, sich mit Papierkram zu befassen? Sie wollen Ihr bei Autogalerie Nord GmbH gekauftes Fahrzeug einfach nur abholen und losfahren?
            </p>
            <div className="bg-red-600 text-white inline-block px-8 py-4 rounded-lg text-2xl font-bold">
              KEIN PROBLEM!
            </div>
          </div>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20">
          <div className="bg-gradient-to-br from-red-50 to-red-100 p-8 rounded-2xl text-center">
            <div className="w-16 h-16 flex items-center justify-center bg-red-600 rounded-full mx-auto mb-6">
              <i className="ri-checkbox-circle-line text-2xl text-white"></i>
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-4">Vollservice</h3>
            <p className="text-gray-700 leading-relaxed">
              Autogalerie Nord GmbH übernimmt alle Formalitäten für Sie. Sie stellen uns die notwendigen Unterlagen zur Verfügung - wir erledigen den Rest.
            </p>
          </div>

          <div className="bg-gradient-to-br from-gray-50 to-gray-100 p-8 rounded-2xl text-center">
            <div className="w-16 h-16 flex items-center justify-center bg-red-600 rounded-full mx-auto mb-6">
              <i className="ri-exchange-line text-2xl text-white"></i>
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-4">Ab- & Anmeldung</h3>
            <p className="text-gray-700 leading-relaxed">
              Wir melden ggf. Ihr von uns in Zahlung genommenes Fahrzeug ab und melden Ihr bei uns gekauftes Fahrzeug natürlich auch gerne an.
            </p>
          </div>

          <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-8 rounded-2xl text-center">
            <div className="w-16 h-16 flex items-center justify-center bg-red-600 rounded-full mx-auto mb-6">
              <i className="ri-car-line text-2xl text-white"></i>
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-4">Sonderkennzeichen</h3>
            <p className="text-gray-700 leading-relaxed">
              Sie benötigen ein Kurzzeit- oder Ausfuhrkennzeichen? Auch das ist kein Problem. Wir kümmern uns um alles.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}