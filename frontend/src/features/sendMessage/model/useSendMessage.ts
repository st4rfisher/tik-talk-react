import { useMutation, useQuery } from '@tanstack/react-query'
import { useState } from 'react'

import { chatApi, chatQueries } from '@/entities/chat'
import { profileQueries } from '@/entities/profile'
import { invalidateQueries } from '@/shared/query/queryClient'

export function useSendMessage(chatId: number) {
  const [text, setText] = useState('')
  const { data: me } = useQuery(profileQueries.getProfileById('me'))

  const mutation = useMutation({
    mutationFn: (message: string) => chatApi.sendMessage(chatId, message),
    onSuccess: async () => {
      setText('')
      await invalidateQueries(chatQueries.getChatById(chatId).queryKey)
      await invalidateQueries(chatQueries.getMyChats().queryKey)
    },
  })

  function submit() {
    const trimmedText = text.trim()
    if (!trimmedText || mutation.isPending) return

    mutation.mutate(trimmedText)
  }

  return {
    text,
    setText,
    submit,
    avatarUrl: me?.avatarUrl ?? null,
    isPending: mutation.isPending,
  }
}
