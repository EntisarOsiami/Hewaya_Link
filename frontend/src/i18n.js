import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";
import en from "../src/locales/en.json";
import ar from "../src/locales/ar.json";

i18n
  .use(LanguageDetector)
  .use(initReactI18next)

  .init({
    resources: {
      en: {
        nav: en.nav,
        user: en.user,
        errors: en.errors,
        hero: en.hero,
        carousel: en.carousel,
        portals: en.portals,
        blogList: en.blogList,
        blogScreen: en.blogScreen,
        // ...
      },
      ar: {
        nav: ar.nav, 
        user: ar.user,
        errors: ar.errors,
        hero: ar.hero,
        carousel: ar.carousel,
        portals: ar.portals,
        blogList: ar.blogList,
        blogScreen: ar.blogScreen,
        // ...
      },
    },
    lng: "en",
    fallbackLng: "en",
    interpolation: {
      escapeValue: false,
    },
  });

i18n.on("languageChanged", (lng) => {
  console.log(`Language changed to ${lng}`);
  console.log(i18n.getDataByLanguage(lng));
});

export default i18n;
