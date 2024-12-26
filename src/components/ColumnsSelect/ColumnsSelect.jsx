import { DefaultValueTemplate, Dropdown } from '@ynput/ayon-react-components'
import { useTranslation } from 'react-i18next'
import "@/i18n/config"
const ValueTemplate = ({ selected, options = [], ...props }) => {
  const {t} = useTranslation()
  return (
    <DefaultValueTemplate {...props} valueStyle={{ display: 'flex' }}>
      {selected.length > 0 ? (
        <span>
          {t("Columns")}: {selected.length} / {options.length}
        </span>
      ) : (
        <span>{t("Filter columns...")}</span>
      )}
    </DefaultValueTemplate>
  )
}

const ColumnsSelect = ({ placeholder = 'Filter columns...', ...props }) => {
  const {t} = useTranslation()
  return (
    <Dropdown
      {...props}
      multiSelect
      valueTemplate={(value, selected) => (
        <ValueTemplate selected={selected} {...props} value={value} placeholder={t(placeholder)} />
      )}
    />
  )
}

export default ColumnsSelect
