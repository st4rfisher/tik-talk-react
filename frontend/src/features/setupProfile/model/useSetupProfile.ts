import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { profileApi, useProfile } from '@/entities/profile'

import { setupProfileSchema, type setupProfileFormValues } from './schema'

export function useSetupProfile(onSuccessFn: () => void) {
  const { data: profile } = useProfile('me')
  const form = useForm<setupProfileFormValues>({
    resolver: zodResolver(setupProfileSchema),
    defaultValues: setupProfileDefaultValues(),
    values: profile,
    resetOptions: { keepDirtyValues: true },
  })

  const submit = form.handleSubmit(async (values) => {
    try {
      await profileApi.patchProfileData(values)
      onSuccessFn()
    } catch (error) {
      console.error('Не удалось сохранить данные', error)
      form.setError('firstName', { message: 'Неверный логин или пароль' })
    }
  })

  return {
    register: form.register,
    control: form.control,
    submit,
    errors: form.formState.errors,
    isSubmitting: form.formState.isSubmitting,
    isDirty: form.formState.isDirty
  }
}
