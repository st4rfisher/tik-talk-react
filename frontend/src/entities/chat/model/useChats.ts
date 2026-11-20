import { useQuery } from '@tanstack/react-query'

import { chatQueries } from './chatQueries'

export function useChats() {
  const query = useQuery(chatQueries.getMyChats())

  return {
    ...query
  }
}
