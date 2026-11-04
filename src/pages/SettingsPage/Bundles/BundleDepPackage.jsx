import { Button, FormRow } from '@ynput/ayon-react-components'
import React from 'react'
import styled from 'styled-components'
import { useTranslation } from 'react-i18next'

const StyledFormRow = styled(FormRow)`
  .field {
    flex-direction: row;
    display: flex;
    align-items: center;
    gap: var(--base-gap-large);

    & > span {
      flex: 1;
      overflow: hidden;
      white-space: nowrap;
      text-overflow: ellipsis;
      margin-right: 16px;
    }
  }
`

const BundleDepPackage = ({ children, label, onEdit }) => {
  const { t } = useTranslation('settings')
  const noneLabel = t('noneParen')

  return (
    <StyledFormRow label={label}>
      <Button
        icon={children ? 'edit' : 'add'}
        onClick={onEdit}
        data-tooltip={children ? t('editDependencyPackage') : t('addDependencyPackage')}
      />
      <span data-tooltip={children || noneLabel}>
        {children || noneLabel}
        {/* <span> (author)</span> */}
      </span>
    </StyledFormRow>
  )
}

export default BundleDepPackage
