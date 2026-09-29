import { useNavigate } from 'react-router'
import { LoginForm } from '@/features/login'
import styles from './LoginPage.module.scss'

export function LoginPage() {
  const navigate = useNavigate()

  return (
    <div className={styles['login-page']}>
      <LoginForm onSuccess={() => navigate('/')} />
      <img src="/assets/images/logo.svg" alt="Логотип Tik-Talk" />
    </div>
  )
}
