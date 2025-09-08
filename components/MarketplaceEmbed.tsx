'use client';

import { useEffect, useRef } from 'react';
import { usePathname } from 'next/navigation';

type Props = {
  apiKey: string;
  terms?: string;
  privacy?: string;
  imprint?: string;
};

export default function MarketplaceEmbed({
  apiKey,
  terms = '',
  privacy = 'https://autogalerie-nord.de/datenschutz',
  imprint = 'https://autogalerie-nord.de/impressum',
}: Props) {
  const containerRef = useRef<HTMLDivElement>(null);
  const pathname = usePathname();
  const scriptLoadedRef = useRef(false);

  // Initialisierung beim ersten Laden und bei Pathname-Änderung
  useEffect(() => {
    console.log('🚀 AUTOMANAGER Marketplace initialization for path:', pathname);
    
    // Nur auf der Fahrzeuge-Seite initialisieren
    if (pathname === '/fahrzeuge') {
      // Kurze Verzögerung für DOM-Updates
      const timer = setTimeout(() => {
        initializeMarketplace();
      }, 200);

      return () => {
        clearTimeout(timer);
      };
    } else {
      // Cleanup wenn nicht auf Fahrzeuge-Seite
      if (containerRef.current) {
        containerRef.current.innerHTML = '';
      }
    }
  }, [pathname, apiKey]);

  // Zusätzlicher Effect für Reinitialisierung bei Rückkehr zur Seite
  useEffect(() => {
    if (pathname === '/fahrzeuge') {
      // Warte etwas länger bei Navigation zurück zur Seite
      const reinitTimer = setTimeout(() => {
        console.log('🔄 Reinitializing marketplace after navigation');
        initializeMarketplace();
      }, 500);

      return () => clearTimeout(reinitTimer);
    }
  }, [pathname]);

  const initializeMarketplace = () => {
    if (!containerRef.current) return;

    console.log('🚀 Initializing AUTOMANAGER Marketplace with API Key:', apiKey);

    // Cleanup: Entferne bestehende Marketplace-Elemente und Skripte
    const existingMarketplace = document.querySelectorAll('#am-marketplace');
    existingMarketplace.forEach(el => {
      if (el.parentNode && el.parentNode !== containerRef.current) {
        el.parentNode.removeChild(el);
      }
    });

    // Entferne alte AUTOMANAGER-Skripte
    const existingScripts = document.querySelectorAll('script[src*="pxc-amm/loader.nocache"]');
    existingScripts.forEach(script => {
      if (script.parentNode) {
        script.parentNode.removeChild(script);
      }
    });

    // Erstelle Container-Element
    const container = containerRef.current;
    container.innerHTML = ''; // Leere den Container
    
    // Erstelle das neue AUTOMANAGER-Skript entsprechend der Anleitung
    const script = document.createElement('script');
    script.src = 'https://cdn.dein.auto/pxc-amm/loader.nocache';
    script.setAttribute('api-key', apiKey);
    
    // Setze URLs entsprechend der Anleitung
    script.setAttribute('urls-terms', '{"de":"","en":"","fr":"","es":""}');
    script.setAttribute('urls-privacy', `{"de":"${privacy}","en":"","fr":"","es":""}`);
    script.setAttribute('urls-imprint', '{"de":"https://autogalerie-nord.de/impressum","en":"","fr":"","es":""}');
    
    script.onload = () => {
      console.log('✅ AUTOMANAGER script loaded successfully with new integration method');
      scriptLoadedRef.current = true;
    };
    
    script.onerror = () => {
      console.error('❌ Failed to load AUTOMANAGER script');
      // Zeige Fallback-Nachricht
      if (containerRef.current) {
        containerRef.current.innerHTML = `
          <div style="text-align: center; padding: 40px; color: #6b7280;">
            <div style="font-size: 18px; margin-bottom: 8px;">⚠️ Fahrzeugbörse temporär nicht verfügbar</div>
            <div style="font-size: 14px; margin-bottom: 16px;">Bitte versuchen Sie es später erneut oder kontaktieren Sie uns direkt.</div>
            <a href="/kontakt" style="background: #dc2626; color: white; padding: 12px 24px; border-radius: 8px; text-decoration: none; font-weight: 600;">Jetzt kontaktieren</a>
          </div>
        `;
      }
    };
    
    // Füge das Skript direkt in den Container ein (entsprechend der Anleitung)
    container.appendChild(script);
    scriptLoadedRef.current = true;
  };

  // Neue direkte Script-Integration - keine separate Initialisierung mehr nötig

  return (
    <div
      ref={containerRef}
      style={{
        width: '100%',
        minHeight: '600px',
        background: '#fff',
        borderRadius: '8px',
        boxShadow: '0 4px 6px -1px rgba(0,0,0,0.1)',
        padding: '20px',
        position: 'relative'
      }}
    >
      {/* Container für AUTOMANAGER Marketplace */}
      <div style={{ textAlign: 'center', color: '#6b7280', padding: '40px' }}>
        <div style={{ fontSize: '18px', marginBottom: '8px' }}>
          🚗 Fahrzeugbörse wird geladen...
        </div>
        <div style={{ fontSize: '14px' }}>
          AUTOMANAGER Marketplace wird initialisiert
        </div>
      </div>
    </div>
  );
}