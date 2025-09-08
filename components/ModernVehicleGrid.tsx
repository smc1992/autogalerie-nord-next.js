'use client';

import { useState } from 'react';

type Vehicle = {
  id: string;
  make: string;
  model: string;
  year: number;
  price: number;
  mileage: number;
  fuel: string;
  transmission: string;
  image: string;
  features: string[];
};

const sampleVehicles: Vehicle[] = [
  {
    id: '1',
    make: 'BMW',
    model: '320d',
    year: 2022,
    price: 35900,
    mileage: 25000,
    fuel: 'Diesel',
    transmission: 'Automatik',
    image: '/images/hero-premium.webp',
    features: ['Navigation', 'Klimaautomatik', 'Ledersitze']
  },
  {
    id: '2',
    make: 'Mercedes',
    model: 'C 200',
    year: 2021,
    price: 42500,
    mileage: 18000,
    fuel: 'Benzin',
    transmission: 'Automatik',
    image: '/images/hero-premium.webp',
    features: ['MBUX', 'LED-Scheinwerfer', 'Parkassistent']
  },
  {
    id: '3',
    make: 'Audi',
    model: 'A4 Avant',
    year: 2023,
    price: 38900,
    mileage: 12000,
    fuel: 'Hybrid',
    transmission: 'Automatik',
    image: '/images/hero-premium.webp',
    features: ['Virtual Cockpit', 'Matrix LED', 'Quattro']
  },
  {
    id: '4',
    make: 'Volkswagen',
    model: 'Golf GTI',
    year: 2022,
    price: 28900,
    mileage: 15000,
    fuel: 'Benzin',
    transmission: 'Schaltung',
    image: '/images/hero-premium.webp',
    features: ['Performance Paket', 'DCC', 'Sportfahrwerk']
  },
  {
    id: '5',
    make: 'Tesla',
    model: 'Model 3',
    year: 2023,
    price: 45900,
    mileage: 8000,
    fuel: 'Elektro',
    transmission: 'Automatik',
    image: '/images/hero-premium.webp',
    features: ['Autopilot', 'Supercharging', 'Premium Audio']
  },
  {
    id: '6',
    make: 'Porsche',
    model: 'Macan',
    year: 2022,
    price: 65900,
    mileage: 22000,
    fuel: 'Benzin',
    transmission: 'Automatik',
    image: '/images/hero-premium.webp',
    features: ['Sport Chrono', 'Luftfederung', 'BOSE Audio']
  }
];

