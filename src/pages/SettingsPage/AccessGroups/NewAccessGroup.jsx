import { FormLayout, FormRow, InputText, SaveButton, Dialog } from '@ynput/ayon-react-components'
import { useMemo, useState } from 'react'
import { useSaveAccessGroupMutation } from '@shared/api'
import { toast } from 'react-toastify'
import { useTranslation } from 'react-i18next'

const NewAccessGroup = ({ onClose, accessGroupList }) => {
  const { t } = useTranslation('settings')
  const [accessGroupName, setAccessGroupName] = useState('')
  const [createAccessGroup] = useSaveAccessGroupMutation()

  const accessGroupNames = useMemo(
    () => accessGroupList.map((i) => i?.name.toLowerCase()),
    [accessGroupList],
  )

  const onSubmit = async (close) => {
    try {
      await createAccessGroup({ accessGroupName, projectName: '_', permissions: {} }).unwrap()

      close && onClose(accessGroupName)
    } catch (error) {
      toast.error(t('unableCreateAccessGroup'))
    }
  }

  let error = null
  if (accessGroupNames.includes(accessGroupName.toLowerCase()))
    error = t('accessGroupExists')
  else if (!accessGroupName.match('^[a-zA-Z0-9_]([a-zA-Z0-9_.\\-]*[a-zA-Z0-9_])?$'))
    error = t('invalidAccessGroupName')
  const handleKeyDown = (e) => {
    e?.stopPropagation()
    const isEnter = e.key === 'Enter'
    const isEsc = e.key === 'Escape'
    const isCtrlMeta = e.ctrlKey || e.metaKey
    const isShift = e.shiftKey
    if (isCtrlMeta && isEnter && !error) onSubmit(true)
    if (isShift && isEnter && !error) onSubmit(false)
    if (isEsc) onClose()
  }

  const footer = useMemo(
    () => (
      <div>
        <SaveButton
          label={t('createAccessGroup')}
          icon="group_add"
          active={!error && accessGroupName}
          onClick={() => onSubmit(true)}
        />
      </div>
    ),
    [error, accessGroupName, onSubmit, t],
  )

  return (
    <Dialog
      header={t('newAccessGroup')}
      footer={footer}
      onClose={() => onClose()}
      isOpen
      onKeyDown={handleKeyDown}
      size="md"
      style={{ width: 400 }}
    >
      <FormLayout>
        <FormRow label={t('accessGroupName')}>
          <InputText
            value={accessGroupName}
            onChange={(e) => setAccessGroupName(e.target.value)}
            autoFocus
          />
        </FormRow>
        <FormRow>
          {error && !!accessGroupName && <span className="form-error-text">{error}</span>}
        </FormRow>
      </FormLayout>
    </Dialog>
  )
}

export default NewAccessGroup
