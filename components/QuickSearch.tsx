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
  const [fuelTypes, setFuelTypes] = useState<FilterItem[]>([]);
  const [bodyTypes, setBodyTypes] = useState<FilterItem[]>([]);
  const [categories, setCategories] = useState<FilterItem[]>([]);
  const [vehicleCount, setVehicleCount] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const formRef = useRef<HTMLFormElement>(null);
  const [selectedManufacturer, setSelectedManufacturer] = useState<string>('');
  const [selectedFilters, setSelectedFilters] = useState({
    manufacturer: '',
    model: '',
    prRange: '',
    fueltype: '',
    bodytype: '',
    category: '',
    kmRange: '',
    frRange: ''
  });


  const API_KEY = '0536fa11-99df-43f8-bf26-42af233f5478';

  useEffect(() => {
    const fetchData = async () => {
      try {
        console.log('Fetching real data from API...');
        
        // Fetch all filter data and initial vehicle count in parallel
        const [manufacturersRes, fuelRes, bodyRes, catRes, countRes] = await Promise.all([
          fetch(`/api/criteria/manufacturers`),
          fetch(`/api/criteria/fuellings`),
          fetch(`/api/criteria/bodies`),
          fetch(`/api/criteria/usagetypes`),
          fetch(`/api/vehicles/count`),
        ]);

        // Check if any of the requests failed
        if (!manufacturersRes.ok) {
          console.error('Failed to fetch manufacturers:', await manufacturersRes.text());
        }
        if (!fuelRes.ok) {
          console.error('Failed to fetch fuel types:', await fuelRes.text());
        }
        if (!bodyRes.ok) {
          console.error('Failed to fetch body types:', await bodyRes.text());
        }
        if (!catRes.ok) {
          console.error('Failed to fetch usage types:', await catRes.text());
        }
        if (!countRes.ok) {
          console.error('Failed to fetch vehicle count:', await countRes.text());
        }

        // Parse the response data
        const manufacturersData = manufacturersRes.ok ? await manufacturersRes.json() : [];
        const fuelData = fuelRes.ok ? await fuelRes.json() : [];
        const bodyData = bodyRes.ok ? await bodyRes.json() : [];
        const catData = catRes.ok ? await catRes.json() : [];
        const countData = countRes.ok ? await countRes.json() : { total: 0 };

        // Set the state with the fetched data
        setManufacturers(manufacturersData || []);
        setFuelTypes(fuelData || []);
        setBodyTypes(bodyData || []);
        setCategories(catData || []);
        
        // Set the vehicle count
        if (countData && typeof countData.total === 'number') {
          console.log('Vehicle count from API:', countData.total);
          setVehicleCount(countData.total);
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
        setModels(modelsData || []);
      } else {
        console.error('Failed to fetch models');
        setModels([]);
      }
    } catch (error) {
      console.error('Error fetching models:', error);
      setModels([]);
    }
  };

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
      <div className="bg-white rounded-lg shadow-lg p-6">
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
    <div className="bg-white rounded-lg shadow-lg p-6">
        <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">
          Fahrzeugsuche
        </h2>
        
        <form ref={formRef} className="space-y-4" onSubmit={(e) => { e.preventDefault(); handleSearch(); }}>
          {/* Manufacturer Filter */}
          <div>
            <label htmlFor="manufacturer-select" className="block text-sm font-medium text-gray-700 mb-2">
              Hersteller
            </label>
            <select
              id="manufacturer-select"
              value={selectedFilters.manufacturer}
              onChange={(e) => handleFilterChange('manufacturer', e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-red-500 focus:border-red-500"
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
            <label htmlFor="model-select" className="block text-sm font-medium text-gray-700 mb-2">
              Modell
            </label>
            <select
              id="model-select"
              value={selectedFilters.model}
              onChange={(e) => handleFilterChange('model', e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-red-500 focus:border-red-500"
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

          {/* Fuel Type Filter */}
          <div>
            <label htmlFor="fuel-select" className="block text-sm font-medium text-gray-700 mb-2">
              Kraftstoff
            </label>
            <select
              id="fuel-select"
              value={selectedFilters.fueltype}
              onChange={(e) => handleFilterChange('fueltype', e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-red-500 focus:border-red-500"
            >
              <option value="">Alle Kraftstoffe</option>
              {fuelTypes.map((fuel) => (
                <option key={fuel.id} value={fuel.id}>
                  {fuel.name}
                </option>
              ))}
            </select>
          </div>

          {/* Body Type Filter */}
          <div>
            <label htmlFor="body-select" className="block text-sm font-medium text-gray-700 mb-2">
              Karosserie
            </label>
            <select
              id="body-select"
              value={selectedFilters.bodytype}
              onChange={(e) => handleFilterChange('bodytype', e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-red-500 focus:border-red-500"
            >
              <option value="">Alle Karosserien</option>
              {bodyTypes.map((body) => (
                <option key={body.id} value={body.id}>
                  {body.name}
                </option>
              ))}
            </select>
          </div>

          {/* Category Filter */}
          <div>
            <label htmlFor="category-select" className="block text-sm font-medium text-gray-700 mb-2">
              Kategorie
            </label>
            <select
              id="category-select"
              value={selectedFilters.category}
              onChange={(e) => handleFilterChange('category', e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-red-500 focus:border-red-500"
            >
              <option value="">Alle Kategorien</option>
              {categories.map((category) => (
                <option key={category.id} value={category.id}>
                  {category.name}
                </option>
              ))}
            </select>
          </div>

          {/* Search Button */}
          <div className="pt-4">
            <button
              type="submit"
              className="w-full bg-red-600 hover:bg-red-700 text-white font-bold py-3 px-6 rounded-md transition-colors duration-200 flex items-center justify-center"
            >
              <i className="ri-search-line mr-2"></i>
              {vehicleCount} Fahrzeuge durchsuchen
            </button>
          </div>
        </form>
       </div>
   );
 }
