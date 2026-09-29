import Cookies from 'js-cookie'

export function getCookie(name: string): string | undefined {
  return Cookies.get(name)
}

export function setCookie(name: string, value: string): void {
  Cookies.set(name, value, { path: '/', sameSite: 'lax' })
}

export function removeCookie(name: string): void {
  Cookies.remove(name, { path: '/' })
}
