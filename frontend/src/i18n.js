import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";
import en from "../src/locales/en.json";
import ar from "../src/locales/ar.json";

i18n.use(LanguageDetector).use(initReactI18next).init({

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
        UserGallery: en.UserGallery,
        about: en.about,
        uploadComponent: en.uploadComponent,
        galleryScreen: en.galleryScreen,
        emailVerificationBanner: en.emailVerificationBanner,
        footer: en.footer,
        registerScreen: en.registerScreen,
        loginScreen: en.loginScreen,
        userProfileScreen: en.userProfileScreen,
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
        UserGallery: ar.UserGallery,
        about: ar.about,
        uploadComponent: ar.uploadComponent,
        galleryScreen: ar.galleryScreen,
        emailVerificationBanner: ar.emailVerificationBanner,
        footer: ar.footer,
        registerScreen: ar.registerScreen,
        loginScreen: ar.loginScreen,
        userProfileScreen: ar.userProfileScreen,
        // ...
      },
    },
    lng: "en",
    fallbackLng: "en",
    interpolation: {
      escapeValue: false,
    },

  });



export default i18n;
