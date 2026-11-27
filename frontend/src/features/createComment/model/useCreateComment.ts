import { useMutation, useQuery } from '@tanstack/react-query'
import { useState } from 'react'

import { postMutations } from '@/entities/post'
import { profileQueries } from '@/entities/profile'

export function useCreateComment(postId: number) {
  const [text, setText] = useState('')
  const { data: me } = useQuery(profileQueries.getProfileById('me'))

  const createComment = useMutation(postMutations.createComment())

  function submit() {
    const trimmedText = text.trim()
    if (!trimmedText || !me) return

    createComment.mutate(
      { 
        text: trimmedText, 
        authorId: me.id, 
        postId 
      },
      { onSuccess: () => setText('') },
    )
  }

  return {
    text,
    setText,
    submit,
    avatarUrl: me?.avatarUrl ?? null,
    isPending: createComment.isPending,
  }
}
