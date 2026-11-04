import React from 'react'
import { useTranslation } from 'react-i18next'
import { Menu } from '@shared/components'
import { useFeedback } from '@shared/components'

export const HelpMenu = ({ user, ...props }) => {
  const { t } = useTranslation('nav')
  const { openSupport, openFeedback, openPortal, loaded } = useFeedback()

  const help = [
    {
      id: 'forum',
      label: t('help.communityForum'),
      link: 'https://community.ynput.io/',
      icon: 'forum',
      target: '_blank',
    },
    {
      id: 'discord',
      label: t('help.discordServer'),
      link: 'https://discord.gg/ynput',
      img: '/Discord-Symbol-White.svg',
      target: '_blank',
    },
    { id: 'divider' },
    {
      id: 'documentation',
      label: t('help.devPortal'),
      link: 'https://docs.ayon.dev/',
      icon: 'code',
      target: '_blank',
    },
    {
      id: 'api',
      label: t('help.restApi'),
      link: '/doc/api',
      icon: 'api',
      target: '_blank',
    },
    {
      id: 'graphql',
      label: t('help.graphqlExplorer'),
      link: '/explorer',
      icon: 'hub',
      target: '_blank',
    },
  ]

  const feedback = [
    {
      id: 'help',
      label: t('help.helpCenter'),
      icon: 'help',
      onClick: () => openPortal('MainView'),
    },
    {
      id: 'changelog',
      label: t('help.latestChanges'),
      icon: 'track_changes',
      onClick: () => openSupport('Changelog'),
    },
    {
      id: 'feedback',
      label: t('help.submitFeedback'),
      icon: 'feedback',
      onClick: () => openFeedback(),
    },
  ]

  if (loaded) help.unshift(...[...feedback, { id: 'divider' }])

  const items = user.uiExposureLevel >= 500 ? help : feedback

  return <Menu menu={items} {...props} />
}

export default HelpMenu
