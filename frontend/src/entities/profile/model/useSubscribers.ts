import { useQuery } from '@tanstack/react-query'

import { profileQueries } from './profileRequests'

export function useSubscribers(limit = 3) {
  return useQuery(profileQueries.getSubscribersList(limit))
}
