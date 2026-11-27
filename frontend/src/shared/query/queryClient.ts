import { QueryClient, type QueryKey } from '@tanstack/react-query'

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 60_000,
      retry: 1,
    },
  },
})

const getKey = (
  entity: string, 
  key: QueryKey, 
  type: 'MUTATION' | 'QUERY') => `${entity}__${key}__${type}`;

export function invalidateQueries(queryKey: QueryKey) {
  return queryClient.invalidateQueries({ queryKey: queryKey })
}