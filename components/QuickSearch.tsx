'use client';

import React, { useState, useEffect, useRef } from 'react';
import { useLanguage } from '../context/LanguageContext';
import dictionaries, { type DictionaryTop } from '../i18n/dictionaries';

// Define a generic type for our filter items
interface FilterItem {
  id: string | number;
  name: string;
}

export default function QuickSearch() {
  const { dict } = useLanguage();
  const d = dict as DictionaryTop;
  const quicksearch = (d?.quicksearch ?? dictionaries.de.quicksearch ?? {}) as any;
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

        // Hersteller nur anzeigen, wenn Fahrzeuge vorhanden sind
        const counts = await Promise.all(
          normalizedManufacturers.map(async (man) => {
            try {
              const r = await fetch(`/api/vehicles/count?manufacturers=${encodeURIComponent(String(man.id))}`);
              if (!r.ok) return 0;
              const d = await r.json();
              const c = typeof d === 'number'
                ? d
                : (typeof d.total === 'number' ? d.total : (typeof d.count === 'number' ? d.count : 0));
              return typeof c === 'number' && !Number.isNaN(c) ? c : 0;
            } catch (e) {
              console.error('Error checking manufacturer stock count', e);
              return 0;
            }
          })
        );
        const filteredManufacturers = normalizedManufacturers.filter((_, idx) => counts[idx] > 0);
        setManufacturers(filteredManufacturers.length ? filteredManufacturers : normalizedManufacturers);
        
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

    // Map lokale Filter auf Marketplace-Parameter
    if (selectedFilters.manufacturer) {
      params.append('manufacturers', selectedFilters.manufacturer);
    }
    if (selectedFilters.model) {
      params.append('models', selectedFilters.model);
    }

    // Marketplace erwartet Hash-Format (#!/?) für initiale Filterübernahme
    const searchUrl = `/fahrzeuge#!/?${params.toString()}`;
    window.location.href = searchUrl;
  };

  if (isLoading) {
    return (
      <div className="animate-pulse">
        <div className="h-4 bg-gray-200 rounded w-1/3 mb-4"></div>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          <div className="h-11 bg-gray-200 rounded"></div>
          <div className="h-11 bg-gray-200 rounded"></div>
          <div className="h-11 bg-gray-200 rounded"></div>
        </div>
      </div>
    );
  }

  return (
    <div>
      {/* kompakter Header innerhalb der Karte */}
      <div className="flex items-center gap-3 mb-4">
        <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-red-100 text-red-600">
          <i className="ri-search-line text-xl"></i>
        </div>
        <h3 className="text-lg sm:text-xl font-semibold text-gray-900">{quicksearch.searchTitle}</h3>
      </div>

      <form ref={formRef} className="space-y-3 sm:space-y-0" onSubmit={(e) => { e.preventDefault(); handleSearch(); }}>
        {/* Grid: zwei Filter + Button rechts (ab sm) */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 items-end">
          {/* Hersteller */}
          <div>
            <label htmlFor="manufacturer-select" className="block text-xs font-semibold text-gray-600 mb-1">{quicksearch.manufacturerLabel}</label>
            <select
              id="manufacturer-select"
              value={selectedFilters.manufacturer}
              onChange={(e) => handleFilterChange('manufacturer', e.target.value)}
              className="w-full h-11 px-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 bg-white text-gray-900"
            >
              <option value="">{quicksearch.allManufacturers}</option>
              {manufacturers.map((manufacturer) => (
                <option key={manufacturer.id} value={manufacturer.id}>
                  {manufacturer.name}
                </option>
              ))}
            </select>
          </div>

          {/* Modell */}
          <div>
            <label htmlFor="model-select" className="block text-xs font-semibold text-gray-600 mb-1">{quicksearch.modelLabel}</label>
            <select
              id="model-select"
              value={selectedFilters.model}
              onChange={(e) => handleFilterChange('model', e.target.value)}
              className="w-full h-11 px-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 bg-white text-gray-900"
              disabled={!selectedFilters.manufacturer}
            >
              <option value="">{quicksearch.allModels}</option>
              {models.map((model) => (
                <option key={model.id} value={model.id}>
                  {model.name}
                </option>
              ))}
            </select>
          </div>

          {/* Button */}
          <div className="sm:col-span-1">
            <button
              type="submit"
              className="w-full h-11 bg-red-600 hover:bg-red-700 text-white font-semibold px-4 rounded-lg transition-colors duration-200 flex items-center justify-center shadow-md hover:shadow-lg"
            >
              <i className="ri-search-line mr-2"></i>
        {vehicleCount} {quicksearch.vehiclesSuffix}
            </button>
          </div>
        </div>
      </form>
    </div>
   );
  }
