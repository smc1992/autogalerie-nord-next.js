
'use client';

import Link from 'next/link';

export default function LeistungenOverview() {
  const leistungen = [
    {
      title: 'Finanzierung',
      description: 'Maßgeschneiderte Finanzierungslösungen für Ihren Traumwagen. Faire Konditionen und schnelle Abwicklung.',
      icon: 'ri-bank-card-line',
      href: '/leistungen/finanzierung',
      features: [
        'Individuelle Finanzierungsberatung',
        'Attraktive Zinssätze',
        'Flexible Laufzeiten',
        'Schnelle Zusage'
      ],
      image: 'https://readdy.ai/api/search-image?query=Professional%20car%20financing%20consultation%2C%20financial%20advisor%20discussing%20car%20loan%20with%20customer%2C%20modern%20banking%20environment%2C%20calculator%20and%20car%20keys%20on%20desk%2C%20premium%20automotive%20financing%20service%2C%20professional%20consultation%20scene&width=600&height=400&seq=finanzierung-service&orientation=landscape'
    },
    {
      title: 'Zulassungsservice',
      description: 'Wir übernehmen alle Formalitäten rund um die Zulassung Ihres Fahrzeugs - schnell und unkompliziert.',
      icon: 'ri-file-text-line',
      href: '/leistungen/zulassungsservice',
      features: [
        'Komplette Zulassungsabwicklung',
        'Kennzeichenreservierung',
        'Ummeldung bei Umzug',
        'Stilllegung von Fahrzeugen'
      ],
      image: 'https://readdy.ai/api/search-image?query=Professional%20automotive%20registration%20service%2C%20car%20registration%20documents%20and%20license%20plates%2C%20modern%20administrative%20office%2C%20official%20paperwork%20processing%2C%20vehicle%20registration%20procedure%2C%20clean%20organized%20office%20environment&width=600&height=400&seq=zulassung-service&orientation=landscape'
    },
    {
      title: 'Import & Export',
      description: 'Internationale Fahrzeugbeschaffung und weltweiter Export. Wir machen den globalen Fahrzeughandel möglich.',
      icon: 'ri-ship-line',
      href: '/leistungen/import-export',
      features: [
        'Weltweite Fahrzeugbeschaffung',
        'Export in alle Länder',
        'Verzollungsservice',
        'Logistikabwicklung'
      ],
      image: 'https://readdy.ai/api/search-image?query=International%20car%20shipping%20and%20export%2C%20luxury%20cars%20being%20loaded%20onto%20transport%20truck%2C%20professional%20automotive%20logistics%2C%20car%20carrier%20truck%20with%20premium%20vehicles%2C%20global%20car%20export%20operation%2C%20modern%20shipping%20facility&width=600&height=400&seq=import-export-service&orientation=landscape'
    },
    {
      title: 'Kommissionsverkauf',
      description: 'Verkaufen Sie Ihr Fahrzeug professionell über uns. Maximaler Erlös bei minimalem Aufwand für Sie.',
      icon: 'ri-handshake-line',
      href: '/leistungen/kommissionsverkauf',
      features: [
        'Professionelle Fahrzeugvermarktung',
        'Maximaler Verkaufspreis',
        'Komplette Verkaufsabwicklung',
        'Transparente Abrechnung'
      ],
      image: 'https://readdy.ai/api/search-image?query=Professional%20car%20consignment%20sale%20service%2C%20luxury%20car%20displayed%20in%20modern%20showroom%2C%20professional%20car%20sales%20presentation%2C%20premium%20vehicle%20showcase%2C%20elegant%20automotive%20retail%20environment%2C%20sophisticated%20car%20dealership%20interior&width=600&height=400&seq=kommission-service&orientation=landscape'
    }
  ];

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
            Umfassende Services für alle Ihre Bedürfnisse
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Entdecken Sie unser vollständiges Leistungsspektrum - von der Fahrzeugfinanzierung bis hin zum internationalen Handel
          </p>
        </div>

        {/* Services Grid */}
        <div className="space-y-20">
          {leistungen.map((leistung, index) => (
            <div key={index} className={`flex flex-col ${index % 2 === 0 ? 'lg:flex-row' : 'lg:flex-row-reverse'} items-center gap-12 lg:gap-16`}>
              {/* Content */}
              <div className="flex-1 space-y-6">
                <div className="flex items-center space-x-4">
                  <div className="w-16 h-16 flex items-center justify-center bg-red-100 rounded-2xl">
                    <i className={`${leistung.icon} text-2xl text-red-600`}></i>
                  </div>
                  <h3 className="text-2xl md:text-3xl font-bold text-gray-900">{leistung.title}</h3>
                </div>
                
                <p className="text-lg text-gray-600 leading-relaxed">
                  {leistung.description}
                </p>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {leistung.features.map((feature, featureIndex) => (
                    <div key={featureIndex} className="flex items-center space-x-3">
                      <div className="w-2 h-2 bg-red-600 rounded-full flex-shrink-0"></div>
                      <span className="text-gray-700">{feature}</span>
                    </div>
                  ))}
                </div>
                
                <div className="pt-4">
                  <Link 
                    href={leistung.href}
                    className="inline-flex items-center bg-red-600 hover:bg-red-700 text-white px-8 py-4 rounded-lg font-semibold transition-all duration-300 transform hover:scale-105 hover:shadow-xl whitespace-nowrap cursor-pointer"
                  >
                    Mehr erfahren
                    <i className="ri-arrow-right-line ml-2"></i>
                  </Link>
                </div>
              </div>
              
              {/* Image */}
              <div className="flex-1">
                <div className="relative rounded-2xl overflow-hidden shadow-2xl transform hover:scale-105 transition-all duration-500">
                  <img 
                    src={leistung.image}
                    alt={leistung.title}
                    className="w-full h-80 lg:h-96 object-cover object-top"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="mt-20 text-center bg-gradient-to-r from-red-50 to-red-100 rounded-3xl p-12">
          <h3 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">
            Haben Sie Fragen zu unseren Leistungen?
          </h3>
          <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto">
            Unser Expertenteam berät Sie gerne persönlich und findet die optimale Lösung für Ihre Anforderungen.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a 
              href="tel:+4941745969770"
              className="bg-red-600 hover:bg-red-700 text-white px-8 py-4 rounded-lg font-semibold transition-all duration-300 transform hover:scale-105 hover:shadow-xl whitespace-nowrap cursor-pointer inline-flex items-center justify-center"
            >
              <i className="ri-phone-line mr-2"></i>
              Jetzt anrufen
            </a>
            <a 
              href="mailto:info@autogalerie-nord.de"
              className="border-2 border-red-600 text-red-600 hover:bg-red-600 hover:text-white px-8 py-4 rounded-lg font-semibold transition-all duration-300 transform hover:scale-105 whitespace-nowrap cursor-pointer inline-flex items-center justify-center"
            >
              <i className="ri-mail-line mr-2"></i>
              E-Mail schreiben
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
