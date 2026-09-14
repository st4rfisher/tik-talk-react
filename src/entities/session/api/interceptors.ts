import type { AxiosError, InternalAxiosRequestConfig } from 'axios'

import { api } from '@/shared/api'

import { tokenStorage } from '../model/token'
import type { RetriableConfig } from '../model/types'
import { authApi } from './auth'

let isRefreshing = false
let refreshRequest: Promise<string> | null = null

function isRequest(url: string | undefined, target: string): boolean {
  return Boolean(url?.includes(target))
}

function addToken(config: InternalAxiosRequestConfig, token: string): InternalAxiosRequestConfig {
  config.headers.Authorization = `Bearer ${token}`
  console.log(config)
  return config
}

function refreshAccessToken(): Promise<string> {
  if (refreshRequest) return refreshRequest

  isRefreshing = true
  let resolve!: (token: string) => void
  let reject!: (reason: unknown) => void
  refreshRequest = new Promise((res, rej) => {
    resolve = res
    reject = rej
  })

  authApi
    .refreshTokens()
    .then((response) => { 
      resolve(response.access_token)
      console.log(response)
    })
    .catch(reject)
    .finally(() => {

      isRefreshing = false
      refreshRequest = null
    })

  return refreshRequest
}

export const authInterceptors = {
  async request(config: InternalAxiosRequestConfig): Promise<InternalAxiosRequestConfig> {
    if (isRequest(config.url, 'dadata.ru')) return config

    const token = tokenStorage.getAccessToken()
    if (!token) return config

    // сам /auth/refresh не ждёт очередь, иначе получится взаимная блокировка
    if (isRequest(config.url, 'refresh')) return addToken(config, token)

    if (isRefreshing) {
      return addToken(config, await refreshAccessToken())
    }

    return addToken(config, token)
  },

  async responseError(error: AxiosError) {
    const config = error.config as (InternalAxiosRequestConfig & RetriableConfig) | undefined

    if (
      error.response?.status !== 403 ||
      !config ||
      config.isRetry ||
      isRequest(config.url, 'dadata.ru') ||
      isRequest(config.url, 'refresh')
    ) {
      throw error
    }

    config.isRetry = true
    return api(addToken(config, await refreshAccessToken()))
  },
}
