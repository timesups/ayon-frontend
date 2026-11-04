import React from 'react'
import YnputConnector from '@components/YnputCloud/YnputConnector'
import * as Styled from './ConnectDialog.styled'
import { Icon, Dialog } from '@ynput/ayon-react-components'
import Type from '@/theme/typography.module.css'
import { useTranslation } from 'react-i18next'

const ConnectDialog = ({ redirect, visible, onHide, ...props }) => {
  const { t } = useTranslation('market')

  return (
    <Dialog
      header={t('connectTitle')}
      size="lg"
      style={{ width: 400 }}
      isOpen={visible}
      onClose={onHide}
      {...props}
    >
      <Styled.Body>
        <Styled.List>
          <Styled.ListItem>
            <Icon icon="check_circle" />
            <span className={Type.titleMedium}>{t('connectMarketAccess')}</span>
          </Styled.ListItem>
          <Styled.ListItem>
            <Icon icon="check_circle" />
            <span className={Type.titleMedium}>{t('connectReleaseBundles')}</span>
          </Styled.ListItem>
          <Styled.ListItem>
            <Icon icon="check_circle" />
            <span className={Type.titleMedium}>{t('connectBootstrap')}</span>
          </Styled.ListItem>
          <YnputConnector smallLogo showLoading skip redirect={redirect} />
        </Styled.List>
      </Styled.Body>
    </Dialog>
  )
}

export default ConnectDialog
