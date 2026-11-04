import { useTranslation } from 'react-i18next'
import UserMenuHeader from './UserMenuHeader'
import { Menu } from '@shared/components'
import { useLogoutMutation } from '@queries/auth/logout'

export const UserMenu = ({ user, ...props }) => {
  const { t } = useTranslation('nav')
  const fullName = user?.attrib?.fullName
  // const isUser = user?.data?.isUser

  // sign out
  const [logout] = useLogoutMutation()

  const handleLogOut = () => {
    // onClose && onClose()
    logout()
  }

  const items = []
  if (!user.data.isGuest) {
    items.push({
      id: 'account',
      link: '/account/profile',
      label: t('account'),
      icon: 'person',
    })
    items.push({
      id: 'downloads',
      link: '/account/downloads',
      label: t('downloadLauncher'),
      icon: 'install_desktop',
    })
    items.push({ id: 'divider' })
  }

  items.push({
    id: 'signOut',
    label: t('signOut'),
    icon: 'logout',
    onClick: handleLogOut,
  })

  return (
    <>
      <Menu menu={items} header={<UserMenuHeader user={user} fullName={fullName} />} {...props} />
    </>
  )
}

export default UserMenu
