import type { FC } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { UserAddOutlined } from '@ant-design/icons'
import { Typography, Space, Form, Input, Button, message } from 'antd'
import { useRequest } from 'ahooks'
import { reqRegister } from '@/api/user'
import { LOGIN_PATHNAME } from '@/router/routes'
import styles from './Register.module.scss'

const { Title } = Typography

const Register: FC = () => {
  const nav = useNavigate()

  const { loading, run: handleRegister } = useRequest(
    async (username: string, password: string, nickname: string) => {
      await reqRegister(username, password, nickname)
    },
    {
      manual: true,
      onSuccess: () => {
        message.success('注册成功, 即将跳转登录页')
        setTimeout(() => {
          nav(LOGIN_PATHNAME)
        }, 3000)
      },
    },
  )

  const handleFinish = (vals: any) => {
    const { username, password, nickname } = vals
    handleRegister(username, password, nickname)
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
          labelCol={{ span: 8 }}
          wrapperCol={{ span: 16 }}
          style={{ maxWidth: 600 }}
          autoComplete="off"
          onFinish={handleFinish}
        >
          <Form.Item
            label="用户名"
            name="username"
            rules={[
              {
                required: true,
                message: '请输入用户名',
              },
              {
                type: 'string',
                min: 5,
                max: 20,
                message: '字符长度在 5-20 之间',
              },
              {
                pattern: /^\w+$/,
                message: '只能输入字母数字下划线',
              },
            ]}
          >
            <Input autoComplete="username" />
          </Form.Item>
          <Form.Item
            label="密码"
            name="password"
            rules={[
              {
                required: true,
                message: '请输入密码',
              },
            ]}
          >
            <Input.Password autoComplete="new-password" />
          </Form.Item>
          <Form.Item
            label="确认密码"
            name="confirmPassword"
            dependencies={['password']} // validator 执行会依赖此
            rules={[
              {
                required: true,
                message: '请输入密码',
              },
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (!value || getFieldValue('password') === value) {
                    return Promise.resolve()
                  } else {
                    return Promise.reject(new Error('两次密码输入不一致'))
                  }
                },
              }),
            ]}
          >
            <Input.Password autoComplete="new-password" />
          </Form.Item>
          <Form.Item label="昵称" name="nickname">
            <Input />
          </Form.Item>
          <Form.Item label={null}>
            <Space>
              <Button type="primary" htmlType="submit" loading={loading}>
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
