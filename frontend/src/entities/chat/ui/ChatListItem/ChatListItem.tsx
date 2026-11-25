import clsx from 'clsx'

import { Avatar } from '@shared/ui'

import type { LastMessageResponse } from '../../model/types'
import styles from './ChatListItem.module.scss'

type ChatListItemProps = {
  chatData: LastMessageResponse
  isActive?: boolean
  onClick?: () => void
}

export function ChatListItem({ chatData, isActive = false, onClick }: ChatListItemProps) {
  const { userFrom } = chatData

  return (
    <button
      type="button"
      className={
        clsx(styles['item'], 
          isActive && styles['active'])}
      onClick={onClick}
    >
      <Avatar url={userFrom.avatarUrl} size={32} alt={userFrom.username} />
      <div className={styles['message']}>
        <span className="medium-text">
          {userFrom.firstName} {userFrom.lastName}
        </span>
        <span className="medium-text">{chatData.message ?? '...'}</span>
      </div>
      {chatData.unreadMessages > 0 && (
        <span className={clsx(styles['counter'], 'medium-text')}>{chatData.unreadMessages}</span>
      )}
    </button>
  )
}
