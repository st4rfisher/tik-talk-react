import { Skeleton, SkeletonList } from '@uiKit'

import { Post, usePosts } from '@/entities/post'
import { CommentForm } from '@/features/comment'

import styles from './PostFeed.module.scss'

export function PostFeed() {
  const { data: posts, isPending } = usePosts()

  if (isPending) {
    return (
      <div className={styles['post-feed']}>
        <SkeletonList skeletonCount={4}>
          <Skeleton variant="rectangle" width="100%" height="120px" />
        </SkeletonList>
      </div>
    )
  }

  return (
    <div className={styles['post-feed']}>
      {posts?.map((post) => (
        <Post key={post.id} postData={post} commentForm={<CommentForm postId={post.id} />} />
      ))}
    </div>
  )
}
