export type TokenResponse = {
  access_token: string
  refresh_token: string
}

export type Session = {
  hasAccess: boolean
}

export type RetriableConfig = {
  isRetry?: boolean
}
