// i18n.js
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

const resources = {
  en: {
    translation: {
      "Sound": "Sound",
      "Language": "Language",
      "ON": "ON",
      "OFF": "OFF",
    }
  },
  de: {
    translation: {
      "Sound": "Ton",
      "Language": "Sprache",
      "ON": "Ein",
      "OFF": "Aus",
    }
  },
  es: {
    translation: {
      "Sound": "Sonido",
      "Language": "Idioma",
      "ON": "Encendido",
      "OFF": "Apagado",
    }
  }
};

i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: "en", // default language
    fallbackLng: "en",
    interpolation: {
      escapeValue: false
    }
  });

export default i18n;
