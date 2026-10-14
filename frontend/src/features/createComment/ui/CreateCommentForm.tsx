import type { FormEvent } from 'react'

import { TextInput } from '@uiKit'

import { useCreateComment } from '../model/useCreateComment'

type CreateCommentFormProps = {
  postId: number
}

export function CreateCommentForm({ postId }: CreateCommentFormProps) {
  const { text, setText, submit, avatarUrl, isPending } = useCreateComment(postId)

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    submit()
  }

  return (
    <form onSubmit={handleSubmit}>
      <TextInput
        avatarUrl={avatarUrl}
        variant="dashed"
        placeholder="Напишите комментарий"
        value={text}
        disabled={isPending}
        onChange={(event) => setText(event.target.value)}
        onSend={submit}
      />
    </form>
  )
}
