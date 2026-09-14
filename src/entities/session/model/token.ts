import { getCookie, removeCookie, setCookie } from '@/shared/utils'

import type { TokenResponse } from './types'

const ACCESS_TOKEN = 'token'
const REFRESH_TOKEN = 'refreshToken'

export const tokenStorage = {
  getAccessToken(): string | undefined {
    return getCookie(ACCESS_TOKEN)
  },

  getRefreshToken(): string | undefined {
    return getCookie(REFRESH_TOKEN)
  },

  hasAccessToken(): boolean {
    return Boolean(tokenStorage.getAccessToken())
  },

  save(response: TokenResponse): void {
    setCookie(ACCESS_TOKEN, response.access_token)
    setCookie(REFRESH_TOKEN, response.refresh_token)
  },

  clear(): void {
    removeCookie(ACCESS_TOKEN)
    removeCookie(REFRESH_TOKEN)
  },
}
