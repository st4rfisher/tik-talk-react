import { Outlet } from 'react-router'

export function AppLayout() {
  return (
    <div className="wrapper">
      <Outlet />
    </div>
  )
}
