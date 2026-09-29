import axios from 'axios'

import type { ApiInterceptors } from './types'

export const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
})

let isInitialized = false

export function initApi(interceptors: ApiInterceptors): void {
  if (isInitialized) return

  api.interceptors.request.use(interceptors.request)
  api.interceptors.response.use((response) => response, interceptors.responseError)
  isInitialized = true
}
