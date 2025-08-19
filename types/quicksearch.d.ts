interface QuickSearch {
  init: (config: MarketplaceConfig) => void;
  initialized?: boolean;
  destroy?: () => void;
  reset?: () => void;
  update?: () => void;
}

interface JQuery {
  removeClass: (className: string) => JQuery;
  width: () => number;
  scrollTop: (value?: number) => number | JQuery;
  html: (content?: string | JQuery | Element) => string | JQuery;
  unload: (handler: Function) => JQuery;
}

interface MarketplaceConfig {
  url: string;
  target: string;
  culture: string;
  hideOtherManufactueres: boolean;
  renameManufacturers?: boolean;
  modelsWithoutFinds?: string;
  modelsWithCounter?: boolean;
  sortManAlphabetic?: boolean;
  hash?: string;
  api: {
    url: string;
    key: string;
  }
}

interface Window extends globalThis {
  quicksearch: QuickSearch;
  jQuery: JQueryStatic;
  baseUri: string;
  culture: string;
  apikey: string;
  marketplace: MarketplaceConfig;
}
