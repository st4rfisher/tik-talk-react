import { useMutation } from '@tanstack/react-query'
import { useState } from 'react'

import { profileMutations, useProfile } from '@/entities/profile'
import { imageUrl } from '@/shared/utils'

export function useUploadAvatar() {
  const { data: profile } = useProfile('me')
  const uploadAvatar = useMutation(profileMutations.uploadAvatar())
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

    await uploadAvatar.mutateAsync(file)
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
