import { useMemo, useEffect, lazy } from 'react'
import { Navigate, useParams } from 'react-router-dom'
import { useGetSettingsAddonsQuery } from '@queries/addons/getAddons'

import SettingsAddon from './SettingsAddon'
import AppNavLinks from '@containers/header/AppNavLinks'
import { useSelector } from 'react-redux'
import { useTranslation } from 'react-i18next'
import "@/i18n/config"

const AnatomyPresets = lazy(() => import('./AnatomyPresets/AnatomyPresets'))
const Bundles = lazy(() => import('./Bundles'))
const StudioSettings = lazy(() => import('./StudioSettings'))
const SiteSettings = lazy(() => import('./SiteSettings'))
const UsersSettings = lazy(() => import('./UsersSettings'))
const AccessGroups = lazy(() => import('./AccessGroups'))
const Attributes = lazy(() => import('./Attributes'))
const Secrets = lazy(() => import('./Secrets'))
const AddonsManager = lazy(() => import('./AddonsManager'))

const SettingsPage = () => {
  const {t} = useTranslation()
  const { module, addonName } = useParams()
  const isManager = useSelector((state) => state.user.data.isManager)

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
      default:
        return <Navigate to="/settings" />
    }
  }, [module, addonName, addonsData, isManager])

  const links = useMemo(() => {
      const adminExtras = [
        {
        name: t("Addons"),
        path: '/settings/addons',
        module: 'addons',
        accessLevels: ['manager'],
      },

      {
        name: t("Bundles"),
        path: '/settings/bundles',
        module: 'bundles',
        accessLevels: ['manager'],
        shortcut: 'B+B',
      },
    ]

    let result = [
      {
        name: t("Studio settings"),
        path: '/settings/studio',
        module: 'studio',
        accessLevels: ['manager'],
        shortcut: 'S+S',
      },
      {
        name: t("Site settings"),
        path: '/settings/site',
        module: 'site',
        accessLevels: [],
      },
      {
        name: t("Anatomy presets"),
        path: '/settings/anatomyPresets',
        module: 'anatomyPresets',
        accessLevels: ['manager'],
      },
      {
        name: t("Attributes"),
        path: '/settings/attributes',
        module: 'attributes',
        accessLevels: ['manager'],
      },
      {
        name: t("Users"),
        path: '/settings/users',
        module: 'users',
        accessLevels: ['manager'],
        shortcut: 'U+U',
      },
      {
        name: t("Permissions"),
        path: '/settings/accessGroups',
        module: 'accessGroups',
        accessLevels: ['manager'],
      },
      {
        name: t("Secrets"),
        path: '/settings/secrets',
        module: 'secrets',
        accessLevels: ['manager'],
      },
    ]
    if (!isManager) {
      result = [...adminExtras, ...result];
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

    return result
  }, [addonsData, isManager])

  return (
    <>
      <AppNavLinks links={links} />
      {moduleComponent}
    </>
  )
}

export default SettingsPage
