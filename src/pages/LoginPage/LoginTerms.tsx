import { Trans } from 'react-i18next'
import * as Styled from './LoginPage.styled'

const LoginTerms = () => {
  return (
    <Styled.TandCs>
      <Trans
        i18nKey="auth:terms"
        components={{
          tos: <a href={'https://ynput.io/terms/'} target="_blank" />,
          privacy: <a href={'https://ynput.io/privacy-policy'} target="_blank" />,
        }}
      />
    </Styled.TandCs>
  )
}

export default LoginTerms
