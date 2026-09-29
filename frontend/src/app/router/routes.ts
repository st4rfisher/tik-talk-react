import { createBrowserRouter, redirect } from 'react-router'

import { MainLayout } from '@/app/layouts'
import { LoginPage } from '@/pages/LoginPage'
import { ProfilePage } from '@/pages/ProfilePage'
import { SearchPage } from '@/pages/SearchPage'
import { SettingsPage } from '@/pages/SettingsPage'
import { ChatPage, ChatsPage, NewChatPage } from '@/pages/Сhats'

import { requireAuth } from './guards'

export const router = createBrowserRouter([
  {
    path: '/login',
    Component: LoginPage,
  },
  {
    path: '/',
    loader: requireAuth,
    Component: MainLayout,
    children: [
      {
        index: true,
        loader: () => redirect('/profile/me'),
      },
      {
        path: 'profile/:id',
        Component: ProfilePage,
      },
      {
        path: 'settings',
        Component: SettingsPage,
      },
      {
        path: 'search',
        Component: SearchPage,
      },
      {
        path: 'chats',
        children: [
          {
            index: true,
            Component: ChatsPage,
          },
          {
            path: 'new',
            Component: NewChatPage,
          },
          {
            path: ':id',
            Component: ChatPage,
          },
        ],
      },
    ],
  },
])
