
'use client';

export default function ProzessSection() {
  const schritte = [
    {
      number: '1',
      title: 'Beratungstermin',
      description: 'Persönliche Beratung zu Ihren Finanzierungsmöglichkeiten',
      icon: 'ri-user-line',
      color: 'bg-red-600',
      details: ['Kostenlose Beratung', 'Vor Ort oder telefonisch', 'Individuelle Lösungen']
    },
    {
      number: '2',
      title: 'Antragsstellung',
      description: 'Wir helfen Ihnen beim Ausfüllen der Finanzierungsunterlagen',
      icon: 'ri-file-edit-line',
      color: 'bg-red-600',
      details: ['Unterstützung beim Antrag', 'Vollständige Unterlagen', 'Digitale Übermittlung']
    },
    {
      number: '3',
      title: 'Schnelle Prüfung',
      description: 'Ihr Antrag wird innerhalb von 24 Stunden bearbeitet',
      icon: 'ri-search-line',
      color: 'bg-red-600',
      details: ['24h Bearbeitungszeit', 'Professionelle Prüfung', 'Transparenter Prozess']
    },
    {
      number: '4',
      title: 'Zusage & Auszahlung',
      description: 'Bei positiver Prüfung erhalten Sie sofort Ihre Zusage',
      icon: 'ri-check-line',
      color: 'bg-red-600',
      details: ['Sofortige Zusage', 'Schnelle Auszahlung', 'Ihr Traumauto wartet']
    }
  ];

  return (
    <section className="py-20 bg-white">
      <div className="max-w-6xl mx-auto px-4 md:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
            So <span className="text-red-600">einfach</span> geht's
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            In nur wenigen Schritten zu Ihrer Traumauto-Finanzierung
          </p>
        </div>

        <div className="relative">
          {/* Verbindungslinie */}
          <div className="hidden sm:block absolute top-20 left-0 right-0 h-0.5 bg-red-200 z-0"></div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 relative z-10">
            {schritte.map((schritt, index) => (
              <div key={index} className="relative">
                <div className="bg-gray-50 rounded-2xl p-6 md:p-8 hover:bg-white hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 text-center">
                  {/* Schritt Nummer */}
                  <div className="w-16 h-16 flex items-center justify-center bg-red-600 rounded-full mx-auto mb-6 text-white font-bold text-2xl shadow-lg transform hover:scale-110 transition-all duration-300">
                    {schritt.number}
                  </div>

                  {/* Icon */}
                  <div className="w-16 h-16 flex items-center justify-center bg-red-100 rounded-full mx-auto mb-6 hover:bg-red-600 transition-all duration-300 group">
                    <i className={`${schritt.icon} text-2xl text-red-600 group-hover:text-white transition-colors duration-300`}></i>
                  </div>

                  <h3 className="text-xl font-semibold text-gray-900 mb-4 hover:text-red-600 transition-colors duration-300">
                    {schritt.title}
                  </h3>
                  <p className="text-gray-600 leading-relaxed mb-6">
                    {schritt.description}
                  </p>

                  {/* Details */}
                  <div className="space-y-2">
                    {schritt.details.map((detail, detailIndex) => (
                      <div key={detailIndex} className="flex items-center justify-center space-x-2">
                        <div className="w-4 h-4 flex items-center justify-center">
                          <i className="ri-check-line text-xs text-green-600"></i>
                        </div>
                        <span className="text-sm text-gray-600">{detail}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* CTA Section */}
        <div className="mt-12 md:mt-16 text-center bg-gradient-to-r from-red-50 to-red-100 rounded-3xl p-12">
          <h3 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">
            Bereit für Ihr Traumauto?
          </h3>
          <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto">
            Vereinbaren Sie noch heute einen kostenlosen Beratungstermin oder rufen Sie uns direkt an!
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a 
              href="tel:+4941745969770"
              className="bg-red-600 hover:bg-red-700 text-white px-8 py-4 rounded-lg font-semibold transition-all duration-300 transform hover:scale-105 hover:shadow-xl whitespace-nowrap cursor-pointer inline-flex items-center justify-center"
            >
              <i className="ri-phone-line mr-2"></i>
              041 745 969 70
            </a>
            <a 
              href="mailto:info@autogalerie-nord.de"
              className="border-2 border-red-600 text-red-600 hover:bg-red-600 hover:text-white px-8 py-4 rounded-lg font-semibold transition-all duration-300 transform hover:scale-105 whitespace-nowrap cursor-pointer inline-flex items-center justify-center"
            >
              <i className="ri-mail-line mr-2"></i>
              E-Mail senden
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
