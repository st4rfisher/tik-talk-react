import { Avatar } from '@uiKit'

import { formatDateTime } from '@/shared/utils'
import type { CommentData } from '../../model/types'
import styles from './Comment.module.scss'

type CommentProps = {
  commentData: CommentData
}

export function Comment({ commentData }: CommentProps) {
  return (
    <div className={styles['comment']}>
      <Avatar url={commentData.author.avatarUrl} size={32} alt={commentData.author.username} />

      <div className={styles['comment-body']}>
        <header className={styles['comment-header']}>
          <span className="medium-text">{commentData.author.username}</span>
          <span className="medium-text">{formatDateTime(commentData.createdAt)}</span>
        </header>
        <div className={styles['comment-text']}>{commentData.text}</div>
      </div>
    </div>
  )
}
