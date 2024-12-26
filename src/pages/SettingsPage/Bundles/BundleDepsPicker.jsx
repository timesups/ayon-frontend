import { Button, Dropdown, FormRow, SaveButton } from '@ynput/ayon-react-components'
import React, { useMemo } from 'react'
import { useTranslation } from 'react-i18next'
import "@/i18n/config"
const BundleDepsPicker = ({
  packages = [],
  value = {},
  initPackage = '',
  onChange,
  isUpdating,
  onSubmit,
  onCancel,
}) => {
  const {t} = useTranslation()
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
            disabled ? t("No packages for platform") : t("Select a dependency package file...")
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
        <Button onClick={onCancel}>{t("Cancel")}</Button>
        <SaveButton active={value?.file !== initPackage} saving={isUpdating} onClick={onSubmit}>
          {t("Update Bundle Package")}
        </SaveButton>
      </div>
    </>
  )
}

export default BundleDepsPicker
