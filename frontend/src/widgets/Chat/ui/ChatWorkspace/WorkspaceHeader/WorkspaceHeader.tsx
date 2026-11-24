import { Avatar } from '@uiKit'

import type { ChatUser } from '@/entities/chat'

import styles from './WorkspaceHeader.module.scss'

type WorkspaceHeaderProps = {
  companion?: ChatUser
}

export function WorkspaceHeader({ companion }: WorkspaceHeaderProps) {
  if (!companion) return null

  return (
    <header className={styles.header}>
      <div className={styles.wrapper}>
        <Avatar url={companion.avatarUrl} size={32} alt={companion.username} />
        <div className="sub-title">
          {companion.firstName} {companion.lastName}
        </div>
      </div>
    </header>
  )
}
