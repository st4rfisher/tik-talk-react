import clsx from 'clsx'

import { Avatar } from '@uiKit'

import { formatDateTime } from '@/shared/utils'

import type { Message } from '../../model/types'
import styles from './ChatMessageItem.module.scss'

type ChatMessageItemProps = {
  message: Message
}

export function ChatMessageItem({ message }: ChatMessageItemProps) {
  const author = message.user

  return (
    <article className={clsx(styles.message, message.isMine && styles['message--mine'])}>
      <Avatar url={author?.avatarUrl} size={32} alt={author?.username ?? ''} />
      <div className={styles['message-container']}>
        <span className={clsx('medium-text', styles['medium-text'])}>
          {author?.firstName} {author?.lastName} {formatDateTime(message.createdAt)}
        </span>
        <span className={styles['message-text']}>{message.text}</span>
      </div>
    </article>
  )
}
