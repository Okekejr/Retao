import { getLocales } from "expo-localization";
import { I18n } from "i18n-js";
import en from "./locales/en";
import es from "./locales/es";

const i18n = new I18n();

i18n.translations = {
  en,
  es,
};

const locales = getLocales();
const best = locales.find(
  (l) => l.languageCode && ["en", "es"].includes(l.languageCode)
);
i18n.locale = best?.languageCode ?? "en";
i18n.enableFallback = true;

export default i18n;
