import { type FC } from 'react'
import { Link } from 'react-router-dom'
import { FormOutlined } from '@ant-design/icons'
import { Space } from 'antd'
import { useNavStartPage } from '@/hooks/useNavStartPage'
import styles from './Logo.module.scss'

const Logo: FC = () => {
  const { pathname } = useNavStartPage()

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
