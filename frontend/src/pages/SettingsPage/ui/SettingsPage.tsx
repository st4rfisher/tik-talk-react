import { ProfileHeader, useProfile } from '@/entities/profile'
import { SetupProfileForm } from '@/features/setupProfile'
import { AvatarUpload, useUploadAvatar } from '@/features/uploadAvatar'

import styles from './SettingsPage.module.scss'

export function SettingsPage() {
  const { data: profile } = useProfile('me')
  const { previewUrl, hasFile, processFile, upload } = useUploadAvatar()

  return (
    <div className={styles['settings-page']}> 
      <div className={styles['settings-page__wrapper']}>
        <ProfileHeader id="me" />
        <div className={styles['settings-page__block']}> 
          <h6 className="h6">Навыки</h6>
          <div className={styles['settings-page__skills']}>
            {
              profile?.stack.map((skill, index) => (
                <div key={skill + index} className={'tag'}>
                  {skill}
                </div>
              ))
            }
          </div>
        </div>
        <div className={styles['settings-page__block']}> 
          <h6 className="h6">О себе</h6>
          <p className="medium-text"> 
            {profile?.description}
          </p>
        </div>
       
      </div>
      <SetupProfileForm
        onSuccessFn={() => {}}
        onSave={upload}
        hasPendingChanges={hasFile}
        avatarComponent={
          <AvatarUpload 
            previewUrl={previewUrl} 
            onProcessFile={processFile} 
          />
        }
      />
    </div>
  )
}
