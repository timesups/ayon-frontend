import { FeedbackProvider, useFeedback } from '@shared/components'
import { useAppSelector } from '@state/store'
import { Button, Panel, Section } from '@ynput/ayon-react-components'
import React from 'react'
import { useTranslation } from 'react-i18next'
import styled from 'styled-components'
import DocumentTitle from '@components/DocumentTitle/DocumentTitle'
import { getPlatformShortcutKey, KeyMode } from '@shared/util'

const StyledPanel = styled(Panel)`
  max-width: 300px;
  min-width: min-content;
  position: absolute;
  top: 40%;
  left: 50%;
  transform: translate(-50%, -50%);
  text-align: center;

  pre {
    white-space: pre-wrap;
    padding: 8px;
    background-color: var(--md-sys-color-error-container);
    border-radius: 4px;

    color: var(--md-sys-color-on-error-container);
  }

  a,
  button {
    width: 100%;
  }

  button {
    height: 40px;
  }
`

const ErrorFallback = ({ error }) => {
  const { t } = useTranslation('errors')

  if (error?.toString()?.includes('TypeError: Failed to fetch dynamically imported module:')) {
    return (
      <>
        <DocumentTitle title={t('oopsTitle')} />
        <StyledPanel>
          <h1>{t('updatedReload')}</h1>
          <Button
            label={t('reloadPage')}
            icon="sync"
            variant="filled"
            onClick={() => window.location.reload(true)}
          />
          <span>
            {t('reloadHint1', {
              shortcut: getPlatformShortcutKey('r', [KeyMode.Shift, KeyMode.Ctrl]),
            })}
          </span>
          <span>
            {t('reloadHint2', {
              shortcut: getPlatformShortcutKey('Delete', [KeyMode.Shift, KeyMode.Ctrl]),
            })}
          </span>
        </StyledPanel>
      </>
    )
  }

  return (
    <>
      <DocumentTitle title={t('oopsTitle')} />
      <StyledPanel>
        <h1>{t('genericError')}</h1>
        <pre>{error?.toString()}</pre>
        <Section direction="row">
          <FeedbackProvider>
            <SupportButton error={error} />
          </FeedbackProvider>
          <a href="/">
            <Button label={t('home')} icon="home" variant="filled" />
          </a>
        </Section>
      </StyledPanel>
    </>
  )
}

const SupportButton = ({ error }) => {
  const { t } = useTranslation('errors')
  const { openSupport } = useFeedback()
  const user = useAppSelector((state) => state.user)
  const errorMessage = `I have encountered an error: ${error?.toString()}
Chrome version: ${navigator.userAgent.match(/Chrome\/[\d.]+/)?.[0] || 'Unknown'}
Page: ${window.location.href}
User: ${user?.name || 'Unknown'} - ${
    user?.data?.isAdmin ? 'Admin' : user?.data?.isManager ? 'Manager' : 'User'
  }
`

  return (
    <Button
      label={t('sendReport')}
      icon="report"
      onClick={() => openSupport('NewMessage', errorMessage)}
    />
  )
}

export default ErrorFallback
