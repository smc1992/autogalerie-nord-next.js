'use client';

export default function WarumWerkstatt() {
  const vorteile = [
    {
      icon: 'ri-user-star-line',
      title: 'Erfahrene Mechaniker',
      description: 'Unser Team besteht aus qualifizierten Kfz-Meistern mit über 20 Jahren Berufserfahrung.'
    },
    {
      icon: 'ri-settings-3-line',
      title: 'Modernste Ausrüstung',
      description: 'Wir arbeiten mit neuester Diagnosetechnik und professionellen Werkzeugen aller Marken.'
    },
    {
      icon: 'ri-time-line',
      title: 'Schnelle Termine',
      description: 'Flexible Terminvergabe und Express-Service für dringende Reparaturen verfügbar.'
    },
    {
      icon: 'ri-price-tag-3-line',
      title: 'Faire Preise',
      description: 'Transparente Kostenvoranschläge und faire Preise ohne versteckte Zusatzkosten.'
    },
    {
      icon: 'ri-shield-check-line',
      title: 'Garantie',
      description: '24 Monate Garantie auf alle Reparaturen und verwendeten Originalteile.'
    },
    {
      icon: 'ri-customer-service-2-line',
      title: 'Persönlicher Service',
      description: 'Individuelle Beratung und persönliche Betreuung von der Annahme bis zur Abholung.'
    }
  ];

  return (
    <section className="py-20 bg-gradient-to-br from-gray-50 to-gray-100">
      <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
            Warum unsere Werkstatt?
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {vorteile.map((vorteil, index) => (
            <div key={index} className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105">
              <div className="w-16 h-16 flex items-center justify-center bg-red-100 rounded-2xl mx-auto mb-6">
                <i className={`${vorteil.icon} text-2xl text-red-600`}></i>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4 text-center">{vorteil.title}</h3>
              <p className="text-gray-600 text-center leading-relaxed">{vorteil.description}</p>
            </div>
          ))}
        </div>

        <div className="mt-16 text-center bg-gradient-to-r from-red-50 to-red-100 rounded-3xl p-12">
          <h3 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">
            Bereit für Ihren Service-Termin?
          </h3>
          <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto">
            Vereinbaren Sie noch heute einen Termin und lassen Sie Ihr Fahrzeug von unseren Experten betreuen.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a 
              href="tel:+4941745969770"
              className="bg-red-600 hover:bg-red-700 text-white px-8 py-4 rounded-lg font-semibold transition-all duration-300 transform hover:scale-105 hover:shadow-xl whitespace-nowrap cursor-pointer inline-flex items-center justify-center"
            >
              <i className="ri-phone-line mr-2"></i>
              Termin vereinbaren
            </a>
            <a 
              href="https://wa.me/4941717889111" 
              target="_blank" 
              rel="noopener noreferrer"
              className="border-2 border-red-600 text-red-600 hover:bg-red-600 hover:text-white px-8 py-4 rounded-lg font-semibold transition-all duration-300 transform hover:scale-105 whitespace-nowrap cursor-pointer inline-flex items-center justify-center"
            >
              <i className="ri-whatsapp-line mr-2"></i>
              WhatsApp
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}