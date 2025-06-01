import { type FC } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { UserOutlined } from '@ant-design/icons'
import { Button, message, Space } from 'antd'
import { useRequest } from 'ahooks'
import { reqGetUserInfo } from '@/api/user'
import { LOGIN_PATHNAME } from '@/router/routes'
import { removeToken } from '@/utils/userToken'

const UserInfo: FC = () => {
  const nav = useNavigate()

  const { data } = useRequest(reqGetUserInfo)
  const { username, nickname } = data || {}

  const handleLogout = () => {
    removeToken()
    message.success('退出成功，即将返回登录页')

    const timer = setTimeout(() => {
      nav(LOGIN_PATHNAME)
      clearTimeout(timer)
    }, 3000)
  }

  return (
    <>
      {username ? (
        <div style={{ color: 'white' }}>
          <Space>
            <UserOutlined />
            {nickname}
          </Space>
          <Button style={{ color: 'white' }} type="text" onClick={handleLogout}>
            退出
          </Button>
        </div>
      ) : (
        <Link to={LOGIN_PATHNAME}>登录</Link>
      )}
    </>
  )
}

export default UserInfo
