import type { FC } from 'react'
import { Outlet, useNavigate, useLocation } from 'react-router-dom'
import {
  PlusOutlined,
  UnorderedListOutlined,
  StarOutlined,
  DeleteOutlined,
} from '@ant-design/icons'
import { Button, Space, Divider } from 'antd'
import {
  MANAGE_LIST_PATHNAME,
  MANAGE_STAR_PATHNAME,
  MANAGE_TRASH_PATHNAME,
} from '@/router/routes'
import styles from './ManageLayout.module.scss'

const ManageLayout: FC = () => {
  const nav = useNavigate()
  const { pathname } = useLocation()

  return (
    <div className={styles.wrapper}>
      <div className={styles.left}>
        <Space direction="vertical">
          <Button type="primary" icon={<PlusOutlined />}>
            新建问卷
          </Button>
          <Divider />
          <Button
            icon={<UnorderedListOutlined />}
            type={pathname === MANAGE_LIST_PATHNAME ? 'default' : 'text'}
            onClick={() => {
              nav(MANAGE_LIST_PATHNAME)
            }}
          >
            我的问卷
          </Button>
          <Button
            icon={<StarOutlined />}
            type={pathname === MANAGE_STAR_PATHNAME ? 'default' : 'text'}
            onClick={() => {
              nav(MANAGE_STAR_PATHNAME)
            }}
          >
            星标问卷
          </Button>
          <Button
            icon={<DeleteOutlined />}
            type={pathname === MANAGE_TRASH_PATHNAME ? 'default' : 'text'}
            onClick={() => {
              nav(MANAGE_TRASH_PATHNAME)
            }}
          >
            回收站
          </Button>
        </Space>
      </div>
      <div>
        <Outlet />
      </div>
    </div>
  )
}

export default ManageLayout
