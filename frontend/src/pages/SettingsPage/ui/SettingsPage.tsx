import { ProfileHeader } from '@/entities/profile'
import { SetupProfileForm } from '@/features/setupProfile'

import styles from './SettingsPage.module.scss'

export function SettingsPage() {
  return (
    <div className={styles['settings-page']}>
      <ProfileHeader id="me" />
      <SetupProfileForm onSuccessFn={() => {}} />
    </div>
  )
}
