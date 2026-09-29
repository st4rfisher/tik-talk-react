import { useQuery } from '@tanstack/react-query'

import { sessionQueries } from './token'

export function useSession() {
  const sessionQuery = useQuery(sessionQueries.getCurrent())

  return {
    ...sessionQuery,
    hasAccess: sessionQuery.data?.hasAccess ?? false,
  }
}
