import { useAddonSearchContext } from '@pages/SettingsPage/Bundles/context/addon-search'
import * as Styled from './Bundles.styled'
import { useTranslation } from 'react-i18next'

export const AddonSearchInput = () => {
  const { t } = useTranslation('settings')
  const { search, onSearchChange } = useAddonSearchContext()

  return (
    <Styled.StyledInput
      value={search}
      onChange={onSearchChange}
      placeholder={t('searchAddons')}
      aria-label={t('searchAddons')}
    />
  )
}
