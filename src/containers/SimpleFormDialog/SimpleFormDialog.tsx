import styled from 'styled-components'
import React, { useState, useEffect } from 'react'
import ReactMarkdown from 'react-markdown'
import {
  ScrollPanel,
  Button,
  Spacer,
  Dialog,
  FormLayout,
  FormRow,
  InputNumber,
  InputText,
  InputSwitch,
  Dropdown,
} from '@ynput/ayon-react-components'

import type { SimpleFormField } from '@api/rest/actions'

export type SimpleFormValue = string | number | boolean | string[] | null | undefined
export type SimpleFormValueDict = Record<string, SimpleFormValue>


const getDefaults = (fields: SimpleFormField[], values: SimpleFormValueDict) => {
  const defaults: SimpleFormValueDict = {}
  fields.forEach((field) => {
    if (field.name in values) {
      defaults[field.name] = values[field.name]
    } else if (field.value) {
      defaults[field.name] = field.value
    } else if (field.type === 'boolean') {
      defaults[field.name] = false
    } else if (field.type === 'integer') {
      defaults[field.name] = 0
    } else if (field.type === 'float') {
      defaults[field.name] = 0.0
    } else if (field.type === 'text') {
      defaults[field.name] = ''
    }
  })
  return defaults
}

const LabelContainer = styled.div`
  &.normal {
    // maybe something here
  }

  &.info,
  &.warning,
  &.error {
    padding: 0.5rem;
    text-align: center;
    font-weight: bold;
  }

  &.info {
    background-color: var(--md-sys-color-on-secondary-dark);
  }
  &.warning {
    background-color: var(--md-sys-color-warning-container-dark);
  }
  &.error {
    background-color: var(--md-sys-color-on-error-dark);
  }
`

type FormLabelProps = {
  field: SimpleFormField
}

const FormLabel = ({ field }: FormLabelProps) => {
  const text = typeof field.value === 'string' ? field.value : 'Invalid label value'

  return (
    <LabelContainer className={field.highlight || 'normal'}>
      <ReactMarkdown>{text}</ReactMarkdown>
    </LabelContainer>
  )
}

type FormFieldProps = {
  field: SimpleFormField
  value: SimpleFormValue
  onChange: (value: SimpleFormValue) => void
}

const FormField = ({ field, value, onChange }: FormFieldProps) => {
  if (field.type === 'text') {
    const parsedValue = typeof value === 'string' ? value : ''
    return (
      <InputText
        value={parsedValue}
        onChange={(e) => onChange(e.target.value)}
        placeholder={field.placeholder || ''}
      />
    )
  }
  if (field.type === 'boolean') {
    const parsedValue = typeof value === 'boolean' ? value : false

    const handleCheckboxEvent = (
      event: React.ChangeEvent<HTMLInputElement> | React.KeyboardEvent<HTMLInputElement>
    ) => {
      if ('target' in event && 'checked' in event.target) {
        onChange((event.target as HTMLInputElement).checked);
      }
    };

    return (
      <InputSwitch
        checked={parsedValue}
        onChange={handleCheckboxEvent}
      />
    )
  }
  if (field.type === 'integer') {
    const parsedValue = typeof value === 'number' ? value : 0
    return (
      <InputNumber
        value={parsedValue}
        onChange={(e) => onChange(parseInt(e.target.value))}
        placeholder={field.placeholder || ''}
      />
    )
  }
  if (field.type === 'float') {
    const parsedValue = typeof value === 'number' ? value : 0.0
    return (
      <InputNumber
        type="number"
        value={parsedValue}
        onChange={(e) => onChange(parseFloat(e.target.value))}
        placeholder={field.placeholder || ''}
      />
    )
  }

  if (field.type === 'select') {
    const parsedValue = typeof value === 'string' ? value : ''
    return (
      <Dropdown
        widthExpand
        options={field.options || []}
        value={parsedValue ? [parsedValue] : []}
        onSelectionChange={(e) => onChange(e[0])}
        className={`form-field`}
        multiSelect={false}
      />
    )
  }
}

interface SimpleFormDialogProps {
  fields: SimpleFormField[]
  values?: SimpleFormValueDict
  onClose: () => void
  onSubmit: (values: SimpleFormValueDict) => void
  isOpen: boolean
  header?: string
}


const SimpleFormDialog = ({ fields, values, onClose, onSubmit, isOpen, header }:SimpleFormDialogProps) => {
  const [formData, setFormData] = useState<SimpleFormValueDict | null>(null)

  useEffect(() => {
    if (isOpen) {
      const defaults = getDefaults(fields, values || {})
      setFormData(defaults)
    }
  }, [isOpen, fields, values])

  if (!isOpen) return null
  if (!formData) return null

  const footer = (
    <div style={{ display: 'flex', flexDirection: 'row' }}>
      <Spacer />
      <Button onClick={() => onSubmit(formData)} icon="checklist" label="Submit" variant="filled" />
    </div>
  )

  return (
    <Dialog
      isOpen={isOpen}
      onClose={onClose}
      header={header}
      footer={footer}
      style={{ minHeight: 400, minWidth: 500 }}
    >
      <ScrollPanel style={{ flexGrow: 1, background: 'transparent' }}>
        <FormLayout style={{ width: '95%' }}>
          {fields.map((field: SimpleFormField) => {
            if (field.type === 'label') {
              return <FormLabel key={field.name} field={field} />
            }

            return (
              <FormRow key={field.name} label={field.label || ''}>
                <FormField
                  field={field}
                  value={formData[field.name]}
                  onChange={(value) => {
                    setFormData((prev) => ({
                      ...prev,
                      [field.name]: value,
                    }))
                  }}
                />
              </FormRow>
            )
          })}
        </FormLayout>
      </ScrollPanel>
    </Dialog>
  )
}

export default SimpleFormDialog
