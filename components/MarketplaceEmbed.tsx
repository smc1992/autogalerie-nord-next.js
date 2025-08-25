'use client';

import { useEffect, useState } from 'react';

type Props = {
  apiKey: string;
  terms?: { de?: string; en?: string; fr?: string; es?: string };
  privacy?: { de?: string; en?: string; fr?: string; es?: string };
  imprint?: { de?: string; en?: string; fr?: string; es?: string };
};

export default function MarketplaceEmbed({
  apiKey,
  terms = { de: '' },
  privacy = { de: 'https://autogalerie-nord.de/datenschutz' },
  imprint = { de: 'https://autogalerie-nord.de/impressum' },
}: Props) {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
    
    // Script nur einmal global laden - bessere Duplikat-Erkennung
    if (typeof window !== 'undefined') {
      // Prüfe ob Script bereits existiert oder geladen wird
      const existingScript = document.querySelector('script[src="https://cdn.dein.auto/pxc-amm/loader.nocache"]');
      const isLoading = (window as any).marketplaceScriptLoading;
      const isLoaded = (window as any).marketplaceScriptLoaded;
      
      if (!existingScript && !isLoading && !isLoaded) {
        (window as any).marketplaceScriptLoading = true;
        
        const script = document.createElement('script');
        script.src = 'https://cdn.dein.auto/pxc-amm/loader.nocache';
        script.async = true;
        document.head.appendChild(script);
        
        script.onload = () => {
          console.log('✅ Marketplace script loaded');
          (window as any).marketplaceScriptLoaded = true;
          (window as any).marketplaceScriptLoading = false;
        };
        
        script.onerror = () => {
          console.error('❌ Marketplace script failed to load');
          (window as any).marketplaceScriptLoading = false;
        };
      }
    }
  }, []);

  if (!isClient) {
    return (
      <div
        style={{
          width: '100%',
          minHeight: '600px',
          background: '#fff',
          borderRadius: 8,
          boxShadow: '0 4px 6px -1px rgba(0,0,0,.1)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: '#666',
        }}
      >
        Fahrzeugbörse wird geladen...
      </div>
    );
  }

  // Methode 2 aus offizieller Dokumentation: Script im Head, Attribute am div
  // React erkennt custom HTML-Attribute nicht automatisch, daher verwenden wir dangerouslySetInnerHTML
  const marketplaceHtml = `
    <div 
      id="am-marketplace"
      api-key="${apiKey}"
      urls-imprint="${imprint.de || 'https://autogalerie-nord.de/impressum'}"
      urls-terms="${terms.de || ''}"
      urls-privacy="${privacy.de || 'https://autogalerie-nord.de/datenschutz'}"
      style="width: 100%; min-height: 600px; background: #fff; border-radius: 8px; box-shadow: 0 4px 6px -1px rgba(0,0,0,.1);"
    ></div>
  `;

  return (
    <div dangerouslySetInnerHTML={{ __html: marketplaceHtml }} />
  );
}