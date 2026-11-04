import { useTranslation } from 'react-i18next'
import { Menu } from '@shared/components'
import YnputConnector from '@components/YnputCloud/YnputConnector'
import { useRestartOnBoardingMutation } from '@queries/onBoarding/onBoarding'
import { toast } from 'react-toastify'
import ayonClient from '@/ayon'
import { useRestart } from '@context'
import { useAppDispatch } from '@state/store'
import { toggleReleaseInstaller } from '@state/releaseInstaller'

export const AppMenu = ({ user, ...props }) => {
  const { t } = useTranslation(['nav', 'errors'])
  const dispatch = useAppDispatch()
  // check if user is logged in and is manager or admin
  const isUser = user?.data?.isUser
  const isManager = user?.data?.isManager
  const isAdmin = user?.data?.isAdmin
  const developerMode = user?.attrib.developerMode

  // restart server
  const { confirmRestart, isRestartRequired } = useRestart()

  // onboarding restart
  const [restartOnBoarding] = useRestartOnBoardingMutation()

  const handleBootstrapLaunch = async () => {
    try {
      await restartOnBoarding().unwrap()
      window.location.reload()
    } catch (error) {
      toast.error(t('errors:failedBootstrap'))
    }
  }

  const handleReleaseInstaller = () => {
    // open menu
    dispatch(toggleReleaseInstaller({ open: true }))
  }

  const items = [
    {
      id: 'projectsManager',
      link: '/manageProjects/projectSettings',
      label: t('app.projectsSettings'),
      icon: 'settings_applications',
      shortcut: 'P+P',
    },
  ]

  if (isUser)
    items.unshift({
      id: 'siteSettings',
      link: '/settings/site',
      label: t('app.siteSettings'),
      icon: 'computer',
      shortcut: 'S+S',
    })

  if (!isUser)
    items.unshift({
      id: 'settings',
      link: '/settings/studio',
      label: t('app.studioSettings'),
      icon: 'settings',
      shortcut: 'S+S',
    })

  const managerItems = [
    {
      id: 'events',
      link: '/events',
      label: t('app.eventViewer'),
      icon: 'history',
      shortcut: 'E+E',
    },
    {
      id: 'services',
      link: '/services',
      label: t('app.services'),
      icon: 'home_repair_service',
      shortcut: 'V+V',
    },
  ]

  // add protected items if user is manager or admin
  if (isManager || isAdmin) items.push(...managerItems)

  const adminItems = [
    {
      id: 'divider',
    },
    {
      id: 'market',
      link: '/market',
      label: t('app.market'),
      icon: 'store',
      shortcut: 'M+M',
    },
    {
      id: 'releases',
      label: t('app.updatePipeline'),
      onClick: handleReleaseInstaller,
      icon: 'valve',
    },
    {
      id: 'restart',
      label: isRestartRequired ? t('app.restartRequired') : t('app.restartServer'),
      icon: 'restart_alt',
      onClick: confirmRestart,
      highlighted: isRestartRequired,
      notification: isRestartRequired,
    },
  ]

  // add protected items if user is admin
  if (isAdmin) items.push(...adminItems)

  const developerItems = [
    {
      id: 'divider',
    },
    {
      id: 'onboarding',
      label: t('app.launchBootstrap'),
      onClick: handleBootstrapLaunch,
      icon: 'verified_user',
      isDev: true,
    },
  ]
  // if developer add dev items
  if (developerMode) {
    items.push(...developerItems)
  }

  return (
    <>
      <Menu menu={items} {...props} footer={ayonClient.settings?.version} />
      {isAdmin && (
        <YnputConnector
          redirect={location.pathname + '/appMenu'}
          smallLogo
          darkMode
          showStudioLink
        />
      )}
    </>
  )
}

export default AppMenu
