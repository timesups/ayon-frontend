import { Button } from '@ynput/ayon-react-components'
import { useAppSelector } from '@state/store'
import styled from 'styled-components'
import { useListBundlesQuery } from '@shared/api'
import { toast } from 'react-toastify'
import { useTranslation } from 'react-i18next'

const ButtonContainer = styled.div`
  display: flex;
  flex-direction: row;
  gap: 6px;
`

const VARIANT_STYLES = {
  production: {
    backgroundColor: 'var(--color-hl-production)',
    color: 'black',
  },
  staging: {
    backgroundColor: 'var(--color-hl-staging)',
    color: 'black',
  },
  dev: {
    backgroundColor: 'var(--color-hl-developer)',
    color: 'black',
  },
} as const

interface VariantSelectorProps {
  variant: string
  setVariant: (variant: string) => void
  disabled?: boolean
  showDev?: boolean
}

const VariantSelector = ({
  variant,
  setVariant,
  showDev = false,
  disabled = false,
}: VariantSelectorProps) => {
  const { t } = useTranslation('settings')
  const { data: { bundles = [] } = {} } = useListBundlesQuery({ archived: false })
  const devMode = useAppSelector((state) => state.user.attrib.developerMode)
  const userName = useAppSelector((state) => state.user.name)

  const buttons =
    devMode && showDev
      ? (['production', 'staging', 'dev'] as const)
      : (['production', 'staging'] as const)

  const variantLabels: Record<(typeof buttons)[number], string> = {
    production: t('production'),
    staging: t('staging'),
    dev: t('dev'),
  }

  const handleOnChange = (variant: (typeof buttons)[number]) => {
    if (variant === 'dev') {
      // find dev bundle that belongs to the user
      const devBundle = bundles.find((bundle) => bundle.isDev && bundle.activeUser === userName)
      if (devBundle) {
        setVariant(devBundle.name)
      } else {
        toast.warn(t('noDevBundle'))
      }
    } else {
      setVariant(variant)
    }
  }

  return (
    <ButtonContainer>
      {buttons.map((variantType) => (
        <Button
          key={variantType}
          label={variantLabels[variantType]}
          onClick={() => handleOnChange(variantType)}
          style={
            variantType === variant ||
            (variantType === 'dev' && !['production', 'staging'].includes(variant))
              ? VARIANT_STYLES[variantType]
              : {}
          }
          disabled={disabled}
        />
      ))}
    </ButtonContainer>
  )
}

export default VariantSelector
