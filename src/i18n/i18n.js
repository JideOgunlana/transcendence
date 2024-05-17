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
      "English": "English",
      "German": "German",
      "Spanish": "Spanish"
    }
  },
  de: {
    translation: {
      "Sound": "Ton",
      "Language": "Sprache",
      "ON": "Ein",
      "OFF": "Aus",
      "English": "Englisch",
      "German": "Deutsch",
      "Spanish": "Spanisch"
    }
  },
  es: {
    translation: {
      "Sound": "Sonido",
      "Language": "Idioma",
      "ON": "Encendido",
      "OFF": "Apagado",
      "English": "Inglés",
      "German": "Alemán",
      "Spanish": "Español"
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
