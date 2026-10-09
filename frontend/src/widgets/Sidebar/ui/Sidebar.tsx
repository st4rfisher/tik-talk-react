import clsx from 'clsx'
import { Link, NavLink } from 'react-router'

import { Avatar, Icon, Skeleton, SkeletonList } from '@uiKit'

import { SubscriberCard, useProfile, useSubscribers } from '@/entities/profile'

import { menuItems } from '../model/menu'
import styles from './Sidebar.module.scss'

export function Sidebar() {
  const { data: profile, isPending } = useProfile('me')
  const { data: subscribers, isPending: isSubscribersPending } = useSubscribers()

  return (
    <aside className={styles['sidebar']}>
      <img
        className={styles['logo']}
        src="/assets/images/logo-small.svg"
        alt="Лого"
        width="61"
        height="74"
      />
      <nav>
        <ul className={styles['menu-list']}>
          {menuItems.map((menuItem) => (
            <li key={menuItem.link}>
              <NavLink
                className={({ isActive }) =>
                  clsx(
                    styles['menu-button'],
                    isActive && styles['active']
                  )
                }
                to={menuItem.link}
              >
                <Icon iconName={menuItem.icon} width="20" height="20" />
                <span className="sub-title">{menuItem.label}</span>
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>

      <p className={clsx('medium-text', styles['medium-text'])}>Подписчики</p>
      {isSubscribersPending ? (
        <SkeletonList
          skeletonCount={3}
          className={styles['subscriber-skeleton']}
        >
          <Skeleton variant="circle" width="32px" height="32px" />
          <Skeleton width="80%" height="16px" />
        </SkeletonList>
      ) : (
        subscribers?.map((subscriber) => (
          <SubscriberCard key={subscriber.id} profile={subscriber} />
        ))
      )}
      <Link className={styles['to-subscribers-link']} to="/subscribers">
        Все подписчики
        <Icon iconName="arrow" width="20" height="20" />
      </Link>

      <footer className={styles['footer']}>
        {isPending ? (
          <div className={styles['skeleton-user']}>
            <div className={styles['skeleton-user__avatar']} />
            <div className={styles['skeleton-user__line']} />
          </div>
        ) : (
          <div className={styles['user']}>
            <Avatar url={profile?.avatarUrl} size={32} />
            <span className="sub-title">{profile?.username ?? 'Профиль'}</span>
            {/* TODO: features/logout — очистить токены перед переходом на /login */}
            <Link className={clsx('button', 'button--action-danger')} to="/login">
              <Icon iconName="exit" width="20" height="20" />
            </Link>
            <Link className={clsx('button', 'button--action')} to="/settings">
              <Icon iconName="settings" width="20" height="20" />
            </Link>
          </div>
        )}
      </footer>
    </aside>
  )
}
