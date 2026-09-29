import { queryOptions } from '@tanstack/react-query'
import { profileApi } from '../api/profile'

export const profileQueries = {
  byId: (id: string) =>
    queryOptions({
      queryKey: ['profile', id] as const,
      queryFn: () => (
        id === 'me' ? 
          profileApi.getMyAccount() 
        : profileApi.getAccount(id)
      ),
    }),
}
