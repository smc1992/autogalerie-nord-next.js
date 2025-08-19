'use client';

export default function WillkommenSection() {
  const highlights = [
    {
      icon: 'ri-time-line',
      title: 'Über 10 Jahre Erfahrung',
      description: 'Langjährige Expertise im Fahrzeughandel'
    },
    {
      icon: 'ri-shield-check-line',
      title: 'Geprüfte Fahrzeuge',
      description: 'Jedes Fahrzeug wird sorgfältig kontrolliert'
    },
    {
      icon: 'ri-money-euro-circle-line',
      title: 'Faire Preise',
      description: 'Transparente und ehrliche Preisgestaltung'
    },
    {
      icon: 'ri-user-heart-line',
      title: 'Persönliche Beratung',
      description: 'Individuelle Betreuung für jeden Kunden'
    }
  ];

  return (
    <section className="py-20 bg-white">
      <div className="max-w-6xl mx-auto px-4 md:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Content */}
          <div>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-8">
              Willkommen bei der <span className="text-red-600">Autogalerie Nord</span>
            </h2>
            
            <div className="space-y-6 text-lg text-gray-600 leading-relaxed">
              <p>
                Seit unserer Gründung sind wir Ihr vertrauensvoller Partner für hochwertige Gebrauchtwagen in Norddeutschland. Mit Leidenschaft und Expertise helfen wir Ihnen dabei, das perfekte Fahrzeug für Ihre Bedürfnisse zu finden.
              </p>
              
              <p>
                Unser erfahrenes Team steht Ihnen mit kompetenter Beratung zur Seite und sorgt dafür, dass Sie sich beim Autokauf rundum wohlfühlen. Transparenz, Fairness und Qualität sind die Grundpfeiler unseres Handelns.
              </p>
            </div>

            {/* Highlights Grid */}
            <div className="grid grid-cols-2 gap-6 mt-12">
              {highlights.map((highlight, index) => (
                <div key={index} className="group">
                  <div className="flex items-center mb-3">
                    <div className="w-12 h-12 flex items-center justify-center bg-red-100 rounded-lg mr-4 group-hover:bg-red-600 transition-all duration-300">
                      <i className={`${highlight.icon} text-xl text-red-600 group-hover:text-white transition-colors duration-300`}></i>
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900 group-hover:text-red-600 transition-colors duration-300">
                        {highlight.title}
                      </h3>
                    </div>
                  </div>
                  <p className="text-sm text-gray-600 group-hover:text-gray-700 transition-colors duration-300">
                    {highlight.description}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Image */}
          <div className="relative">
            <div className="relative rounded-2xl overflow-hidden shadow-2xl transform hover:scale-105 transition-all duration-500">
              <img 
                src="/images/standort.jpg"
                alt="Autogalerie Nord Fahrzeuge vor Ort"
                className="w-full h-96 object-cover object-top"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
            </div>
            
            {/* Floating badge */}
            <div className="absolute -bottom-6 -right-6 bg-red-600 text-white px-6 py-4 rounded-2xl shadow-xl transform rotate-3 hover:rotate-0 transition-transform duration-300">
              <div className="text-center">
                <div className="text-2xl font-bold">70+</div>
                <div className="text-sm">Fahrzeuge</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}