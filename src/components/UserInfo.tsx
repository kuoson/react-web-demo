import { type FC } from 'react'
import { Link } from 'react-router-dom'
import { LOGIN_PATHNAME } from '@/router/routes'

const Logo: FC = () => {
  return <Link to={LOGIN_PATHNAME}>登录</Link>
}

export default Logo
