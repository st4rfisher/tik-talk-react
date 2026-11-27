import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation } from '@tanstack/react-query'
import { useForm } from 'react-hook-form'

import { profileMutations, profileQueries, useProfile, type Profile } from '@/entities/profile'
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
  const patchProfile = useMutation(profileMutations.patchProfileData())
  
  const submit = form.handleSubmit(async (formValues) => {
    try {
      await onSave?.()
      const updatedProfileData = await patchProfile.mutateAsync(formValues)
      const newProfileData = queryClient.getQueryData<Profile>(profileQueries.getProfileById('me').queryKey) ?? updatedProfileData
      
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
