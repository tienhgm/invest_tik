import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import vi from 'locales/vi.json';
import en from 'locales/en.json';

// i18n
//   .use(initReactI18next)
//   .use(LanguageDetector)
//   .init({
//     fallbackLng: 'ja',
//     debug: false,
//     interpolation: {
//       escapeValue: false,
//     },
//     resources: {
//       vi: { translation: vi },
//       en: { translation: en },
//       ja: { translation: ja },
//     },
//   });
i18n
  .use(initReactI18next) // passes i18n down to react-i18next
  .use(LanguageDetector)
  .init({
    resources: {
      vi: {translation: vi},
      en: {translation: en}
    },
    // lng: "vi", // language to use, more information here: https://www.i18next.com/overview/configuration-options#languages-namespaces-resources
    // you can use the i18n.changeLanguage function to change the language manually: https://www.i18next.com/overview/api#changelanguage
    // if you're using a language detector, do not define the lng option

    interpolation: {
      escapeValue: false // react already safes from xss
    }
  });