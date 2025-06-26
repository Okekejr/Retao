import i18n from "@/localization/i18n";
import { getLocales } from "expo-localization";
import * as SecureStore from "expo-secure-store";
import React, { createContext, useContext, useEffect, useState } from "react";

type LanguageCode = "en" | "es";

interface LanguageContextType {
  language: LanguageCode;
  setLanguage: (lang: LanguageCode) => void;
  availableLanguages: LanguageCode[];
  getLanguageName: (lang: LanguageCode) => string;
}

const LanguageContext = createContext<LanguageContextType | null>(null);

const STORAGE_KEY = "app-language";

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [language, setLanguageState] = useState<LanguageCode>("en");

  const setLanguage = async (lang: LanguageCode) => {
    i18n.locale = lang;
    setLanguageState(lang);
    await SecureStore.setItemAsync(STORAGE_KEY, lang);
  };

  const getLanguageName = (lang: LanguageCode) => {
    switch (lang) {
      case "en":
        return "English";
      case "es":
        return "Español";
      default:
        return lang;
    }
  };

  const loadLanguage = async () => {
    const storedLang = await SecureStore.getItemAsync(STORAGE_KEY);

    const locales = getLocales();
    const best = locales.find(
      (l) => l.languageCode && ["en", "es"].includes(l.languageCode)
    );
    const deviceLang = (best?.languageCode as LanguageCode) ?? "en";

    const langToUse = (storedLang as LanguageCode) || deviceLang;

    i18n.locale = langToUse;
    setLanguageState(langToUse);
  };

  useEffect(() => {
    loadLanguage();
  }, []);

  return (
    <LanguageContext.Provider
      value={{
        language,
        setLanguage,
        availableLanguages: ["en", "es"],
        getLanguageName,
      }}
    >
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const ctx = useContext(LanguageContext);
  if (!ctx) throw new Error("useLanguage must be used inside LanguageProvider");
  return ctx;
};
