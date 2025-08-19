'use client';

export default function ProzessSchritte() {
  const schritte = [
    {
      nummer: '1',
      title: 'Kontaktaufnahme',
      description: 'Wir kümmern uns um die professionelle Vermarktung, die Verhandlungen und den gesamten Papierkram. Sie erhalten am Ende den bestmöglichen Preis für Ihr Fahrzeug, ohne den üblichen Stress.',
      icon: 'ri-phone-line',
      image: 'https://readdy.ai/api/search-image?query=Professional%20phone%20consultation%20for%20car%20sales%2C%20customer%20service%20representative%20discussing%20vehicle%20sale%2C%20automotive%20consultation%20call%2C%20professional%20car%20sales%20contact%2C%20friendly%20automotive%20advisor%20on%20phone%20call&width=500&height=350&seq=kontakt-schritt&orientation=landscape'
    },
    {
      nummer: '2',
      title: 'Vor-Ort Bewertung',
      description: 'Wir erstellen hochwertige Fotos und eine detaillierte Beschreibung, um Ihr Fahrzeug im "besten Licht" zu präsentieren. Unsere Online-Präsenz auf allen großen Plattformen garantiert maximale Reichweite.',
      icon: 'ri-camera-line',
      image: 'https://readdy.ai/api/search-image?query=Professional%20automotive%20photographer%20taking%20high-quality%20car%20photos%2C%20vehicle%20inspection%20and%20photo%20session%2C%20professional%20car%20photography%20for%20sales%2C%20detailed%20vehicle%20documentation%20process%2C%20premium%20car%20photo%20shoot&width=500&height=350&seq=bewertung-schritt&orientation=landscape'
    },
    {
      nummer: '3',
      title: 'Vertragsabschluss',
      description: 'Bei Einverständnis schließen wir einen transparenten Kommissionsvertrag ab und übernehmen den Verkauf.',
      icon: 'ri-file-text-line',
      image: 'https://readdy.ai/api/search-image?query=Professional%20contract%20signing%20for%20car%20consignment%20sale%2C%20automotive%20business%20agreement%2C%20transparent%20car%20sales%20contract%2C%20professional%20document%20signing%2C%20automotive%20legal%20paperwork%20process&width=500&height=350&seq=vertrag-schritt&orientation=landscape'
    },
    {
      nummer: '4',
      title: 'Auszahlung',
      description: 'Nach erfolgreichem Verkauf erhalten Sie umgehend Ihren Erlös - abzüglich unserer fairen Provision.',
      icon: 'ri-money-euro-circle-line',
      image: 'https://readdy.ai/api/search-image?query=Successful%20car%20sale%20payment%2C%20automotive%20transaction%20completion%2C%20car%20sales%20payment%20process%2C%20professional%20vehicle%20sale%20payout%2C%20satisfied%20customer%20receiving%20car%20sale%20proceeds&width=500&height=350&seq=auszahlung-schritt&orientation=landscape'
    }
  ];

  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
            So funktioniert unser Kommissionsverkauf
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            In nur 4 einfachen Schritten zu Ihrem optimalen Verkaufspreis
          </p>
        </div>

        {/* Prozess Steps */}
        <div className="space-y-16">
          {schritte.map((schritt, index) => (
            <div key={index} className={`flex flex-col ${index % 2 === 0 ? 'lg:flex-row' : 'lg:flex-row-reverse'} items-center gap-12 lg:gap-16`}>
              {/* Content */}
              <div className="flex-1 space-y-6">
                <div className="flex items-center space-x-6">
                  <div className="w-16 h-16 flex items-center justify-center bg-red-600 text-white rounded-full text-2xl font-bold">
                    {schritt.nummer}
                  </div>
                  <div className="w-12 h-12 flex items-center justify-center bg-red-100 rounded-xl">
                    <i className={`${schritt.icon} text-xl text-red-600`}></i>
                  </div>
                  <h3 className="text-2xl md:text-3xl font-bold text-gray-900">{schritt.title}</h3>
                </div>
                
                <p className="text-lg text-gray-600 leading-relaxed pl-22">
                  {schritt.description}
                </p>
              </div>
              
              {/* Image */}
              <div className="flex-1">
                <div className="relative rounded-2xl overflow-hidden shadow-xl transform hover:scale-105 transition-all duration-500">
                  <img 
                    src={schritt.image}
                    alt={schritt.title}
                    className="w-full h-80 object-cover object-top"
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