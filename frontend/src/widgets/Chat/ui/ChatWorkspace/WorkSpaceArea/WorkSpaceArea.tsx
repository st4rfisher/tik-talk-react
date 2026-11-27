import clsx from 'clsx'

import { Avatar } from '@shared/ui'

import { SendMessageForm } from '@/features/sendMessage'
import { formatDateTime } from '@/shared/utils'

import { useWorkspaceArea } from '../../../model/useWorkspaceArea'
import { WorkspaceHeader } from '../WorkspaceHeader/WorkspaceHeader'
import styles from './WorkSpaceArea.module.scss'

export function WorkspaceArea() {
  const { chat, hasSelection, isPending, isError } = useWorkspaceArea()

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
            <article
              key={message.id}
              className={clsx(styles.message, message.isMine && styles['message--mine'])}
            >
              <Avatar url={message.user?.avatarUrl} size={32} alt={message.user?.username ?? ''} />
              <div className={styles['message-container']}>
                <span className={clsx('medium-text', styles['medium-text'])}>
                  {message.user?.firstName} {message.user?.lastName} {formatDateTime(message.createdAt)}
                </span>
                <span className={styles['message-text']}>{message.text}</span>
              </div>
            </article>
          ))}
        </div>
        <div className={styles.composer}>
          <SendMessageForm chatId={chat.id} />
        </div>
      </div>
    </section>
  )
}
