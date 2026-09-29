import clsx from 'clsx'
import { Link } from 'react-router'

import { Avatar } from '@uiKit/Avatar'
import { Icon } from '@uiKit/Icon'
import { Skeleton } from '@uiKit/Skeletons'

import { useProfile } from '../../model/useProfile'
import styles from './ProfileHeader.module.scss'

type ProfileHeaderProps = {
  id: string | undefined
}

export function ProfileHeader({ id }: ProfileHeaderProps) {
  const { data: profile, isPending, isError, isMyProfile } = useProfile(id)

  if (isPending) {
    return (
      <div className={styles['skeleton-user']}>
        <Skeleton variant="circle" width="112px" height="112px" />
        <div className={styles['skeleton-user__inner']}>
          <Skeleton width="180px" height="24px" />
          <Skeleton width="96px" height="16px" />
        </div>
        <Skeleton width="155px" height="40px" />
      </div>
    )
  }

  if (isError || !profile) {
    return <p className="regular-text">Не удалось загрузить профиль</p>
  }

  return (
    <div className={styles['profile-header']}>
      <Avatar url={profile.avatarUrl} size={112} />
      <div>
        <p className="h4">
          {profile.firstName} {profile.lastName}
        </p>
        <span className="regular-text">{profile.username}</span>
      </div>
      {isMyProfile ? (
        <Link className={clsx('button', 'button--primary')} to="/settings">
          Редактировать
          <Icon iconName="settings" width="16" height="16" />
        </Link>
      ) : (
        // TODO: переход на /chats/new?userId=<id профиля>
        <button type="button" className={clsx('button', 'button--primary')}>
          Написать
          <Icon iconName="send" width="16" height="16" />
        </button>
      )}
    </div>
  )
}
