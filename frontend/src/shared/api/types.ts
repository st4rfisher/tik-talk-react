import type { AxiosError, InternalAxiosRequestConfig } from 'axios'

export type Pageable<T> = {
  items: T[]
  total: number
  page: number
  size: number
  pages: number
}

export type ApiInterceptors = {
  request: (
    config: InternalAxiosRequestConfig,
  ) => InternalAxiosRequestConfig | Promise<InternalAxiosRequestConfig>
  responseError: (error: AxiosError) => unknown
}
