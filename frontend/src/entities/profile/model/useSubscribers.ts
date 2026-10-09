import { useQuery } from '@tanstack/react-query'

import { profileQueries } from './profileQueries'

export function useSubscribers(limit = 3) {
  return useQuery(profileQueries.getSubscribersList(limit))
}
