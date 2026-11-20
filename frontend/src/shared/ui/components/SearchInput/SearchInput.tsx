import clsx from 'clsx'
import type { ComponentProps } from 'react'

type SearchInputProps = ComponentProps<'input'>

export function SearchInput({ className, type = 'text', id, ...props }: SearchInputProps) {
  return (
    <label className="label" htmlFor={id}>
      <input
        {...props}
        id={id}
        className={clsx('input', 'input--border-bottom', className)}
        type={type}
      />
    </label>
  )
}
