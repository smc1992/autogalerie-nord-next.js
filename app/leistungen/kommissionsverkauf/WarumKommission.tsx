'use client';

export default function WarumKommission() {
  const vorteile = [
    {
      icon: 'ri-money-euro-circle-line',
      title: 'Höchstmöglicher Preis',
      description: 'Durch unsere Expertise und unser Netzwerk erzielen wir für Ihr Fahrzeug den bestmöglichen Verkaufspreis.',
      image: 'https://readdy.ai/api/search-image?query=Professional%20car%20valuation%20with%20calculator%20and%20money%2C%20automotive%20pricing%20expertise%2C%20car%20appraisal%20process%2C%20vehicle%20value%20assessment%2C%20professional%20automotive%20evaluation%2C%20premium%20car%20pricing%20service&width=400&height=300&seq=hoechster-preis&orientation=landscape'
    },
    {
      icon: 'ri-timer-2-line',
      title: 'Schnell & Unkompliziert',
      description: 'Keine langen Wartezeiten oder komplizierte Abwicklung. Wir kümmern uns um alles für Sie.',
      image: 'https://readdy.ai/api/search-image?query=Fast%20car%20sale%20process%2C%20quick%20automotive%20transaction%2C%20efficient%20car%20selling%20service%2C%20streamlined%20vehicle%20sale%20procedure%2C%20rapid%20car%20sales%20process%2C%20professional%20automotive%20efficiency&width=400&height=300&seq=schnell-unkompliziert&orientation=landscape'
    },
    {
      icon: 'ri-shield-check-line',
      title: 'Sicher & Seriös',
      description: 'Vertrauen Sie auf unsere langjährige Erfahrung und seriöse Abwicklung ohne versteckte Kosten.',
      image: 'https://readdy.ai/api/search-image?query=Secure%20car%20transaction%2C%20professional%20automotive%20contract%20signing%2C%20trusted%20car%20sales%20service%2C%20reliable%20vehicle%20sale%20process%2C%20safe%20automotive%20transaction%2C%20professional%20car%20dealership%20security&width=400&height=300&seq=sicher-serioes&orientation=landscape'
    },
    {
      icon: 'ri-search-line',
      title: 'Professionelle Bewertung',
      description: 'Unsere Experten bewerten Ihr Fahrzeug vor Ort und erstellen eine faire, marktgerechte Einschätzung.',
      image: 'https://readdy.ai/api/search-image?query=Professional%20car%20inspection%20and%20evaluation%2C%20automotive%20expert%20examining%20vehicle%2C%20detailed%20car%20appraisal%20process%2C%20professional%20vehicle%20assessment%2C%20expert%20car%20evaluation%20service&width=400&height=300&seq=bewertung&orientation=landscape'
    },
    {
      icon: 'ri-customer-service-2-line',
      title: 'Komplette Abwicklung',
      description: 'Alle Verhandlungen mit potenziellen Käufern werden von unserem erfahrenen Team geführt. Wir filtern "unseriöse Anfragen" heraus und sorgen für einen reibungslosen und sicheren Verkaufsprozess.',
      image: 'https://readdy.ai/api/search-image?query=Professional%20car%20sales%20negotiation%2C%20automotive%20sales%20team%20working%20with%20customers%2C%20complete%20car%20sales%20service%2C%20professional%20vehicle%20transaction%20management%2C%20expert%20car%20sales%20handling&width=400&height=300&seq=abwicklung&orientation=landscape'
    },
    {
      icon: 'ri-user-heart-line',
      title: 'Persönliche Betreuung',
      description: 'Ein fester Ansprechpartner begleitet Sie durch den gesamten Verkaufsprozess.',
      image: 'https://readdy.ai/api/search-image?query=Personal%20car%20sales%20consultation%2C%20dedicated%20automotive%20advisor%20with%20customer%2C%20one-on-one%20car%20selling%20support%2C%20personal%20vehicle%20sales%20assistance%2C%20professional%20customer%20service%20in%20automotive&width=400&height=300&seq=betreuung&orientation=landscape'
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