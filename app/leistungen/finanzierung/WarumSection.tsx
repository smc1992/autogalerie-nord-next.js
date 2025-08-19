
'use client';

export default function WarumSection() {
  const gruende = [
    {
      icon: 'ri-price-tag-3-line',
      title: 'Beste Konditionen',
      description: 'Durch unsere langjährigen Partnerschaften erhalten Sie besonders günstige Zinssätze und faire Konditionen für Ihre Autofinanzierung. Wir vergleichen für Sie und finden das beste Angebot.',
      image: '/images/beste-konditionen.jpg',
      stats: [
        { value: 'ab 2,99%', label: 'eff. Jahreszins' },
        { value: '100%', label: 'Finanzierung möglich' },
        { value: '0€', label: 'Bearbeitungsgebühr' }
      ]
    },
    {
      icon: 'ri-speed-line',
      title: 'Schnelle Abwicklung',
      description: 'Von der ersten Beratung bis zur Zusage - wir sorgen für eine schnelle und unkomplizierte Abwicklung Ihrer Finanzierung. Ihr Traumauto steht schon bereit!',
      image: '/images/schnelle-abwicklung.jpg',
      stats: [
        { value: '24h', label: 'Bearbeitungszeit' },
        { value: '15 Min.', label: 'Beratungstermin' },
        { value: '98%', label: 'Zusagequote' }
      ]
    },
    {
      icon: 'ri-user-heart-line',
      title: 'Persönliche Beratung',
      description: 'Unser erfahrenes Finanzierungsteam berät Sie persönlich und findet die optimale Finanzierungslösung für Ihre individuellen Bedürfnisse und Ihre finanzielle Situation.',
      image: '/images/finanzierung-beratung.jpg',
      stats: [
        { value: '15+', label: 'Jahre Erfahrung' },
        { value: '1.500+', label: 'Finanzierte Fahrzeuge' },
        { value: '4,8/5', label: 'Kundenbewertung' }
      ]
    }
  ];

  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-6xl mx-auto px-4 md:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
            Warum <span className="text-red-600">Autogalerie Nord</span>?
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Entdecken Sie die Vorteile einer Finanzierung über uns - Ihr vertrauensvoller Partner für Fahrzeugfinanzierung
          </p>
        </div>

        <div className="space-y-20">
          {gruende.map((grund, index) => (
            <div key={index} className={`flex flex-col ${index % 2 === 0 ? 'lg:flex-row' : 'lg:flex-row-reverse'} items-center gap-12`}>
              {/* Content */}
              <div className="flex-1">
                <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300">
                  <div className="flex items-center space-x-4 mb-6">
                    <div className="w-16 h-16 flex items-center justify-center bg-red-100 rounded-2xl group-hover:bg-red-600 transition-all duration-300">
                      <i className={`${grund.icon} text-2xl text-red-600 group-hover:text-white transition-colors duration-300`}></i>
                    </div>
                    <h3 className="text-2xl md:text-3xl font-bold text-gray-900">
                      {grund.title}
                    </h3>
                  </div>
                  <p className="text-lg text-gray-600 leading-relaxed mb-8">
                    {grund.description}
                  </p>
                  
                  {/* Stats */}
                  <div className="grid grid-cols-3 gap-6">
                    {grund.stats.map((stat, statIndex) => (
                      <div key={statIndex} className="text-center">
                        <div className="text-2xl font-bold text-red-600 mb-1">
                          {stat.value}
                        </div>
                        <div className="text-sm text-gray-600">
                          {stat.label}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
              
              {/* Image */}
              <div className="flex-1">
                <div className="relative rounded-2xl overflow-hidden shadow-xl transform hover:scale-105 transition-all duration-500 group">
                  <img 
                    src={grund.image}
                    alt={grund.title}
                    className="w-full h-96 object-cover object-top transform group-hover:scale-110 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                  
                  {/* Overlay Icon */}
                  <div className="absolute top-6 right-6 w-12 h-12 flex items-center justify-center bg-white/20 backdrop-blur-sm rounded-full opacity-0 group-hover:opacity-100 transform translate-y-4 group-hover:translate-y-0 transition-all duration-500">
                    <i className={`${grund.icon} text-xl text-white`}></i>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Abschließende CTA */}
        <div className="mt-20 bg-gradient-to-r from-red-600 to-red-700 rounded-3xl p-12 text-center text-white relative overflow-hidden">
          {/* Background decoration */}
          <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full transform translate-x-16 -translate-y-16"></div>
          <div className="absolute bottom-0 left-0 w-24 h-24 bg-white/10 rounded-full transform -translate-x-12 translate-y-12"></div>
          
          <div className="relative z-10">
            <h3 className="text-3xl md:text-4xl font-bold mb-4">
              Starten Sie jetzt Ihre Finanzierung!
            </h3>
            <p className="text-xl text-red-100 mb-8 max-w-2xl mx-auto">
              Lassen Sie sich kostenlos und unverbindlich beraten. Ihr Traumauto ist nur einen Anruf entfernt.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a 
                href="tel:+4941745969770"
                className="bg-white text-red-600 hover:bg-gray-100 px-8 py-4 rounded-lg font-semibold transition-all duration-300 transform hover:scale-105 hover:shadow-xl whitespace-nowrap cursor-pointer inline-flex items-center justify-center"
              >
                <i className="ri-phone-line mr-2"></i>
                Jetzt anrufen: 041 745 969 70
              </a>
              <a 
                href="mailto:info@autogalerie-nord.de"
                className="border-2 border-white text-white hover:bg-white hover:text-red-600 px-8 py-4 rounded-lg font-semibold transition-all duration-300 transform hover:scale-105 whitespace-nowrap cursor-pointer inline-flex items-center justify-center"
              >
                <i className="ri-mail-line mr-2"></i>
                E-Mail schreiben
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
