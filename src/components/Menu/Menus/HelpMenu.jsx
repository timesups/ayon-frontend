import React from 'react'
import Menu from '../MenuComponents/Menu'
import { useFeedback } from '@/feedback/FeedbackContext'

import { useTranslation } from 'react-i18next'


export const HelpMenu = ({ user, ...props }) => {
  //translation
  const {t} = useTranslation()

  const isUser = user.data.isUser
  const { openChangelog, openFeedback, openPortal, loaded } = useFeedback()

  const items = [
    {
      id: 'documentation',
      label: t("Documentation"),
      link: 'https://ayon.ynput.io/',
      icon: 'description',
      target: '_blank',
    },
    {
      id: 'forum',
      label: t("Community Forum"),
      link: 'https://community.ynput.io/',
      icon: 'forum',
      target: '_blank',
    },
    { id: 'divider' },
    {
      id: 'api',
      label: t("REST API"),
      link: '/doc/api',
      icon: 'api',
      target: '_blank',
    },
    {
      id: 'graphql',
      label: t("GraphQL Explorer"),
      link: '/explorer',
      icon: 'hub',
      target: '_blank',
    },
  ]

  const feedback = [
    {
      id: 'help',
      label: t("Help center"),
      onClick: () => openPortal('HelpView'),
      icon: 'help',
    },
    {
      id: 'feedback',
      label: t("Submit Feedback"),
      onClick: openFeedback,
      icon: 'feedback',
    },
    {
      id: 'changelog',
      label: t("Latest changes"),
      link: 'https://feedback.ayon.app/changelog',
      icon: 'track_changes',
      target: '_blank',
    },
    {
      id: 'changelog',
      label: t("Upcoming features"),
      onClick: () => openPortal('RoadmapView'),
      icon: 'construction',
    },
    { id: 'divider' },
  ]

  if (loaded) items.unshift(...feedback)

  const managers = [
    {
      id: 'divider',
    },
    {
      id: 'support',
      label: t("Get Support"),
      link: 'https://ynput.io/services',
      icon: 'support_agent',
      target: '_blank',
    },
  ]

  if (!isUser) items.push(...managers)

  return <Menu menu={items} {...props} />
}

export default HelpMenu
