import type { ReactNode } from 'react'

import { Avatar, Icon } from '@uiKit'

import { formatDateTime } from '@/shared/utils'
import type { Post } from '../../model/types'
import { CommentCard } from '../CommentCard/CommentCard'
import styles from './PostCard.module.scss'

type PostCardProps = {
  post: Post
  // Форма комментария приходит из features: сущность не знает, как создавать комментарий
  commentForm?: ReactNode
}

export function PostCard({ post, commentForm }: PostCardProps) {
  const { author, comments } = post

  return (
    <article className={styles['post']}>
      <Avatar url={author.avatarUrl} size={32} alt={author.username} />

      <div className={styles['post-body']}>
        <div className={styles['post-header']}>
          <span className="sub-title">
            {author.firstName} {author.lastName}
          </span>
          <span className="label">{formatDateTime(post.createdAt)}</span>
        </div>

        <p className="medium-text">{post.content}</p>

        <div className={styles['post-footer']}>
          <p className={styles['comment-amount']}>
            <Icon iconName="comment" width="16" height="16" />
            <span className="label">{comments.length}</span>
          </p>
        </div>

        {comments.length > 0 && (
          <div className={styles['post-comments']}>
            {comments.map((comment) => (
              <CommentCard key={comment.id} comment={comment} />
            ))}
          </div>
        )}

        {commentForm}
      </div>
    </article>
  )
}
