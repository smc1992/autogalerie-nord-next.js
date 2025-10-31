'use client';
import { useLanguage } from '../../context/LanguageContext';

export default function WillkommenSection() {
  const { dict } = useLanguage();
  const highlights = [
    {
      icon: 'ri-time-line',
      title: dict.ueberuns.willkommen.highlights.experienceTitle,
      description: dict.ueberuns.willkommen.highlights.experienceDesc
    },
    {
      icon: 'ri-shield-check-line',
      title: dict.ueberuns.willkommen.highlights.checkedTitle,
      description: dict.ueberuns.willkommen.highlights.checkedDesc
    },
    {
      icon: 'ri-money-euro-circle-line',
      title: dict.ueberuns.willkommen.highlights.fairTitle,
      description: dict.ueberuns.willkommen.highlights.fairDesc
    },
    {
      icon: 'ri-user-heart-line',
      title: dict.ueberuns.willkommen.highlights.personalTitle,
      description: dict.ueberuns.willkommen.highlights.personalDesc
    }
  ];

  return (
    <section className="py-20 bg-white">
      <div className="max-w-6xl mx-auto px-4 md:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Content */}
          <div>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-8">
              {dict.ueberuns.willkommen.titlePrefix} <span className="text-red-600">Autogalerie Nord</span>
            </h2>
            
            <div className="space-y-6 text-lg text-gray-600 leading-relaxed">
              <p>
                {dict.ueberuns.willkommen.paragraph1}
              </p>
              
              <p>
                {dict.ueberuns.willkommen.paragraph2}
              </p>
            </div>

            {/* Highlights Grid */}
            <div className="grid grid-cols-2 gap-6 mt-12">
              {highlights.map((highlight, index) => (
                <div key={index} className="group">
                  <div className="flex items-center mb-3">
                    <div className="w-12 h-12 flex items-center justify-center bg-red-100 rounded-lg mr-4 group-hover:bg-red-600 transition-all duration-300">
                      <i className={`${highlight.icon} text-xl text-red-600 group-hover:text-white transition-colors duration-300`}></i>
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900 group-hover:text-red-600 transition-colors duration-300">
                        {highlight.title}
                      </h3>
                    </div>
                  </div>
                  <p className="text-sm text-gray-600 group-hover:text-gray-700 transition-colors duration-300">
                    {highlight.description}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Image */}
          <div className="relative">
            <div className="relative rounded-2xl overflow-hidden shadow-2xl transform hover:scale-105 transition-all duration-500">
              <img 
                src="/images/standort.jpg"
                alt="Autogalerie Nord Fahrzeuge vor Ort"
                className="w-full h-96 object-cover object-top"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
            </div>
            
            {/* Floating badge */}
            <div className="absolute -bottom-6 -right-6 bg-red-600 text-white px-6 py-4 rounded-2xl shadow-xl transform rotate-3 hover:rotate-0 transition-transform duration-300">
              <div className="text-center">
                <div className="text-2xl font-bold">70+</div>
                <div className="text-sm">{dict.ueberuns.willkommen.badgeVehiclesLabel}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}