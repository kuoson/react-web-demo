import type { FC } from 'react'
import { useNavigate } from 'react-router-dom'
import { Space, Divider, Typography, Button } from 'antd'
import { useNavStartPage } from '@/hooks/useNavStartPage'
import styles from './Home.module.scss'

const { Title, Paragraph } = Typography

const Home: FC = () => {
  const nav = useNavigate()
  const { pathname } = useNavStartPage()

  return (
    <div className={styles.wrapper}>
      <Space split={<Divider type="vertical" />}>
        <Title>问卷调查</Title>
        <Title>在线投票</Title>
      </Space>
      <Paragraph>
        已累计创建问卷 1090 份，发布问卷 100 份，收到答卷 10000 份
      </Paragraph>
      <div>
        <Button
          type="primary"
          size="large"
          onClick={() => {
            nav(pathname)
          }}
        >
          开始使用
        </Button>
      </div>
    </div>
  )
}

export default Home
