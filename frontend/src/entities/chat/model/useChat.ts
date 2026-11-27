import { useQuery } from '@tanstack/react-query'

import { chatQueries } from './chatRequests'

export function useChat(chatId: string | undefined) {
  const numericId = Number(chatId)
  const isEnabled = Boolean(chatId) && chatId !== 'new' && !Number.isNaN(numericId)
  const chatQuery = useQuery({
    ...chatQueries.getChatById(numericId),
    enabled: isEnabled,
  })

  return {
    chatQuery
  }
}
