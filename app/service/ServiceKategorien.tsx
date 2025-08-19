'use client';

export default function ServiceKategorien() {
  const kategorien = [
    {
      title: 'Wartung & Inspektion',
      description: 'Regelmäßige Wartung und TÜV-Vorbereitung für maximale Fahrsicherheit und Werterhalt.',
      icon: 'ri-tools-line',
      features: [
        'Hauptuntersuchung',
        'Abgasuntersuchung', 
        'Ölwechsel',
        'Filterwechsel'
      ],
      image: '/images/Wartung und Inspektion-Autogalerie Nord.webp'
    },
    {
      title: 'Reparaturen',
      description: 'Fachgerechte Reparaturen aller Fahrzeugkomponenten durch erfahrene Mechaniker.',
      icon: 'ri-hammer-line',
      features: [
        'Motorinstandsetzung',
        'Getriebe Service',
        'Elektronik Diagnose',
        'Karosserie Arbeiten'
      ],
      image: '/images/Reparaturen-Autogalerie Nord.webp'
    },
    {
      title: 'Reifenservice',
      description: 'Kompletter Reifenservice vom Wechsel bis zur Einlagerung Ihrer Reifen.',
      icon: 'ri-roadster-line',
      features: [
        'Reifenwechsel',
        'Reifeneinlagerung',
        'Auswuchtung',
        'Reifenverkauf'
      ],
      image: '/images/Reifenservice-Autogalerie Nord.webp'
    },
    {
      title: 'Fahrzeugpflege',
      description: 'Professionelle Innen- und Außenreinigung für den perfekten Auftritt Ihres Fahrzeugs.',
      icon: 'ri-bubble-chart-line',
      features: [
        'Außenwäsche',
        'Innenreinigung',
        'Lackversiegelung',
        'Polsterreinigung'
      ],
      image: '/images/Fahrzeugpflege-Autogalerie Nord.webp'
    }
  ];

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
            Unsere Service-Kategorien
          </h2>
        </div>

        <div className="space-y-20">
          {kategorien.map((kategorie, index) => (
            <div key={index} className={`flex flex-col ${index % 2 === 0 ? 'lg:flex-row' : 'lg:flex-row-reverse'} items-center gap-12 lg:gap-16`}>
              <div className="flex-1 space-y-6">
                <div className="flex items-center space-x-4">
                  <div className="w-16 h-16 flex items-center justify-center bg-red-100 rounded-2xl">
                    <i className={`${kategorie.icon} text-2xl text-red-600`}></i>
                  </div>
                  <h3 className="text-2xl md:text-3xl font-bold text-gray-900">{kategorie.title}</h3>
                </div>
                
                <p className="text-lg text-gray-600 leading-relaxed">
                  {kategorie.description}
                </p>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {kategorie.features.map((feature, featureIndex) => (
                    <div key={featureIndex} className="flex items-center space-x-3">
                      <div className="w-2 h-2 bg-red-600 rounded-full flex-shrink-0"></div>
                      <span className="text-gray-700">• {feature}</span>
                    </div>
                  ))}
                </div>
              </div>
              
              <div className="flex-1">
                <div className="relative rounded-2xl overflow-hidden shadow-2xl transform hover:scale-105 transition-all duration-500">
                  <img 
                    src={kategorie.image}
                    alt={kategorie.title}
                    className="w-full h-80 lg:h-96 object-cover object-top"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}