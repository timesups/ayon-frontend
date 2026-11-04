import { upperFirst } from 'lodash'
import i18n from 'i18next'
import { confirmDialog, ConfirmDialog, ConfirmDialogOptions } from 'primereact/confirmdialog'
import { toast } from 'react-toastify'

export interface ConfirmDeleteOptions extends Omit<ConfirmDialogOptions, 'accept'> {
  label?: string
  message?: string | React.ReactNode
  deleteLabel?: string
  accept?: () => Promise<any>
  showToasts?: boolean
  isArchive?: boolean
  onSuccess?: () => void
  onFinish?: () => void
  onError?: (error: any) => void
}

export const confirmDeleteDialog = confirmDialog

export const confirmDelete = ({
  label = '',
  message,
  deleteLabel,
  accept = async () => {},
  showToasts = true,
  isArchive = false,
  onSuccess,
  onError,
  onFinish,
  ...props
}: ConfirmDeleteOptions): ReturnType<typeof confirmDialog> => {
  const t = i18n.getFixedT(null, 'shared')
  const resolvedMessage = message ?? t('confirmDelete.defaultMessage')
  deleteLabel =
    deleteLabel || (isArchive ? t('confirmDelete.archive') : t('confirmDelete.delete'))
  const deleteLabelPresent = isArchive
    ? t('confirmDelete.archiving')
    : t('confirmDelete.deleting')
  const deleteLabelPast = isArchive ? t('confirmDelete.archived') : t('confirmDelete.deleted')

  return confirmDialog({
    header: props.header || t('confirmDelete.header', { action: deleteLabel, label }),
    message: resolvedMessage,
    accept: async () => {
      const toastId = showToasts
        ? toast.loading(
            t('confirmDelete.loading', {
              action: upperFirst(deleteLabelPresent),
              label: label.toLowerCase(),
            }),
            {
              autoClose: false,
            },
          )
        : null
      try {
        await accept()

        showToasts &&
          toastId &&
          toast.update(toastId, {
            render: t('confirmDelete.success', { label, result: deleteLabelPast }),
            type: 'success',
            autoClose: 5000,
            isLoading: false,
          })

        onSuccess && onSuccess()
      } catch (error: any) {
        const errorMessage =
          typeof error === 'string'
            ? error
            : error.message ||
              t('confirmDelete.error', { action: deleteLabelPresent, label })

        showToasts &&
          toastId &&
          toast.update(toastId, {
            render: errorMessage,
            type: 'error',
            autoClose: 5000,
            isLoading: false,
          })

        onError && onError(error)
      } finally {
        onFinish && onFinish()
      }
    },
    reject: () => {},
    acceptLabel: upperFirst(deleteLabel),
    rejectLabel: t('confirmDelete.cancel'),
    acceptClassName: 'button-danger',
    style: { minWidth: 400, maxWidth: 600 },
    ...props,
  })
}

export { ConfirmDialog }
