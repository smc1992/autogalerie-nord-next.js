'use client';

import { useState, useEffect, useMemo } from 'react';
import Link from 'next/link';
import { fetchFromApi } from '../app/lib/apiClient';

type FilterCategory = string; // Dynamische Kategorien direkt aus API (plus 'alle')

interface FilterOption {
  id: FilterCategory;
  label: string;
  icon: string;
  description: string;
  apiValue?: string;
}

interface Vehicle {
  id: string;
  make: string;
  model: string;
  variant?: string;
  price: number;
  mileage: number;
  year: number;
  fuel: string;
  transmission: string;
  images?: Array<{
    url: string;
    alt?: string;
  }>;
  description?: string;
  bodyGroups?: string[];
}

interface VehicleHighlightsProps {
  className?: string;
}

export default function VehicleHighlights({ className = '' }: VehicleHighlightsProps) {
  const [vehicles, setVehicles] = useState<Vehicle[]>([]);
  const [filteredVehicles, setFilteredVehicles] = useState<Vehicle[]>([]);
  const [displayedVehicles, setDisplayedVehicles] = useState<Vehicle[]>([]);
  const [categoryVehicles, setCategoryVehicles] = useState<Record<FilterCategory, Vehicle[]>>({} as Record<FilterCategory, Vehicle[]>);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [vehiclesPerPage] = useState(12); // Anzahl Fahrzeuge pro Seite
  const [currentPage, setCurrentPage] = useState(1);

  const [activeFilter, setActiveFilter] = useState<FilterCategory>('alle');
  const [loadingCategories, setLoadingCategories] = useState<Record<FilterCategory, boolean>>({} as Record<FilterCategory, boolean>);
  const [availableCategories, setAvailableCategories] = useState<string[]>([]);

  // Prüffunktion: passt Fahrzeug zu gegebener Kategorie (direkt aus API-BodyGroups)
  const matchesCategory = (vehicle: Vehicle, category: string) => {
    const groups = vehicle.bodyGroups || [];
    return groups.includes(category);
  };

  // Alle möglichen Filter-Optionen
  const defaultOption: FilterOption = { id: 'alle', label: 'Alle Fahrzeuge', icon: 'ri-car-line', description: 'Alle verfügbaren Fahrzeuge' };

  // Deutsche Beschriftungen für API-Kategorien (Inhalt bleibt unverändert)
  const CATEGORY_LABELS_DE: Record<string, string> = {
    compact: 'Kleinwagen',
    coupe: 'Sportwagen/Coupé',
    offroad: 'SUV/Geländewagen',
    sedan: 'Limousine',
    roadster: 'Cabrio/Roadster',
    station: 'Kombi',
    van: 'Van',
    other: 'Sonstige'
  };

  // Dynamische Filter basierend auf verfügbaren Fahrzeugen
  const filterOptions = useMemo(() => {
    if (vehicles.length === 0) return [defaultOption];
    const cats = availableCategories;
    const dynamicOptions: FilterOption[] = cats.map(cat => ({
      id: cat,
      label: CATEGORY_LABELS_DE[cat] ?? cat,
      icon: 'ri-car-line',
      description: `Fahrzeuge: ${CATEGORY_LABELS_DE[cat] ?? cat}`
    }));
    return [defaultOption, ...dynamicOptions];
  }, [vehicles, availableCategories]);

  // Fahrzeuge laden (inkl. Kategorien ableiten)
  const fetchLatestVehicles = async () => {
      try {
        setLoading(true);
        setError(null);
        
        // 1) Gesamtanzahl der Fahrzeuge abrufen
        let countResponse: any;
        try {
          const countRes = await fetch('/api/vehicles/count');
          if (countRes.ok) {
            countResponse = await countRes.json();
          } else {
            console.warn('Vehicle count request failed:', countRes.status, countRes.statusText);
            countResponse = { error: `HTTP ${countRes.status}` };
          }
        } catch (err: any) {
          console.warn('Vehicle count fetch error:', err?.message || err);
          countResponse = { error: String(err) };
        }
        
        if (countResponse && countResponse.error) {
          console.error('API Count Error:', countResponse.error, countResponse.details);
          setError('API temporär nicht verfügbar');
          setLoading(false);
          return;
        }
        
        const totalVehicles: number = Number(countResponse?.total ?? countResponse?.count ?? 0);
        console.log('🚗 Total vehicles reported by API:', totalVehicles);

        // 2) Alle Fahrzeuge mit Fallbacks abrufen (bei Count-Fehlern)
        const takeCandidates: string[] = totalVehicles > 0 
          ? [String(totalVehicles)] 
          : ['120', '100', '82', '80', '60', '50'];

        let response: any = { error: 'no-attempt' };
        for (const takeParam of takeCandidates) {
          try {
            const res = await fetch(`/api/vehicles?take=${takeParam}`);
            if (!res.ok) {
              console.warn(`Vehicles request failed for take=${takeParam}:`, res.status, res.statusText);
              continue;
            }
            const json = await res.json();
            if (json && !json.error) {
              response = json;
              console.log(`🚗 Vehicles fetched successfully with take=${takeParam}`);
              break;
            }
            console.warn(`Vehicles JSON contained error for take=${takeParam}:`, json?.error);
          } catch (err: any) {
            console.warn(`Vehicles fetch error for take=${takeParam}:`, err?.message || err);
            continue;
          }
        }

        if (response.error) {
          console.error('API Error (vehicles):', response.error, response.details);
          setError('API temporär nicht verfügbar');
          setLoading(false);
          return;
        }
        
        // Transform API response to our Vehicle interface
        const vehicleData = response.items || response.vehicles || response.data || response;
        console.log('🚗 API Response Structure:', response);
        console.log('🚗 Vehicle Data:', vehicleData);
        console.log('🚗 Total vehicles:', response.total);
        console.log('🚗 Is Array:', Array.isArray(vehicleData));
        
        const transformedVehicles = Array.isArray(vehicleData) ? vehicleData.map((vehicle: any) => {
          console.log('🚗 Processing vehicle:', vehicle);
          
          // Extract year from dateOfFirstRegistration
          const year = vehicle.dateOfFirstRegistration?.date ? 
            new Date(vehicle.dateOfFirstRegistration.date).getFullYear() : 
            vehicle.year || 2020;
          
          // Extract images from mediaItems
          const images = vehicle.mediaItems && vehicle.mediaItems.length > 0 ? 
            vehicle.mediaItems.filter((item: any) => item.type === 'Image').map((item: any) => ({
              url: item.downloadUrl,
              alt: `${vehicle.manufacturer?.name} ${vehicle.model?.name}`
            })) : [];
          
          return {
            id: vehicle.id?.toString() || vehicle.vehicleId?.toString() || 'unknown',
            make: vehicle.manufacturer?.name || vehicle.make || 'Unbekannt',
            model: vehicle.model?.name || vehicle.modelName || 'Unbekannt',
            variant: vehicle.modelExtension || vehicle.variant || vehicle.version || '',
            price: vehicle.consumerPrice?.totalPrice || vehicle.price || 0,
            mileage: vehicle.mileage || vehicle.kilometers || 0,
            year: year,
            fuel: vehicle.fuel?.name || vehicle.fuelType || 'Unbekannt',
            transmission: vehicle.gearbox?.name || vehicle.transmission || 'Unbekannt',
            images: images,
            description: vehicle.description || vehicle.shortDescription || '',
            bodyGroups: vehicle.body?.groups || []
          };
        }) : [];
        
        console.log('🚗 Transformed Vehicles:', transformedVehicles);
        console.log('🚗 Body Groups in vehicles:', transformedVehicles.map(v => `${v.make} ${v.model}: [${v.bodyGroups?.join(', ')}]`));
        setVehicles(transformedVehicles);
        setFilteredVehicles(transformedVehicles); // Show all vehicles initially
        updateDisplayedVehicles(transformedVehicles, 1); // Zeige initial nur erste Seite

        // Kategorien dynamisch aus bodyGroups ableiten (typensicher)
        const catSet = new Set<string>();
        transformedVehicles.forEach((v) => {
          const groups: string[] = Array.isArray(v.bodyGroups) ? v.bodyGroups : [];
          for (const g of groups) {
            if (typeof g === 'string' && g.length > 0) {
              catSet.add(g);
            }
          }
        });
        const cats = Array.from(catSet).sort((a, b) => a.localeCompare(b, 'de'));
        setAvailableCategories(cats);
        
        // Vorabberechnung: Fahrzeuge je Kategorie
        const categoryVehicleMap: Record<string, Vehicle[]> = {};
        cats.forEach(cat => {
          const list = transformedVehicles.filter(v => matchesCategory(v, cat));
          if (list.length > 0) categoryVehicleMap[cat] = list;
        });

        if (Object.keys(categoryVehicleMap).length > 0) {
          setCategoryVehicles(categoryVehicleMap);
          console.log('🚗 Pre-populated categories (api-derived):', Object.entries(categoryVehicleMap).map(([cat, vehs]) => `${cat}: ${vehs.length} vehicles`));
        }

      } catch (err) {
        console.error('Error fetching vehicles:', err);
        setError('Netzwerkfehler');
      } finally {
        setLoading(false);
      }
    };

  useEffect(() => {
    fetchLatestVehicles();
    const interval = setInterval(() => {
      fetchLatestVehicles();
    }, 60000); // 60s Polling für Echtzeitsynchronisation
    return () => clearInterval(interval);
  }, []);

  const formatPrice = (price: number): string => {
    return new Intl.NumberFormat('de-DE', {
      style: 'currency',
      currency: 'EUR',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(price);
  };

  // Funktion zum Aktualisieren der angezeigten Fahrzeuge
  const updateDisplayedVehicles = (vehicleList: Vehicle[], page: number = 1) => {
    const startIndex = 0;
    const endIndex = page * vehiclesPerPage;
    const vehiclesToShow = vehicleList.slice(startIndex, endIndex);
    setDisplayedVehicles(vehiclesToShow);
    setCurrentPage(page);
  };

  // Funktion zum Laden weiterer Fahrzeuge
  const loadMoreVehicles = () => {
    const nextPage = currentPage + 1;
    updateDisplayedVehicles(filteredVehicles, nextPage);
  };

  // Prüfen ob mehr Fahrzeuge verfügbar sind
  const hasMoreVehicles = currentPage * vehiclesPerPage < filteredVehicles.length;

  const formatMileage = (mileage: number) => {
    return new Intl.NumberFormat('de-DE').format(mileage) + ' km';
  };

  const generateMarketplaceUrl = (vehicle: Vehicle) => {
    // Generate URL-friendly vehicle name
    const vehicleName = `${vehicle.make}_${vehicle.model}${vehicle.variant ? '_' + vehicle.variant : ''}`
      .replace(/\s+/g, '_')
      .replace(/[^a-zA-Z0-9_]/g, '')
      .replace(/_+/g, '_');
    
    return `/fahrzeuge?vehicle=${vehicle.id}#!/vehicles/${vehicle.id}/${vehicleName}`;
  };

  // Clientseitiges Filtern mit bereits geladenen Fahrzeugen
  const fetchVehiclesByCategory = async (category: FilterCategory) => {
    if (category === 'alle') {
      setFilteredVehicles(vehicles);
      updateDisplayedVehicles(vehicles, 1);
      return;
    }

    setLoadingCategories(prev => ({ ...prev, [category]: true }));

    try {
      const cached = categoryVehicles[category];
      const list = cached && cached.length > 0
        ? cached
        : vehicles.filter(v => matchesCategory(v, category));

      if (!cached || cached.length === 0) {
        setCategoryVehicles(prev => ({ ...prev, [category]: list }));
      }

      setFilteredVehicles(list);
      updateDisplayedVehicles(list, 1);

      console.log(`🚗 Category ${category}: Showing ${list.length} vehicles (api-derived)`);
    } catch (err) {
      console.error('Error filtering vehicles for category:', category, err);
    } finally {
      setLoadingCategories(prev => ({ ...prev, [category]: false }));
    }
  };

  const filterVehicles = async (category: FilterCategory) => {
    setActiveFilter(category);
    await fetchVehiclesByCategory(category);
  };



  if (loading) {
    return (
      <section className={`py-20 bg-gray-50 ${className}`}>
        <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
              Neueste Fahrzeuge
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Entdecken Sie unsere neuesten Premium-Fahrzeuge
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[...Array(4)].map((_, index) => (
              <div key={index} className="bg-white rounded-2xl shadow-lg overflow-hidden animate-pulse">
                <div className="h-48 bg-gray-300"></div>
                <div className="p-6">
                  <div className="h-4 bg-gray-300 rounded mb-2"></div>
                  <div className="h-4 bg-gray-300 rounded mb-4 w-3/4"></div>
                  <div className="h-6 bg-gray-300 rounded mb-4"></div>
                  <div className="flex justify-between">
                    <div className="h-4 bg-gray-300 rounded w-1/3"></div>
                    <div className="h-4 bg-gray-300 rounded w-1/4"></div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section className={`py-20 bg-gray-50 ${className}`}>
        <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
              Neueste Fahrzeuge
            </h2>
            <div className="bg-red-50 border border-red-200 rounded-lg p-6 max-w-md mx-auto">
              <div className="flex items-center justify-center w-12 h-12 bg-red-100 rounded-full mx-auto mb-4">
                <i className="ri-error-warning-line text-2xl text-red-600"></i>
              </div>
              <p className="text-red-800 mb-4">{error}</p>
              <Link 
                href="/fahrzeuge" 
                className="inline-flex items-center text-red-600 hover:text-red-700 font-medium"
              >
                Alle Fahrzeuge ansehen
                <i className="ri-arrow-right-line ml-2"></i>
              </Link>
            </div>
          </div>
        </div>
      </section>
    );
  }

  // Wenn keine Fahrzeuge vorhanden sind, die Sektion dezent ausblenden
  if (!loading && !error && vehicles.length === 0) {
    return null;
  }

  return (
    <section className={`py-20 bg-gray-50 ${className}`}>
      <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
            Neueste Fahrzeuge
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
            Entdecken Sie unsere neuesten Premium-Fahrzeuge mit geprüfter Qualität
          </p>
          
          {/* Horizontal Filter Buttons */}
          <div className="mb-8">
            <div className="flex flex-wrap justify-center gap-3 mb-6">
              {filterOptions.map((option) => {
                const isLoading = loadingCategories[option.id];
                const cachedVehicles = categoryVehicles[option.id] || [];
                
                // Zähler basieren auf vorab berechneten Kategorie-Listen (Alias-Matching)
                const vehicleCount = option.id === 'alle' 
                  ? vehicles.length 
                  : (cachedVehicles.length || 0);
                
                return (
                  <button
                    key={option.id}
                    onClick={() => filterVehicles(option.id)}
                    disabled={isLoading}
                    className={`inline-flex items-center px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed ${
                      activeFilter === option.id
                        ? 'bg-red-600 text-white shadow-lg'
                        : 'bg-white text-gray-700 border border-gray-300 hover:border-red-300 hover:text-red-600 shadow-sm'
                    }`}
                  >
                    {isLoading ? (
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-current mr-2"></div>
                    ) : (
                      <i className={`${option.icon} mr-2`}></i>
                    )}
                    {option.label}
                    <span className={`ml-2 px-2 py-0.5 rounded-full text-xs ${
                      activeFilter === option.id
                        ? 'bg-red-500 text-white'
                        : 'bg-gray-100 text-gray-600'
                    }`}>
                      {isLoading ? '...' : vehicleCount}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>
          
          {/* Active Filter Display */}
          {activeFilter !== 'alle' && (
            <div className="flex justify-center mb-6">
              <div className="bg-red-100 text-red-800 px-4 py-2 rounded-full text-sm font-medium flex items-center">
                <i className={`${filterOptions.find(f => f.id === activeFilter)?.icon} mr-2`}></i>
                {filterOptions.find(f => f.id === activeFilter)?.label}
                <button
                  onClick={() => filterVehicles('alle')}
                  className="ml-2 text-red-600 hover:text-red-800"
                >
                  <i className="ri-close-line"></i>
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Vehicle Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-8">
          {displayedVehicles.map((vehicle, index) => (
            <div 
              key={vehicle.id} 
              className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300 transform hover:scale-105 group"
            >
              {/* Vehicle Image */}
              <div className="relative h-72 sm:h-48 overflow-hidden">
                {vehicle.images && vehicle.images.length > 0 ? (
                  <img 
                    src={vehicle.images[0].url} 
                    alt={`${vehicle.make} ${vehicle.model}`}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    loading="lazy"
                  />
                ) : (
                  <div className="w-full h-full bg-gradient-to-br from-gray-200 to-gray-300 flex items-center justify-center">
                    <i className="ri-car-line text-4xl text-gray-400"></i>
                  </div>
                )}
                
                {/* Year Badge */}
                <div className="absolute top-4 left-4 bg-red-600 text-white px-3 py-1 rounded-full text-sm font-semibold">
                  {vehicle.year}
                </div>
              </div>

              {/* Vehicle Info */}
              <div className="p-6">
                <h3 className="text-lg font-bold text-gray-900 mb-2 group-hover:text-red-600 transition-colors duration-300">
                  {vehicle.make} {vehicle.model}
                </h3>
                
                {vehicle.variant && (
                  <p className="text-sm text-gray-600 mb-3">{vehicle.variant}</p>
                )}
                
                <div className="text-2xl font-bold text-red-600 mb-4">
                  {formatPrice(vehicle.price)}
                </div>
                
                <div className="flex justify-between text-sm text-gray-600 mb-4">
                  <span className="flex items-center">
                    <i className="ri-dashboard-line mr-1"></i>
                    {formatMileage(vehicle.mileage)}
                  </span>
                  <span className="flex items-center">
                    <i className="ri-gas-station-line mr-1"></i>
                    {vehicle.fuel}
                  </span>
                </div>
                
                <div className="flex justify-between text-sm text-gray-600 mb-6">
                  <span className="flex items-center">
                    <i className="ri-settings-line mr-1"></i>
                    {vehicle.transmission}
                  </span>
                </div>
                
                <Link 
                  href={generateMarketplaceUrl(vehicle)}
                  className="w-full bg-red-600 hover:bg-red-700 text-white py-3 px-4 rounded-lg font-semibold transition-all duration-300 transform hover:scale-105 hover:shadow-lg inline-flex items-center justify-center group"
                >
                  Details ansehen
                  <i className="ri-arrow-right-line ml-2 transform group-hover:translate-x-1 transition-transform duration-300"></i>
                </Link>
              </div>
            </div>
          ))}
        </div>

        {/* Call to Action */}
        <div className="text-center">
          <Link 
            href="/fahrzeuge" 
            className="inline-flex items-center bg-gray-900 hover:bg-gray-800 text-white px-8 py-4 rounded-xl font-bold text-lg transition-all duration-300 transform hover:scale-105 hover:shadow-2xl"
          >
            <i className="ri-car-line mr-3 text-xl"></i>
            Alle Fahrzeuge ansehen
            <i className="ri-arrow-right-line ml-3 transform group-hover:translate-x-2 transition-transform duration-300"></i>
          </Link>
        </div>

        {/* Mehr laden Button */}
        {hasMoreVehicles && (
          <div className="flex justify-center mb-12">
            <button
              onClick={loadMoreVehicles}
              className="inline-flex items-center bg-gray-100 hover:bg-gray-200 text-gray-800 px-8 py-3 rounded-xl font-semibold transition-all duration-300 transform hover:scale-105 hover:shadow-lg border border-gray-300"
            >
              <i className="ri-add-line mr-2 text-lg"></i>
              Mehr Fahrzeuge laden
              <span className="ml-2 text-sm text-gray-600">({filteredVehicles.length - displayedVehicles.length} weitere)</span>
            </button>
          </div>
        )}

        {/* Fahrzeug-Statistik */}
        <div className="text-center text-gray-600 mb-12">
          <p className="text-sm">
            Zeige {displayedVehicles.length} von {filteredVehicles.length} Fahrzeugen
            {activeFilter !== 'alle' && (
              <span className="ml-2 text-red-600 font-medium">
                (gefiltert nach {filterOptions.find(f => f.id === activeFilter)?.label})
              </span>
            )}
          </p>
        </div>
      </div>


    </section>
  );
}