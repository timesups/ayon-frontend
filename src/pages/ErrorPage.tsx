import { FC } from 'react'
import { useTranslation } from 'react-i18next'
import { useNavigate } from 'react-router-dom'

import * as Styled from './ErrorPage.styled'

type ErrorPageProps = {
  code?: string
  message?: string
  links?: React.ReactNode[]
}

const ErrorPage: FC<ErrorPageProps> = ({ code, message, links }) => {
  const { t } = useTranslation('errors')
  const isNotFound = code === '404'
  const navigate = useNavigate()

  return (
    <Styled.Page className="center">
      <Styled.Logo src="/AYON.svg" alt="AYON" />
      <Styled.Code>{code || t('codeFallback')}</Styled.Code>
      <Styled.Title>
        {message || (isNotFound ? t('pageNotFound') : t('somethingWentWrong'))}
      </Styled.Title>
      {isNotFound && <Styled.Description>{t('pageNotFoundDescription')}</Styled.Description>}
      {isNotFound && (
        <Styled.DashboardButton variant="filled" onClick={() => navigate('/dashboard/tasks')}>
          {t('returnToDashboard')}
        </Styled.DashboardButton>
      )}
      {links && links.length > 0 && (
        <Styled.Links>
          {links.map((link, idx) => (
            <span key={idx}>{link}</span>
          ))}
        </Styled.Links>
      )}
    </Styled.Page>
  )
}

export default ErrorPage
