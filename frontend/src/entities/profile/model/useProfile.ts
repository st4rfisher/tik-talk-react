import { useQuery } from '@tanstack/react-query'

import { profileQueries } from './profileRequests'
import type { Profile } from './types'

export function checkIsMyProfile(id: string | undefined, profile: Profile | undefined) {
  return id === 'me' || (profile != null && id === String(profile.id))
}

export function useProfile(id: string ) {
  const profileQuery = useQuery({
    ...profileQueries.getProfileById(id),
    enabled: Boolean(id),
  })

  return {
    ...profileQuery,
    isMyProfile: checkIsMyProfile(id, profileQuery.data),
  }
}
