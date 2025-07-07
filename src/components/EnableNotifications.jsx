import { Button } from '@ynput/ayon-react-components'
import { useNotifications } from '@context/notificationsContext'
import { useSetFrontendPreferencesMutation } from '@queries/user/updateUser'
import { useSelector } from 'react-redux'
import { toast } from 'react-toastify'
import { useState } from 'react'

import { useTranslation } from 'react-i18next'

const EnableNotifications = () => {

  //translation

  const {t} = useTranslation()

  const [hide, setHide] = useState(false)
  const user = useSelector((state) => state.user)
  const { sendNotification } = useNotifications()

  // update user preferences to enable notifications
  const [updatePreferences] = useSetFrontendPreferencesMutation()

  const handleEnable = async () => {
    try {
      const granted = await sendNotification({
        title: 'Notifications already enabled 💪',
        link: '/account/profile',
      })

      if (!granted) return

      await updatePreferences({
        userName: user.name,
        patchData: { notifications: true },
      }).unwrap()

      setHide(true)
    } catch (error) {
      toast.error('Unable to enable notifications. Try again in account/profile.')
    }
  }

  const disabled = window.location.protocol !== 'https:' && window.location.hostname !== 'localhost' // disable if not on HTTPS or localhost
  const tooltip = disabled
    ? t("Browser notifications only work over HTTPS")
    : t("Get notifications on your device")

  return (
    Notification.permission !== 'granted' &&
    !hide && (
      <Button
        icon={'notifications'}
        data-tooltip={tooltip}
        onClick={handleEnable}
        variant="filled"
        disabled={disabled}
      >
        {t("Enable notifications")}
      </Button>
    )
  )
}

export default EnableNotifications
