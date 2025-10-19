import type { Locale } from '@/lib/i18n-config';

const loaders: Record<string, () => Promise<any>> = {
  en: async () => (await import('../dictionaries/en.json')).default,
  ar: async () => (await import('../dictionaries/ar.json')).default,
  ku: async () => (await import('../dictionaries/ku.json')).default,
};

export const getDictionary = async (locale: Locale | string) => {
  try {
    const loader = loaders[locale] ?? loaders['en'];
    const dict = await loader();
    return dict ?? {};
  } catch (err) {
    if (process.env.NODE_ENV !== 'production') {
      console.warn('[getDictionary] Failed to load dictionary for', locale, err);
    }
    return {};
  }
};
