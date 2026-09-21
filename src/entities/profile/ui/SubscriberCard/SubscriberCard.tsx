import clsx from 'clsx'

import { Avatar } from '@uiKit/Avatar'

import type { Profile } from '../../model/types'
import styles from './SubscriberCard.module.scss'

type SubscriberCardProps = {
  profile: Profile
}

export function SubscriberCard({ profile }: SubscriberCardProps) {
  return (
    <div className={styles['subscriber-card']}>
      <Avatar url={profile.avatarUrl} size={32} alt={profile.lastName} />
      <strong className={clsx('sub-title', styles['sub-title'])}>
        {profile.firstName} {profile.lastName}
      </strong>
    </div>
  )
}
