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
      script.src = 'https://cdn.dein.auto/pxc-amm/loader.nocache';
      script.setAttribute('api-key', '0536fa11-99df-43f8-bf26-42af233f5478');
      script.setAttribute('urls-terms', '{"de":"","en":"","fr":"","es":""}');
      script.setAttribute('urls-privacy', '{"de":"https://autogalerie-nord.de/datenschutz","en":"","fr":"","es":""}');
      script.setAttribute('urls-imprint', '{"de":"https://autogalerie-nord.de/impressum","en":"","fr":"","es":""}');

      script.onload = () => {
        console.log('AUTOMANAGER script loaded successfully');
        isInitializing = false;
      };

      script.onerror = () => {
        console.error('Failed to load AUTOMANAGER script');
        isInitializing = false;
      };

      // Füge das Skript direkt in den Container ein
      // Nach pixelconcept-Dokumentation: "Die Fahrzeugbörse wird an genau der Stelle eingeblendet, an der sich die Skriptreferenz befindet"
      containerRef.current.appendChild(script);
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