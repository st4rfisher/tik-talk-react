export type MenuItem = {
  label: string
  icon: string
  link: string
}

export const menuItems: MenuItem[] = [
  { label: 'Моя страница', icon: 'home', link: '/profile/me' },
  { label: 'Чаты', icon: 'chat', link: '/chats' },
  { label: 'Поиск', icon: 'search', link: '/search' },
]
