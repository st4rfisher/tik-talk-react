import type { FormEvent } from 'react'

import { TextInput } from '@shared/ui'

import { useSendMessage } from '../model/useSendMessage'

type SendMessageFormProps = {
  chatId: number
}

export function SendMessageForm({ chatId }: SendMessageFormProps) {
  const { text, setText, submit, avatarUrl, isPending } = useSendMessage(chatId)

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    submit()
  }

  return (
    <form onSubmit={handleSubmit}>
      <TextInput
        avatarUrl={avatarUrl}
        placeholder="Напишите сообщение"
        value={text}
        disabled={isPending}
        onChange={(event) => setText(event.target.value)}
        onSend={submit}
      />
    </form>
  )
}
