import type { ReactNode } from 'react'

import { Avatar, Icon } from '@uiKit'

import { formatDateTime } from '@/shared/utils'
import type { PostData } from '../../model/types'
import { Comment } from '../Comment/Comment'
import styles from './Post.module.scss'

type PostProps = {
  postData: PostData
  // Форма комментария приходит из features: сущность не знает, как создавать комментарий
  commentForm?: ReactNode
}

export function Post({ postData, commentForm }: PostProps) {
  const { author, comments } = postData

  return (
    <article className={styles['post']}>
      <Avatar url={author.avatarUrl} size={32} alt={author.username} />

      <div className={styles['post-body']}>
        <div className={styles['post-header']}>
          <span className="sub-title">
            {author.firstName} {author.lastName}
          </span>
          <span className="label">{formatDateTime(postData.createdAt)}</span>
        </div>

        <p className="medium-text">{postData.content}</p>

        <div className={styles['post-footer']}>
          <p className={styles['comment-amount']}>
            <Icon iconName="comment" width="16" height="16" />
            <span className="label">{comments.length}</span>
          </p>
        </div>

        {comments.length > 0 && (
          <div className={styles['post-comments']}>
            {comments.map((comment) => (
              <Comment key={comment.id} commentData={comment} />
            ))}
          </div>
        )}

        {commentForm}
      </div>
    </article>
  )
}
