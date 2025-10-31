
'use client';
import { useLanguage } from "../../../context/LanguageContext";

export default function ServicesGrid() {
  const { dict } = useLanguage();
  const services = [
    {
      title: dict.leistungen?.importExport?.services?.items?.shortTermPlate?.title || 'Kurzzeitkennzeichen',
      description: dict.leistungen?.importExport?.services?.items?.shortTermPlate?.description || '5 Tages Überführungskennzeichen mit oder ohne Grüne Karte für sichere Überführung.',
      icon: 'ri-calendar-line',
      features: [
        dict.leistungen?.importExport?.services?.items?.shortTermPlate?.feature1 || '5 Tage gültig',
        dict.leistungen?.importExport?.services?.items?.shortTermPlate?.feature2 || 'Mit/ohne Grüne Karte',
        dict.leistungen?.importExport?.services?.items?.shortTermPlate?.feature3 || 'Sofortige Ausstellung'
      ],
      color: 'from-red-50 to-red-100',
      iconBg: 'bg-red-600'
    },
    {
      title: dict.leistungen?.importExport?.services?.items?.exportPlate?.title || 'Ausfuhrkennzeichen',
      description: dict.leistungen?.importExport?.services?.items?.exportPlate?.description || 'Bis zu 3 Monate inkl. Versicherung und Steuern für den Export Ihres Fahrzeugs.',
      icon: 'ri-car-line',
      features: [
        dict.leistungen?.importExport?.services?.items?.exportPlate?.feature1 || 'Bis zu 3 Monate',
        dict.leistungen?.importExport?.services?.items?.exportPlate?.feature2 || 'Versicherung inklusive',
        dict.leistungen?.importExport?.services?.items?.exportPlate?.feature3 || 'Steuern inklusive'
      ],
      color: 'from-red-50 to-red-100',
      iconBg: 'bg-red-600'
    },
    {
      title: dict.leistungen?.importExport?.services?.items?.euNet?.title || 'EU-Netto Export',
      description: dict.leistungen?.importExport?.services?.items?.euNet?.description || 'Für Firmen innerhalb der EU - Tax Free Verkäufe mit allen Vorteilen.',
      icon: 'ri-money-euro-circle-line',
      features: [
        dict.leistungen?.importExport?.services?.items?.euNet?.feature1 || 'Für EU-Firmen',
        dict.leistungen?.importExport?.services?.items?.euNet?.feature2 || 'Tax Free',
        dict.leistungen?.importExport?.services?.items?.euNet?.feature3 || 'Netto-Preise'
      ],
      color: 'from-red-50 to-red-100',
      iconBg: 'bg-red-600'
    },
    {
      title: dict.leistungen?.importExport?.services?.items?.customsDocs?.title || 'Zolldokumente',
      description: dict.leistungen?.importExport?.services?.items?.customsDocs?.description || 'Wir erstellen für Sie alle Exportformalitäten und Zolldokumente professionell.',
      icon: 'ri-file-text-line',
      features: [
        dict.leistungen?.importExport?.services?.items?.customsDocs?.feature1 || 'Alle Formalitäten',
        dict.leistungen?.importExport?.services?.items?.customsDocs?.feature2 || 'Professionelle Erstellung',
        dict.leistungen?.importExport?.services?.items?.customsDocs?.feature3 || 'Vollständige Abwicklung'
      ],
      color: 'from-red-50 to-red-100',
      iconBg: 'bg-red-600'
    },
    {
      title: dict.leistungen?.importExport?.services?.items?.accommodation?.title || 'Unterkunft',
      description: dict.leistungen?.importExport?.services?.items?.accommodation?.description || 'Wir organisieren Ihr Hotel in unserer Nähe für einen komfortablen Aufenthalt.',
      icon: 'ri-hotel-line',
      features: [
        dict.leistungen?.importExport?.services?.items?.accommodation?.feature1 || 'Hotel-Organisation',
        dict.leistungen?.importExport?.services?.items?.accommodation?.feature2 || 'In unserer Nähe',
        dict.leistungen?.importExport?.services?.items?.accommodation?.feature3 || 'Komfortable Unterbringung'
      ],
      color: 'from-red-50 to-red-100',
      iconBg: 'bg-red-600'
    },
    {
      title: dict.leistungen?.importExport?.services?.items?.pickup?.title || 'Pick Up Service',
      description: dict.leistungen?.importExport?.services?.items?.pickup?.description || 'Wir holen Sie ab vom Airport Düsseldorf oder vom Hauptbahnhof Mülheim sowie Hamburg.',
      icon: 'ri-taxi-line',
      features: [
        dict.leistungen?.importExport?.services?.items?.pickup?.feature1 || 'Airport Düsseldorf',
        dict.leistungen?.importExport?.services?.items?.pickup?.feature2 || 'Hauptbahnhof Mülheim',
        dict.leistungen?.importExport?.services?.items?.pickup?.feature3 || 'Hamburg Abholung'
      ],
      color: 'from-red-50 to-red-100',
      iconBg: 'bg-red-600'
    }
  ];

  return (
    <section id="services" className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
            {dict.leistungen?.importExport?.services?.sectionTitle || 'Unsere Services'}
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            {dict.leistungen?.importExport?.services?.sectionSubtitle || 'Wir helfen Ihnen bei allen Aspekten des Import- und Export-Geschäfts'}
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <div key={index} className={`bg-gradient-to-br ${service.color} p-8 rounded-2xl hover:shadow-xl transition-all duration-300 transform hover:scale-105`}>
              <div className={`w-16 h-16 flex items-center justify-center ${service.iconBg} rounded-2xl mb-6`}>
                <i className={`${service.icon} text-2xl text-white`}></i>
              </div>
              
              <h3 className="text-xl font-bold text-gray-900 mb-4">{service.title}</h3>
              <p className="text-gray-700 mb-6 leading-relaxed">
                {service.description}
              </p>
              
              <div className="space-y-2">
                {service.features.map((feature, featureIndex) => (
                  <div key={featureIndex} className="flex items-center space-x-3">
                    <div className="w-2 h-2 bg-gray-600 rounded-full flex-shrink-0"></div>
                    <span className="text-gray-700 text-sm">{feature}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="mt-16 text-center bg-white rounded-3xl p-12 shadow-lg">
          <h3 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">
            {dict.leistungen?.importExport?.services?.ctaTitle || 'Bereit für Ihren internationalen Fahrzeughandel?'}
          </h3>
          <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto">
            {dict.leistungen?.importExport?.services?.ctaSubtitle || 'Kontaktieren Sie uns für eine persönliche Beratung zu Ihren Import- und Export-Anforderungen.'}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a 
              href="tel:+4904174596970"
              className="bg-red-600 hover:bg-red-700 text-white px-8 py-4 rounded-lg font-semibold transition-all duration-300 transform hover:scale-105 hover:shadow-xl whitespace-nowrap cursor-pointer inline-flex items-center justify-center"
            >
              <i className="ri-phone-line mr-2"></i>
              {dict.leistungen?.importExport?.services?.ctaPrimary || 'Jetzt beraten lassen'}
            </a>
            <a 
              href="mailto:info@autogalerie-nord.de"
              className="border-2 border-red-600 text-red-600 hover:bg-red-600 hover:text-white px-8 py-4 rounded-lg font-semibold transition-all duration-300 transform hover:scale-105 whitespace-nowrap cursor-pointer inline-flex items-center justify-center"
            >
              <i className="ri-mail-line mr-2"></i>
              {dict.leistungen?.importExport?.services?.ctaSecondary || 'E-Mail schreiben'}
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
