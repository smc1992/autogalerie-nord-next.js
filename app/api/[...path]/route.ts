import { NextRequest, NextResponse } from 'next/server';
import { fetchFromApi } from '../../lib/apiClient';
import dns from 'dns';

// Force IPv4 DNS result order to avoid environment IPv6 issues
dns.setDefaultResultOrder('ipv4first');

export async function GET(
  request: NextRequest,
  { params }: { params: { path: string[] } }
) {
  const path = params.path.join('/');
  const clientParams = request.nextUrl.searchParams;
  
  console.log(`[API ROUTE] Handling request for path: ${path}`);
  console.log(`[API ROUTE] Query params:`, Object.fromEntries(clientParams.entries()));

  try {
    const data = await fetchFromApi(path, clientParams);

    if (data && data.error) {
      console.error(`[API ROUTE] Error in handler [${path}]:`, data.error, data.details);
      // Offline-Fallbacks für zentrale Endpunkte
      const isOffline = String(data.error).includes('Failed to connect');
      if (isOffline) {
        // Hersteller-Fallback
        if (path === 'criteria/manufacturers') {
          const manufacturersFallback = [
            { id: 'audi', name: 'Audi' },
            { id: 'bmw', name: 'BMW' },
            { id: 'mercedes', name: 'Mercedes-Benz' },
            { id: 'vw', name: 'Volkswagen' },
            { id: 'porsche', name: 'Porsche' },
          ];
          return NextResponse.json(manufacturersFallback);
        }

        // Modelle-Fallback, abhängig vom Hersteller
        if (path === 'criteria/models') {
          const man = clientParams.get('manufacturers') || '';
          const modelsMap: Record<string, { id: string; name: string }[]> = {
            audi: [
              { id: 'a4', name: 'A4' },
              { id: 'a6', name: 'A6' },
              { id: 'q5', name: 'Q5' },
            ],
            bmw: [
              { id: '3er', name: '3er' },
              { id: '5er', name: '5er' },
              { id: 'x5', name: 'X5' },
            ],
            mercedes: [
              { id: 'c-klasse', name: 'C-Klasse' },
              { id: 'e-klasse', name: 'E-Klasse' },
              { id: 'gle', name: 'GLE' },
            ],
            vw: [
              { id: 'golf', name: 'Golf' },
              { id: 'passat', name: 'Passat' },
              { id: 'tiguan', name: 'Tiguan' },
            ],
            porsche: [
              { id: '911', name: '911' },
              { id: 'taycan', name: 'Taycan' },
              { id: 'macan', name: 'Macan' },
            ],
          };
          return NextResponse.json(modelsMap[man] || []);
        }

        // Fahrzeuganzahl-Fallback
        if (path === 'vehicles/count') {
          return NextResponse.json({ total: 80 });
        }

        // Fahrzeuge-Fallback: leere Liste zurückgeben, um UI sauber zu halten
        if (path === 'vehicles') {
          return NextResponse.json({ items: [], total: 0 });
        }

      }
      return NextResponse.json({ error: data.error, details: data.details }, { status: 500 });
    }

    console.log(`[API ROUTE] Success for path: ${path}`);
    return NextResponse.json(data);
  } catch (error) {
    console.error(`[API ROUTE] Unhandled error in handler [${path}]:`, error);
    return NextResponse.json({ 
      error: 'Unhandled API error', 
      details: error instanceof Error ? error.message : String(error) 
    }, { status: 500 });
  }
}

export const dynamic = 'force-dynamic';
export const runtime = 'nodejs';
