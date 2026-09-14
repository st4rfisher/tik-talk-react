import { useParams } from 'react-router'

export function ChatPage() {
  const { id } = useParams()

  return (
    <section className="wrapper">
      <h1 className="h1">Чат</h1>
      <p className="regular-text">id: {id}</p>
    </section>
  )
}
