import clsx from 'clsx'
import { Link, NavLink } from 'react-router'
import { Icon } from '@uiKit/Icon'

import { menuItems } from '../model/menu'
import styles from './Sidebar.module.scss'

export function Sidebar() {
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
      {/* TODO: список подписчиков из entities/profile через useQuery + скелетон на загрузке */}
      <Link className={styles['to-subscribers-link']} to="/subscribers">
        Все подписчики
        <Icon iconName="arrow" width="20" height="20" />
      </Link>

      <footer className={styles['footer']}>
        {/* TODO: свой профиль из entities/profile — аватар через imageUrl и username */}
        <div className={styles['user']}>
          <img
            className="avatar"
            src="/assets/images/default-avatar.svg"
            alt=""
            width="32"
            height="32"
          />
          <span className="sub-title">Профиль</span>
          {/* TODO: features/logout — очистить токены перед переходом на /login */}
          <Link className={clsx('button', 'button--action-danger')} to="/login">
            <Icon iconName="exit" width="20" height="20" />
          </Link>
          <Link className={clsx('button', 'button--action')} to="/settings">
            <Icon iconName="settings" width="20" height="20" />
          </Link>
        </div>
      </footer>
    </aside>
  )
}
