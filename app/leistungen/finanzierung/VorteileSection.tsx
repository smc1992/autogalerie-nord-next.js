
'use client';

export default function VorteileSection() {
  const vorteile = [
    {
      icon: 'ri-percent-line',
      title: 'Günstige Zinssätze',
      description: 'Attraktive Konditionen durch unsere starken Finanzierungspartner',
      highlight: 'ab 2,99% eff. Jahreszins',
      color: 'bg-red-100 text-red-600 group-hover:bg-red-600 group-hover:text-white'
    },
    {
      icon: 'ri-time-line',
      title: 'Schnelle Bearbeitung',
      description: 'Ihre Finanzierungsanfrage wird innerhalb von 24 Stunden bearbeitet',
      highlight: 'Zusage in 24h',
      color: 'bg-red-100 text-red-600 group-hover:bg-red-600 group-hover:text-white'
    },
    {
      icon: 'ri-calendar-line',
      title: 'Flexible Laufzeiten',
      description: 'Wählen Sie die Laufzeit, die zu Ihrem Budget passt',
      highlight: '12-84 Monate',
      color: 'bg-red-100 text-red-600 group-hover:bg-red-600 group-hover:text-white'
    },
    {
      icon: 'ri-money-euro-circle-line',
      title: 'Sondertilgungen',
      description: 'Tilgen Sie Ihren Kredit schneller durch kostenlose Sonderzahlungen',
      highlight: 'jederzeit kostenlos',
      color: 'bg-red-100 text-red-600 group-hover:bg-red-600 group-hover:text-white'
    }
  ];

  return (
    <section className="py-20 bg-white">
      <div className="max-w-6xl mx-auto px-4 md:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
            Ihre <span className="text-red-600">Finanzierungs-Vorteile</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Profitieren Sie von erstklassigen Konditionen und professionellem Service
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {vorteile.map((vorteil, index) => (
            <div key={index} className="group bg-gray-50 rounded-2xl p-6 md:p-8 hover:bg-red-50 transition-all duration-300 transform hover:-translate-y-2 hover:shadow-xl text-center">
              <div className={`w-20 h-20 flex items-center justify-center ${vorteil.color} rounded-full mx-auto mb-6 transition-all duration-300 transform group-hover:scale-110`}>
                <i className={`${vorteil.icon} text-3xl transition-colors duration-300`}></i>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3 group-hover:text-red-600 transition-colors duration-300">
                {vorteil.title}
              </h3>
              <p className="text-red-600 font-bold text-lg mb-3 group-hover:text-red-700 transition-colors duration-300">
                {vorteil.highlight}
              </p>
              <p className="text-gray-600 leading-relaxed group-hover:text-gray-700 transition-colors duration-300">
                {vorteil.description}
              </p>
            </div>
          ))}
        </div>

        {/* Zusätzliche Informationen */}
        <div className="mt-16 bg-gradient-to-r from-gray-50 to-gray-100 rounded-3xl p-8 md:p-12">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 text-center">
            <div className="group">
              <div className="w-16 h-16 flex items-center justify-center bg-red-100 rounded-full mx-auto mb-4 group-hover:bg-red-600 transition-all duration-300 transform group-hover:scale-110">
                <i className="ri-shield-check-line text-2xl text-red-600 group-hover:text-white transition-colors duration-300"></i>
              </div>
              <h4 className="text-lg font-semibold text-gray-900 mb-2 group-hover:text-red-600 transition-colors duration-300">
                Ohne Anzahlung
              </h4>
              <p className="text-gray-600 group-hover:text-gray-700 transition-colors duration-300">
                100% Finanzierung möglich
              </p>
            </div>
            <div className="group">
              <div className="w-16 h-16 flex items-center justify-center bg-red-100 rounded-full mx-auto mb-4 group-hover:bg-red-600 transition-all duration-300 transform group-hover:scale-110">
                <i className="ri-file-shield-line text-2xl text-red-600 group-hover:text-white transition-colors duration-300"></i>
              </div>
              <h4 className="text-lg font-semibold text-gray-900 mb-2 group-hover:text-red-600 transition-colors duration-300">
                Restschuldversicherung
              </h4>
              <p className="text-gray-600 group-hover:text-gray-700 transition-colors duration-300">
                Optional verfügbar
              </p>
            </div>
            <div className="group">
              <div className="w-16 h-16 flex items-center justify-center bg-red-100 rounded-full mx-auto mb-4 group-hover:bg-red-600 transition-all duration-300 transform group-hover:scale-110">
                <i className="ri-customer-service-line text-2xl text-red-600 group-hover:text-white transition-colors duration-300"></i>
              </div>
              <h4 className="text-lg font-semibold text-gray-900 mb-2 group-hover:text-red-600 transition-colors duration-300">
                Persönliche Beratung
              </h4>
              <p className="text-gray-600 group-hover:text-gray-700 transition-colors duration-300">
                Vor Ort und telefonisch
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
