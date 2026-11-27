import { mutationOptions, queryOptions } from '@tanstack/react-query'
import { queryClient } from '@shared/query'
import { profileApi } from '../api/profile'
import type { Profile } from './types'

export const profileQueries = {
  getProfileById: (id: string) =>
    queryOptions({
      queryKey: ['profile', id] as const,
      queryFn: () => (id === 'me' ? profileApi.getMyAccount() : profileApi.getAccount(id)),
    }),

  getSubscribersList: (limit = 3) =>
    queryOptions({
      queryKey: ['profile', 'subscribers', limit] as const,
      queryFn: () => profileApi.getSubscribers(limit),
    }),
}

export const profileMutations = {
  patchProfileData: () =>
    mutationOptions({
      mutationFn: profileApi.patchProfileData,
      onSuccess: (updatedProfile, formValues) => {
        const queryKey = profileQueries.getProfileById('me').queryKey

        queryClient.setQueryData<Profile>(queryKey, (currentProfile) =>
          currentProfile
            ? {
                ...currentProfile,
                ...formValues,
                ...updatedProfile,
                avatarUrl: currentProfile.avatarUrl,
              }
            : updatedProfile,
        )
      },
    }),

  uploadAvatar: () =>
    mutationOptions({
      mutationFn: profileApi.uploadAvatar,
      onSuccess: (updatedAvatar) => {
        const queryKey = profileQueries.getProfileById('me').queryKey

        queryClient.setQueryData<Profile>(queryKey, (currentAvatar) =>
          currentAvatar ? { 
            ...currentAvatar, 
            ...updatedAvatar 
          } : updatedAvatar,
        )
      },
    }),
}
