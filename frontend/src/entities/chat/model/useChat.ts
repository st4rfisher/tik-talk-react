import { useQuery } from '@tanstack/react-query'

import { chatQueries } from './chatQueries'

export function useChat(chatId: string | undefined) {
  const numericId = Number(chatId)
  const isEnabled = Boolean(chatId) && chatId !== 'new' && !Number.isNaN(numericId)
  const chatQuery = useQuery({
    ...chatQueries.getChatById(numericId),
    enabled: isEnabled,
  })

  console.log(chatQuery)
  return {
    chatQuery
  }
}
