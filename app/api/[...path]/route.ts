import { NextRequest, NextResponse } from 'next/server';
import { fetchFromApi } from '../../lib/apiClient';

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
