import clsx from 'clsx'
import { Outlet } from 'react-router'

import { Sidebar } from '@/widgets/Sidebar'
import styles from './MainLayout.module.scss'

export function MainLayout() {
  return (
    <div className={
      clsx(
        'wrapper', 
        styles['layout']
      )
    }>
      <Sidebar />
      <main className={styles.main}>
        <Outlet />
      </main>
    </div>
  )
}
