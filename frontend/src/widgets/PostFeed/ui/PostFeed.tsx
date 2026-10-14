import clsx from 'clsx'

import { Icon, Skeleton, SkeletonList } from '@uiKit'

import { Post, usePosts } from '@/entities/post'
import { useProfile } from '@/entities/profile'
import { CreateCommentForm } from '@/features/createComment'
import { CreatePostForm } from '@/features/createPost'

import styles from './PostFeed.module.scss'

type PostFeedProps = {
  profileId: string
}

export function PostFeed({ profileId }: PostFeedProps) {
  const { isMyProfile } = useProfile(profileId)
  const { data: posts, isError, isPending } = usePosts()

  if (isError) {
    return <p className="regular-text">Не удалось загрузить посты</p>
  }

  if (isPending) {
    return (
      <div className={styles['post-feed']}>
        <SkeletonList skeletonCount={4}>
          <Skeleton variant="rectangle" width="100%" height="120px" />
        </SkeletonList>
      </div>
    )
  }

  if (posts.length === 0) {
    return (
      <div className={styles['empty-block']}>
        <h3 className={clsx('h4', styles['h4'])}>Здесь пока нет постов</h3>
        <Icon iconName="post" width="120" height="120" />
      </div>
    )
  }

  return (
    <div className={styles['post-feed']}>
      {isMyProfile && <CreatePostForm/>}
      
      {posts?.map((post) => (
        <Post 
          key={post.id} 
          postData={post} 
          commentForm={<CreateCommentForm postId={post.id} />}
        />
      ))}
    </div>
  )
}
