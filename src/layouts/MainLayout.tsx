import type { FC } from 'react'
import { Outlet } from 'react-router-dom'

const MainLayout: FC = () => {
  return (
    <>
      <div>header</div>
      <div>
        <Outlet />
      </div>
      <div>footer</div>
    </>
  )
}

export default MainLayout
