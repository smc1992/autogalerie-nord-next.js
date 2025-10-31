'use client';
import { useLanguage } from '../../../context/LanguageContext';

export default function ProzessSchritte() {
  const { dict } = useLanguage();
  const schritte = [
    {
      nummer: '1',
      title: dict.leistungen?.consignment?.process?.steps?.step1?.title || 'Kontaktaufnahme',
      description: dict.leistungen?.consignment?.process?.steps?.step1?.description || 'Sie kontaktieren uns und teilen uns die wichtigsten Daten zu Ihrem Fahrzeug mit.',
      icon: 'ri-phone-line',
      image: '/images/Kontaktaufnahme-Kommisionsverkauf.webp'
    },
    {
      nummer: '2',
      title: dict.leistungen?.consignment?.process?.steps?.step2?.title || 'Vor-Ort Bewertung',
      description: dict.leistungen?.consignment?.process?.steps?.step2?.description || 'Wir erstellen eine professionelle Bewertung und bereiten Ihr Fahrzeug für den Verkauf vor.',
      icon: 'ri-camera-line',
      image: '/images/vor ort Bewertung-Autogalerie Nord.webp'
    },
    {
      nummer: '3',
      title: dict.leistungen?.consignment?.process?.steps?.step3?.title || 'Vertragsabschluss',
      description: dict.leistungen?.consignment?.process?.steps?.step3?.description || 'Bei Einverständnis schließen wir einen Kommissionsvertrag ab und starten die Vermarktung.',
      icon: 'ri-file-text-line',
      image: '/images/Vertragsabschluss Kommisonsverkauf.webp'
    },
    {
      nummer: '4',
      title: dict.leistungen?.consignment?.process?.steps?.step4?.title || 'Auszahlung',
      description: dict.leistungen?.consignment?.process?.steps?.step4?.description || 'Nach erfolgreichem Verkauf erhalten Sie schnell und transparent Ihre Auszahlung.',
      icon: 'ri-money-euro-circle-line',
      image: '/images/Auszahlung Kommsionsverkauf.webp'
    }
  ];

  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
            {dict.leistungen?.consignment?.process?.sectionTitle || 'So funktioniert unser Kommissionsverkauf'}
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            {dict.leistungen?.consignment?.process?.sectionSubtitle || 'In nur 4 einfachen Schritten zu Ihrem optimalen Verkaufspreis'}
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