import { forwardRef } from 'react'
import { Footer as FooterStyled } from '../ReleaseInstaller.styled'
import { Button, SaveButton, SaveButtonProps } from '@ynput/ayon-react-components'
import { useTranslation } from 'react-i18next'
import "@/i18n/config"
interface FooterProps extends React.HTMLAttributes<HTMLElement> {
  isFinal?: boolean
  saveButton?: SaveButtonProps
  onCancel: () => void
  onConfirm: () => void
}

export const Footer = forwardRef<HTMLElement, FooterProps>(
  ({ onCancel, onConfirm, isFinal, saveButton, ...props }, ref) => {
    const {t} = useTranslation()
    return (
      <FooterStyled {...props} ref={ref}>
        <Button variant="text" onClick={onCancel}>
          {t("Cancel")}
        </Button>
        {isFinal ? (
          <SaveButton onClick={onConfirm} {...saveButton}>
            {t("Confirm")}
          </SaveButton>
        ) : (
          <Button onClick={onConfirm}>{t("Confirm")}</Button>
        )}
      </FooterStyled>
    )
  },
)
