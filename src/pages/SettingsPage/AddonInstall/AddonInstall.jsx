// TODO: this is not used anywhere, remove it??

import { useSelector } from 'react-redux'
import { Section } from '@ynput/ayon-react-components'

import AddonUpload from './AddonUpload'

import { useTranslation } from 'react-i18next'
const AddonInstall = () => {

  const {t} = useTranslation()
  const user = useSelector((state) => state.user)

  const abortController = new AbortController()
  const handleClose = () => abortController.abort()

  if (!user?.data?.isAdmin) {
    return (
      <Section style={{ alignItems: 'center', justifyContent: 'center' }}>
        <p style={{ display: 'block', width: 'auto' }}>{t("Only admins can install addons")}</p>
      </Section>
    )
  }

  return (
    <Section style={{ alignItems: 'center', justifyContent: 'center' }}>
      <AddonUpload abortController={abortController} onClose={handleClose} />
    </Section>
  )
}

export default AddonInstall
