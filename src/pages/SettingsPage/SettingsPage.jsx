import { useMemo, useEffect, lazy } from 'react'
import { useTranslation } from 'react-i18next'
import { Navigate, useParams } from 'react-router-dom'
import { useGetSettingsAddonsQuery } from '@shared/api'

import SettingsAddon from './SettingsAddon'
import AppNavLinks from '@containers/header/AppNavLinks'
import { useSelector } from 'react-redux'
import DocumentTitle from '@components/DocumentTitle/DocumentTitle'
import useTitle from '@hooks/useTitle'
import HelpButton from '@components/HelpButton/HelpButton'
import { useGlobalContext } from '@shared/context'

const AnatomyPresets = lazy(() => import('./AnatomyPresets/AnatomyPresets'))
const Bundles = lazy(() => import('./Bundles'))
const StudioSettings = lazy(() => import('./StudioSettings'))
const SiteSettings = lazy(() => import('./SiteSettings'))
const UsersSettings = lazy(() => import('./UsersSettings'))
const AccessGroups = lazy(() => import('./AccessGroups'))
const Attributes = lazy(() => import('./Attributes'))
const Secrets = lazy(() => import('./Secrets'))
const AddonsManager = lazy(() => import('./AddonsManager'))
const ServerConfig = lazy(() => import('./ServerConfig/ServerConfig'))

const SettingsPage = () => {
  const { t } = useTranslation('nav')
  const { module, addonName } = useParams()
  const { user } = useGlobalContext()
  const { uiExposureLevel: level = 0 } = user || {}
  const isManager = level === 700

  const {
    data: addonsData,
    //isLoading: addonsLoading,
    //isError: addonsIsError,
  } = useGetSettingsAddonsQuery({})

  useEffect(() => {
    //document.title = 'Settings'
    return () => {
      //console.log('unmounting settings page')
    }
  }, [])

  const moduleComponent = useMemo(() => {
    if (addonName) {
      for (const addon of addonsData || []) {
        if (addon.name === addonName) {
          return (
            <SettingsAddon
              addonName={addonName}
              addonVersion={addon.version}
              sidebar={addon.settings.sidebar}
            />
          )
        }
      }
    }

    // Managers don't have access to addons nor bundles, redirecting to root if attempting to access the routes directly
    switch (module) {
      case 'addons':
        if (isManager) return <Navigate to="/" />
        return <AddonsManager />
      case 'bundles':
        if (isManager) return <Navigate to="/" />
        return <Bundles />
      case 'anatomyPresets':
        return <AnatomyPresets />
      case 'studio':
        return <StudioSettings />
      case 'site':
        return <SiteSettings />
      case 'users':
        return <UsersSettings />
      case 'accessGroups':
        return <AccessGroups canCreateOrDelete />
      case 'attributes':
        return <Attributes />
      case 'secrets':
        return <Secrets />
      case 'server':
        return <ServerConfig />
      default:
        return <Navigate to="/settings" />
    }
  }, [module, addonName, addonsData, isManager])

  const links = useMemo(() => {
    const adminExtras = [
      {
        name: t('settings.global'),
        path: '/settings/server',
        module: 'server',
        accessLevels: ['admin'],
      },
      {
        name: t('settings.addons'),
        path: '/settings/addons',
        module: 'addons',
        accessLevels: ['manager'],
      },
      {
        name: t('settings.bundles'),
        path: '/settings/bundles',
        module: 'bundles',
        accessLevels: ['manager'],
        shortcut: 'B+B',
      },
    ]

    let result = [
      {
        name: t('settings.studioSettings'),
        path: '/settings/studio',
        module: 'studio',
        accessLevels: ['manager'],
        shortcut: 'S+S',
      },
      {
        name: t('settings.siteSettings'),
        path: '/settings/site',
        module: 'site',
        accessLevels: [],
      },
      {
        name: t('settings.anatomyPresets'),
        path: '/settings/anatomyPresets',
        module: 'anatomyPresets',
        accessLevels: ['manager'],
      },
      {
        name: t('settings.attributes'),
        path: '/settings/attributes',
        module: 'attributes',
        accessLevels: ['manager'],
      },
      {
        name: t('settings.users'),
        path: '/settings/users',
        module: 'users',
        accessLevels: ['manager'],
        shortcut: 'U+U',
      },
      {
        name: t('settings.permissions'),
        path: '/settings/accessGroups',
        module: 'accessGroups',
        accessLevels: ['manager'],
      },
      {
        name: t('settings.secrets'),
        path: '/settings/secrets',
        module: 'secrets',
        accessLevels: ['manager'],
      },
    ]
    if (!isManager) {
      result = [...adminExtras, ...result]
    }

    if (!addonsData) return result

    for (const addon of addonsData) {
      result.push({
        name: addon.title,
        path: `/settings/addon/${addon.name}`,
        module: addon.name,
        accessLevels: ['manager'],
      })
    }
    result.push({ node: 'spacer' })

    const addonTitle =
      addonName && addonsData
        ? addonsData.find((addon) => addon.name === addonName)?.title
        : undefined

    result.push({
      node: <HelpButton module={addonName || module} pageName={addonTitle} />,
    })
    return result
  }, [addonsData, isManager, t, addonName, module])

  const title = useTitle(addonName || module, links, '', '')
  const studioSettingsLabel = t('settings.studioSettings')
  const revertedTitle =
    title === studioSettingsLabel ? title : title + ' • ' + studioSettingsLabel
  return (
    <>
      <DocumentTitle title={revertedTitle} />
      <AppNavLinks links={links} />
      {moduleComponent}
    </>
  )
}

export default SettingsPage
