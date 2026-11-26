import { useMutation } from '@tanstack/react-query'
import { useEffect, useRef } from 'react'
import { useNavigate, useParams, useSearchParams } from 'react-router'

import { chatApi, mapChat, useChat } from '@/entities/chat'
import { useProfile } from '@/entities/profile'

export function useWorkSpaceArea() {
  const { id } = useParams()
  const [searchParams] = useSearchParams()
  const navigate = useNavigate()
  const userId = searchParams.get('userId')
  const isNewChat = id === 'new'
  const isChatStarted = useRef(false)

  const { data: profile, isPending: isProfilePending } = useProfile('me')
  const { chatQuery } = useChat(id)

  const createChat = useMutation({
    mutationFn: chatApi.createChat,
    onSuccess: (chat) => {
      navigate(`/chats/${chat.id}`, { replace: true })
    },
  })

  useEffect(() => {
    if (!isNewChat || !userId || isChatStarted.current) return

    isChatStarted.current = true
    createChat.mutate(Number(userId))
  }, [isNewChat, userId, createChat.mutate])

  return {
    chat: chatQuery.data && profile ? mapChat(chatQuery.data, profile.id) : undefined,
    hasSelection: Boolean(id),
    isPending: isNewChat
      ? Boolean(userId) && !createChat.isError
      : Boolean(id) && (chatQuery.isPending || isProfilePending),
    isError: chatQuery.isError || createChat.isError || (isNewChat && !userId),
  }
}
