export type ChatUser = {
  id: number
  username: string
  firstName: string
  lastName: string
  avatarUrl: string | null
  subscribersAmount: number
}

export type Message = {
  id: number
  userFromId: number
  personalChatId: number
  text: string
  createdAt: string
  isRead: boolean
  updatedAt?: string
  user?: ChatUser
  isMine?: boolean
}

export type LastMessageResponse = {
  id: number
  userFrom: ChatUser
  message: string | null
  createdAt: string
  unreadMessages: number
}

export type Chat = {
  id: number
  userFirst: ChatUser
  userSecond: ChatUser
  messages: Message[]
  companion?: ChatUser
}

export type ChatWSNewMessage = {
  status: 'success'
  action: 'message'
  data: {
    id: number
    message: string
    chat_id: number
    created_at: string
    author: number
  }
}

export type ChatWSUnreadMessage = {
  status: 'success'
  action: 'unread'
  data: {
    count: number
  }
}

export type ChatWSErrorMessage = {
  status: 'error'
  message: string
}

export type ChatWSMessage = ChatWSNewMessage | ChatWSUnreadMessage | ChatWSErrorMessage