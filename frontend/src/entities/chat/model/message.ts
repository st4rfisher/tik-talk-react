import type { Chat, ChatWSMessage, ChatWSNewMessage, ChatWSUnreadMessage, Message } from './types'

export function mapChat(chat: Chat, currentUserId: number): Chat {
  const messages = (chat.messages ?? []).map((message) => ({
    ...message,
    user: chat.userFirst.id === message.userFromId ? chat.userFirst : chat.userSecond,
    isMine: message.userFromId === currentUserId,
  }))

  return {
    ...chat,
    companion: chat.userFirst.id === currentUserId ? chat.userSecond : chat.userFirst,
    messages,
  }
}

export function transformToIncomingMessage(message: ChatWSNewMessage): Message {
  return {
    id: message.data.id,
    userFromId: message.data.author,
    personalChatId: message.data.chat_id,
    text: message.data.message,
    createdAt: message.data.created_at,
    isRead: false,
    isMine: false,
  }
}

export function isNewMessage(message: ChatWSMessage): message is ChatWSNewMessage {
  return 'action' in message && message.action === 'message'
}

export function isUnreadMessage(message: ChatWSMessage): message is ChatWSUnreadMessage {
  return 'action' in message && message.action === 'unread'
}

type WSMessageHandlers = {
  onUnread?: (count: number) => void
  onNewMessage?: (message: Message) => void
}

export function handleWSMessage(message: ChatWSMessage, handlers: WSMessageHandlers) {
  if (!('action' in message)) return

  if (isUnreadMessage(message)) {
    handlers.onUnread?.(message.data.count)
  }

  if (isNewMessage(message)) {
    handlers.onNewMessage?.(transformToIncomingMessage(message))
  }
}
