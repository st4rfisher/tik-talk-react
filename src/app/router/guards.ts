import { redirect } from 'react-router'

import { tokenStorage } from '@/entities/session'

export function requireAuth() {
  if (!tokenStorage.hasAccessToken()) {
    throw redirect('/login')
  }

  return null
}
