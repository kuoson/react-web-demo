import type { FC } from 'react'
import { useNavigate } from 'react-router-dom'
import { Button, Result } from 'antd'
import { HOME_PATHNAME } from '@/router/routes'

const NotFound: FC = () => {
  const nav = useNavigate()

  return (
    <Result
      status="404"
      title="404"
      subTitle="Sorry, the page you visited does not exist."
      extra={
        <Button type="primary" onClick={() => nav(HOME_PATHNAME)}>
          返回首页
        </Button>
      }
    />
  )
}

export default NotFound
