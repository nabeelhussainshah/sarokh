import i18n from "i18next";
import React from 'react';
import { initReactI18next } from "react-i18next";
import { arabic } from './arabic';


i18n
    .use(initReactI18next) // passes i18n down to react-i18next
    .init({
        resources: {
            en: {
                translation: {
                    "Welcome to React": "sup"
                }
            },
            sa: {
                translation: arabic
            }
        },
        lng: ["sa", "en"],
        fallbackLng: "en",

        interpolation: {
            escapeValue: false
        }
    });

export default i18n;