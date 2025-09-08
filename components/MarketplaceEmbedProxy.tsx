'use client';

import { useEffect, useRef, useState } from 'react';
import { usePathname } from 'next/navigation';

type Props = {
  apiKey: string;
  terms?: string;
  privacy?: string;
  imprint?: string;
};

type VehicleData = {
  id: string;
  make: string;
  model: string;
  price: number;
  year: number;
  mileage: number;
  fuel: string;
  transmission: string;
  images?: string[];
};

export default function MarketplaceEmbedProxy({
  apiKey,
  terms = '',
  privacy = 'https://autogalerie-nord.de/datenschutz',
  imprint = 'https://autogalerie-nord.de/impressum',
}: Props) {
  const [vehicles, setVehicles] = useState<VehicleData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [totalCount, setTotalCount] = useState(0);
  const pathname = usePathname();

  // API-Call über Proxy
  const fetchVehicles = async () => {
    try {
      setLoading(true);
      setError(null);
      
      console.log('🔄 Fetching vehicles via proxy...');
      
      // Fahrzeugdaten über Proxy laden
      const vehiclesResponse = await fetch(
        `/api/marketplace-proxy?endpoint=/vehicles&orderby=Price&orderdir=desc&pageLayout=RegularList&skip=0&take=10`
      );
      
      if (!vehiclesResponse.ok) {
        throw new Error(`Vehicles API failed: ${vehiclesResponse.status}`);
      }
      
      const vehiclesData = await vehiclesResponse.json();
      console.log('✅ Vehicles data received:', vehiclesData);
      console.log('📊 Data type:', typeof vehiclesData);
      console.log('📊 Is array:', Array.isArray(vehiclesData));
      console.log('📊 Data keys:', Object.keys(vehiclesData || {}));
      console.log('📊 Data length/count:', vehiclesData?.length || vehiclesData?.count || 'unknown');
      
      // Fahrzeuganzahl über Proxy laden
      const countResponse = await fetch(
        `/api/marketplace-proxy?endpoint=/vehicles/count&pageLayout=RegularList`
      );
      
      if (countResponse.ok) {
        const countData = await countResponse.json();
        // Count-API gibt direkte Zahl zurück
        const count = typeof countData === 'number' ? countData : (countData.count || countData.total || 0);
        setTotalCount(count);
        console.log('✅ Vehicle count received:', count, 'from data:', countData);
      }
      
      // Verarbeite Fahrzeugdaten - Korrekte API-Struktur
       let vehicleArray = [];
       
       if (vehiclesData && typeof vehiclesData === 'object' && vehiclesData.items && Array.isArray(vehiclesData.items)) {
         // Korrekte API-Struktur: { items: [...], total: number }
         vehicleArray = vehiclesData.items;
         console.log('📊 Found items array with', vehiclesData.items.length, 'vehicles, total:', vehiclesData.total);
       } else if (Array.isArray(vehiclesData)) {
         // Fallback: Direktes Array
         vehicleArray = vehiclesData;
         console.log('📊 Found direct array with', vehiclesData.length, 'vehicles');
       } else {
         console.log('❌ Unexpected data structure:', typeof vehiclesData, Object.keys(vehiclesData || {}));
       }
      
      if (vehicleArray.length > 0) {
        // Transformiere die Daten in unser Format - Extrahiere primitive Werte
         const transformedVehicles = vehicleArray.slice(0, 10).map((vehicle: any, index: number) => ({
           id: vehicle.id || vehicle.vehicleId || vehicle.ID || `vehicle-${index}`,
           make: vehicle.make?.name || vehicle.brand?.name || vehicle.manufacturer?.name || vehicle.make || vehicle.brand || 'Unbekannt',
           model: vehicle.model?.name || vehicle.modelName || vehicle.model || 'Unbekannt',
           price: vehicle.price || vehicle.salePrice || vehicle.cost || 0,
           year: vehicle.year || vehicle.modelYear || vehicle.constructionYear || 0,
           mileage: vehicle.mileage || vehicle.kilometers || vehicle.km || 0,
           fuel: vehicle.fuel?.name || vehicle.fuelType?.name || vehicle.engine?.name || vehicle.fuel || vehicle.fuelType || 'Unbekannt',
           transmission: vehicle.transmission?.name || vehicle.gearbox?.name || vehicle.transmission || vehicle.gearbox || 'Unbekannt',
           images: Array.isArray(vehicle.images) ? vehicle.images : (Array.isArray(vehicle.pictures) ? vehicle.pictures : (Array.isArray(vehicle.photos) ? vehicle.photos : []))
         }));
        
        setVehicles(transformedVehicles);
        console.log('✅ Successfully processed', transformedVehicles.length, 'vehicles');
      } else {
        console.log('❌ No vehicles found in response');
        setVehicles([]);
      }
      
    } catch (err) {
      console.error('❌ Proxy fetch error:', err);
      setError(err instanceof Error ? err.message : 'Fehler beim Laden der Fahrzeuge');
      setVehicles([]);
    } finally {
      setLoading(false);
    }
  };

  // Lade Daten bei Pathname-Änderung
  useEffect(() => {
    console.log('🔄 Pathname changed, fetching vehicles via proxy:', pathname);
    console.log('🔧 Component state before fetch - vehicles:', vehicles.length, 'loading:', loading, 'error:', error);
    fetchVehicles();
  }, [pathname, apiKey]);

  // Debug: Log state changes
  useEffect(() => {
    console.log('🎯 Vehicles state updated:', vehicles.length, 'vehicles');
    console.log('📊 Current vehicles:', vehicles);
  }, [vehicles]);

  useEffect(() => {
    console.log('⏳ Loading state changed:', loading);
  }, [loading]);

  useEffect(() => {
    console.log('❌ Error state changed:', error);
  }, [error]);

  useEffect(() => {
    console.log('🔢 Total count changed:', totalCount);
  }, [totalCount]);

  // Formatiere Preis
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('de-DE', {
      style: 'currency',
      currency: 'EUR',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(price);
  };

  // Formatiere Kilometerstand
  const formatMileage = (mileage: number) => {
    return new Intl.NumberFormat('de-DE').format(mileage) + ' km';
  };

  if (loading) {
    return (
      <div style={{
        width: '100%',
        minHeight: '600px',
        background: '#fff',
        borderRadius: '8px',
        boxShadow: '0 4px 6px -1px rgba(0,0,0,0.1)',
        padding: '40px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
      }}>
        <div style={{ textAlign: 'center' }}>
          <div style={{
            width: '50px',
            height: '50px',
            border: '4px solid #e5e7eb',
            borderTop: '4px solid #3b82f6',
            borderRadius: '50%',
            animation: 'spin 1s linear infinite',
            margin: '0 auto 20px'
          }} />
          <div style={{ color: '#6b7280', fontSize: '18px' }}>
            Fahrzeugbörse wird geladen...
          </div>
          <div style={{ color: '#9ca3af', fontSize: '14px', marginTop: '8px' }}>
            Daten werden über Proxy abgerufen
          </div>
        </div>
        <style jsx>{`
          @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
          }
        `}</style>
      </div>
    );
  }

  if (error) {
    return (
      <div style={{
        width: '100%',
        minHeight: '400px',
        background: '#fff',
        borderRadius: '8px',
        boxShadow: '0 4px 6px -1px rgba(0,0,0,0.1)',
        padding: '40px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
      }}>
        <div style={{ textAlign: 'center' }}>
          <div style={{
            width: '60px',
            height: '60px',
            background: '#fee2e2',
            borderRadius: '50%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            margin: '0 auto 20px'
          }}>
            <span style={{ color: '#dc2626', fontSize: '24px' }}>⚠️</span>
          </div>
          <div style={{ color: '#374151', fontSize: '18px', marginBottom: '8px' }}>
            Fahrzeugdaten konnten nicht geladen werden
          </div>
          <div style={{ color: '#6b7280', fontSize: '14px', marginBottom: '20px' }}>
            {error}
          </div>
          <button
            onClick={fetchVehicles}
            style={{
              background: '#3b82f6',
              color: 'white',
              border: 'none',
              padding: '12px 24px',
              borderRadius: '6px',
              fontSize: '14px',
              cursor: 'pointer'
            }}
          >
            Erneut versuchen
          </button>
        </div>
      </div>
    );
  }

  return (
    <div style={{
      width: '100%',
      background: '#fff',
      borderRadius: '8px',
      boxShadow: '0 4px 6px -1px rgba(0,0,0,0.1)',
      overflow: 'hidden'
    }}>
      {/* Header */}
      <div style={{
        background: 'linear-gradient(135deg, #1e40af 0%, #3b82f6 100%)',
        color: 'white',
        padding: '24px',
        textAlign: 'center'
      }}>
        <h2 style={{ margin: '0 0 8px 0', fontSize: '24px', fontWeight: 'bold' }}>
          🚗 Fahrzeugbörse
        </h2>
        <p style={{ margin: 0, opacity: 0.9 }}>
          {totalCount > 0 ? `${totalCount} Fahrzeuge verfügbar` : 'Aktuelle Fahrzeuge'}
        </p>
        <div style={{
          marginTop: '12px',
          padding: '8px 16px',
          background: 'rgba(255,255,255,0.2)',
          borderRadius: '20px',
          display: 'inline-block',
          fontSize: '12px'
        }}>
          ✅ Daten über Proxy geladen
        </div>
      </div>

      {/* Fahrzeug-Grid */}
      <div style={{ padding: '24px' }}>
        {vehicles.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '40px', color: '#6b7280' }}>
            <div style={{ fontSize: '48px', marginBottom: '16px' }}>🚗</div>
            <div style={{ fontSize: '18px', marginBottom: '8px' }}>Keine Fahrzeuge gefunden</div>
            <div style={{ fontSize: '14px' }}>Versuchen Sie es später erneut</div>
          </div>
        ) : (
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
            gap: '20px'
          }}>
            {vehicles.map((vehicle, index) => (
              <div key={vehicle.id || index} style={{
                border: '1px solid #e5e7eb',
                borderRadius: '8px',
                overflow: 'hidden',
                transition: 'transform 0.2s, box-shadow 0.2s',
                cursor: 'pointer'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-2px)';
                e.currentTarget.style.boxShadow = '0 8px 25px -8px rgba(0,0,0,0.2)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = 'none';
              }}>
                {/* Fahrzeug-Bild */}
                <div style={{
                  height: '200px',
                  background: vehicle.images && vehicle.images[0] 
                    ? `url(${vehicle.images[0]}) center/cover` 
                    : 'linear-gradient(135deg, #f3f4f6 0%, #e5e7eb 100%)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: '#9ca3af',
                  fontSize: '48px'
                }}>
                  {(!vehicle.images || !vehicle.images[0]) && '🚗'}
                </div>
                
                {/* Fahrzeug-Details */}
                <div style={{ padding: '16px' }}>
                  <h3 style={{
                    margin: '0 0 8px 0',
                    fontSize: '18px',
                    fontWeight: 'bold',
                    color: '#111827'
                  }}>
                    {vehicle.make} {vehicle.model}
                  </h3>
                  
                  <div style={{
                    display: 'grid',
                    gridTemplateColumns: '1fr 1fr',
                    gap: '8px',
                    marginBottom: '12px',
                    fontSize: '14px',
                    color: '#6b7280'
                  }}>
                    {vehicle.year && (
                      <div>📅 {vehicle.year}</div>
                    )}
                    {vehicle.mileage && (
                      <div>🛣️ {formatMileage(vehicle.mileage)}</div>
                    )}
                    {vehicle.fuel && (
                      <div>⛽ {vehicle.fuel}</div>
                    )}
                    {vehicle.transmission && (
                      <div>⚙️ {vehicle.transmission}</div>
                    )}
                  </div>
                  
                  {vehicle.price && (
                    <div style={{
                      fontSize: '20px',
                      fontWeight: 'bold',
                      color: '#059669',
                      textAlign: 'right'
                    }}>
                      {formatPrice(vehicle.price)}
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
        
        {/* Footer */}
        <div style={{
          marginTop: '32px',
          padding: '20px',
          background: '#f9fafb',
          borderRadius: '8px',
          textAlign: 'center'
        }}>
          <div style={{ color: '#6b7280', fontSize: '14px', marginBottom: '12px' }}>
            Interesse an einem Fahrzeug? Kontaktieren Sie uns!
          </div>
          <div style={{ display: 'flex', gap: '12px', justifyContent: 'center', flexWrap: 'wrap' }}>
            <a href="/kontakt" style={{
              background: '#3b82f6',
              color: 'white',
              padding: '10px 20px',
              borderRadius: '6px',
              textDecoration: 'none',
              fontSize: '14px',
              fontWeight: '500'
            }}>
              📞 Kontakt aufnehmen
            </a>
            <a href="tel:+49" style={{
              background: '#059669',
              color: 'white',
              padding: '10px 20px',
              borderRadius: '6px',
              textDecoration: 'none',
              fontSize: '14px',
              fontWeight: '500'
            }}>
              📱 Anrufen
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}