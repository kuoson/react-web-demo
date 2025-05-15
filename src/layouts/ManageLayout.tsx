import type { FC } from 'react'
import { Outlet } from 'react-router-dom'
import styles from './ManageLayout.module.scss'

const ManageLayout: FC = () => {
  return (
    <>
      <div className={styles.left}>left</div>
      <div>
        <Outlet />
      </div>
    </>
  )
}

export default ManageLayout
