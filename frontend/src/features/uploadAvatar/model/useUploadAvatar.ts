import { useState } from 'react'

import { profileApi, profileQueries, useProfile, type Profile } from '@/entities/profile'
import { queryClient } from '@/shared/query'
import { imageUrl } from '@/shared/utils'

export function useUploadAvatar() {
  const { data: profile } = useProfile('me')
  const [file, setFile] = useState<File | null>(null)
  const [localPreview, setLocalPreview] = useState<string | null>(null)

  function processFile(nextFile: File | null | undefined) {
    if (!nextFile || !nextFile.type.match('image')) return

    const reader = new FileReader()

    reader.onload = () => {
      setLocalPreview(typeof reader.result === 'string' ? reader.result : null)
    }

    reader.readAsDataURL(nextFile)
    setFile(nextFile)
  }

  async function upload() {
    if (!file) return

    const updated = await profileApi.uploadAvatar(file)
    const queryKey = profileQueries.getProfileById('me').queryKey

    queryClient.setQueryData<Profile>(queryKey, (current) =>
      current ? { ...current, ...updated } : updated,
    )
    setFile(null)
    setLocalPreview(null)
  }

  return {
    previewUrl: localPreview ?? imageUrl(profile?.avatarUrl),
    hasFile: file !== null,
    processFile,
    upload,
  }
}
