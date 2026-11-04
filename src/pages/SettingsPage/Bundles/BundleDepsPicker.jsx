import { Button, Dropdown, FormRow, SaveButton } from '@ynput/ayon-react-components'
import React, { useMemo } from 'react'
import { useTranslation } from 'react-i18next'

const BundleDepsPicker = ({
  packages = [],
  value = {},
  initPackage = '',
  onChange,
  isUpdating,
  onSubmit,
  onCancel,
}) => {
  const { t } = useTranslation(['settings', 'common'])
  const options = useMemo(
    () =>
      [...packages]
        .filter((p) => p.platform === value?.platform)
        .map((p) => ({ label: p.filename, value: p.filename }))
        .sort((a, b) => b.label.localeCompare(a.label)),
    [packages],
  )

  const disabled = !options.length

  return (
    <>
      <FormRow label={value?.platform}>
        <Dropdown
          options={options}
          value={[value?.file]}
          disabled={disabled}
          placeholder={
            disabled ? t('settings:noPackagesForPlatform') : t('settings:selectDependencyPackage')
          }
          onChange={onChange}
          onClear={() => onChange([])}
        />
      </FormRow>
      <div
        style={{
          display: 'flex',
          justifyContent: 'flex-end',
          gap: 8,
          marginTop: 16,
        }}
      >
        <Button onClick={onCancel}>{t('common:cancel')}</Button>
        <SaveButton active={value?.file !== initPackage} saving={isUpdating} onClick={onSubmit}>
          {t('settings:updateBundlePackage')}
        </SaveButton>
      </div>
    </>
  )
}

export default BundleDepsPicker
