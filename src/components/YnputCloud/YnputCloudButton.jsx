import React from 'react'
import * as Styled from './YnputCloud.styled'
import { Icon, Spacer } from '@ynput/ayon-react-components'
import Type from '@/theme/typography.module.css'
import CloudLogo from '@/svg/CloudLogo'
import clsx from 'clsx'
import { useTranslation } from 'react-i18next'

const YnputCloudButton = React.forwardRef(
  (
    {
      isConnected,
      showStatus,
      showDropdown,
      isOpen,
      isLoading,
      smallLogo,
      darkMode,
      disabled,
      ...props
    },
    ref,
  ) => {
    const { t } = useTranslation('market')

    return (
      <Styled.HeaderButton
        {...props}
        ref={ref}
        disabled={disabled || isLoading}
        $isLoading={isLoading}
        className={clsx({
          loading: isLoading,
          open: isOpen,
          darkMode,
        })}
      >
        <CloudLogo style={{ height: smallLogo ? 20 : 29 }} darkMode={darkMode} />
        {(showStatus || showDropdown) && (
          <Styled.Status className="status">
            {showStatus && (
              <>
                <Icon icon={isConnected ? 'check_circle' : isLoading ? 'sync' : 'add'} />
                <span className={Type.labelLarge}>
                  {isConnected ? t('connected') : t('linkAccount')}
                </span>
              </>
            )}
            <Spacer />
            {showDropdown && isConnected && <Icon icon="expand_more" className="more" />}
          </Styled.Status>
        )}
      </Styled.HeaderButton>
    )
  },
)

YnputCloudButton.displayName = 'YnputCloudButton'

export default YnputCloudButton
