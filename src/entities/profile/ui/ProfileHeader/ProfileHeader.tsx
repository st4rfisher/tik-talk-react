import { Avatar } from '@uiKit/Avatar'

import type { Profile } from '../../model/types'
import styles from './ProfileHeader.module.scss'

type ProfileHeaderProps = {
  profile: Profile
}

export function ProfileHeader({ profile }: ProfileHeaderProps) {
  return (
    <div className={styles['profile-header']}>
      <Avatar url={profile.avatarUrl} size={112} />
      <div>
        <p className="h4">
          {profile.firstName} {profile.lastName}
        </p>
        <span className="regular-text">{profile.username}</span>
      </div>
    </div>
  )
}
