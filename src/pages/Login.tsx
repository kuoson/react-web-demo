import { useEffect, type FC } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { UserOutlined } from '@ant-design/icons'
import { Typography, Space, Form, Input, Button, Checkbox, message } from 'antd'
import { useRequest } from 'ahooks'
import { useDispatch } from 'react-redux'
import { reqLogin } from '@/api/user'
import { REGISTER_PATHNAME, HOME_PATHNAME } from '@/router/routes'
import { setToken } from '@/utils/userToken'
import { getUserInfo } from '@/store/userSlice'
import styles from './Login.module.scss'

const { Title } = Typography

const USERNAME_KEY = 'USERNAME'
const PASSWORD_KEY = 'PASSWORD'

const setUserInfoFromLocal = (username: string, password: string) => {
  localStorage.setItem(USERNAME_KEY, username)
  localStorage.setItem(PASSWORD_KEY, password)
}

const delUserInfoFromLocal = () => {
  localStorage.removeItem(USERNAME_KEY)
  localStorage.removeItem(PASSWORD_KEY)
}

const getUserInfoFromLocal = () => {
  return {
    username: localStorage.getItem(USERNAME_KEY),
    password: localStorage.getItem(PASSWORD_KEY),
  }
}

const Login: FC = () => {
  const nav = useNavigate()
  const dispatch = useDispatch()
  const [form] = Form.useForm()

  const { loading, run: handleLogin } = useRequest(
    async (username: string, password: string) =>
      await reqLogin(username, password),
    {
      manual: true,
      onSuccess: (resData) => {
        dispatch(getUserInfo())
        setToken(resData.token)
        message.success('登录成功，即将跳转首页')

        const timer = setTimeout(() => {
          nav(HOME_PATHNAME)
          clearTimeout(timer)
        }, 3000)
      },
    },
  )

  const handleFinish = (vals: any) => {
    const { username, password, remember } = vals

    if (remember) {
      setUserInfoFromLocal(username, password)
    } else {
      delUserInfoFromLocal()
    }

    handleLogin(username, password)
  }

  useEffect(() => {
    const { username, password } = getUserInfoFromLocal()

    form.setFieldsValue({
      username,
      password,
    })
  }, [form])

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
          initialValues={{ remember: true }}
          form={form}
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
          <Form.Item name="remember" valuePropName="checked" label={null}>
            <Checkbox>记住我</Checkbox>
          </Form.Item>
          <Form.Item label={null}>
            <Space>
              <Button type="primary" htmlType="submit" loading={loading}>
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
