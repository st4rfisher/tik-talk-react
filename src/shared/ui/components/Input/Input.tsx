import clsx from 'clsx'
import { useState } from 'react'
import type { ComponentProps, ReactNode } from 'react'

import { Icon } from '@uiKit/Icon'
import styles from './Input.module.scss'

type InputProps = ComponentProps<'input'> & { children?: ReactNode; error?: string }

export function Input({ children, className, error, type = 'text', ...props }: InputProps) {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false)
  const isPassword = type === 'password'

  return (
    <label className={styles['label']}>
      {children}
      <span className={styles['input-wrapper']}>
        <input
          {...props}
          className={
            clsx(
              styles['input'], 
              error && styles['input--invalid'],
              className
            )
          }
          type={isPassword && isPasswordVisible ? 'text' : type}
          aria-invalid={Boolean(error)}
        />
        {isPassword && (
          <button
            type="button"
            className={clsx(
              'button',
              styles['button--action'],
              isPasswordVisible && styles['button--active'],
            )}
            aria-label={isPasswordVisible ? 'Скрыть пароль' : 'Показать пароль'}
            onClick={() => setIsPasswordVisible((visible) => !visible)}
          >
            <Icon
              className="icon"
              iconName={isPasswordVisible ? 'eye-crossed' : 'eye'}
              width="24"
              height="24"
            />
          </button>
        )}
      </span>
      {error && <span className={styles['error']}>{error}</span>}
    </label>
  )
}
