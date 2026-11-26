import clsx from 'clsx'
import { useState } from 'react'
import { useNavigate, useParams } from 'react-router'

import { SearchInput } from '@shared/ui'

import { ChatListItem, useChats } from '@/entities/chat'
import { setToLocalStorage } from '@/shared/utils'

import styles from './ChatsList.module.scss'

const LAST_ACTIVE_CHAT_ID_KEY = '0'

export function ChatsList() {
  const { id } = useParams()
  const navigate = useNavigate()
  const { data: chats, isPending, isError } = useChats()
  const [filteredChats, setFilteredChats] = useState(chats)

  return (
    <div className={styles['chats-list']}>
      <div className={styles['chats-input']}>
        <SearchInput
          id="chat-search"
          placeholder="Поиск чатов"
          items={chats}
          getSearchText={(chat) => `${chat.userFrom.lastName} ${chat.userFrom.firstName}`}
          onSearch={setFilteredChats}
        />
      </div>
      <div className={styles['wrapper']}>
        {isPending ? (
          <div className="spinner" role="status" aria-label="Загрузка чатов" />
        ) : isError ? (
          <p className={clsx('regular-text', styles['status'])}>Не удалось загрузить чаты</p>
        ) : (
          filteredChats?.map((chat) => (
            <ChatListItem
              key={chat.id}
              chatData={chat}
              isActive={id === String(chat.id)}
              onClick={() => {
                setToLocalStorage(LAST_ACTIVE_CHAT_ID_KEY, String(chat.id))
                navigate(`/chats/${chat.id}`)
              }}
            />
          ))
        )}
      </div>
    </div>
  )
}
