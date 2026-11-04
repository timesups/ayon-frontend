import axios from 'axios'
import { useDispatch } from 'react-redux'
import { useTranslation } from 'react-i18next'
import { login } from '@state/user'
import api from '@shared/api'
import { toast } from 'react-toastify'
import { useState, useMemo, useEffect } from 'react'
import * as Styled from '@pages/LoginPage/LoginPage.styled'
import { InputText, InputPassword, Button, Panel } from '@ynput/ayon-react-components'
import DocumentTitle from '@components/DocumentTitle/DocumentTitle'

const RequestPage = () => {
  const { t } = useTranslation('auth')
  const [email, setEmail] = useState('')
  const [sent, setSent] = useState(false)

  const handleSubmit = (e) => {
    e.preventDefault()

    const payload = {
      email: email.trim(),
      url: `${window.location.origin}/passwordReset`,
    }
    axios
      .post('/api/users/passwordResetRequest', payload)
      .then(() => {
        setSent(true)
        toast.info(t('resetLinkSentToast'))
      })
      .catch((err) => {
        console.error(err)
        toast.error(t('unableToSendResetLink'))
      })
  }

  if (sent) {
    return (
      <>
        <h1>{t('resetLinkSentHeading')}</h1>
        <p>{t('resetLinkSentBody')}</p>
      </>
    )
  }

  return (
    <>
      <h1>{t('resetPasswordHeading')}</h1>
      <p>{t('resetPasswordHint')}</p>
      <form onSubmit={handleSubmit}>
        <InputText
          autoFocus
          placeholder={t('emailPlaceholder')}
          name="email"
          aria-label={t('emailAria')}
          value={email}
          onChange={(e) => setEmail(e.target.value.replace(/\s/g, ''))}
        />
        <Button label={<strong>{t('sendResetLink')}</strong>} type="submit" />
      </form>
    </>
  )
}

const ResetPage = ({ token }) => {
  const { t } = useTranslation('auth')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [loading, setLoading] = useState(true)
  const [tokenOk, setTokenOk] = useState(false)
  const dispatch = useDispatch()

  useEffect(() => {
    // Check if token is valid
    // passwordReset will return 200 if token is valid,
    // if a password is not set, it won't be changed
    axios
      .post('/api/users/passwordReset', { token })
      .then(() => setTokenOk(true))
      .catch(() => {})
      .finally(() => setLoading(false))
  }, [token])

  if (loading) {
    return <p>{t('loading')}</p>
  }

  if (!tokenOk) {
    return <p>{t('invalidResetToken')}</p>
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    axios
      .post('/api/users/passwordReset', { token, password })
      .then((response) => {
        const data = response.data
        dispatch(login({ user: data.user, accessToken: data.token }))
        dispatch(api.util.resetApiState())
        toast.success(t('passwordResetSuccess'))
        window.history.replaceState({}, '', '/')
      })
      .catch((err) => {
        console.error(err)
        toast.error(err.response?.data?.detail || t('unableToResetPassword'))
      })
  }

  return (
    <>
      <h1>{t('createNewPassword')}</h1>
      <p>{t('createNewPasswordHint')}</p>
      <form onSubmit={handleSubmit}>
        <InputPassword
          autoFocus
          placeholder={t('newPasswordPlaceholder')}
          name="password"
          aria-label={t('password')}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <InputPassword
          placeholder={t('confirmPasswordPlaceholder')}
          name="confirmPassword"
          aria-label={t('confirmPasswordAria')}
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
        />
        <Button
          label={<strong>{t('resetPasswordSubmit')}</strong>}
          type="submit"
          disabled={!password || password !== confirmPassword}
        />
      </form>
    </>
  )
}

const PasswordResetPage = () => {
  const { t } = useTranslation('auth')
  //get token from query string
  const urlParams = new URLSearchParams(window.location.search)
  const token = urlParams.get('token')

  const mainComponent = useMemo(() => {
    if (token) {
      return <ResetPage token={token} />
    } else {
      return <RequestPage />
    }
  }, [token])

  return (
    <>
      <DocumentTitle title={t('passwordResetTitle')} />
      <main className="center">
        <Styled.LoginForm>
          <Panel>
            {mainComponent}
            <a href="/login">{t('backToLogin')}</a>
          </Panel>
        </Styled.LoginForm>
      </main>
    </>
  )
}

export default PasswordResetPage
