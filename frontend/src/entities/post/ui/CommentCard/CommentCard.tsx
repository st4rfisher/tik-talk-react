import { Avatar } from '@uiKit'

import { formatDateTime } from '@/shared/utils'
import type { PostComment } from '../../model/types'
import styles from './CommentCard.module.scss'

type CommentCardProps = {
  comment: PostComment
}

export function CommentCard({ comment }: CommentCardProps) {
  return (
    <div className={styles['comment']}>
      <Avatar url={comment.author.avatarUrl} size={32} alt={comment.author.username} />

      <div className={styles['comment-body']}>
        <header className={styles['comment-header']}>
          <span className="medium-text">{comment.author.username}</span>
          <span className="medium-text">{formatDateTime(comment.createdAt)}</span>
        </header>
        <div className={styles['comment-text']}>{comment.text}</div>
      </div>
    </div>
  )
}
