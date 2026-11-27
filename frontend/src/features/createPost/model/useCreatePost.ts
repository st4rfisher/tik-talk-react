import { useMutation, useQuery } from '@tanstack/react-query'
import { useState } from 'react'

import { postMutations } from '@/entities/post'
import { profileQueries } from '@/entities/profile'

export function useCreatePost() {
  const [text, setText] = useState('')
  const { data: me } = useQuery(profileQueries.getProfileById('me'))
  const createPost = useMutation(postMutations.createPost())

  function submit() {
    const trimmedText = text.trim()
    if (!trimmedText || !me) return

    createPost.mutate(
      { 
        content: trimmedText, 
        authorId: me.id 
      },
      { onSuccess: () => setText('') },
    )
  }

  return {
    text,
    setText,
    submit,
    avatarUrl: me?.avatarUrl ?? null,
    isPending: createPost.isPending,
  }
}
