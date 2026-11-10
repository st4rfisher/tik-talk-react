import clsx from 'clsx'
import { useState, type ComponentProps, type KeyboardEvent } from 'react'

import { Icon } from '../Icon'
import styles from './ChipsInput.module.scss'

type ChipsInputProps = Omit<ComponentProps<'input'>, 'value' | 'defaultValue' | 'onChange'> & {
  value?: string[] | null
  onChange: (value: string[]) => void
  error?: string
}

export function ChipsInput({
  value,
  onChange,
  onBlur,
  onKeyDown,
  disabled,
  error,
  className,
  ref,
  ...props
}: ChipsInputProps) {
  const [draft, setDraft] = useState('')
  const skills = value ?? []

  function commitDraft() {
    const skill = draft.trim()
    if (!skill) return

    onChange([...skills, skill])
    setDraft('')
  }

  function deleteSkill(index: number) {
    onChange(skills.filter((_, skillIndex) => skillIndex !== index))
  }

  function handleKeyDown(event: KeyboardEvent<HTMLInputElement>) {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault()
      event.stopPropagation()
      commitDraft()
    }

    onKeyDown?.(event)
  }

  return (
    <div className={className}>
      <div className={
        clsx(
          styles['stack-control'], 
          disabled && styles['disabled'],
          error && styles['error-input'],
          error && styles['error'])}>
        {
          skills.map((skill, index) => (
            <span key={`${skill}-${index}`} className={clsx('tag', styles['stack-tag'])}>
              <button
                type="button"
                className={clsx('button', 'button--action')}
                aria-label={`Удалить ${skill}`}
                disabled={disabled}
                onClick={() => deleteSkill(index)}
              >
                <Icon iconName="cross" width="16" height="16" />
              </button>
              {skill}
            </span>
          ))
        }
        <input
          {...props}
          ref={ref}
          className={styles['stack-ghost-input']}
          type="text"
          value={draft}
          disabled={disabled}
          autoComplete="off"
          aria-invalid={Boolean(error)}
          onChange={(event) => setDraft(event.target.value)}
          onKeyDown={handleKeyDown}
          onBlur={onBlur}
        />
      </div>
      {
        error ? 
          <span className={styles['error']}>{error}</span> 
        : null
      }
    </div>
  )
}
