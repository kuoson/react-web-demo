import type { FC } from 'react'
import { Outlet } from 'react-router-dom'
import { Layout } from 'antd'
import useRoutePermission from '@/hooks/useRoutePermission'
import Logo from '@/components/Logo'
import UserInfo from '@/components/UserInfo'
import styles from './MainLayout.module.scss'

const { Header, Content, Footer } = Layout

const MainLayout: FC = () => {
  const { loading } = useRoutePermission()

  return (
    !loading && (
      <Layout>
        <Header className={styles.header}>
          <Logo />
          <UserInfo />
        </Header>
        <Content className={styles.content}>
          <Outlet />
        </Content>
        <Footer className={styles.footer}>footer</Footer>
      </Layout>
    )
  )
}

export default MainLayout
