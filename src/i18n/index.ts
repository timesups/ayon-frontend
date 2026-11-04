import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'
import LanguageDetector from 'i18next-browser-languagedetector'

import enCommon from './locales/en/common.json'
import enAuth from './locales/en/auth.json'
import enNav from './locales/en/nav.json'
import enAccount from './locales/en/account.json'
import enErrors from './locales/en/errors.json'
import enSettings from './locales/en/settings.json'
import enDashboard from './locales/en/dashboard.json'
import enInbox from './locales/en/inbox.json'
import enMarket from './locales/en/market.json'
import enShared from '../../shared/src/i18n/locales/en/shared.json'

import zhCommon from './locales/zh-Hans/common.json'
import zhAuth from './locales/zh-Hans/auth.json'
import zhNav from './locales/zh-Hans/nav.json'
import zhAccount from './locales/zh-Hans/account.json'
import zhErrors from './locales/zh-Hans/errors.json'
import zhSettings from './locales/zh-Hans/settings.json'
import zhDashboard from './locales/zh-Hans/dashboard.json'
import zhInbox from './locales/zh-Hans/inbox.json'
import zhMarket from './locales/zh-Hans/market.json'
import zhShared from '../../shared/src/i18n/locales/zh-Hans/shared.json'

export const LANGUAGE_STORAGE_KEY = 'ayon-language'

export const SUPPORTED_LANGUAGES = [
  { value: 'en', label: 'English' },
  { value: 'zh-Hans', label: '简体中文' },
] as const

export type SupportedLanguage = (typeof SUPPORTED_LANGUAGES)[number]['value']

const resources = {
  en: {
    common: enCommon,
    auth: enAuth,
    nav: enNav,
    account: enAccount,
    errors: enErrors,
    settings: enSettings,
    dashboard: enDashboard,
    inbox: enInbox,
    market: enMarket,
    shared: enShared,
  },
  'zh-Hans': {
    common: zhCommon,
    auth: zhAuth,
    nav: zhNav,
    account: zhAccount,
    errors: zhErrors,
    settings: zhSettings,
    dashboard: zhDashboard,
    inbox: zhInbox,
    market: zhMarket,
    shared: zhShared,
  },
}

if (!i18n.isInitialized) {
  void i18n
    .use(LanguageDetector)
    .use(initReactI18next)
    .init({
      resources,
      fallbackLng: 'en',
      // Keep full codes like zh-Hans. nonExplicitSupportedLngs would strip to "zh"
      // and then reject zh-Hans because only "zh" is checked against supportedLngs.
      supportedLngs: SUPPORTED_LANGUAGES.map((l) => l.value),
      nonExplicitSupportedLngs: false,
      load: 'currentOnly',
      defaultNS: 'common',
      ns: [
        'common',
        'auth',
        'nav',
        'account',
        'errors',
        'settings',
        'dashboard',
        'inbox',
        'market',
        'shared',
      ],
      interpolation: { escapeValue: false },
      detection: {
        order: ['localStorage', 'navigator'],
        lookupLocalStorage: LANGUAGE_STORAGE_KEY,
        caches: ['localStorage'],
        convertDetectedLanguage: (lng) => {
          if (lng.toLowerCase().startsWith('zh')) return 'zh-Hans'
          if (lng.toLowerCase().startsWith('en')) return 'en'
          return lng
        },
      },
    })
}

const syncDocumentLang = (lng: string) => {
  document.documentElement.lang = lng
}

i18n.on('languageChanged', syncDocumentLang)
if (i18n.language) {
  syncDocumentLang(i18n.language)
}

export const setAppLanguage = async (lng: string) => {
  localStorage.setItem(LANGUAGE_STORAGE_KEY, lng)
  syncDocumentLang(lng)
  if (i18n.language !== lng) {
    await i18n.changeLanguage(lng)
  }
}

export default i18n
