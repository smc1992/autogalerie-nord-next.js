
'use client';
import { useLanguage } from '../../context/LanguageContext';

export default function TeamSection() {
  const { dict } = useLanguage();
  return (
    <section id="team" className="py-20 bg-white">
      <div className="max-w-6xl mx-auto px-4 md:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Image */}
          <div className="relative">
            <div className="relative rounded-2xl overflow-hidden shadow-2xl">
              <img 
                src="/images/team.png"
                alt="Autogalerie Nord Standort"
                className="w-full h-96 object-cover object-top"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent"></div>
              
              {/* Team stats overlay */}
              <div className="absolute bottom-6 left-6 right-6">
                <div className="bg-white/90 backdrop-blur-sm rounded-xl p-4">
                  <div className="grid grid-cols-3 gap-4 text-center">
                    <div>
                      <div className="text-2xl font-bold text-red-600">10+</div>
                      <div className="text-sm text-gray-600">{dict.ueberuns.team.statsYearsLabel}</div>
                    </div>
                    <div>
                      <div className="text-2xl font-bold text-red-600">5</div>
                      <div className="text-sm text-gray-600">{dict.ueberuns.team.statsExpertsLabel}</div>
                    </div>
                    <div>
                      <div className="text-2xl font-bold text-red-600">1000+</div>
                      <div className="text-sm text-gray-600">{dict.ueberuns.team.statsSatisfiedLabel}</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Content */}
          <div>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-8">
              {dict.ueberuns.team.headingPrefix} <span className="text-red-600">{dict.ueberuns.team.headingHighlight}</span>
            </h2>
            
            <div className="space-y-6 text-lg text-gray-600 leading-relaxed">
              <p>
                {dict.ueberuns.team.paragraph1}
              </p>
              
              <p>
                {dict.ueberuns.team.paragraph2}
              </p>
            </div>

            {/* Team qualities */}
            <div className="mt-8 space-y-4">
              {[
                { icon: 'ri-graduation-cap-line', text: dict.ueberuns.team.qualities.educated },
                { icon: 'ri-lightbulb-line', text: dict.ueberuns.team.qualities.experience },
                { icon: 'ri-heart-line', text: dict.ueberuns.team.qualities.passion },
                { icon: 'ri-customer-service-line', text: dict.ueberuns.team.qualities.customerService }
              ].map((quality, index) => (
                <div key={index} className="flex items-center group">
                  <div className="w-12 h-12 flex items-center justify-center bg-red-100 rounded-lg mr-4 group-hover:bg-red-600 transition-all duration-300">
                    <i className={`${quality.icon} text-xl text-red-600 group-hover:text-white transition-colors duration-300`}></i>
                  </div>
                  <span className="text-gray-700 group-hover:text-red-600 transition-colors duration-300 font-medium">
                    {quality.text}
                  </span>
                </div>
              ))}
            </div>

            <div className="mt-8">
              <a 
                href="tel:+4904174596970"
                className="bg-red-600 hover:bg-red-700 text-white px-8 py-4 rounded-lg font-semibold transition-all duration-300 whitespace-nowrap cursor-pointer inline-flex items-center transform hover:scale-105 hover:shadow-xl"
              >
                <i className="ri-phone-line mr-2"></i>
                {dict.ueberuns.team.ctaContactTeam}
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
