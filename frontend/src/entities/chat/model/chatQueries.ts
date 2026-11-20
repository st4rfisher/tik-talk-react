import { queryOptions } from '@tanstack/react-query'

import { chatApi } from '../api/chat'

export const chatQueries = {
  all: () => ['chats'] as const,

  getMyChats: () =>
    queryOptions({
      queryKey: [...chatQueries.all()] as const,
      queryFn: () => chatApi.getMyChats(),
    }),
}
