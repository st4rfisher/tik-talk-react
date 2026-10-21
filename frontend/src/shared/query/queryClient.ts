import { QueryClient, type QueryKey } from '@tanstack/react-query'

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 60_000,
      retry: 1,
    },
  },
})


export function invalidateQueries(queryKey: QueryKey) {
  return queryClient.invalidateQueries({ queryKey: queryKey })
}