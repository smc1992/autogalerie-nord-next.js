'use client';

export default function WarumKommission() {
  const vorteile = [
    {
      icon: 'ri-money-euro-circle-line',
      title: 'Höchstmöglicher Preis',
      description: 'Durch unsere Expertise und unser Netzwerk erzielen wir für Ihr Fahrzeug den bestmöglichen Verkaufspreis.',
      image: '/images/höchstmöglicher Preis Kommisionsverkauf.webp'
    },
    {
      icon: 'ri-timer-2-line',
      title: 'Schnell & Unkompliziert',
      description: 'Keine langen Wartezeiten oder komplizierte Abwicklung. Wir kümmern uns um alles für Sie.',
      image: '/images/unkomplizierter Verkauf.webp'
    },
    {
      icon: 'ri-shield-check-line',
      title: 'Sicher & Seriös',
      description: 'Vertrauen Sie auf unsere langjährige Erfahrung und seriöse Abwicklung ohne versteckte Kosten.',
      image: '/images/sicher und seriös.webp'
    },
    {
      icon: 'ri-search-line',
      title: 'Professionelle Bewertung',
      description: 'Unsere Experten bewerten Ihr Fahrzeug vor Ort und erstellen eine faire, marktgerechte Einschätzung.',
      image: '/images/professionelle Bewertung-Autogalerie Nord.webp'
    },
    {
      icon: 'ri-customer-service-2-line',
      title: 'Komplette Abwicklung',
      description: 'Alle Verhandlungen mit potenziellen Käufern werden von unserem erfahrenen Team geführt. Wir filtern "unseriöse Anfragen" heraus und sorgen für einen reibungslosen und sicheren Verkaufsprozess.',
      image: '/images/komplette Abwicklung Kommisionsverkauf-Autogalerie Nord.webp'
    },
    {
      icon: 'ri-user-heart-line',
      title: 'Persönliche Betreuung',
      description: 'Ein fester Ansprechpartner begleitet Sie durch den gesamten Verkaufsprozess.',
      image: '/images/persönliche Betreuung Kommisionsverkauf.webp'
    }
  ];

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
            Warum Kommissionsverkauf bei Autogalerie Nord?
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Wir kaufen Ihr Fahrzeug zum höchstmöglichen Preis, schnell und unkompliziert.
          </p>
        </div>

        {/* Vorteile Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {vorteile.map((vorteil, index) => (
            <div key={index} className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300 transform hover:scale-105">
              <div className="relative h-48 overflow-hidden">
                <img 
                  src={vorteil.image}
                  alt={vorteil.title}
                  className="w-full h-full object-cover object-top"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent"></div>
              </div>
              <div className="p-6">
                <div className="flex items-center space-x-4 mb-4">
                  <div className="w-12 h-12 flex items-center justify-center bg-red-100 rounded-xl">
                    <i className={`${vorteil.icon} text-xl text-red-600`}></i>
                  </div>
                  <h3 className="text-xl font-bold text-gray-900">{vorteil.title}</h3>
                </div>
                <p className="text-gray-600 leading-relaxed">
                  {vorteil.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}