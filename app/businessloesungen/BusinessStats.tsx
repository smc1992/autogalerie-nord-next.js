'use client';

export default function BusinessStats() {
  const stats = [
    {
      number: '24/7',
      label: 'Support & Notfallservice',
      icon: 'ri-customer-service-line',
      description: 'Rund um die Uhr für Sie da'
    },
    {
      number: '200+',
      label: 'Zufriedene Geschäftskunden', 
      icon: 'ri-building-line',
      description: 'Vertrauen auf unsere Services'
    },
    {
      number: '1000+',
      label: 'Verwaltete Flottenfahrzeuge',
      icon: 'ri-car-line', 
      description: 'Erfolgreich betreut'
    },
    {
      number: '15+',
      label: 'Jahre Branchenerfahrung',
      icon: 'ri-award-line',
      description: 'Expertise und Know-how'
    }
  ];

  return (
    <section className="py-20 bg-gray-900 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-gradient-to-br from-red-600 to-red-800 opacity-10 rounded-full -translate-x-48 -translate-y-48"></div>
      <div className="absolute bottom-0 right-0 w-80 h-80 bg-gradient-to-tl from-blue-600 to-blue-800 opacity-10 rounded-full translate-x-40 translate-y-40"></div>
      
      <div className="container mx-auto px-6 relative z-10">
        <div className="text-center mb-16">
          <span className="inline-block px-4 py-2 bg-red-600 text-white text-sm font-medium rounded-full mb-4">
            Vertrauen & Expertise
          </span>
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Warum Unternehmen <span className="text-red-400">uns vertrauen</span>
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Über 200 zufriedene Geschäftskunden vertrauen bereits auf unsere professionellen Services und maßgeschneiderten Lösungen.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <div 
              key={index}
              className="group text-center transform hover:scale-105 transition-all duration-500"
            >
              <div className="bg-white bg-opacity-5 backdrop-blur-sm rounded-2xl p-8 border border-white border-opacity-10 hover:bg-opacity-10 transition-all duration-300">
                <div className="w-16 h-16 bg-red-600 rounded-xl flex items-center justify-center mx-auto mb-6 transform group-hover:scale-110 group-hover:rotate-6 transition-all duration-300">
                  <i className={`${stat.icon} text-white text-2xl`}></i>
                </div>
                
                <div className="text-4xl md:text-5xl font-bold text-white mb-2 group-hover:text-red-400 transition-colors duration-300">
                  {stat.number}
                </div>
                
                <h3 className="text-lg font-semibold text-gray-200 mb-2 group-hover:text-white transition-colors duration-300">
                  {stat.label}
                </h3>
                
                <p className="text-gray-400 text-sm group-hover:text-gray-300 transition-colors duration-300">
                  {stat.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}