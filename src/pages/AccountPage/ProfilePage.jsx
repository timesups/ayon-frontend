import { useEffect, useState } from 'react'
import { toast } from 'react-toastify'
import { useTranslation } from 'react-i18next'
import {
  FormRow,
  Section,
  Panel,
  LockedInput,
  SaveButton,
  InputText,
  InputSwitch,
  Dropdown,
} from '@ynput/ayon-react-components'
import { useUpdateUserMutation, useSetFrontendPreferencesMutation } from '@shared/api'
import Avatar from '@components/Avatar/Avatar'
import styled from 'styled-components'
import UserAttribForm from '../SettingsPage/UsersSettings/UserAttribForm'
import SetPasswordDialog from '../SettingsPage/UsersSettings/SetPasswordDialog'
import ayonClient from '../../ayon'
import Type from '@/theme/typography.module.css'
import { getRequestErrorString } from '@shared/util'
import { updateUserAttribs, updateUserPreferences } from '@state/user'
import { useDispatch } from 'react-redux'
import { useNotifications } from '@context'
import clsx from 'clsx'
import { AvatarName } from './ProfilePage.styled'
import i18n, { SUPPORTED_LANGUAGES, setAppLanguage } from '@/i18n'

const FormsStyled = styled.section`
  flex: 1;
  overflow-x: clip;
  overflow-y: auto;
  gap: var(--base-gap-small);
  display: flex;
  flex-direction: column;
  max-width: 600px;

  & > *:last-child {
    /* flex: 1; */
  }

  .label {
    min-width: 170px;
  }
`

