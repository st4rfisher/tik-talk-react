import clsx from 'clsx'

import { Input } from '@uiKit/Input'

import { useLogin } from '../model/useLogin'
import styles from './LoginForm.module.scss'

type LoginFormProps = {
  onSuccess: () => void
}

export function LoginForm({ onSuccess }: LoginFormProps) {
  const { register, submit, errors, isSubmitting } = useLogin(onSuccess)

  return (
    <form className={styles['login-form']} onSubmit={submit} noValidate>
      <h1 className={clsx('h1', styles['h1'])}>Вход</h1>
      <Input
        type="text"
        placeholder="Введите логин"
        error={errors.username?.message}
        {...register('username')}
      >
        Логин
      </Input>
      <Input
        type="password"
        placeholder="Введите пароль"
        autoComplete="on"
        error={errors.password?.message}
        {...register('password')}
      >
        Пароль
      </Input>

      <button
        type="submit"
        className={clsx('button', 'button--primary', 'button--shadow', styles['button--primary'])}
        disabled={isSubmitting}
      >
        Войти
      </button>
    </form>
  )
}
