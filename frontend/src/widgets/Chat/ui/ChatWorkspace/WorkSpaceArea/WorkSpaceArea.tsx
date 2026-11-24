import clsx from 'clsx'

import { ChatMessageItem } from '@/entities/chat'
import { SendMessageForm } from '@/features/sendMessage'

import { useChatWorkspace } from '../../../model/useChatWorkspace'
import { WorkspaceHeader } from '../WorkspaceHeader/WorkspaceHeader'
import styles from './WorkSpaceArea.module.scss'

export function WorkSpaceArea() {
  const { chat, hasSelection, isPending, isError } = useChatWorkspace()

  if (!hasSelection) {
    return <div className={styles.workspace} />
  }

  if (isPending) {
    return (
      <div className={styles.workspace}>
        <div className="spinner" role="status" aria-label="Загрузка чата" />
      </div>
    )
  }

  if (isError || !chat) {
    return (
      <div className={styles.workspace}>
        <p className={clsx('regular-text', styles.status)}>Не удалось открыть чат</p>
      </div>
    )
  }

  return (
    <section className={styles.workspace}>
      <WorkspaceHeader companion={chat.companion} />
      <div className={styles.messages}>
        <div className={styles['messages-wrapper']}>
          {chat.messages.map((message) => (
            <ChatMessageItem key={message.id} message={message} />
          ))}
        </div>
        <div className={styles.composer}>
          <SendMessageForm chatId={chat.id} />
        </div>
      </div>
    </section>
  )
}
