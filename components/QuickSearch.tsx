'use client';

import React, { useState, useEffect, useRef } from 'react';

// Define a generic type for our filter items
interface FilterItem {
  id: string | number;
  name: string;
}

export default function QuickSearch() {
  const [manufacturers, setManufacturers] = useState<FilterItem[]>([]);
  const [models, setModels] = useState<FilterItem[]>([]);
  const [vehicleCount, setVehicleCount] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const formRef = useRef<HTMLFormElement>(null);
  const [selectedManufacturer, setSelectedManufacturer] = useState<string>('');
  const [selectedFilters, setSelectedFilters] = useState({
    manufacturer: '',
    model: ''
  });


  const API_KEY = '0536fa11-99df-43f8-bf26-42af233f5478';

  useEffect(() => {
    const fetchData = async () => {
      try {
        console.log('Fetching real data from API...');
        
        // Fetch manufacturers and initial vehicle count in parallel
        const [manufacturersRes, countRes] = await Promise.all([
          fetch(`/api/criteria/manufacturers`),
          fetch(`/api/vehicles/count`),
        ]);

        // Check if any of the requests failed
        if (!manufacturersRes.ok) {
          console.error('Failed to fetch manufacturers:', await manufacturersRes.text());
        }
        if (!countRes.ok) {
          console.error('Failed to fetch vehicle count:', await countRes.text());
        }

        // Parse the response data
        const manufacturersData = manufacturersRes.ok ? await manufacturersRes.json() : [];
        const countData = countRes.ok ? await countRes.json() : { total: 0 };

        // Normalize manufacturers shape to {id, name}
        const normalizedManufacturers = Array.isArray(manufacturersData)
          ? manufacturersData
              .map((m: any) => ({
                id: m?.id ?? m?.value ?? m?.ID ?? '',
                name: m?.name ?? m?.label ?? m?.Name ?? '',
              }))
              .filter((m: FilterItem) => m.id && m.name)
          : [];
        setManufacturers(normalizedManufacturers);
        
        // Set the vehicle count (supports number or { total|count })
        let initialCount: number | undefined;
        if (typeof countData === 'number') {
          initialCount = countData;
        } else if (typeof countData?.total === 'number') {
          initialCount = countData.total;
        } else if (typeof countData?.count === 'number') {
          initialCount = countData.count;
        }

        if (typeof initialCount === 'number' && !Number.isNaN(initialCount)) {
          console.log('Vehicle count from API:', initialCount);
          setVehicleCount(initialCount);
        } else {
          console.error('Invalid vehicle count data:', countData);
          // Fallback to a default count if the API fails
          setVehicleCount(80);
          console.log('Using fallback vehicle count: 80');
        }

      } catch (error) {
        console.error('Failed to fetch data from API:', error);
        // Set fallback data if the API fails
        setVehicleCount(80);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  // Handle filter changes
  const handleFilterChange = (filterName: string, value: string) => {
    setSelectedFilters(prev => ({
      ...prev,
      [filterName]: value
    }));

    // If manufacturer changes, reset model
    if (filterName === 'manufacturer') {
      setSelectedManufacturer(value);
      setSelectedFilters(prev => ({
        ...prev,
        model: ''
      }));
      // Fetch models for the selected manufacturer
      if (value) {
        fetchModels(value);
      } else {
        setModels([]);
      }
    }
  };

  const fetchModels = async (manufacturerId: string) => {
    try {
      const response = await fetch(`/api/criteria/models?manufacturers=${manufacturerId}`);
      if (response.ok) {
        const modelsData = await response.json();
        // Normalize models shape to {id, name}
        const normalizedModels = Array.isArray(modelsData)
          ? modelsData
              .map((m: any) => ({
                id: m?.id ?? m?.value ?? m?.ID ?? '',
                name: m?.name ?? m?.label ?? m?.Name ?? '',
              }))
              .filter((m: FilterItem) => m.id && m.name)
          : [];
        setModels(normalizedModels);
      } else {
        console.error('Failed to fetch models');
        setModels([]);
      }
    } catch (error) {
      console.error('Error fetching models:', error);
      setModels([]);
    }
  };

  // Fahrzeuganzahl bei Filteränderungen aktualisieren
  useEffect(() => {
    const updateCountWithFilters = async () => {
      try {
        const params = new URLSearchParams();
        if (selectedFilters.manufacturer) {
          params.append('manufacturers', selectedFilters.manufacturer);
        }
        if (selectedFilters.model) {
          params.append('models', selectedFilters.model);
        }
        const res = await fetch(`/api/vehicles/count?${params.toString()}`);
        if (!res.ok) {
          console.error('Failed to fetch filtered vehicle count:', await res.text());
          return;
        }
        const data = await res.json();
        const nextCount =
          typeof data === 'number'
            ? data
            : typeof data.total === 'number'
            ? data.total
            : typeof data.count === 'number'
            ? data.count
            : undefined;
        if (typeof nextCount === 'number' && !Number.isNaN(nextCount)) {
          setVehicleCount(nextCount);
        }
      } catch (err) {
        console.error('Error updating filtered vehicle count:', err);
      }
    };

    updateCountWithFilters();
  }, [selectedFilters.manufacturer, selectedFilters.model]);

  const handleSearch = () => {
    // Build search URL with selected filters
    const params = new URLSearchParams();
    
    Object.entries(selectedFilters).forEach(([key, value]) => {
      if (value) {
        params.append(key, value);
      }
    });

    // Navigate to search results
    const searchUrl = `/fahrzeuge?${params.toString()}`;
    window.location.href = searchUrl;
  };

  if (isLoading) {
    return (
      <div className="bg-white rounded-2xl shadow-2xl p-8 sm:p-10 border border-gray-200/60">
        <div className="animate-pulse">
          <div className="h-4 bg-gray-200 rounded w-1/4 mb-4"></div>
          <div className="space-y-3">
            <div className="h-10 bg-gray-200 rounded"></div>
            <div className="h-10 bg-gray-200 rounded"></div>
            <div className="h-10 bg-gray-200 rounded"></div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-2xl shadow-2xl p-8 sm:p-10 border border-gray-200/60">
        <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">
          Fahrzeugsuche
        </h2>
        
        <form ref={formRef} className="space-y-4" onSubmit={(e) => { e.preventDefault(); handleSearch(); }}>
          {/* Filter Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Manufacturer Filter */}
            <div>
              <label htmlFor="manufacturer-select" className="block text-sm font-semibold text-gray-700 mb-2">
              Hersteller
              </label>
              <select
                id="manufacturer-select"
                value={selectedFilters.manufacturer}
                onChange={(e) => handleFilterChange('manufacturer', e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-red-500 focus:border-red-500 bg-white text-gray-900"
              >
                <option value="">Alle Hersteller</option>
                {manufacturers.map((manufacturer) => (
                  <option key={manufacturer.id} value={manufacturer.id}>
                    {manufacturer.name}
                  </option>
                ))}
              </select>
            </div>

            {/* Model Filter */}
            <div>
              <label htmlFor="model-select" className="block text-sm font-semibold text-gray-700 mb-2">
              Modell
              </label>
              <select
                id="model-select"
                value={selectedFilters.model}
                onChange={(e) => handleFilterChange('model', e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-red-500 focus:border-red-500 bg-white text-gray-900"
                disabled={!selectedFilters.manufacturer}
              >
                <option value="">Alle Modelle</option>
                {models.map((model) => (
                  <option key={model.id} value={model.id}>
                    {model.name}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Search Button */}
          <div className="pt-4">
            <button
              type="submit"
              className="w-full bg-red-600 hover:bg-red-700 text-white font-bold py-3 px-6 rounded-xl transition-colors duration-200 flex items-center justify-center shadow-md hover:shadow-lg"
            >
              <i className="ri-search-line mr-2"></i>
              {vehicleCount} Fahrzeuge durchsuchen
            </button>
          </div>
        </form>
       </div>
   );
  }
