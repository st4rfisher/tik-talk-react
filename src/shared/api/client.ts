import axios from 'axios'
import type { AxiosError, InternalAxiosRequestConfig } from 'axios'

export const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
})

type ApiInterceptors = {
  request: (
    config: InternalAxiosRequestConfig,
  ) => InternalAxiosRequestConfig | Promise<InternalAxiosRequestConfig>
  responseError: (error: AxiosError) => unknown
}

let isInitialized = false

export function initApi(interceptors: ApiInterceptors): void {
  if (isInitialized) return

  api.interceptors.request.use(interceptors.request)
  api.interceptors.response.use((response) => response, interceptors.responseError)
  isInitialized = true
}
