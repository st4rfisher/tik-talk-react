import { useSearchParams } from 'react-router'

export function NewChatPage() {
  const [searchParams] = useSearchParams()

  return (
    <section className="wrapper">
      <h1 className="h1">Новый чат</h1>
      <p className="regular-text">userId: {searchParams.get('userId')}</p>
    </section>
  )
}
