import type { FC } from 'react'
import { Outlet } from 'react-router-dom'
import { Layout } from 'antd'
import Logo from '@/components/Logo'
import styles from './MainLayout.module.scss'

const { Header, Content, Footer } = Layout

const MainLayout: FC = () => {
  return (
    <Layout>
      <Header>
        <Logo />
      </Header>
      <Content className={styles.content}>
        <Outlet />
      </Content>
      <Footer className={styles.footer}>footer</Footer>
    </Layout>
  )
}

export default MainLayout
