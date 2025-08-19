'use client';

export default function WerteSection() {
  const werte = [
    {
      icon: 'ri-shield-check-line',
      title: 'Vertrauen',
      description: 'Transparenz und Ehrlichkeit in allen Geschäften sind für uns selbstverständlich',
      color: 'from-blue-500 to-blue-600'
    },
    {
      icon: 'ri-star-line',
      title: 'Qualität',
      description: 'Nur sorgfältig ausgewählte und geprüfte Fahrzeuge finden den Weg in unser Sortiment',
      color: 'from-green-500 to-green-600'
    },
    {
      icon: 'ri-customer-service-2-line',
      title: 'Service',
      description: 'Persönliche Beratung und umfassender Service stehen bei uns im Mittelpunkt',
      color: 'from-red-500 to-red-600'
    }
  ];

  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-6xl mx-auto px-4 md:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
            Unsere <span className="text-red-600">Werte</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Diese Grundsätze leiten uns jeden Tag und prägen unser Handeln im Umgang mit unseren Kunden
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {werte.map((wert, index) => (
            <div key={index} className="group bg-white rounded-2xl p-8 text-center shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2">
              {/* Icon with gradient background */}
              <div className={`w-20 h-20 flex items-center justify-center bg-gradient-to-r ${wert.color} rounded-2xl mx-auto mb-6 transform group-hover:scale-110 group-hover:rotate-6 transition-all duration-300`}>
                <i className={`${wert.icon} text-3xl text-white`}></i>
              </div>
              
              <h3 className="text-2xl font-bold text-gray-900 mb-4 group-hover:text-red-600 transition-colors duration-300">
                {wert.title}
              </h3>
              
              <p className="text-gray-600 leading-relaxed group-hover:text-gray-700 transition-colors duration-300">
                {wert.description}
              </p>
              
              {/* Decorative line */}
              <div className={`w-16 h-1 bg-gradient-to-r ${wert.color} rounded-full mx-auto mt-6 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500`}></div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}