'use client';

import { useEffect, useRef } from 'react';

export default function MarketplaceEmbed() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Prüfe ob bereits ein AUTOMANAGER-Skript existiert
    const existingScript = document.querySelector('script[src*="loader.nocache"]');
    if (existingScript) {
      console.log('AUTOMANAGER: Script bereits vorhanden');
      return;
    }

    // Setze Parameter am Container-Element (TypeScript-konform)
    if (containerRef.current) {
      containerRef.current.setAttribute('api-key', '0536fa11-99df-43f8-bf26-42af233f5478');
      containerRef.current.setAttribute('urls-imprint', 'https://autogalerie-nord.de/impressum');
      containerRef.current.setAttribute('urls-privacy', 'https://autogalerie-nord.de/datenschutz');
      containerRef.current.setAttribute('urls-terms', '');
    }

    // Erstelle Script-Element nach pixelconcept-Dokumentation
    const script = document.createElement('script');
    script.src = 'https://cdn.dein.auto/pxc-amm/loader.nocache';

    script.onload = () => {
      console.log('AUTOMANAGER: Script erfolgreich geladen');
    };

    script.onerror = () => {
      console.error('AUTOMANAGER: Script konnte nicht geladen werden');
    };

    // Script in den Head einfügen (empfohlene Methode)
    document.head.appendChild(script);
  }, []);

  return (
    <div 
      ref={containerRef}
      id="am-marketplace"
      className="w-full min-h-[600px]"
      style={{
        width: '100%',
        maxWidth: '100%',
        margin: '0 auto',
        position: 'relative'
      }}
    >
      {/* AUTOMANAGER Fahrzeugbörse wird hier angezeigt */}
    </div>
  );
}