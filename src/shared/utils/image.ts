import { replacePrefix } from './url'

const DEFAULT_AVATAR = '/assets/images/default-avatar.svg'

export function imageUrl(path: string | null | undefined): string {
  if (!path) return DEFAULT_AVATAR
  if (path.startsWith('http')) return path

  return `${import.meta.env.VITE_API_BASE_URL}/${replacePrefix(path, '/')}`
}
