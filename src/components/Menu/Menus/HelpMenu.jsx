import React from 'react'
import Menu from '../MenuComponents/Menu'
import { useTranslation } from 'react-i18next'
import "@/i18n/config"
export const HelpMenu = ({ user, ...props }) => {
  const {t} = useTranslation()
  const isUser = user.data.isUser

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
    {
      id: 'bug',
      label: t("Report a Bug"),
      link: 'https://github.com/ynput/ayon-frontend/issues/new',
      icon: 'bug_report',
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
