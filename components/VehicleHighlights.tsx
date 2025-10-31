'use client';

import { useState, useEffect, useMemo, useRef } from 'react';
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

// Temporär ohne Section-Wrapper, um Parserfehler zu umgehen

export default function VehicleHighlights({ className = '' }: VehicleHighlightsProps) {
  const [vehicles, setVehicles] = useState<Vehicle[]>([]);
  const [filteredVehicles, setFilteredVehicles] = useState<Vehicle[]>([]);
  const [displayedVehicles, setDisplayedVehicles] = useState<Vehicle[]>([]);
  const [categoryVehicles, setCategoryVehicles] = useState<Record<FilterCategory, Vehicle[]>>({} as Record<FilterCategory, Vehicle[]>);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [vehiclesPerPage] = useState(12); // Anzahl Fahrzeuge pro Seite
  const [currentPage, setCurrentPage] = useState(1);

  // Controller zum Abbrechen laufender Requests (vermeidet net::ERR_ABORTED Warnungen bei Navigations-/Pollingwechseln)
  const fetchControllerRef = useRef<AbortController | null>(null);

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
      // Vorherigen laufenden Request abbrechen, um Überschneidungen zu vermeiden
      if (fetchControllerRef.current) {
        try { fetchControllerRef.current.abort(); } catch {}
      }
      const controller = new AbortController();
      fetchControllerRef.current = controller;
      const { signal } = controller;
      try {
        setLoading(true);
        setError(null);
        
        // 1) Gesamtanzahl der Fahrzeuge abrufen
        let countResponse: any;
        try {
          const countRes = await fetch('/api/vehicles/count', { signal });
          if (countRes.ok) {
            countResponse = await countRes.json();
          } else {
            console.warn('Vehicle count request failed:', countRes.status, countRes.statusText);
            countResponse = { error: `HTTP ${countRes.status}` };
          }
        } catch (err: any) {
          if (err?.name === 'AbortError') {
            console.warn('Vehicle count fetch aborted');
            return; // Sauber abbrechen ohne Fehlerzustand
          }
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
            const res = await fetch(`/api/vehicles?take=${takeParam}`, { signal });
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
            if (err?.name === 'AbortError') {
              console.warn(`Vehicles fetch aborted for take=${takeParam}`);
              return; // Sauber abbrechen ohne Fehlerzustand
            }
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

      } catch (err: any) {
        if (err?.name === 'AbortError') {
          console.warn('Vehicles fetch aborted');
          return; // Keine Fehleranzeige bei bewusstem Abbruch
        }
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
    return () => {
      clearInterval(interval);
      // Laufende Requests beim Unmount abbrechen
      try { fetchControllerRef.current?.abort(); } catch {}
    };
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
      <section className={`bg-neutral-50 py-12 sm:py-16 ${className}`}>
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-8 sm:mb-10">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-neutral-900">Neueste Fahrzeuge</h2>
            <p className="mt-2 text-lg sm:text-xl text-neutral-600">Entdecken Sie unsere neuesten Premium-Fahrzeuge</p>
          </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-6">
          {[...Array(4)].map((_, index) => (
            <div key={index} className="bg-white rounded-2xl shadow-lg overflow-hidden animate-pulse">
              <div className="h-64 sm:h-72 lg:h-80 bg-gray-300"></div>
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
      <section className={`bg-neutral-50 py-12 sm:py-16 ${className}`}>
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-8 sm:mb-10">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-neutral-900">Neueste Fahrzeuge</h2>
          </div>
        <div className="text-center">
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

  // Haupt-Rendering der Sektion „Neueste Fahrzeuge“
  return (
    <section className={`bg-neutral-50 py-12 sm:py-16 ${className}`}>
      <div className="max-w-6xl mx-auto px-6">
        <div className="text-center mb-8 sm:mb-10">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-neutral-900">Neueste Fahrzeuge</h2>
          <p className="mt-2 text-lg sm:text-xl text-neutral-600">Entdecken Sie unsere neuesten Premium-Fahrzeuge</p>
        </div>

        {/* Filter-Pills aus dynamischen Kategorien */}
        {filterOptions.length > 1 && (
          <div className="flex flex-wrap justify-center gap-2 mb-8">
            {filterOptions.map((opt) => (
              <button
                key={opt.id}
                onClick={() => filterVehicles(opt.id)}
                disabled={Boolean(loadingCategories[opt.id])}
                className={`px-3 py-1 rounded-full border text-sm transition-colors ${
                  activeFilter === opt.id
                    ? 'bg-red-600 text-white border-red-600'
                    : 'bg-white text-gray-800 border-gray-300 hover:border-red-400'
                }`}
              >
                {opt.label}
              </button>
            ))}
          </div>
        )}

        {/* Fahrzeugkarten */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-6">
          {displayedVehicles.map((vehicle) => (
            <Link
              key={vehicle.id}
              href={generateMarketplaceUrl(vehicle)}
              className="block bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow"
            >
              <div className="relative h-64 sm:h-72 lg:h-80 bg-gray-100">
                {vehicle.images && vehicle.images[0] ? (
                  <img
                    src={vehicle.images[0].url}
                    alt={vehicle.images[0].alt ?? `${vehicle.make} ${vehicle.model}`}
                    className="w-full h-full object-cover object-center"
                  />
                ) : (
                  <div className="w-full h-full bg-gray-200" />
                )}
              </div>
              <div className="p-6">
                <div className="font-semibold text-lg text-gray-900">
                  {vehicle.make} {vehicle.model}{vehicle.variant ? ` ${vehicle.variant}` : ''}
                </div>
                <div className="mt-1 text-red-600 font-bold">{formatPrice(vehicle.price)}</div>
                <div className="mt-2 text-gray-600 text-sm">
                  {formatMileage(vehicle.mileage)} • {vehicle.year} • {vehicle.fuel} • {vehicle.transmission}
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* Mehr laden */}
        {hasMoreVehicles && (
          <div className="text-center mt-8">
            <button
              onClick={loadMoreVehicles}
              className="px-6 py-3 bg-red-600 hover:bg-red-700 text-white font-semibold rounded-lg transition-colors"
            >
              Mehr Fahrzeuge laden
            </button>
          </div>
        )}

        {/* Link zu allen Fahrzeugen */}
        <div className="text-center mt-10">
          <Link href="/fahrzeuge" className="inline-flex items-center text-red-600 hover:text-red-700 font-medium">
            Alle Fahrzeuge ansehen
            <i className="ri-arrow-right-line ml-2"></i>
          </Link>
        </div>
      </div>
    </section>
  );
}