import { NextResponse } from 'next/server';

export async function GET() {
  try {
    // Stub: Simuliert verfügbare Fahrzeughersteller
    // TODO: Später durch echte Datenbankabfrage ersetzen
    const manufacturers = [
      { id: 'audi', name: 'Audi', count: 23 },
      { id: 'bmw', name: 'BMW', count: 31 },
      { id: 'mercedes-benz', name: 'Mercedes-Benz', count: 28 },
      { id: 'volkswagen', name: 'Volkswagen', count: 19 },
      { id: 'porsche', name: 'Porsche', count: 12 },
      { id: 'ford', name: 'Ford', count: 8 },
      { id: 'opel', name: 'Opel', count: 6 }
    ];
    
    return NextResponse.json({
      manufacturers,
      total: manufacturers.length,
      success: true
    });
  } catch (error) {
    console.error('Fehler beim Abrufen der Hersteller:', error);
    return NextResponse.json(
      { error: 'Fehler beim Abrufen der Hersteller', success: false },
      { status: 500 }
    );
  }
}