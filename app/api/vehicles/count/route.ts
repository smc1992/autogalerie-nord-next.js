import { NextResponse } from 'next/server';

export async function GET() {
  try {
    // Stub: Simuliert die Anzahl verfügbarer Fahrzeuge
    // TODO: Später durch echte Datenbankabfrage ersetzen
    const count = 127; // Beispielwert
    
    return NextResponse.json({ 
      count,
      success: true 
    });
  } catch (error) {
    console.error('Fehler beim Abrufen der Fahrzeuganzahl:', error);
    return NextResponse.json(
      { error: 'Fehler beim Abrufen der Fahrzeuganzahl', success: false },
      { status: 500 }
    );
  }
}