import { useEffect } from 'react'
import { I18nextProvider } from 'react-i18next'
import { useAppSelector } from '@state/store'
import i18n, { setAppLanguage } from './index'

const LanguageFromPreferences = () => {
  const language = useAppSelector(
    (state) => state.user?.data?.frontendPreferences?.language as string | undefined,
  )

  useEffect(() => {
    if (!language) return
    if (language === i18n.language || i18n.language?.startsWith(`${language}-`)) return
    void setAppLanguage(language)
  }, [language])

  return null
}

type I18nProviderProps = {
  children: React.ReactNode
}

/**
 * Host i18n provider. Must wrap App (including login) and sit inside Redux
 * so language can sync from frontendPreferences.
 */
const I18nProvider = ({ children }: I18nProviderProps) => (
  <I18nextProvider i18n={i18n}>
    <LanguageFromPreferences />
    {children}
  </I18nextProvider>
)

export default I18nProvider
