import { api } from '@/shared/api'

import { tokenStorage } from '../model/token'
import type { TokenResponse } from '../model/types'

export type LoginPayload = {
  username: string
  password: string
}

export const authApi = {
  // бэкенд принимает логин только как x-www-form-urlencoded, на JSON отвечает 422
  async login(payload: LoginPayload): Promise<TokenResponse> {
    const { data } = await api.post<TokenResponse>('/auth/token', new URLSearchParams(payload))
    tokenStorage.save(data)

    return data
  },

  async logout(): Promise<void> {
    try {
      await api.post('/auth/logout', {})
    } finally {
      tokenStorage.clear()
    }
  },

  async refreshTokens(): Promise<TokenResponse> {
    try {
      const { data } = await api.post<TokenResponse>('/auth/refresh', {
        refresh_token: tokenStorage.getRefreshToken(),
      })
      tokenStorage.save(data)

      return data
    } catch (error) {
      tokenStorage.clear()
      throw error
    }
  },
}
