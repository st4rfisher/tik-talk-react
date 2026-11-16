import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'

import { profileApi, profileQueries, useProfile, type Profile } from '@/entities/profile'
import { queryClient } from '@/shared/query'

import { setupProfileDefaultValues, setupProfileFormValues, setupProfileSchema } from './schema'

export function useSetupProfile(onSuccessFn: () => void, onSave?: () => Promise<void>) {
  const { data: profile } = useProfile('me')
  const form = useForm<setupProfileFormValues>({
    resolver: zodResolver(setupProfileSchema),
    defaultValues: setupProfileDefaultValues(),
    values: profile,
    resetOptions: { keepDirtyValues: true },
  })

  const submit = form.handleSubmit(async (values) => {
    try {
      await onSave?.()
      const updatedProfile = await profileApi.patchProfileData(values)
      const queryKey = profileQueries.getProfileById('me').queryKey
      const currentProfile = queryClient.getQueryData<Profile>(queryKey)
      const newProfileData: Profile = currentProfile
        ? { 
            ...currentProfile, 
            ...values, 
            ...updatedProfile, 
            avatarUrl: currentProfile.avatarUrl 
          }
        : updatedProfile
      queryClient.setQueryData(queryKey, newProfileData)
      form.reset(setupProfileFormValues(newProfileData))
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