const ProfilePage = ({ user = {}, isLoading }) => {
  const dispatch = useDispatch()
  const { t } = useTranslation('account')
  const attributes = ayonClient.getAttribsByScope('user')
  const [showSetPassword, setShowSetPassword] = useState(false)

  // UPDATE USER DATA
  const [updateUser, { isLoading: isUpdatingUser }] = useUpdateUserMutation()

  // build initial form data
  const initialFormData = {}
  attributes.forEach((attrib) => {
    initialFormData[attrib.name] = ''
  })

  const [name, setName] = useState('')
  const [password] = useState('randompasswor')
  const [initData, setInitData] = useState(initialFormData)
  const [formData, setFormData] = useState(initialFormData)
  const [changesMade, setChangesMade] = useState(false)
  const userName = user?.attrib?.fullName || user?.name

  // once user data is loaded, set form data
  useEffect(() => {
    if (user && !isLoading) {
      const { attrib } = user

      const newFormData = {}
      attributes.forEach((att) => {
        newFormData[att.name] = attrib[att.name] || ''
      })

      setFormData(newFormData)
      // used to reset form
      setInitData(newFormData)

      // // set name
      setName(user.name)
    }

    return () => {
      // reset forms
      setFormData(initialFormData)
      setName('')
    }
  }, [isLoading, user])

  // look for changes when formData changes
  useEffect(() => {
    const isDiff = JSON.stringify(formData) !== JSON.stringify(initData)

    if (isDiff) {
      if (!changesMade) setChangesMade(true)
    } else {
      setChangesMade(false)
    }
  }, [formData, initData])

  const onSave = async () => {
    const trimmedFormData = Object.fromEntries(
      Object.entries(formData).map(([key, value]) => [
        key,
        typeof value === 'string' ? value.trim() : value,
      ]),
    )
    const attrib = {
      ...user.attrib,
      ...trimmedFormData,
      developerMode: !!user.attrib.developerMode,
    }

    try {
      await updateUser({
        name: user.name,
        patch: {
          attrib,
        },
      }).unwrap()

      // update redux state with new data
      dispatch(updateUserAttribs(formData))
      // reset form
      setInitData(formData)
      setChangesMade(false)
      toast.success(t('profileUpdated'))
    } catch (error) {
      console.log(error)
      toast.error(t('unableToUpdateProfile'))
      toast.error(getRequestErrorString(error))
    }
  }

  // USER PREFERENCES
  const [updatePreferences, { isLoading: isUpdatingPreferences }] =
    useSetFrontendPreferencesMutation()

  const initPreferences = {
    notifications: false,
    notificationSound: false,
    language: i18n.language?.startsWith('zh') ? 'zh-Hans' : 'en',
  }
  const [initPreferencesData, setInitPreferencesData] = useState(initPreferences)
  const [preferencesData, setPreferencesData] = useState(initPreferences)
  const [preferenceChanges, setPreferenceChanges] = useState(false)

  // once user data is loaded, set form data
  useEffect(() => {
    if (user && !isLoading) {
      const { data = {} } = user
      const language =
        data.frontendPreferences?.language ||
        (i18n.language?.startsWith('zh') ? 'zh-Hans' : 'en')

      const newPreferencesData = {
        notifications: data.frontendPreferences?.notifications,
        notificationSound: data.frontendPreferences?.notificationSound,
        language,
      }

      setPreferencesData(newPreferencesData)
      // used to reset form and detect changes
      setInitPreferencesData(newPreferencesData)
    }

    return () => {
      // reset forms
      setInitPreferencesData(initPreferences)
      setPreferencesData(initPreferences)
    }
  }, [isLoading, user])

  // look for changes when preferencesData changes
  useEffect(() => {
    const isDiff = JSON.stringify(preferencesData) !== JSON.stringify(initPreferencesData)

    if (isDiff) {
      if (!preferenceChanges) setPreferenceChanges(true)
    } else {
      setPreferenceChanges(false)
    }
  }, [preferencesData, initPreferencesData])

  const { sendNotification } = useNotifications()

  const onSavePreferences = async () => {
    setPreferenceChanges(false)
    try {
      await updatePreferences({
        userName: user.name,
        patchData: preferencesData,
      }).unwrap()

      dispatch(updateUserPreferences(preferencesData))
      // reset form
      setInitPreferencesData(preferencesData)

      // if the user has enabled notifications for the first time, ask for permission
      if (preferencesData.notifications && Notification.permission !== 'granted') {
        const granted = await sendNotification({
          title: 'Notifications already enabled 💪',
          link: '/account/profile',
        })

        if (!granted) {
          // something went wrong, undo the change to turn notifications off
          await updatePreferences({
            userName: user.name,
            patchData: { notifications: false },
          }).unwrap()
        }
      }
    } catch (error) {
      toast.error(t('unableToUpdatePreferences'))
    }
  }

  const handleChangePreferences = (e) => {
    const { id, checked } = e.target

    setPreferencesData({
      ...preferencesData,
      [id]: checked,
    })
  }

  const handleLanguageChange = async (values) => {
    const language = values?.[0]
    if (!language) return

    setPreferencesData((prev) => ({ ...prev, language }))
    await setAppLanguage(language)

    try {
      await updatePreferences({
        userName: user.name,
        patchData: { language },
      }).unwrap()
      dispatch(updateUserPreferences({ language }))
      setInitPreferencesData((prev) => ({ ...prev, language }))
      setPreferenceChanges(false)
    } catch (error) {
      toast.error(t('unableToUpdatePreferences'))
    }
  }

  const handleSaveAll = async () => {
    if (changesMade) await onSave()
    if (preferenceChanges) await onSavePreferences()
  }

  const notificationsDisabled =
    window.location.protocol !== 'https:' && window.location.hostname !== 'localhost' // disable if not on HTTPS or localhost
  const notificationsTooltip = notificationsDisabled
    ? t('notificationsHttpsOnly')
    : t('notificationsTooltip')

  return (
    <main>
      <Section style={{ paddingTop: 16 }}>
        <FormsStyled>
          <Avatar user={user} />
          <AvatarName className={clsx({ loading: !userName || isLoading }, 'shimmer-lightest')}>
            <span className={Type.headlineMedium}>
              {userName ? userName : t('userFullNamePlaceholder')}
            </span>
          </AvatarName>
          <Panel style={{ background: 'none' }}>
            <FormRow label={t('username')} key="Username">
              <InputText value={name} disabled />
            </FormRow>
            <UserAttribForm
              formData={formData}
              setFormData={setFormData}
              attributes={attributes}
              showAvatarUrl={false}
            />

            {!user?.data?.disablePasswordLogin && (
              <FormRow label={t('password')} key="Password">
                <LockedInput
                  label={t('password')}
                  value={password}
                  type="password"
                  onEdit={() => setShowSetPassword(true)}
                />
              </FormRow>
            )}

            <FormRow label={t('language')} key="language">
              <Dropdown
                value={preferencesData.language ? [preferencesData.language] : ['en']}
                options={[...SUPPORTED_LANGUAGES]}
                onChange={handleLanguageChange}
                disabled={isUpdatingPreferences || isLoading}
                style={{ flexGrow: 1 }}
              />
            </FormRow>

            <FormRow label={t('desktopNotifications')} key="notifications">
              <div data-tooltip={notificationsTooltip} style={{ width: 'fit-content' }}>
                <InputSwitch
                  checked={preferencesData.notifications}
                  id={'notifications'}
                  onChange={handleChangePreferences}
                  disabled={isUpdatingPreferences || isLoading || notificationsDisabled}
                />
              </div>
            </FormRow>

            <FormRow label={t('notificationSound')} key="notificationSound">
              <div data-tooltip={t('notificationSoundTooltip')} style={{ width: 'fit-content' }}>
                <InputSwitch
                  checked={preferencesData.notificationSound}
                  id={'notificationSound'}
                  onChange={handleChangePreferences}
                  disabled={isUpdatingPreferences || isLoading}
                />
              </div>
            </FormRow>

            <SaveButton
              onClick={handleSaveAll}
              label={t('saveProfile')}
              active={changesMade || preferenceChanges}
              saving={isUpdatingUser || isUpdatingPreferences}
              style={{ padding: '6px 18px', marginLeft: 'auto' }}
            />
          </Panel>
        </FormsStyled>
      </Section>
      {showSetPassword && (
        <SetPasswordDialog
          selectedUsers={[user?.name]}
          onHide={() => {
            setShowSetPassword(false)
          }}
          disabled={isLoading}
        />
      )}
    </main>
  )
}

export default ProfilePage
