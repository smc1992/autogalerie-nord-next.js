'use client';

import { useEffect, useRef } from 'react';

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
  imprint = { de: 'https://autogalerie-nord.de/impressum' }, // ← Schreibweise "impressum"
}: Props) {
  const anchorRef = useRef<HTMLDivElement>(null);
  const mountedRef = useRef(false);
  const scriptRef = useRef<HTMLScriptElement | null>(null);

  useEffect(() => {
    if (mountedRef.current) return;
    mountedRef.current = true;

    const anchor = anchorRef.current;
    if (!anchor) return;

    // 1) Script-Element programmgesteuert erstellen
    const s = document.createElement('script');
    s.src = 'https://cdn.dein.auto/pxc-amm/loader.nocache';
    s.async = true;
    s.defer = true;

    // 2) Anbieter-spezifische Attribute GENAU wie gefordert setzen
    s.setAttribute('api-key', apiKey);
    s.setAttribute('urls-terms', JSON.stringify(terms));
    s.setAttribute('urls-privacy', JSON.stringify(privacy));
    s.setAttribute('urls-imprint', JSON.stringify(imprint));

    // 3) Event-Handler (optional)
    s.onload = () => {
      // Wenn der Anbieter auto-initialisiert, reicht das Laden.
      // Falls ein expliziter Init nötig ist, kannst du ihn hier aufrufen:
      // window.amm?.init?.({ container: anchor, apiKey, ... });
      // (Nur verwenden, wenn die Doku einen Init-Call vorsieht.)
      console.log('✅ AMM script loaded');
    };
    s.onerror = () => {
      // Fallback UI ins Anchor setzen
      anchor.innerHTML = `
        <div style="text-align:center;padding:60px 20px;font-family:system-ui,sans-serif">
          <div style="color:#dc2626;margin-bottom:20px;font-size:48px">⚠️</div>
          <h3 style="color:#374151;margin:0 0 10px;font-size:20px">Fahrzeugbörse vorübergehend nicht verfügbar</h3>
          <p style="color:#6b7280;margin:0 0 20px;font-size:16px">Bitte versuchen Sie es später erneut.</p>
          <button onclick="window.location.reload()"
            style="background:#dc2626;color:white;padding:12px 24px;border-radius:8px;cursor:pointer;border:none">
            Seite neu laden
          </button>
        </div>
      `;
      console.error('❌ AMM loader failed');
    };

    // 4) Wichtig: Das Skript GENAU an der Stelle platzieren, wo gerendert werden soll.
    // Viele Loader verwenden document.currentScript als Anker.
    anchor.appendChild(s);
    scriptRef.current = s;

    return () => {
      // Sanftes Cleanup – keine aggressiven Global-Deletes
      try {
        (window as any).amm?.destroy?.(); // nur wenn vorhanden
      } catch {}

      // Script entfernen (nur das, was wir selbst eingefügt haben)
      if (scriptRef.current && scriptRef.current.parentNode) {
        scriptRef.current.parentNode.removeChild(scriptRef.current);
      }
      // Gerenderten Inhalt leeren
      if (anchorRef.current) {
        anchorRef.current.innerHTML = '';
      }
    };
  }, [apiKey, terms, privacy, imprint]);

  // Anchor ist der Platzhalter – hier fügt das Script seinen DOM ein
  return (
    <div
      id="am-marketplace"
      ref={anchorRef}
      style={{
        width: '100%',
        minHeight: '600px',
        background: '#fff',
        borderRadius: 8,
        boxShadow: '0 4px 6px -1px rgba(0,0,0,.1)',
      }}
    />
  );
}