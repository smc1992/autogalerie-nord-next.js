'use client';

export default function ProcessSection() {
  const vorteile = [
    {
      title: 'Komplette Abwicklung',
      description: 'Autogalerie Nord GmbH kümmert sich für Sie um alles, damit Sie zügig mit Ihrem neuen gebrauchten Fahrzeug starten können.',
      icon: 'ri-checkbox-circle-line',
      image: 'https://readdy.ai/api/search-image?query=Professional%20car%20registration%20service%2C%20automotive%20paperwork%20being%20processed%2C%20official%20documents%20and%20stamps%2C%20modern%20administrative%20office%2C%20car%20registration%20forms%20being%20completed%2C%20professional%20service%20desk%20with%20vehicle%20documents&width=600&height=400&seq=komplett-abwicklung&orientation=landscape'
    },
    {
      title: 'Minimaler Aufwand',
      description: 'Sie stellen uns nur die notwendigen Unterlagen zur Verfügung - den gesamten Papierkram übernehmen wir für Sie.',
      icon: 'ri-time-line',
      image: 'https://readdy.ai/api/search-image?query=Minimal%20effort%20car%20registration%2C%20customer%20providing%20documents%20to%20professional%20service%2C%20simple%20paperwork%20handover%2C%20stress-free%20car%20registration%20experience%2C%20customer-friendly%20automotive%20service%2C%20easy%20document%20submission%20process&width=600&height=400&seq=minimal-aufwand&orientation=landscape'
    },
    {
      title: 'Alle Kennzeichen-Arten',
      description: 'Ob normale Zulassung, Kurzzeit- oder Ausfuhrkennzeichen - wir haben die passende Lösung für Ihre Bedürfnisse.',
      icon: 'ri-car-line',
      image: 'https://readdy.ai/api/search-image?query=Different%20types%20of%20car%20license%20plates%2C%20German%20vehicle%20registration%20plates%2C%20export%20license%20plates%2C%20temporary%20license%20plates%2C%20various%20automotive%20registration%20options%2C%20professional%20license%20plate%20service%20display&width=600&height=400&seq=kennzeichen-arten&orientation=landscape'
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