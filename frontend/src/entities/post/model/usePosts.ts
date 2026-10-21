import { useQuery } from '@tanstack/react-query'

import { postQueries } from './postQueries'

export function usePosts(profileId: string) {
  return useQuery(postQueries.getPostsByProfileId(profileId))
}
