import clsx from 'clsx'
import { Link, useParams } from 'react-router'

import { Icon } from '@uiKit/Icon'

import { ProfileHeader, useProfile } from '@/entities/profile'

import styles from './ProfilePage.module.scss'

export function ProfilePage() {
  const { id } = useParams()
  const { data: profile, isMyProfile } = useProfile(id)

  return (
    <>
      <header className={styles['header']}>
        <ProfileHeader id={id} />
      </header>

      <div className={styles['main']}>
        <div className={styles['left-side']}>
          {isMyProfile ? (
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
              {profile ? (
                <span className={styles['subscribers-count']}>{profile.subscribersAmount}</span>
              ) : null}
            </h3>
            {/* TODO: подписчики из entities/profile — аватары со ссылкой на /profile/:id */}
            <Link className={styles['subscribers-button']} to="/search">
              <Icon iconName="plus" width="16" height="16" />
            </Link>
          </div>

          <div className={styles['block']}>
            <h3 className={clsx('h6', styles['h6'])}>Навыки</h3>
            {profile?.stack?.map((skill) => (
              <span key={skill} className="tag">
                {skill}
              </span>
            ))}
          </div>

          <div className={styles['block']}>
            <h3 className={clsx('h6', styles['h6'])}>О себе</h3>
            {profile?.description ? (
              <p className="medium-text">{profile.description}</p>
            ) : null}
          </div>
        </div>
      </div>
    </>
  )
}
