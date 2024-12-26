import React from 'react'
import PropTypes from 'prop-types'
import { Button } from '@ynput/ayon-react-components'
import { useTranslation } from 'react-i18next'
import "@/i18n/config"
const ViewModeToggle = ({ onChange, value, grouped, setGrouped, disabled }) => {
  const {t} = useTranslation()
  const handleNormalClick = (id) => {
    setGrouped(false)
    onChange(id)
  }

  const handleGroupClick = () => {
    // set to grid
    onChange('grid')
    // set grouped
    setGrouped(true)
  }

  const items = [
    {
      id: 'list',
      icon: 'format_list_bulleted',
      onClick: () => handleNormalClick('list'),
      ['data-tooltip']: t("List View"),
      disabled: disabled.includes('list'),
    },
    {
      id: 'grid',
      icon: 'grid_view',
      onClick: () => handleNormalClick('grid'),
      ['data-tooltip']: t("Card View"),
      disabled: disabled.includes('grid'),
    },
    {
      id: 'layers',
      icon: 'layers',
      onClick: () => handleGroupClick(),
      ['data-tooltip']: t("Grouped View"),
      disabled: disabled.includes('layers'),
    },
  ]

  if (grouped && value !== 'list') value = 'layers'

  return (
    <>
      {items.map((item) => (
        <Button
          {...item}
          selected={value === item.id}
          key={item.id}
          className={value === item.id ? 'active' : ''}
          data-tooltip={!item.disabled ? item['data-tooltip'] : undefined}
        />
      ))}
    </>
  )
}

ViewModeToggle.propTypes = {
  onChange: PropTypes.func.isRequired,
  value: PropTypes.string.isRequired,
}

export default ViewModeToggle
