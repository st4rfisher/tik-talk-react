import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { useState } from 'react'

import { postApi, postQueries } from '@/entities/post'
import { profileQueries } from '@/entities/profile'

export function useCreatePost() {
  const [text, setText] = useState('')
  const queryClient = useQueryClient()
  const { data: me } = useQuery(profileQueries.getProfileById('me'))

  const mutation = useMutation({
    mutationFn: postApi.createPost,
    onSuccess: async () => {
      setText('')
      await queryClient.invalidateQueries({ queryKey: postQueries.getPosts().queryKey })
    },
  })

  function submit() {
    const trimmed = text.trim()
    if (!trimmed || !me) return

    mutation.mutate({ content: trimmed, authorId: me.id })
  }

  return {
    text,
    setText,
    submit,
    avatarUrl: me?.avatarUrl ?? null,
    isPending: mutation.isPending,
  }
}
