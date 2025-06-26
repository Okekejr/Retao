import { TranslationKeys } from "@/types";
import i18n from "./i18n";

type RecursiveKeyOf<TObj extends object> = {
  [TKey in keyof TObj & string]: TObj[TKey] extends object
    ? TObj[TKey] extends Array<any>
      ? TKey
      : `${TKey}.${RecursiveKeyOf<TObj[TKey]>}`
    : TKey;
}[keyof TObj & string];

type TranslationKey = RecursiveKeyOf<TranslationKeys>;

export const t = <K extends TranslationKey>(
  key: K,
  options?: Record<string, any>
): string => i18n.t(key, options);
