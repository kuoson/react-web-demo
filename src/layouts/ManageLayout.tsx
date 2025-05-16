import type { FC } from 'react'
import { Outlet, useNavigate, useLocation } from 'react-router-dom'
import {
  PlusOutlined,
  UnorderedListOutlined,
  StarOutlined,
  DeleteOutlined,
} from '@ant-design/icons'
import { Button, Space, Divider } from 'antd'
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
            type={pathname === '/manage/list' ? 'default' : 'text'}
            onClick={() => {
              nav('/manage/list')
            }}
          >
            我的问卷
          </Button>
          <Button
            icon={<StarOutlined />}
            type={pathname === '/manage/star' ? 'default' : 'text'}
            onClick={() => {
              nav('/manage/star')
            }}
          >
            星标问卷
          </Button>
          <Button
            icon={<DeleteOutlined />}
            type={pathname === '/manage/trash' ? 'default' : 'text'}
            onClick={() => {
              nav('/manage/trash')
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
