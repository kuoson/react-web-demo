import { type FC } from 'react'
import { Link } from 'react-router-dom'
import { FormOutlined } from '@ant-design/icons'
import { Space } from 'antd'
import styles from './Logo.module.scss'

const Logo: FC = () => {
  return (
    <Link className={styles.wrapper} to="/">
      <Space>
        <FormOutlined />
        <span>问卷</span>
      </Space>
    </Link>
  )
}

export default Logo
