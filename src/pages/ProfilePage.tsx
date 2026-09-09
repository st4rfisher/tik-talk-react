import { useParams } from 'react-router'

export function ProfilePage() {
  const { id } = useParams()

  return (
    <section className="wrapper">
      <h1 className="h1">Профиль</h1>
      <p className="regular-text">id: {id}</p>
    </section>
  )
}
