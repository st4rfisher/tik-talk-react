import type { FormEvent } from 'react'

import { TextInput } from '@uiKit'

import { useCreatePost } from '../model/useCreatePost'

export function CreatePostForm() {
  const { text, setText, submit, avatarUrl, isPending } = useCreatePost()

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    submit()
  }

  return (
    <form onSubmit={handleSubmit}>
      <TextInput
        avatarUrl={avatarUrl}
        placeholder="Напишите что-нибудь"
        value={text}
        disabled={isPending}
        onChange={(event) => setText(event.target.value)}
        onSend={submit}
      />
    </form>
  )
}
