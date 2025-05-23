import type { FC } from 'react'
import { Link } from 'react-router-dom'
import { UserOutlined } from '@ant-design/icons'
import { Typography, Space, Form, Input, Button } from 'antd'
import { REGISTER_PATHNAME } from '@/router/routes'
import styles from './Login.module.scss'

const { Title } = Typography

const Login: FC = () => {
  const handleFinish = (vals: any) => {
    console.log(vals)
  }

  return (
    <div className={styles.wrapper}>
      <div>
        <Space>
          <Title level={2}>
            <UserOutlined />
          </Title>
          <Title level={2}>用户登录</Title>
        </Space>
      </div>
      <div>
        <Form
          name="basic"
          labelCol={{ span: 6 }}
          wrapperCol={{ span: 18 }}
          style={{ maxWidth: 600 }}
          autoComplete="off"
          onFinish={handleFinish}
        >
          <Form.Item label="用户名" name="username">
            <Input autoComplete="username" />
          </Form.Item>
          <Form.Item label="密码" name="password">
            <Input.Password autoComplete="new-password" />
          </Form.Item>
          <Form.Item label={null}>
            <Space>
              <Button type="primary" htmlType="submit">
                登录
              </Button>
              <Link to={REGISTER_PATHNAME}>注册新用户</Link>
            </Space>
          </Form.Item>
        </Form>
      </div>
    </div>
  )
}

export default Login
