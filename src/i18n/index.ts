import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

import enCommon from './locales/en/common.json';
import ptCommon from './locales/pt/common.json';
import enThesis from './locales/en/thesis.json';
import ptThesis from './locales/pt/thesis.json';

const resources = {
  en: {
    common: enCommon,
    thesis: enThesis,
  },
  pt: {
    common: ptCommon,
    thesis: ptThesis,
  },
};

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources,
    fallbackLng: 'en',
    defaultNS: 'common',
    ns: ['common', 'thesis'],
    detection: {
      order: ['path', 'localStorage', 'navigator'],
      lookupFromPathIndex: 0,
      caches: ['localStorage'],
    },
    interpolation: {
      escapeValue: false,
    },
  });

export default i18n;
