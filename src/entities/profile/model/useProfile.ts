import { useQuery } from '@tanstack/react-query'

import { profileQueries } from './profileQueries'
import type { Profile } from './types'

export function checkIsMyProfile(id: string | undefined, profile: Profile | undefined) {
  return id === 'me' || (profile != null && id === String(profile.id))
}

export function useProfile(id: string | undefined) {
  const profileQuery = useQuery({
    ...profileQueries.byId(id ?? ''),
    enabled: Boolean(id),
  })

  const myProfileQuery = useQuery({
    ...profileQueries.byId('me'),
  })

  return {
    ...profileQuery,
    isMyProfile: checkIsMyProfile(id, myProfileQuery.data),
  }
}
