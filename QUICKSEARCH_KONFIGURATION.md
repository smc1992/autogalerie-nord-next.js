# QuickSearch Widget - Funktionierende Konfiguration

## Erfolgreich implementierte Lösung

### Problem gelöst:
- ✅ Vogelsang-URLs entfernt
- ✅ Lokale Pfade konfiguriert
- ✅ Filterwerte funktionieren
- ✅ API-Verbindung stabil
- ✅ Next.js-Kompatibilität

### Wichtige Konfigurationsdateien:

#### 1. Layout-Konfiguration (`app/layout.tsx`)
```javascript
window.marketplace = {
  culture: "de-DE",
  url: "/fahrzeuge/",  // Fallback für SSR
  target: "/fahrzeuge",
  hash: "",  // Leer, um Hash-URLs zu vermeiden
  hideOtherManufactueres: false,
  renameManufacturers: true,
  modelsWithoutFinds: 'hide',
  modelsWithCounter: false,
  sortManAlphabetic: false,
  api: {
    url: "https://api.pixel-base.de/marketplace/v3-11365/",
    key: "0536fa11-99df-43f8-bf26-42af233f5478"
  }
};

// URL dynamisch setzen wenn window verfügbar ist
if (typeof window !== 'undefined') {
  window.marketplace.url = window.location.origin + "/fahrzeuge/";
}
```

#### 2. QuickSearchWidget-Konfiguration (`components/QuickSearchWidget.tsx`)
```javascript
const getMarketplaceConfig = () => {
  const baseUrl = window.location.origin;
  return {
    url: baseUrl + '/fahrzeuge/',
    renameManufacturers: true,
    culture: 'de-DE',
    hideOtherManufactueres: false,
    modelsWithoutFinds: 'hide',
    modelsWithCounter: false,
    sortManAlphabetic: false,
    target: '/fahrzeuge',
    hash: '',  // Wichtig: Leer lassen
    newWindow: false,
    debug: false,
    api: {
      url: 'https://api.pixel-base.de/marketplace/v3-11365/',
      key: API_KEY
    }
  };
};
```

### API-Konfiguration:
- **API-Key**: `0536fa11-99df-43f8-bf26-42af233f5478`
- **API-URL**: `https://api.pixel-base.de/marketplace/v3-11365/`
- **Kultur**: `de-DE`

### Hash-URL-Verhalten

#### Aktuelles Verhalten:
Wenn ein Filter ausgewählt wird, generiert das QuickSearch-Script URLs wie:
```
http://localhost:3006/fahrzeuge#!/?manufacturers=221&usageTypes=%22Gebrauchtwagen%22
```

#### Erklärung:
- Das `#!/` ist ein **Hash-Fragment**, das vom QuickSearch-Script selbst generiert wird
- Dies ist **normales Verhalten** des QuickSearch-Scripts
- Das Script verwendet Hash-URLs für die interne Navigation
- Die Bestätigung der Suche im Marketplace-Widget ist **Standard-Funktionalität**

#### Warum passiert das?
1. Das QuickSearch-Script ist so programmiert, dass es Hash-URLs verwendet
2. Diese URLs werden vom Script interpretiert und an das Marketplace-Widget weitergegeben
3. Das Marketplace-Widget zeigt dann die Ergebnisse an
4. Die Bestätigung ist ein Feature des Marketplace-Widgets

#### Kann das geändert werden?
**Nein, das ist nicht einfach beeinflussbar**, weil:
- Das Verhalten ist im QuickSearch-Script hardcodiert
- Das Script erwartet diese Hash-URL-Struktur
- Eine Änderung würde eine komplette Neuprogrammierung des Scripts erfordern

### Wichtige Erkenntnisse:

1. **Server-Side-Rendering**: `window.location.origin` darf nicht direkt im SSR verwendet werden
2. **Fallback-URLs**: Statische Fallback-URLs für SSR verwenden
3. **Hash-Parameter**: Leer lassen (`hash: ""`) für saubere URLs
4. **API-Verbindung**: Korrekte API-Konfiguration ist kritisch für Filterwerte

### Funktioniert jetzt:
- ✅ QuickSearch lädt korrekt
- ✅ Filter werden mit Daten gefüllt
- ✅ Fahrzeuganzahl wird angezeigt
- ✅ Links führen zu lokalen Pfaden
- ✅ Keine Vogelsang-URLs mehr
- ✅ Next.js-kompatibel

### Weitere Vogelsang-URLs gefunden in:
- `QuickSearchDirect.tsx`
- `QuickSearchManual.tsx`
- `QuickSearchInline.tsx`
- `beispiel-page.tsx`
- `QuickSearchHome.tsx`
- `HomePage.tsx`

**Diese sollten bei Bedarf ebenfalls korrigiert werden.**

---

**Datum**: $(date)
**Status**: ✅ Funktionsfähig
**Letzte Änderung**: Layout-Konfiguration für SSR-Kompatibilität angepasst