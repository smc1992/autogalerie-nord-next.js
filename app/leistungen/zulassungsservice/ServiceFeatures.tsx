'use client';

export default function ServiceFeatures() {
  const features = [
    {
      icon: 'ri-award-line',
      title: 'Professioneller Service'
    },
    {
      icon: 'ri-user-heart-line',
      title: 'Erfahrene Abwicklung'
    },
    {
      icon: 'ri-flashlight-line',
      title: 'Schnelle Bearbeitung'
    },
    {
      icon: 'ri-shield-check-line',
      title: 'Zuverlässige Durchführung'
    },
    {
      icon: 'ri-customer-service-2-line',
      title: 'Persönliche Betreuung'
    }
  ];

  return (
    <section className="py-20 bg-white">
      <div className="max-w-6xl mx-auto px-4 md:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
            Professioneller Service
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.slice(0, 3).map((feature, index) => (
            <div key={index} className="text-center bg-gradient-to-br from-gray-50 to-gray-100 p-8 rounded-2xl hover:shadow-lg transition-all duration-300">
              <div className="w-16 h-16 flex items-center justify-center bg-red-600 rounded-full mx-auto mb-6">
                <i className={`${feature.icon} text-2xl text-white`}></i>
              </div>
              <h3 className="text-xl font-bold text-gray-900">{feature.title}</h3>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-8 max-w-4xl mx-auto">
          {features.slice(3).map((feature, index) => (
            <div key={index + 3} className="text-center bg-gradient-to-br from-red-50 to-red-100 p-8 rounded-2xl hover:shadow-lg transition-all duration-300">
              <div className="w-16 h-16 flex items-center justify-center bg-red-600 rounded-full mx-auto mb-6">
                <i className={`${feature.icon} text-2xl text-white`}></i>
              </div>
              <h3 className="text-xl font-bold text-gray-900">{feature.title}</h3>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}