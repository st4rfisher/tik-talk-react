import clsx from 'clsx'
import { useRef, useState, type ComponentProps, type InputEvent } from 'react'

import { fitTextareaToContent } from '@/shared/utils'

import { Avatar } from '../Avatar'
import { Icon } from '../Icon'
import styles from './TextInput.module.scss'

type TextInputProps = ComponentProps<'textarea'> & {
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
  const textAreaRef = useRef<HTMLTextAreaElement>(null)
  const [isFocused, setIsFocused] = useState(false)

  function focusTextArea(event: React.MouseEvent<HTMLDivElement>) {
    if ((event.target as HTMLElement).closest('button') && textAreaRef.current?.value.trim() === '') return
    textAreaRef.current?.focus()
  }

  function handleInput(event: InputEvent<HTMLTextAreaElement>) {
    fitTextareaToContent(event.currentTarget)
    onInput?.(event)
  }

  return (
    <div
      className={clsx(
        styles['text-input'],
        variant === 'dashed' && styles['text-input--dashed'],
        isFocused && styles['text-input--focused'],
        className,
      )}
      onClick={focusTextArea}
    >
      <Avatar url={avatarUrl} size={32} />
      <textarea
        {...props}
        ref={textAreaRef}
        className={styles['textarea']}
        rows={1}
        disabled={disabled}
        onInput={handleInput}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
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
