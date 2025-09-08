import { NextRequest, NextResponse } from 'next/server';

// Proxy für pixelconcept AUTOMANAGER API
// Löst CORS- und Domain-Whitelist-Probleme

const PIXELCONCEPT_API_BASE = 'https://api.pixel-base.de/marketplace/v3-11365';
const API_KEY = '0536fa11-99df-43f8-bf26-42af233f5478';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const endpoint = searchParams.get('endpoint');
    
    if (!endpoint) {
      return NextResponse.json(
        { error: 'Endpoint parameter required' },
        { status: 400 }
      );
    }

    // Entferne endpoint aus searchParams
    searchParams.delete('endpoint');
    
    // Füge API-Key hinzu falls nicht vorhanden
    if (!searchParams.has('apikey')) {
      searchParams.set('apikey', API_KEY);
    }

    // Baue die finale URL
    const targetUrl = `${PIXELCONCEPT_API_BASE}${endpoint}?${searchParams.toString()}`;
    
    console.log('🔄 Proxying request to:', targetUrl);

    // Mache den API-Call über den Server
    const response = await fetch(targetUrl, {
      method: 'GET',
      headers: {
        'User-Agent': 'Autogalerie-Nord-Website/1.0',
        'Accept': 'application/json',
        'Referer': 'https://autogalerie-nord.de',
      },
    });

    if (!response.ok) {
      console.error('❌ API request failed:', response.status, response.statusText);
      return NextResponse.json(
        { error: `API request failed: ${response.status} ${response.statusText}` },
        { status: response.status }
      );
    }

    const data = await response.json();
    console.log('✅ API request successful, data length:', JSON.stringify(data).length);
    
    // Debug: Log Datenstruktur für vehicles endpoint
    if (endpoint === '/vehicles') {
      console.log('🔍 Vehicle data structure:');
      console.log('  - Type:', typeof data);
      console.log('  - Is Array:', Array.isArray(data));
      console.log('  - Keys:', data && typeof data === 'object' ? Object.keys(data) : 'not object');
      if (Array.isArray(data) && data.length > 0) {
        console.log('  - First item keys:', Object.keys(data[0]));
        console.log('  - Sample vehicle:', JSON.stringify(data[0]).substring(0, 200) + '...');
      } else if (data && typeof data === 'object') {
        const keys = Object.keys(data);
        for (const key of keys) {
          if (Array.isArray(data[key])) {
            console.log(`  - Found array in '${key}' with ${data[key].length} items`);
            if (data[key].length > 0) {
              console.log(`  - First ${key} item:`, JSON.stringify(data[key][0]).substring(0, 200) + '...');
            }
            break;
          }
        }
      }
    }

    // Setze CORS-Header für Frontend
    return NextResponse.json(data, {
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type, Authorization',
        'Cache-Control': 'public, max-age=300', // 5 Minuten Cache
      },
    });
  } catch (error) {
    console.error('❌ Proxy error:', error);
    return NextResponse.json(
      { error: 'Internal proxy error' },
      { status: 500 }
    );
  }
}

// Handle OPTIONS für CORS preflight
export async function OPTIONS(request: NextRequest) {
  return new NextResponse(null, {
    status: 200,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type, Authorization',
    },
  });
}