import { Chat } from '@/widgets/Chat'

import styles from './ChatsPage.module.scss'

export function ChatsPage() {
  return (
    <section className={styles.page}>
      <Chat />
    </section>
  )
}
