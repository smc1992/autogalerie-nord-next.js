// Use the correct API endpoint without the v1 path
const API_BASE_URL = 'https://api.pixel-base.de/marketplace/v3-11365';
const SERVER_API_KEY = '0536fa11-99df-43f8-bf26-42af233f5478';
import dns from 'dns';

// Prefer IPv4 results to avoid IPv6 issues in some environments
dns.setDefaultResultOrder('ipv4first');

export async function fetchFromApi(path: string, clientParams: URLSearchParams) {
  // Build query string manually
  let queryString = `?apikey=${SERVER_API_KEY}`;
  
  // Add client params if provided
  if (clientParams) {
    clientParams.forEach((value, key) => {
      if (key.toLowerCase() !== 'apikey') {
        queryString += `&${key}=${encodeURIComponent(value)}`;
      }
    });
  }
  
  // Ensure proper URL construction without double slashes
  const cleanPath = path.startsWith('/') ? path.substring(1) : path;
  const baseUrl = API_BASE_URL.endsWith('/') ? API_BASE_URL.slice(0, -1) : API_BASE_URL;
  const targetUrl = `${baseUrl}/${cleanPath}${queryString}`;

  try {
    console.log(`[API CLIENT] Fetching: ${targetUrl}`);
    const response = await fetch(targetUrl, {
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error(`[API CLIENT] Error ${response.status}: ${response.statusText}`);
      console.error(`[API CLIENT] Error response: ${errorText}`);
      // Return error object with details
      return { error: `API Error: ${response.status} ${response.statusText}`, details: errorText };
    }

    return await response.json();

  } catch (error) {
    console.error('[API CLIENT] CRITICAL FETCH FAILED:', error);
    // Return error object with details
    return { error: 'Failed to connect to API server', details: error instanceof Error ? error.message : String(error) };
  }
}
