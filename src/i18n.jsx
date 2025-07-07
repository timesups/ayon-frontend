import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

// 导入语言资源
import zhcn from './locales/zh-ch.json';

// 初始化 i18n
i18n
  .use(initReactI18next) // 将 i18n 传递给 react-i18next
  .init({
    resources: {
      zh: {
        translation: zhcn
      }
    },
    lng: 'zh', // 默认语言
    fallbackLng: 'zh', // 回退语言
    interpolation: {
      escapeValue: false // React 已经转义了值
    }
  });
i18n.changeLanguage("zh")
export default i18n;