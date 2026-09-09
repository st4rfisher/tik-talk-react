import { redirect } from 'react-router'

import { hasAccessToken } from '@/entities/session'

export function requireAuth() {
  if (!hasAccessToken()) {
    throw redirect('/login')
  }

  return null
}
