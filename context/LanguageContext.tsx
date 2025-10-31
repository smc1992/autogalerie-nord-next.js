"use client";

import React, { createContext, useContext, useMemo } from "react";
import dictionaries, { type DictionaryTop } from "../i18n/dictionaries";

type LanguageContextValue = {
  lang: string;
  dict: DictionaryTop;
};

const LanguageContext = createContext<LanguageContextValue>({
  lang: "de",
  dict: dictionaries.de,
});

export function LanguageProvider({
  children,
  lang = "de",
  dict,
}: {
  children: React.ReactNode;
  lang?: string;
  dict?: DictionaryTop;
}) {
  const value = useMemo<LanguageContextValue>(() => {
    const defaultDict = (dictionaries as any)[lang] ?? dictionaries.de;
    return {
      lang,
      dict: dict ?? defaultDict,
    };
  }, [lang, dict]);

  return (
    <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>
  );
}

export function useLanguage() {
  return useContext(LanguageContext);
}

export default LanguageContext;