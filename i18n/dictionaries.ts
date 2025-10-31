export type HomeDictionary = {
  brandsTitle: string;
  reviewsTitle: string;
  reviewsSummary: string;
  reviewsSeeAll: string;
  reviewsPrevAria: string;
  reviewsNextAria: string;
  reviewsCtaTitle: string;
  reviewsCtaSubtitle: string;
  reviewsCtaVehicles: string;
  reviewsCtaContact: string;
  reviewsItems: Array<{
    text: string;
    name: string;
    reviews: string;
    time: string;
  }>;
  trustTitle: string;
  trustFeature1Title: string;
  trustFeature1Desc: string;
  trustFeature2Title: string;
  trustFeature2Desc: string;
  trustFeature3Title: string;
  trustFeature3Desc: string;
};

export type QuickSearchDictionary = {
  searchTitle: string;
  manufacturerLabel: string;
  allManufacturers: string;
  modelLabel: string;
  allModels: string;
  vehiclesSuffix: string;
};

export type DictionaryTop = {
  home: HomeDictionary;
  quicksearch: QuickSearchDictionary;
};

const de: DictionaryTop = {
  home: {
    brandsTitle: "Beliebte Marken",
    reviewsTitle: "Google Bewertungen",
    reviewsSummary: "Durchschnittlich 4,8 von 5 Sternen – basierend auf echten Kundenstimmen",
    reviewsSeeAll: "Alle Bewertungen ansehen",
    reviewsPrevAria: "Vorherige Bewertung",
    reviewsNextAria: "Nächste Bewertung",
    reviewsCtaTitle: "Überzeugen Sie sich selbst",
    reviewsCtaSubtitle: "Jetzt Fahrzeuge entdecken oder direkt Kontakt aufnehmen",
    reviewsCtaVehicles: "Fahrzeuge ansehen",
    reviewsCtaContact: "Kontakt aufnehmen",
    reviewsItems: [
      {
        text: "Super Beratung und sehr freundlicher Service. Fahrzeug war top vorbereitet und der Kauf lief reibungslos.",
        name: "Anna S.",
        reviews: "5 Bewertungen",
        time: "vor 2 Wochen",
      },
      {
        text: "Sehr empfehlenswert! Transparente Kommunikation und faire Preise. Ich komme gerne wieder.",
        name: "Markus T.",
        reviews: "3 Bewertungen",
        time: "vor 1 Monat",
      },
      {
        text: "Professionell und zuverlässig. Mein neues Auto wurde perfekt übergeben – alles wie besprochen.",
        name: "Julia K.",
        reviews: "8 Bewertungen",
        time: "vor 3 Monaten",
      },
    ],
    trustTitle: "Vertrauen & Qualität",
    trustFeature1Title: "Geprüfte Fahrzeuge",
    trustFeature1Desc: "Jedes Fahrzeug wird sorgfältig geprüft und professionell aufbereitet.",
    trustFeature2Title: "Persönliche Beratung",
    trustFeature2Desc: "Ehrliche, transparente Beratung – wir nehmen uns Zeit für Sie.",
    trustFeature3Title: "Faire Finanzierung",
    trustFeature3Desc: "Individuelle Finanzierungsangebote zu fairen Konditionen.",
  },
  quicksearch: {
    searchTitle: "Schnellsuche",
    manufacturerLabel: "Hersteller",
    allManufacturers: "Alle Hersteller",
    modelLabel: "Modell",
    allModels: "Alle Modelle",
    vehiclesSuffix: "Fahrzeuge anzeigen",
  },
};

const dictionaries = { de } as const;

export default dictionaries;