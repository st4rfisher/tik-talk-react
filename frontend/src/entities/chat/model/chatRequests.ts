import { mutationOptions, queryOptions } from '@tanstack/react-query'
import { invalidateQueries } from '@shared/query'
import { chatApi } from '../api/chat'

export const chatQueries = {
  all: () => ['chats'] as const,

  getMyChats: () =>
    queryOptions({
      queryKey: [...chatQueries.all()] as const,
      queryFn: () => chatApi.getMyChats(),
    }),

  getChatById: (chatId: number) =>
    queryOptions({
      queryKey: [...chatQueries.all(), chatId] as const,
      queryFn: () => chatApi.getChatById(chatId),
    }),
}

export const chatMutations = {
  createChat: () =>
    mutationOptions({
      mutationFn: chatApi.createChat,
      onSuccess: () => invalidateQueries(chatQueries.getMyChats().queryKey),
    }),

  sendMessage: (chatId: number) =>
    mutationOptions({
      mutationFn: (message: string) => chatApi.sendMessage(chatId, message),
      onSuccess: async () => {
        await invalidateQueries(chatQueries.getChatById(chatId).queryKey)
        await invalidateQueries(chatQueries.getMyChats().queryKey)
      },
    }),
}
