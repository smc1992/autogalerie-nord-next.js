
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
      image: 'https://readdy.ai/api/search-image?query=Digital%20fleet%20management%20dashboard%20with%20multiple%20luxury%20vehicles%20displayed%20on%20computer%20screens%2C%20modern%20office%20technology%2C%20professional%20workspace&width=400&height=300&seq=fleet-management&orientation=landscape',
      link: '/leistungen'
    },
    {
      icon: 'ri-bank-card-line',
      title: 'Leasing & Finanzierung',
      description: 'Flexible Leasing-Optionen und maßgeschneiderte Finanzierungslösungen für Geschäftskunden.',
      image: 'https://readdy.ai/api/search-image?query=Business%20leasing%20contract%20signing%20with%20luxury%20car%20keys%20and%20financial%20documents%20on%20desk%2C%20professional%20business%20meeting%2C%20corporate%20finance&width=400&height=300&seq=leasing-finance&orientation=landscape',
      link: '/leistungen/finanzierung'
    },
    {
      icon: 'ri-tools-line',
      title: 'Wartung & Service',
      description: 'Professionelle Wartung und Reparatur direkt in unserer zertifizierten Werkstatt.',
      image: 'https://readdy.ai/api/search-image?query=Professional%20automotive%20workshop%20with%20certified%20mechanics%20working%20on%20luxury%20vehicles%2C%20modern%20service%20bay%2C%20quality%20tools%20and%20equipment&width=400&height=300&seq=maintenance-service&orientation=landscape',
      link: '/service'
    },
    {
      icon: 'ri-shield-check-line',
      title: 'Versicherung & Garantie',
      description: 'Umfassende Versicherungspakete und erweiterte Garantien für maximale Sicherheit.',
      image: 'https://readdy.ai/api/search-image?query=Insurance%20and%20warranty%20documents%20with%20luxury%20car%20in%20background%2C%20professional%20insurance%20consultation%2C%20security%20and%20protection%20concept&width=400&height=300&seq=insurance-warranty&orientation=landscape',
      link: '/leistungen'
    },
    {
      icon: 'ri-discount-percent-line',
      title: 'Großkunden-Rabatte',
      description: 'Attraktive Mengenrabatte und Sonderkonditionen für Firmenkunden ab 5 Fahrzeugen.',
      image: 'https://readdy.ai/api/search-image?query=Multiple%20luxury%20vehicles%20lined%20up%20for%20corporate%20fleet%20discount%20program%2C%20business%20parking%20lot%2C%20volume%20discount%20concept%2C%20professional%20presentation&width=400&height=300&seq=bulk-discounts&orientation=landscape',
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
