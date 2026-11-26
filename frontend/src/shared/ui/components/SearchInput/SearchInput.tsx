import clsx from 'clsx'
import { useEffect, useRef, useState, type ChangeEvent, type ComponentProps } from 'react'

type SearchInputProps<T> = ComponentProps<'input'> & {
  items?: T[]
  getSearchText?: (item: T) => string
  onSearch?: (items: T[] | undefined) => void
}

function filterByQuery<T>(items: T[] | undefined, query: string, getSearchText: (item: T) => string) {
  if (!items) return items

  const normalizedQuery = query.toLowerCase()

  return items.filter((item) => getSearchText(item).toLowerCase().includes(normalizedQuery))
}

export function SearchInput<T>({
  id,
  className,
  type = 'text',
  items,
  value,
  getSearchText,
  onSearch,
  onChange,
  ...props
}: SearchInputProps<T>) {
  const [query, setQuery] = useState('')
  const isOwnSearch = typeof getSearchText === 'function'
  const getSearchTextRef = useRef(getSearchText)
  const onSearchRef = useRef(onSearch)

  getSearchTextRef.current = getSearchText
  onSearchRef.current = onSearch

  useEffect(() => {
    const getText = getSearchTextRef.current
    if (!getText) return

    onSearchRef.current?.(filterByQuery(items, query, getText))
  }, [items, query])

  function handleChange(event: ChangeEvent<HTMLInputElement>) {
    if (isOwnSearch) setQuery(event.target.value)
    onChange?.(event)
  }

  return (
    <label className="label" htmlFor={id}>
      <input
        {...props}
        id={id}
        value={isOwnSearch ? query : value}
        className={clsx('input', 'input--border-bottom', className)}
        type={type}
        onChange={handleChange}
      />
    </label>
  )
}