export default function ModernVehicleGrid() {
  const [hoveredVehicle, setHoveredVehicle] = useState<string | null>(null);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('de-DE', {
      style: 'currency',
      currency: 'EUR',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(price);
  };

  const formatMileage = (mileage: number) => {
    return new Intl.NumberFormat('de-DE').format(mileage) + ' km';
  };

  return (
    <section className="py-20 bg-white relative overflow-hidden">
      {/* Dezente Hintergrund-Elemente */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-0 w-full h-32 bg-gradient-to-b from-accent-950/3 to-transparent"></div>
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-accent-950/5 rounded-full translate-y-48 translate-x-48"></div>
      </div>
      
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        {/* Header mit View-Toggle */}
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center mb-12">
          <div>
            <h2 className="text-4xl font-bold text-neutral-900 mb-4">
              Premium <span className="text-primary">Fahrzeuge</span>
            </h2>
            <p className="text-xl text-muted">
              Entdecken Sie unsere Auswahl an hochwertigen Gebrauchtwagen
            </p>
          </div>
          
          {/* View Mode Toggle mit Akzentfarbe */}
          <div className="flex items-center gap-2 bg-accent-950/5 rounded-lg p-1 mt-6 lg:mt-0">
            <button
              onClick={() => setViewMode('grid')}
              className={`px-4 py-2 rounded-md transition-all duration-300 ${
                viewMode === 'grid'
                  ? 'bg-primary-600 text-white shadow-subtle'
                  : 'text-accent-700 hover:text-primary-600'
              }`}
            >
              <i className="ri-grid-line mr-2"></i>
              Grid
            </button>
            <button
              onClick={() => setViewMode('list')}
              className={`px-4 py-2 rounded-md transition-all duration-300 ${
                viewMode === 'list'
                  ? 'bg-primary-600 text-white shadow-subtle'
                  : 'text-accent-700 hover:text-primary-600'
              }`}
            >
              <i className="ri-list-unordered mr-2"></i>
              Liste
            </button>
          </div>
        </div>

        {/* Filter Bar mit dezenter Akzentfarbe */}
        <div className="bg-accent-950/3 rounded-xl p-6 mb-12 backdrop-blur-sm">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <select className="bg-white border border-accent-950/10 rounded-lg px-4 py-3 text-neutral-700 focus:border-primary-500 focus:ring-2 focus:ring-primary-200 transition-all duration-300">
              <option>Alle Marken</option>
              <option>BMW</option>
              <option>Mercedes</option>
              <option>Audi</option>
              <option>Volkswagen</option>
            </select>
            <select className="bg-white border border-accent-950/10 rounded-lg px-4 py-3 text-neutral-700 focus:border-primary-500 focus:ring-2 focus:ring-primary-200 transition-all duration-300">
              <option>Kraftstoff</option>
              <option>Benzin</option>
              <option>Diesel</option>
              <option>Hybrid</option>
              <option>Elektro</option>
            </select>
            <select className="bg-white border border-accent-950/10 rounded-lg px-4 py-3 text-neutral-700 focus:border-primary-500 focus:ring-2 focus:ring-primary-200 transition-all duration-300">
              <option>Preis bis</option>
              <option>25.000 €</option>
              <option>35.000 €</option>
              <option>50.000 €</option>
              <option>75.000 €</option>
            </select>
            <button className="btn-primary">
              <i className="ri-search-line mr-2"></i>
              Suchen
            </button>
          </div>
        </div>

        {/* Vehicle Grid/List */}
        <div className={viewMode === 'grid' ? 'grid-modern lg:grid-cols-3' : 'space-y-6'}>
          {sampleVehicles.map((vehicle) => (
            <div
              key={vehicle.id}
              className={`vehicle-card group cursor-pointer relative ${
                viewMode === 'list' ? 'flex flex-col md:flex-row' : ''
              }`}
              onMouseEnter={() => setHoveredVehicle(vehicle.id)}
              onMouseLeave={() => setHoveredVehicle(null)}
            >
              {/* Vehicle Image */}
              <div className={`relative overflow-hidden ${
                viewMode === 'list' ? 'md:w-80 md:flex-shrink-0' : ''
              }`}>
                <img
                  src={vehicle.image}
                  alt={`${vehicle.make} ${vehicle.model}`}
                  className={`vehicle-card-image group-hover:scale-110 transition-transform duration-500 ${
                    viewMode === 'list' ? 'md:h-full md:object-cover' : ''
                  }`}
                />
                
                {/* Fuel Type Badge mit Akzentfarbe */}
                <div className="absolute top-4 left-4 bg-accent-950/80 text-white px-3 py-1 rounded-full text-xs font-medium backdrop-blur-sm">
                  {vehicle.fuel}
                </div>
                
                {/* Hover Overlay */}
                <div className={`absolute inset-0 bg-primary-600/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center ${
                  hoveredVehicle === vehicle.id ? 'opacity-100' : ''
                }`}>
                  <button className="bg-white text-primary-600 px-6 py-3 rounded-lg font-semibold shadow-card hover:shadow-card-hover transition-all duration-300 transform hover:scale-105">
                    <i className="ri-eye-line mr-2"></i>
                    Details ansehen
                  </button>
                </div>
              </div>
              
              {/* Vehicle Content */}
              <div className={`vehicle-card-content ${
                viewMode === 'list' ? 'flex-1 flex flex-col justify-between' : ''
              }`}>
                <div>
                  <h3 className="text-xl font-semibold text-neutral-900 mb-2 group-hover:text-primary-600 transition-colors duration-300">
                    {vehicle.make} {vehicle.model}
                  </h3>
                  
                  <div className="flex items-center gap-4 text-sm text-muted mb-4">
                    <span className="flex items-center">
                      <i className="ri-calendar-line mr-1"></i>
                      {vehicle.year}
                    </span>
                    <span className="flex items-center">
                      <i className="ri-roadster-line mr-1"></i>
                      {formatMileage(vehicle.mileage)}
                    </span>
                    <span className="flex items-center">
                      <i className="ri-settings-3-line mr-1"></i>
                      {vehicle.transmission}
                    </span>
                  </div>
                  
                  {/* Features mit dezenter Akzentfarbe */}
                  <div className="flex flex-wrap gap-2 mb-4">
                    {vehicle.features.slice(0, 3).map((feature, index) => (
                      <span
                        key={index}
                        className="bg-accent-950/5 text-accent-700 px-2 py-1 rounded text-xs font-medium"
                      >
                        {feature}
                      </span>
                    ))}
                  </div>
                </div>
                
                {/* Price and CTA */}
                <div className={`flex items-center justify-between ${
                  viewMode === 'list' ? 'mt-4' : ''
                }`}>
                  <div className="vehicle-card-price">
                    {formatPrice(vehicle.price)}
                  </div>
                  <button className="text-primary-600 hover:text-primary-700 font-medium text-sm flex items-center transition-colors duration-300">
                    Anfragen
                    <i className="ri-arrow-right-line ml-1 transform group-hover:translate-x-1 transition-transform duration-300"></i>
                  </button>
                </div>
              </div>
              
              {/* Hover Border mit Akzentfarbe */}
              <div className={`absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-primary-600 to-accent-600 transform origin-left transition-transform duration-300 ${
                hoveredVehicle === vehicle.id ? 'scale-x-100' : 'scale-x-0'
              }`}></div>
            </div>
          ))}
        </div>
        
        {/* Load More Button */}
        <div className="text-center mt-12">
          <button className="btn-outline hover:bg-primary-600 hover:text-white">
            <i className="ri-add-line mr-2"></i>
            Weitere Fahrzeuge laden
          </button>
        </div>
      </div>
    </section>
  );
}