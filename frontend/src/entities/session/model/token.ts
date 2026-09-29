import { queryOptions } from '@tanstack/react-query'

import { queryClient } from '@/shared/query'
import { getCookie, removeCookie, setCookie } from '@/shared/utils'

import type { Session, TokenResponse } from './types'

const ACCESS_TOKEN = 'token'
const REFRESH_TOKEN = 'refreshToken'

export const sessionQueries = {
  getCurrent: () =>
    queryOptions({
      queryKey: ['session'] as const,
      queryFn: (): Session => ({
        hasAccess: Boolean(getCookie(ACCESS_TOKEN)),
      }),
      staleTime: Infinity,
    }),
}

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
    queryClient.setQueryData(sessionQueries.getCurrent().queryKey, { hasAccess: true })
  },

  clear(): void {
    removeCookie(ACCESS_TOKEN)
    removeCookie(REFRESH_TOKEN)
    queryClient.setQueryData(sessionQueries.getCurrent().queryKey, { hasAccess: false })
  },
}
