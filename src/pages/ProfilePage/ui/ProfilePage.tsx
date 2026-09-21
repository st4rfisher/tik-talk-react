import clsx from 'clsx'
import { Link, useParams } from 'react-router'

import { Icon } from '@uiKit/Icon'

import styles from './ProfilePage.module.scss'

export function ProfilePage() {
  const { id } = useParams()
  // TODO: сравнивать ещё и с id своего профиля, когда появится запрос профиля
  const isMyPage = id === 'me'

  return (
    <>
      <header className={styles['header']}>
        {/* TODO: ProfileHeader из entities/profile + скелетон на загрузке */}
        {isMyPage ? (
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
      </header>

      <div className={styles['main']}>
        <div className={styles['left-side']}>
          {isMyPage ? (
            // TODO: лента постов — widgets/PostFeed
            null
          ) : (
            <div className={styles['empty-block']}>
              <h3 className={clsx('h4', styles['h4'])}>Здесь пока нет постов от пользователя</h3>
              <Icon iconName="post" width="120" height="120" />
            </div>
          )}
        </div>

        <div>
          <div className={styles['block']}>
            <h3 className={clsx('h6', styles['h6'])}>
              Подписчики
              {/* TODO: количество подписчиков в span.subscribers-count */}
            </h3>
            {/* TODO: подписчики из entities/profile — аватары со ссылкой на /profile/:id */}
            <Link className={styles['subscribers-button']} to="/search">
              <Icon iconName="plus" width="16" height="16" />
            </Link>
          </div>

          <div className={styles['block']}>
            <h3 className={clsx('h6', styles['h6'])}>Навыки</h3>
            {/* TODO: profile.stack — по тегу span.tag на навык */}
          </div>

          <div className={styles['block']}>
            <h3 className={clsx('h6', styles['h6'])}>О себе</h3>
            {/* TODO: profile.description в p.medium-text */}
          </div>
        </div>
      </div>
    </>
  )
}
