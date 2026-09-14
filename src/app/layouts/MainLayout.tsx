import { Outlet } from 'react-router'

export function MainLayout() {
  return (
    <div className="wrapper">
      <Outlet />
    </div>
  )
}
