'use client';

export default function ProcessSection() {
  const vorteile = [
    {
      title: 'Komplette Abwicklung',
      description: 'Autogalerie Nord GmbH kümmert sich für Sie um alles, damit Sie zügig mit Ihrem neuen gebrauchten Fahrzeug starten können.',
      icon: 'ri-checkbox-circle-line',
      image: '/images/komplett-abwicklung.jpg'
    },
    {
      title: 'Minimaler Aufwand',
      description: 'Sie stellen uns nur die notwendigen Unterlagen zur Verfügung - den gesamten Papierkram übernehmen wir für Sie.',
      icon: 'ri-time-line',
      image: '/images/minimal-aufwand.jpg'
    },
    {
      title: 'Alle Kennzeichen-Arten',
      description: 'Ob normale Zulassung, Kurzzeit- oder Ausfuhrkennzeichen - wir haben die passende Lösung für Ihre Bedürfnisse.',
      icon: 'ri-car-line',
      image: '/images/kennzeichen-arten.jpg'
    }
  ];

  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
            Zügig mit Ihrem neuen Gebrauchten starten
          </h2>
        </div>

        <div className="space-y-20">
          {vorteile.map((vorteil, index) => (
            <div key={index} className={`flex flex-col ${index % 2 === 0 ? 'lg:flex-row' : 'lg:flex-row-reverse'} items-center gap-12 lg:gap-16`}>
              {/* Content */}
              <div className="flex-1 space-y-6">
                <div className="flex items-center space-x-4">
                  <div className="w-16 h-16 flex items-center justify-center bg-red-100 rounded-2xl">
                    <i className={`${vorteil.icon} text-2xl text-red-600`}></i>
                  </div>
                  <h3 className="text-2xl md:text-3xl font-bold text-gray-900">{vorteil.title}</h3>
                </div>
                
                <p className="text-lg text-gray-600 leading-relaxed">
                  {vorteil.description}
                </p>
              </div>
              
              {/* Image */}
              <div className="flex-1">
                <div className="relative rounded-2xl overflow-hidden shadow-2xl transform hover:scale-105 transition-all duration-500">
                  <img 
                    src={vorteil.image}
                    alt={vorteil.title}
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