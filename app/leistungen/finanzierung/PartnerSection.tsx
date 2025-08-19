
'use client';

export default function PartnerSection() {
  const partner = [
    {
      name: 'Santander Consumer Bank',
      logo: 'https://readdy.ai/api/search-image?query=Santander%20Consumer%20Bank%20logo%20red%20corporate%20branding%2C%20professional%20banking%20logo%2C%20financial%20services%20branding%2C%20clean%20corporate%20design%20with%20red%20color%20scheme&width=300&height=120&seq=santander-logo&orientation=landscape',
      description: 'Einer der führenden Anbieter für Autofinanzierung in Deutschland',
      features: ['Testsieger Autokredit 2023', 'Über 60 Jahre Erfahrung', 'Millionen zufriedene Kunden']
    },
    {
      name: 'Credit.de',
      logo: 'https://readdy.ai/api/search-image?query=Credit.de%20logo%20professional%20financial%20services%20branding%2C%20modern%20banking%20logo%20design%2C%20digital%20finance%20company%20branding%2C%20clean%20corporate%20identity&width=300&height=120&seq=credit-logo&orientation=landscape',
      description: 'Spezialist für maßgeschneiderte Finanzierungslösungen',
      features: ['Flexible Konditionen', 'Schnelle Bearbeitung', 'Individuelle Lösungen']
    }
  ];

  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-6xl mx-auto px-4 md:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
            Unsere <span className="text-red-600">Finanzierungspartner</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
            Gemeinsam mit unseren starken Partnern bieten wir Ihnen seriöse und attraktive Finanzierungslösungen für Ihr Traumfahrzeug.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {partner.map((partner, index) => (
            <div key={index} className="bg-white rounded-3xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2">
              <div className="text-center mb-8">
                <img 
                  src={partner.logo}
                  alt={`${partner.name} Logo`}
                  className="h-16 mx-auto mb-6 object-contain"
                />
                <h3 className="text-2xl font-bold text-gray-900 mb-4">
                  {partner.name}
                </h3>
                <p className="text-lg text-gray-600 leading-relaxed">
                  {partner.description}
                </p>
              </div>
              
              <div className="space-y-4">
                {partner.features.map((feature, featureIndex) => (
                  <div key={featureIndex} className="flex items-center space-x-3">
                    <div className="w-6 h-6 flex items-center justify-center bg-green-100 rounded-full">
                      <i className="ri-check-line text-sm text-green-600"></i>
                    </div>
                    <span className="text-gray-700">{feature}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Vertrauen schaffen */}
        <div className="mt-16 bg-gradient-to-r from-blue-50 to-blue-100 rounded-3xl p-12">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div className="group">
              <div className="w-20 h-20 flex items-center justify-center bg-blue-100 rounded-full mx-auto mb-6 group-hover:bg-blue-600 transition-all duration-300 transform group-hover:scale-110">
                <i className="ri-shield-check-line text-3xl text-blue-600 group-hover:text-white transition-colors duration-300"></i>
              </div>
              <h4 className="text-xl font-semibold text-gray-900 mb-3 group-hover:text-blue-600 transition-colors duration-300">
                Sicherheit
              </h4>
              <p className="text-gray-600 group-hover:text-gray-700 transition-colors duration-300">
                Regulierte und geprüfte Finanzinstitute
              </p>
            </div>
            <div className="group">
              <div className="w-20 h-20 flex items-center justify-center bg-blue-100 rounded-full mx-auto mb-6 group-hover:bg-blue-600 transition-all duration-300 transform group-hover:scale-110">
                <i className="ri-award-line text-3xl text-blue-600 group-hover:text-white transition-colors duration-300"></i>
              </div>
              <h4 className="text-xl font-semibold text-gray-900 mb-3 group-hover:text-blue-600 transition-colors duration-300">
                Ausgezeichnet
              </h4>
              <p className="text-gray-600 group-hover:text-gray-700 transition-colors duration-300">
                Mehrfach prämierte Serviceleistungen
              </p>
            </div>
            <div className="group">
              <div className="w-20 h-20 flex items-center justify-center bg-blue-100 rounded-full mx-auto mb-6 group-hover:bg-blue-600 transition-all duration-300 transform group-hover:scale-110">
                <i className="ri-user-heart-line text-3xl text-blue-600 group-hover:text-white transition-colors duration-300"></i>
              </div>
              <h4 className="text-xl font-semibold text-gray-900 mb-3 group-hover:text-blue-600 transition-colors duration-300">
                Vertrauen
              </h4>
              <p className="text-gray-600 group-hover:text-gray-700 transition-colors duration-300">
                Millionen zufriedene Kunden deutschlandweit
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
