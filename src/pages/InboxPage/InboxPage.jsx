import { useParams } from 'react-router'
import AppNavLinks from '@containers/header/AppNavLinks'
import Inbox from './Inbox/Inbox'
import { useGetInboxUnreadCountQuery } from '@queries/inbox/getInbox'
import { UnreadCount } from './Inbox/Inbox.styled'
import { useTranslation } from 'react-i18next'
import "@/i18n/config"
const InboxPage = () => {
  const {t} = useTranslation()
  const { module } = useParams()

  const { data: importantUnreadCount } = useGetInboxUnreadCountQuery({ important: true })
  const { data: otherUnreadCount } = useGetInboxUnreadCountQuery({ important: false })

  let links = [
    {
      name: t("Important"),
      path: '/inbox/important',
      module: 'important',
      endContent: !!importantUnreadCount && (
        <UnreadCount className={'important'}>
          {importantUnreadCount > 99 ? '99+' : importantUnreadCount}
        </UnreadCount>
      ),
      tooltip: t("Activities where you are directly mentioned"),
      shortcut: 'I+I',
    },
    {
      name: t("Other"),
      path: '/inbox/other',
      module: 'other',
      endContent: !!otherUnreadCount && (
        <UnreadCount>{otherUnreadCount > 99 ? '99+' : otherUnreadCount}</UnreadCount>
      ),
      tooltip: t("Changes to tasks assigned to you or authored by you"),
    },
    {
      name: t("Cleared"),
      path: '/inbox/cleared',
      module: 'cleared',
    },
  ]

  return (
    <>
      <AppNavLinks links={links} />
      <Inbox filter={module} />
    </>
  )
}

export default InboxPage
