import type { FC } from 'react'
import { Link } from 'react-router-dom'
import { UserAddOutlined } from '@ant-design/icons'
import { Typography, Space, Form, Input, Button } from 'antd'
import { LOGIN_PATHNAME } from '@/router/routes'
import styles from './Register.module.scss'

const { Title } = Typography

const Register: FC = () => {
  const handleFinish = (vals: any) => {
    console.log(vals)
  }

  return (
    <div className={styles.wrapper}>
      <div>
        <Space>
          <Title level={2}>
            <UserAddOutlined />
          </Title>
          <Title level={2}>注册新用户</Title>
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
          <Form.Item label="确认密码" name="confirmPassword">
            <Input.Password autoComplete="new-password" />
          </Form.Item>
          <Form.Item label="昵称" name="nickname">
            <Input />
          </Form.Item>
          <Form.Item label={null}>
            <Space>
              <Button type="primary" htmlType="submit">
                注册
              </Button>
              <Link to={LOGIN_PATHNAME}>已有账户，请登录</Link>
            </Space>
          </Form.Item>
        </Form>
      </div>
    </div>
  )
}

export default Register
