import { api } from '@/shared/api'

import type { Chat, LastMessageResponse, Message } from '../model/types'
import { connectWebsocket } from './websocket'

export const chatApi = {
  async getMyChats(): Promise<LastMessageResponse[]> {
    const { data } = await api.get<LastMessageResponse[]>('/chat/get_my_chats/')

    return data
  },

  async createChat(userId: number): Promise<Chat> {
    const { data } = await api.post<Chat>(`/chat/${userId}`, {})

    return data
  },

  async getChatById(chatId: number): Promise<Chat> {
    const { data } = await api.get<Chat>(`/chat/${chatId}`)

    return data
  },

  async sendMessage(chatId: number, message: string): Promise<Message> {
    const { data } = await api.post<Message>(`/message/send/${chatId}`, {}, {
      params: { message },
    })

    return data
  },

  connectWebsocket,
}
