import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const manufacturer = searchParams.get('manufacturer');
    
    // Stub: Simuliert verfügbare Fahrzeugmodelle basierend auf Hersteller
    // TODO: Später durch echte Datenbankabfrage ersetzen
    const modelsByManufacturer: Record<string, Array<{id: string, name: string, count: number}>> = {
      'audi': [
        { id: 'a3', name: 'A3', count: 8 },
        { id: 'a4', name: 'A4', count: 7 },
        { id: 'a6', name: 'A6', count: 5 },
        { id: 'q5', name: 'Q5', count: 3 }
      ],
      'bmw': [
        { id: '3er', name: '3er', count: 12 },
        { id: '5er', name: '5er', count: 9 },
        { id: 'x3', name: 'X3', count: 6 },
        { id: 'x5', name: 'X5', count: 4 }
      ],
      'mercedes-benz': [
        { id: 'c-klasse', name: 'C-Klasse', count: 10 },
        { id: 'e-klasse', name: 'E-Klasse', count: 8 },
        { id: 'glc', name: 'GLC', count: 6 },
        { id: 'gla', name: 'GLA', count: 4 }
      ],
      'volkswagen': [
        { id: 'golf', name: 'Golf', count: 8 },
        { id: 'passat', name: 'Passat', count: 5 },
        { id: 'tiguan', name: 'Tiguan', count: 4 },
        { id: 'polo', name: 'Polo', count: 2 }
      ],
      'porsche': [
        { id: '911', name: '911', count: 5 },
        { id: 'cayenne', name: 'Cayenne', count: 4 },
        { id: 'macan', name: 'Macan', count: 3 }
      ]
    };
    
    const models = manufacturer ? (modelsByManufacturer[manufacturer.toLowerCase()] || []) : [];
    
    return NextResponse.json({
      models,
      manufacturer,
      total: models.length,
      success: true
    });
  } catch (error) {
    console.error('Fehler beim Abrufen der Modelle:', error);
    return NextResponse.json(
      { error: 'Fehler beim Abrufen der Modelle', success: false },
      { status: 500 }
    );
  }
}