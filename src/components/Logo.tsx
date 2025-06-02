import { useEffect, useState, type FC } from 'react'
import { Link } from 'react-router-dom'
import { FormOutlined } from '@ant-design/icons'
import { Space } from 'antd'
import { HOME_PATHNAME, MANAGE_LIST_PATHNAME } from '@/router/routes'
import { useGetUserInfo } from '@/hooks/useGetUserInfo'
import styles from './Logo.module.scss'

const Logo: FC = () => {
  const { username } = useGetUserInfo()
  const [pathname, setPathname] = useState(HOME_PATHNAME)

  useEffect(() => {
    if (username) {
      setPathname(MANAGE_LIST_PATHNAME)
    } else {
      setPathname(HOME_PATHNAME)
    }
  }, [username])

  return (
    <Link className={styles.wrapper} to={pathname}>
      <Space>
        <FormOutlined />
        <span>问卷</span>
      </Space>
    </Link>
  )
}

export default Logo
