import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'

import { authApi } from '@/entities/session'

import { loginSchema, type LoginFormValues } from './schema'

export function useLogin(onSuccess: () => void) {
  const form = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      username: '',
      password: '',
    },
  })

  const submit = form.handleSubmit(async (values) => {
    try {
      await authApi.login(values)
      onSuccess()
    } catch (error) {
      console.error('Не удалось войти', error)
      form.setError('password', { message: 'Неверный логин или пароль' })
    }
  })

  return {
    register: form.register,
    submit,
    errors: form.formState.errors,
    isSubmitting: form.formState.isSubmitting,
  }
}
