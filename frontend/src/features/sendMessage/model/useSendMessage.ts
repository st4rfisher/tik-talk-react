import { useMutation, useQuery } from '@tanstack/react-query'
import { useState } from 'react'

import { chatMutations } from '@/entities/chat'
import { profileQueries } from '@/entities/profile'

export function useSendMessage(chatId: number) {
  const [text, setText] = useState('')
  const { data: me } = useQuery(profileQueries.getProfileById('me'))
  const sendMessage = useMutation(chatMutations.sendMessage(chatId))

  function submit() {
    const trimmedText = text.trim()
    if (!trimmedText || sendMessage.isPending) return

    sendMessage.mutate(trimmedText, {
      onSuccess: () => setText(''),
    })
  }

  return {
    text,
    setText,
    submit,
    avatarUrl: me?.avatarUrl ?? null,
    isPending: sendMessage.isPending,
  }
}
