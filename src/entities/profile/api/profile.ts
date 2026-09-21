import { api } from '@/shared/api'
import type { Pageable } from '@/shared/api'

import type { Profile } from '../model/types'

export type ProfileFilters = Record<string, string | number | undefined>

export const profileApi = {
  async getSubscribersShortList(limit = 3): Promise<Profile[]> {
    const { data } = await api.get<Pageable<Profile>>('/account/subscribers/')

    return data.items.slice(0, limit)
  },

  async getTestAccounts(): Promise<Profile[]> {
    const { data } = await api.get<Profile[]>('/account/test_accounts')

    return data
  },

  async getAccount(id: string): Promise<Profile> {
    const { data } = await api.get<Profile>(`/account/${id}`)

    return data
  },

  async getMyAccount(): Promise<Profile> {
    const { data } = await api.get<Profile>('/account/me')

    return data
  },

  async patchProfileData(payload: Partial<Profile>): Promise<Profile> {
    const { data } = await api.patch<Profile>('/account/me', payload)

    return data
  },

  async uploadAvatar(file: File): Promise<Profile> {
    const formData = new FormData()
    formData.append('image', file)

    const { data } = await api.post<Profile>('/account/upload_image', formData)

    return data
  },

  async filterProfiles(params: ProfileFilters): Promise<Pageable<Profile>> {
    const { data } = await api.get<Pageable<Profile>>('/account/accounts', { params })

    return data
  },
}
