import { useParams } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import AppNavLinks from '@containers/header/AppNavLinks'
import Inbox from './Inbox/Inbox'
import { useGetInboxUnreadCountQuery } from '@queries/inbox/getInbox'
import { UnreadCount } from './Inbox/Inbox.styled'
import DocumentTitle from '@components/DocumentTitle/DocumentTitle'
import useTitle from '@hooks/useTitle'
import HelpButton from '@components/HelpButton/HelpButton'
import { WithViews } from '@/hoc/WithViews'
import type { InboxFilter } from './types'
import type { ReactNode } from 'react'

interface InboxLink {
  name?: string
  path?: string
  module?: string
  endContent?: ReactNode
  tooltip?: string
  shortcut?: string
  node?: ReactNode
  viewType?: string
}

// a view type per tab: the filters that suit Important are not the ones you want on Cleared
const getInboxViewType = (module: InboxFilter) => `inbox-${module}`

const InboxPage = () => {
  const { t } = useTranslation('nav')
  const { module } = useParams<{ module: InboxFilter }>()
  const activeModule = module || 'important'

  const { data: importantUnreadCount } = useGetInboxUnreadCountQuery({ important: true })
  const { data: otherUnreadCount } = useGetInboxUnreadCountQuery({ important: false })

  // an empty portal span on an inactive tab would nudge its unread count
  const viewTypeFor = (linkModule: InboxFilter) =>
    linkModule === activeModule ? getInboxViewType(linkModule) : undefined

  const links: InboxLink[] = [
    {
      name: t('inbox.important'),
      path: '/inbox/important',
      module: 'important',
      viewType: viewTypeFor('important'),
      endContent: !!importantUnreadCount && (
        <UnreadCount className={'important'}>
          {importantUnreadCount > 99 ? '99+' : importantUnreadCount}
        </UnreadCount>
      ),
      tooltip: t('inbox.importantTooltip'),
      shortcut: 'I+I',
    },
    {
      name: t('inbox.other'),
      path: '/inbox/other',
      module: 'other',
      viewType: viewTypeFor('other'),
      endContent: !!otherUnreadCount && (
        <UnreadCount>{otherUnreadCount > 99 ? '99+' : otherUnreadCount}</UnreadCount>
      ),
      tooltip: t('inbox.otherTooltip'),
    },
    {
      name: t('inbox.cleared'),
      path: '/inbox/cleared',
      module: 'cleared',
      viewType: viewTypeFor('cleared'),
    },
  ]

  links.push({ node: 'spacer' })
  links.push({
    node: <HelpButton module={`inbox`} />,
  })
  const title = useTitle(activeModule, links, 'AYON', t('inboxTitle'))

  return (
    <>
      <DocumentTitle title={title} />
      {/* @ts-expect-error - InboxLink is compatible but TypeScript doesn't infer it */}
      <AppNavLinks links={links} />
      <WithViews viewType={getInboxViewType(activeModule)}>
        <Inbox filter={activeModule} />
      </WithViews>
    </>
  )
}

export default InboxPage
