import { useState } from 'react'
import { InputText, FormLayout, FormRow, Dialog, Button } from '@ynput/ayon-react-components'
import InfoMessage from '@components/InfoMessage'
import { useTranslation } from 'react-i18next'
import "@/i18n/config"
type DeleteUserDialogProps = {
  onHide: () => void
  selectedUsers: string[]
  onDelete: () => void
  onDisable: () => void
}

const DeleteUserDialog = ({ onHide, selectedUsers, onDelete, onDisable }: DeleteUserDialogProps) => {
  const [value, setValue] = useState('')


  if (!selectedUsers?.length) {
    // this shouldn't happen
    onHide()
    return <></>
  }
  const {t} = useTranslation()
  const selectedUsersString = selectedUsers.join(', ')
  return (
    <Dialog
      size="md"
      header={`${t("Delete")} ${selectedUsersString} ${t("Users")}`}
      footer={
        <>
          <Button label={selectedUsers.length > 1 ? t("Disable users") : t("Disable user")} onClick={onDisable} />
          <Button
            variant="danger"
            label={t("Delete")}
            onClick={onDelete}
            disabled={value !== selectedUsersString}
          />
        </>
      }
      isOpen={true}
      onClose={onHide}
    >
      <FormLayout>
        <InfoMessage
          variant="warning"
          message={t("Deleting users can have unintended consequences. Consider deactivating the user instead?")}
        />
        <FormRow
          label={`${t("To confirm delete action, type")} '${selectedUsersString}' ${t("in the box below")}`}
          style={{ flexDirection: 'column', alignItems: 'start', marginTop: '16px' }}
          labelStyle={{ height: 'auto', lineHeight: 'auto' }}
          fieldStyle={{ display: 'block', width: '100%' }}
        >
          <InputText
            style={{ width: '100%' }}
            data-testid="delete-user-dialog-input"
            value={value}
            onChange={(e) => setValue(e.target.value)}
          />
        </FormRow>
      </FormLayout>
    </Dialog>
  )
}

export default DeleteUserDialog
