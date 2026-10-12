import { useQuery } from '@tanstack/react-query'

import { postQueries } from './postQueries'

export function usePosts() {
  return useQuery(postQueries.getPosts())
}
