
import Link from 'next/link';

export default function BusinessServices() {
  const services = [
    {
      icon: 'ri-user-heart-line',
      title: 'Persönliche Beratung',
      description: 'Individuelle Beratung für Ihre spezifischen Anforderungen und Budgetvorstellungen.',
      image: '/images/business-consulting.jpg',
      link: '/kontakt'
    },
    {
      icon: 'ri-dashboard-line',
      title: 'Flottenmanagement',
      description: 'Komplette Verwaltung Ihres Fuhrparks mit digitalen Tools und professionellem Service.',
      image: '/images/fleet-management.jpg',
      link: '/leistungen'
    },
    {
      icon: 'ri-bank-card-line',
      title: 'Leasing & Finanzierung',
      description: 'Flexible Leasing-Optionen und maßgeschneiderte Finanzierungslösungen für Geschäftskunden.',
      image: '/images/leasing-finance.jpg',
      link: '/leistungen/finanzierung'
    },
    {
      icon: 'ri-tools-line',
      title: 'Wartung & Service',
      description: 'Professionelle Wartung und Reparatur direkt in unserer zertifizierten Werkstatt.',
      image: '/images/maintenance-service.jpg',
      link: '/service'
    },
    {
      icon: 'ri-shield-check-line',
      title: 'Versicherung & Garantie',
      description: 'Umfassende Versicherungspakete und erweiterte Garantien für maximale Sicherheit.',
      image: '/images/insurance-warranty.jpg',
      link: '/leistungen'
    },
    {
      icon: 'ri-discount-percent-line',
      title: 'Großkunden-Rabatte',
      description: 'Attraktive Mengenrabatte und Sonderkonditionen für Firmenkunden ab 5 Fahrzeugen.',
      image: '/images/bulk-discounts.jpg',
      link: '/kontakt'
    }
  ];

  return (
    <section className="py-20 bg-gradient-to-b from-gray-50 to-white">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <span className="inline-block px-4 py-2 bg-red-100 text-red-600 text-sm font-medium rounded-full mb-4">
            Unsere Services
          </span>
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Maßgeschneiderte <span className="text-red-600">Business-Lösungen</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Professionelle Services für Ihren Unternehmenserfolg
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <div 
              key={index} 
              className="group bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 border border-gray-100"
            >
              <div className="relative mb-6">
                <img 
                  src={service.image} 
                  alt={service.title}
                  className="w-full h-48 object-cover rounded-xl mb-6 transform group-hover:scale-105 transition-all duration-500"
                />
                <div className="absolute -bottom-3 left-6 w-12 h-12 bg-red-600 rounded-xl flex items-center justify-center shadow-lg transform group-hover:scale-110 transition-all duration-300">
                  <i className={`${service.icon} text-white text-xl`}></i>
                </div>
              </div>
              
              <h3 className="text-xl font-bold text-gray-900 mb-4 group-hover:text-red-600 transition-colors duration-300">
                {service.title}
              </h3>
              <p className="text-gray-600 leading-relaxed group-hover:text-gray-700 transition-colors duration-300">
                {service.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
