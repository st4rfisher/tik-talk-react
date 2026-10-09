import clsx from 'clsx'
import type { ComponentProps, FormEvent } from 'react'

import { Avatar } from '../Avatar'
import { Icon } from '../Icon'
import styles from './TextInput.module.scss'

type TextInputProps = ComponentProps<'textarea'> & {
  // undefined — без аватара, null — аватар по умолчанию
  avatarUrl?: string | null
  variant?: 'default' | 'dashed'
  onSend: () => void
}

export function TextInput({
  avatarUrl,
  variant = 'default',
  onSend,
  onInput,
  className,
  disabled,
  ...props
}: TextInputProps) {

  function handleInput(event: FormEvent<HTMLTextAreaElement>) {
    const textArea = event.currentTarget
    textArea.style.height = 'auto'
    textArea.style.height = `${textArea.scrollHeight}px`
    onInput?.(event)
  }

  return (
    <div
      className={clsx(
        styles['text-input'],
        variant === 'dashed' && styles['text-input--dashed'],
        className,
      )}
    >
      <Avatar url={avatarUrl} size={32} />
      <textarea
        {...props}
        className={styles['textarea']}
        rows={1}
        disabled={disabled}
        onInput={handleInput}
      />
      <button
        type="button"
        className={clsx('button', 'button--primary')}
        aria-label="Отправить"
        disabled={disabled}
        onClick={onSend}
      >
        <Icon iconName="send" width="24" height="24" />
      </button>
    </div>
  )
}
