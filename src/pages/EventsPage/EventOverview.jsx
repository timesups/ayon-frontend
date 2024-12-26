import React from 'react'
import { Section, Panel } from '@ynput/ayon-react-components'
import {
  TotalsStyledPanel,
  TotalStyledButton,
} from '@pages/SettingsPage/UsersSettings/UsersOverview'
import EventTile from './EventTile'
import { useTranslation } from 'react-i18next'
import "@/i18n/config"
const EventOverview = ({ events, logs, onTotal, search, setSelectedEvent, setShowLogs }) => {
  const {t} = useTranslation()
  const errors = logs.filter((u) => u.topic.startsWith('log.error'))
  const lastError = errors[0]
  const users = events.filter((u) => u.user)
  const lastUser = users[0]

  const handleEventClick = (event) => {
    if (event.topic.startsWith('log.error')) {
      setShowLogs(true)
    } else {
      setShowLogs(false)
    }

    setSelectedEvent(event.id)
  }

  return (
    <Section wrap style={{ gap: '5px', bottom: 'unset', maxHeight: '100%', overflow: 'hidden' }}>
      <TotalsStyledPanel style={{ flexWrap: 'wrap' }}>
        <h2>{t("Events Overview")}</h2>
        <TotalStyledButton
          label={`${t("Error")} - ${errors.length}`}
          onClick={() => onTotal('error')}
          highlighted={search === 'error'}
        />
        <TotalStyledButton
          label={`${t("Server")} - ${events.filter((u) => u.topic.startsWith('server')).length}`}
          onClick={() => onTotal('server')}
          highlighted={search === 'server'}
        />
        <TotalStyledButton
          label={`${t("Entity")} - ${events.filter((u) => u.topic.startsWith('entity')).length}`}
          onClick={() => onTotal('entity')}
          highlighted={search === 'entity'}
        />

        <TotalsStyledPanel style={{ padding: 0 }}>
          <TotalStyledButton
            label={`${t("Product")} - ${events.filter((u) => u.topic.startsWith('entity.product')).length}
        `}
            onClick={() => onTotal('product')}
            highlighted={search === 'product'}
          />
          <TotalStyledButton
            label={`${t("Task")} - ${events.filter((u) => u.topic.startsWith('entity.task')).length}
        `}
            onClick={() => onTotal('task')}
            highlighted={search === 'task'}
          />
          <TotalStyledButton
            label={`${t("Version")} - ${events.filter((u) => u.topic.startsWith('entity.version')).length}
        `}
            onClick={() => onTotal('version')}
            highlighted={search === 'version'}
          />
        </TotalsStyledPanel>
      </TotalsStyledPanel>

      <Panel>
        <h2>{t("Last Error")}</h2>
        {lastError ? (
          <EventTile
            title={lastError.description}
            time={lastError.updatedAt}
            subTitle={lastError.topic}
            onClick={() => handleEventClick(lastError)}
          />
        ) : (
          <EventTile title={t("No Errors Found")} disableHover />
        )}
        <h2>{t("Last User")}</h2>
        {lastUser ? (
          <EventTile
            title={lastUser.topic}
            time={lastUser.updatedAt}
            subTitle={lastUser.user}
            onClick={() => handleEventClick(lastUser)}
          />
        ) : (
          <EventTile title={t("No Users Found")} disableHover />
        )}
      </Panel>
    </Section>
  )
}

export default EventOverview
