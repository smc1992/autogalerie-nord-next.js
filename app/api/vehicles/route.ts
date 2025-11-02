import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '12');
    
    // Stub: Simuliert Fahrzeugdaten
    // TODO: Später durch echte Datenbankabfrage ersetzen
    const mockVehicles = Array.from({ length: limit }, (_, index) => ({
      id: (page - 1) * limit + index + 1,
      make: ['BMW', 'Mercedes-Benz', 'Audi', 'Volkswagen', 'Porsche'][index % 5],
      model: ['3er', 'C-Klasse', 'A4', 'Golf', '911'][index % 5],
      year: 2020 + (index % 4),
      price: 25000 + (index * 5000),
      mileage: 15000 + (index * 10000),
      fuel: ['Benzin', 'Diesel', 'Hybrid', 'Elektro'][index % 4],
      transmission: index % 2 === 0 ? 'Automatik' : 'Schaltgetriebe',
      category: ['Limousine', 'Kombi', 'SUV', 'Cabrio', 'Coupe'][index % 5],
      image: `/images/vehicles/placeholder-${(index % 3) + 1}.jpg`,
      description: `Gepflegter ${['BMW', 'Mercedes-Benz', 'Audi', 'Volkswagen', 'Porsche'][index % 5]} in sehr gutem Zustand.`
    }));
    
    return NextResponse.json({
      vehicles: mockVehicles,
      pagination: {
        page,
        limit,
        total: 127, // Gesamtanzahl (sollte mit /count übereinstimmen)
        totalPages: Math.ceil(127 / limit)
      },
      success: true
    });
  } catch (error) {
    console.error('Fehler beim Abrufen der Fahrzeuge:', error);
    return NextResponse.json(
      { error: 'Fehler beim Abrufen der Fahrzeuge', success: false },
      { status: 500 }
    );
  }
}