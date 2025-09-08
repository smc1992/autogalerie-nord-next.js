'use client';

import { useState } from 'react';

type ServiceItem = {
  icon: string;
  title: string;
  description: string;
  features: string[];
  link: string;
};

const services: ServiceItem[] = [
  {
    icon: 'ri-car-line',
    title: 'Fahrzeugankauf',
    description: 'Faire Bewertung und schnelle Abwicklung für Ihren Gebrauchtwagen.',
    features: ['Kostenlose Bewertung', 'Sofortige Auszahlung', 'Alle Marken'],
    link: '/autoankauf'
  },
  {
    icon: 'ri-tools-line',
    title: 'Werkstattservice',
    description: 'Professionelle Wartung und Reparatur von Experten.',
    features: ['Alle Marken', 'Original-Ersatzteile', 'Garantie'],
    link: '/service'
  },
  {
    icon: 'ri-bank-card-line',
    title: 'Finanzierung',
    description: 'Flexible Finanzierungslösungen für Ihr Traumfahrzeug.',
    features: ['Günstige Zinsen', 'Schnelle Zusage', 'Individuelle Laufzeit'],
    link: '/leistungen/finanzierung'
  },
  {
    icon: 'ri-shield-check-line',
    title: 'Garantie & Versicherung',
    description: 'Umfassender Schutz für Ihr Fahrzeug.',
    features: ['Erweiterte Garantie', 'Vollkasko', 'Pannenhilfe'],
    link: '/leistungen'
  },
  {
    icon: 'ri-truck-line',
    title: 'Import & Export',
    description: 'Weltweiter Fahrzeughandel mit professioneller Abwicklung.',
    features: ['EU-weit', 'Zoll-Abwicklung', 'Transport'],
    link: '/leistungen/import-export'
  },
  {
    icon: 'ri-file-text-line',
    title: 'Zulassungsservice',
    description: 'Komplette Zulassungsabwicklung ohne Behördengang.',
    features: ['Online-Zulassung', 'Kennzeichen-Reservierung', 'Express-Service'],
    link: '/leistungen/zulassungsservice'
  }
];

export default function ModernServiceGrid() {
  const [hoveredCard, setHoveredCard] = useState<number | null>(null);

  return (
    <section className="py-20 section-accent relative overflow-hidden">
      {/* Dezente Hintergrund-Elemente mit Akzentfarbe */}
      <div className="absolute inset-0 grid-background-subtle"></div>
      <div className="absolute top-0 right-0 w-96 h-96 bg-accent-950/5 rounded-full -translate-y-48 translate-x-48"></div>
      <div className="absolute bottom-0 left-0 w-72 h-72 bg-primary-100/30 rounded-full translate-y-36 -translate-x-36"></div>
      
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-neutral-900 mb-6">
            Unsere <span className="text-primary">Premium-Services</span>
          </h2>
          <p className="text-xl text-muted max-w-3xl mx-auto">
            Von der Fahrzeugsuche bis zur Zulassung - wir begleiten Sie bei jedem Schritt.
          </p>
        </div>

        {/* Modernes Grid mit dezenter Akzentfarbe */}
        <div className="grid-modern lg:grid-cols-3 xl:grid-cols-3">
          {services.map((service, index) => (
            <div
              key={index}
              className="service-card hover-lift group cursor-pointer"
              onMouseEnter={() => setHoveredCard(index)}
              onMouseLeave={() => setHoveredCard(null)}
              onClick={() => window.location.href = service.link}
            >
              {/* Icon mit Akzentfarbe */}
              <div className="w-16 h-16 flex items-center justify-center bg-primary-100 rounded-full mx-auto mb-6 group-hover:bg-primary-600 transition-all duration-300 transform group-hover:rotate-12 group-hover:scale-110">
                <i className={`${service.icon} text-2xl text-primary-600 group-hover:text-white transition-colors duration-300`}></i>
              </div>
              
              {/* Content */}
              <h3 className="text-xl font-semibold text-neutral-900 mb-4 group-hover:text-primary-600 transition-colors duration-300">
                {service.title}
              </h3>
              
              <p className="text-muted text-sm leading-relaxed mb-6 group-hover:text-neutral-700 transition-colors duration-300">
                {service.description}
              </p>
              
              {/* Features mit dezenter Akzentfarbe */}
              <ul className="space-y-2 mb-6">
                {service.features.map((feature, featureIndex) => (
                  <li key={featureIndex} className="flex items-center text-sm text-muted">
                    <div className="w-1.5 h-1.5 bg-accent-950/20 rounded-full mr-3 group-hover:bg-primary-500 transition-colors duration-300"></div>
                    {feature}
                  </li>
                ))}
              </ul>
              
              {/* Call-to-Action */}
              <div className="flex items-center text-primary-600 font-medium text-sm group-hover:text-primary-700 transition-colors duration-300">
                Mehr erfahren
                <i className="ri-arrow-right-line ml-2 transform group-hover:translate-x-1 transition-transform duration-300"></i>
              </div>
              
              {/* Hover-Indikator mit Akzentfarbe */}
              <div className={`absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-primary-600 to-accent-600 transform origin-left transition-transform duration-300 ${
                hoveredCard === index ? 'scale-x-100' : 'scale-x-0'
              }`}></div>
            </div>
          ))}
        </div>
        
        {/* CTA Section mit dezenter Akzentfarbe */}
        <div className="mt-16 text-center">
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 border border-accent-950/10 shadow-card">
            <h3 className="text-2xl font-semibold text-neutral-900 mb-4">
              Haben Sie Fragen zu unseren Services?
            </h3>
            <p className="text-muted mb-6">
              Unser Expertenteam berät Sie gerne persönlich und findet die beste Lösung für Ihre Bedürfnisse.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="btn-primary">
                <i className="ri-phone-line mr-2"></i>
                Jetzt anrufen
              </button>
              <button className="btn-outline">
                <i className="ri-mail-line mr-2"></i>
                E-Mail senden
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}