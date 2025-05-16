import type { FC } from 'react'
import { Outlet } from 'react-router-dom'
import { Layout } from 'antd'
import styles from './MainLayout.module.scss'

const { Header, Content, Footer } = Layout

const MainLayout: FC = () => {
  return (
    <Layout>
      <Header>header</Header>
      <Content className={styles.content}>
        <Outlet />
      </Content>
      <Footer className={styles.footer}>footer</Footer>
    </Layout>
  )
}

export default MainLayout
