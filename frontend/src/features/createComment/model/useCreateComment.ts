import { useMutation, useQuery } from '@tanstack/react-query'
import { useState } from 'react'

import { invalidateQueries } from '@shared/query'

import { postApi, postQueries } from '@/entities/post'
import { profileQueries } from '@/entities/profile'

export function useCreateComment(postId: number) {
  const [text, setText] = useState('')
  const { data: me } = useQuery(profileQueries.getProfileById('me'))

  const mutation = useMutation({
    mutationFn: postApi.createComment,
    onSuccess: async () => {
      setText('')
      await invalidateQueries(postQueries.allPosts())
    },
  })

  function submit() {
    const trimmed = text.trim()
    if (!trimmed || !me) return

    mutation.mutate({ text: trimmed, authorId: me.id, postId })
  }

  return {
    text,
    setText,
    submit,
    avatarUrl: me?.avatarUrl ?? null,
    isPending: mutation.isPending,
  }
}
