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
      "dashboard": "Dashboard",
      "history": "History",
      "signup": "Signup",
      "experience the fun of gaming": "Experience the fun",
      "of gaming": "of gaming",
      "team": "Team",
      "create user": "Create User",
      "username is already taken": "username is already taken",
      "username must be between 2 to 20 characters": "username must be between 2 to 20 characters",
      "username must not have trailing or leading space": "username must not have trailing or leading space",
      "username should contain only letters / numbers" : "username should contain only letters / numbers",
      "username should start with a letter": "username should start with a letter",
      "username": "Username",
      "email is not valid": "Email is not valid",
      "already have a user": "Already have a user",
      "go to Dashboard": "Go to Dashboard",

    }
  },
  de: {
    translation: {
      "Sound": "Ton",
      "Language": "Sprache",
      "ON": "Ein",
      "OFF": "Aus",
      "dashboard": "Armaturenbrett",
      "history": "Geschiste",
      "signup": "Anmelden",
      "experience the fun of gaming": "Erleben Sie den Spaß",
      "of gaming": "am Gaming",
      "team": "Team",
      "create user": "Benutzer Erstellen",
      "username is already taken": "Benutzername ist bereits vergeben",
      "username must be between 2 to 20 characters": "Der Benutzername muss zwischen 2 und 20 Zeichen lang sein",
      "username must not have trailing or leading space": "Der Benutzername darf keine Leerzeichen am Ende oder am Anfang haben",
      "username should contain only letters / numbers" : "Der Benutzername darf nur Buchstaben/Zahlen enthalten",
      "username should start with a letter": "Der Benutzername muss mit einem Buchstaben beginnen",
      "username": "Nutzername",
      "email": "Email",
      "email is not valid": "Email ist ungültig",
      "already have a user": "Sie haben bereits einen Benutzer",
      "go to Dashboard": "Zum Dashboard",

    }
  },
  es: {
    translation: {
      "Sound": "Sonido",
      "Language": "Idioma",
      "ON": "Encendido",
      "OFF": "Apagado",
      "dashboard": "Panel",
      "history": "Historia",
      "signup": "Registro",
      "experience the fun of gaming": "Experimenta la diversión",
      "of gaming": "de juego",
      "team": "Equipo",
      "create user": "Crear Usuario",
      "username is already taken": "este nombre de usuario ya está tomado",
      "username must be between 2 to 20 characters": "El nombre de usuario debe tener entre 2 y 20 caracteres.",
      "username must not have trailing or leading space": "El nombre de usuario no debe tener espacios al final ni al principio.",
      "username should contain only letters / numbers" : "El nombre de usuario debe contener sólo letras/números.",
      "username should start with a letter": "el nombre de usuario debe comenzar con una letra",
      "username": "Nombre de usuario",
      "email": "Emacorreo electrónicoil",
      "email is not valid": "El correo no es válido",
      "already have a user": "¿Ya tienes un usuario/unsaria",
      "go to Dashboard": "Ir al panel de control",


    }
  },
  ng: {
    translation: {
      "Sound": "Ohun",
      "Language": "Ede",
      "ON": "Tan Ohun",
      "OFF": "Pa Ohun",
      "dashboard": "Dasibodu",
      "history": "Itan",
      "signup": "Forukọsilẹ",
      "experience the fun of gaming": "Ni iriri igbadun naa",
      "of gaming": "ti awọn ere",
      "team": "Ẹgbẹ",
      "create user": "Ṣẹda olumulo",
      "username is already taken": "orukọ olumulo ti wa ni tẹlẹ ya",
      "username must be between 2 to 20 characters": "Orukọ olumulo gbọdọ wa laarin awọn lẹta 2 si 20",
      "username must not have trailing or leading space": "Orukọ olumulo ko gbọdọ ni itọpa tabi aaye asiwaju",
      "username should contain only letters / numbers" : "Orukọ olumulo yẹ ki o ni awọn lẹta / awọn nọmba nikan",
      "username should start with a letter": "orukọ olumulo yẹ ki o bẹrẹ pẹlu lẹta kan",
      "username": "Orukọ olumulo",
      "email": "Emaimeeliil",
      "email is not valid": "Imeeli ko wulo",
      "already have a user": "Ṣe o ti ni olumulo tẹlẹ",
      "go to Dashboard": "Lọ si Dasibodu",


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
