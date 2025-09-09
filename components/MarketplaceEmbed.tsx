'use client';

import { useEffect, useRef } from 'react';

// Globales Flag zur Duplikat-Prävention
let isInitializing = false;
let lastInitTime = 0;

export default function MarketplaceEmbed() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    console.log('MarketplaceEmbed: Initialisierung nach pixelconcept-Dokumentation...');
    
    // Duplikat-Prävention: Prüfe ob bereits eine Initialisierung läuft
    const now = Date.now();
    if (isInitializing || (now - lastInitTime < 1000)) {
      console.log('AUTOMANAGER: Initialisierung bereits aktiv oder zu früh - überspringe');
      return;
    }
    
    // Prüfe ob bereits ein AUTOMANAGER-Skript im DOM existiert
    const existingScript = document.querySelector('script[src*="loader.nocache"]');
    if (existingScript) {
      console.log('AUTOMANAGER: Skript bereits im DOM vorhanden - überspringe');
      return;
    }
    
    // Stelle sicher, dass der Container verfügbar ist
    if (!containerRef.current) {
      console.error('Container not available');
      return;
    }

    // Setze Initialisierungs-Flag
    isInitializing = true;
    lastInitTime = now;

    // Bereinige Container bei jeder Initialisierung
    containerRef.current.innerHTML = '';
    
    // Verzögerte Initialisierung für DOM-Bereitschaft
    const initializeMarketplace = () => {
      if (!containerRef.current) {
        console.error('Container not available during initialization');
        isInitializing = false;
        return;
      }
      
      console.log('Erstelle AUTOMANAGER nach offizieller Dokumentation...');
      
      // Erstelle das Skript-Element nach pixelconcept-Spezifikation
      // Das Skript wird direkt an der Position eingefügt, wo die Fahrzeugbörse erscheinen soll
      const script = document.createElement('script');
      // Liste möglicher AUTOMANAGER-Script-URLs (Fallback-System)
      const scriptUrls = [
        'https://cdn.dein.auto/pxc-amm/loader.nocache',
        'https://www.dein.auto/automanager/loader.nocache',
        'https://api.dein.auto/v1/automanager/loader.nocache',
        'https://automanager.pixelconcept.de/loader.nocache'
      ];
      
      let currentUrlIndex = 0;
      
      const tryLoadScript = () => {
        if (currentUrlIndex >= scriptUrls.length) {
          console.error('AUTOMANAGER: Alle Script-URLs fehlgeschlagen');
          // Fallback: Zeige Nachricht an
          if (containerRef.current) {
            containerRef.current.innerHTML = `
              <div class="bg-gray-100 border border-gray-300 rounded-lg p-6 text-center">
                <h3 class="text-lg font-semibold text-gray-800 mb-2">Fahrzeugbörse temporär nicht verfügbar</h3>
                <p class="text-gray-600 mb-4">Die Fahrzeugbörse kann momentan nicht geladen werden. Bitte versuchen Sie es später erneut.</p>
                <a href="/fahrzeuge" class="inline-block bg-red-600 text-white px-6 py-2 rounded-lg hover:bg-red-700 transition-colors">
                  Zu unseren Fahrzeugen
                </a>
              </div>
            `;
          }
          isInitializing = false;
          return;
        }
        
        const script = document.createElement('script');
        script.src = scriptUrls[currentUrlIndex];
        script.setAttribute('api-key', '0536fa11-99df-43f8-bf26-42af233f5478');
        script.setAttribute('urls-terms', '{"de":"","en":"","fr":"","es":""}');
        script.setAttribute('urls-privacy', '{"de":"https://autogalerie-nord.de/datenschutz","en":"","fr":"","es":""}');
        script.setAttribute('urls-imprint', '{"de":"https://autogalerie-nord.de/impressum","en":"","fr":"","es":""}');
        
        // Zusätzliche Attribute für bessere Kompatibilität
        script.setAttribute('crossorigin', 'anonymous');
        script.setAttribute('referrerpolicy', 'no-referrer-when-downgrade');

        script.onload = () => {
          console.log(`AUTOMANAGER script loaded successfully from: ${scriptUrls[currentUrlIndex]}`);
          isInitializing = false;
        };

        script.onerror = () => {
          console.warn(`Failed to load AUTOMANAGER script from: ${scriptUrls[currentUrlIndex]}`);
          currentUrlIndex++;
          // Entferne fehlgeschlagenes Script
          if (script.parentNode) {
            script.parentNode.removeChild(script);
          }
          // Versuche nächste URL
          setTimeout(tryLoadScript, 500);
        };
        
        // Füge das Skript in den Container ein
        if (containerRef.current) {
          containerRef.current.appendChild(script);
        }
      };
      
      // Starte Fallback-System
       tryLoadScript();
    };
    
    // Verzögerung um DOM-Bereitschaft sicherzustellen
    setTimeout(initializeMarketplace, 100);
  }, []); // Bei jedem Mount ausführen für Seitenwechsel-Kompatibilität

  // Cleanup beim Unmount
  useEffect(() => {
    return () => {
      if (containerRef.current) {
        containerRef.current.innerHTML = '';
      }
    };
  }, []);

  return (
    <div 
      ref={containerRef}
      className="w-full min-h-[600px]"
      style={{
        width: '100%',
        maxWidth: '100%',
        margin: '0 auto',
        position: 'relative'
      }}
    >
      {/* AUTOMANAGER wird hier programmatisch eingefügt */}
    </div>
  );
}