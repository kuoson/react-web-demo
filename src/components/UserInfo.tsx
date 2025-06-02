import { type FC } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { UserOutlined } from '@ant-design/icons'
import { Button, message, Space } from 'antd'
import { LOGIN_PATHNAME } from '@/router/routes'
import { removeToken } from '@/utils/userToken'
import { logout } from '@/store/userSlice'
import { useGetUserInfo } from '@/hooks/useGetUserInfo'

const UserInfo: FC = () => {
  const nav = useNavigate()
  const dispatch = useDispatch()

  const { username, nickname } = useGetUserInfo()

  const handleLogout = () => {
    dispatch(logout())
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
