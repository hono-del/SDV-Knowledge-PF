import { ja } from '../locales/ja';
import { en } from '../locales/en';
import type { LocaleKey } from '../locales/ja';
import type { Language } from '../types';

export function t(key: LocaleKey, lang: Language): string {
  const dict = lang === 'ja' ? ja : en;
  return dict[key] || key;
}

export function useLocale(lang: Language) {
  return (key: LocaleKey) => t(key, lang);
}
