import React from 'react'
import { BorderedSection } from '@ynput/ayon-react-components'
import { MarkdownEditor, DESCRIPTION_TOOLBAR } from '@shared/components/MarkdownEditor'
import { StyledEditor } from '@shared/components/DetailsPanelDetails/DescriptionSection.styles'
import { useTranslation } from 'react-i18next'

type BundleDescriptionFieldProps = {
  value?: string | null
  onChange: (value: string) => void
}

const BundleDescriptionField: React.FC<BundleDescriptionFieldProps> = ({ value, onChange }) => {
  const { t } = useTranslation('settings')

  return (
    <BorderedSection title={t('description')} autoHeight showHeader>
      <StyledEditor className="block-shortcuts">
        <MarkdownEditor
          value={value || ''}
          onChange={onChange}
          placeholder={t('descriptionPlaceholder')}
          toolbar={DESCRIPTION_TOOLBAR}
          bordered={false}
          minHeight={60}
          maxHeight={400}
        />
      </StyledEditor>
    </BorderedSection>
  )
}

export default BundleDescriptionField
