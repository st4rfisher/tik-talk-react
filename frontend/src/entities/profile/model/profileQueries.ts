import { queryOptions } from '@tanstack/react-query'
import { profileApi } from '../api/profile'

export const profileQueries = {
  getProfileById: (id: string) =>
    queryOptions({
      queryKey: ['profile', id] as const,
      queryFn: () => (
        id === 'me' ? 
          profileApi.getMyAccount() 
        : profileApi.getAccount(id)
      ),
    }),

  getSubscribersList: (limit = 3) =>
    queryOptions({
      queryKey: ['profile', 'subscribers', limit] as const,
      queryFn: () => profileApi.getSubscribers(limit),
    }),
}
