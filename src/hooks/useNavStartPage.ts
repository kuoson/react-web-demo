import { useEffect, useState } from 'react'
import useGetUserInfo from '@/hooks/useGetUserInfo'
import { HOME_PATHNAME, MANAGE_LIST_PATHNAME } from '@/router/routes'

export default function useNavStartPage() {
  const { username } = useGetUserInfo()
  const [pathname, setPathname] = useState(HOME_PATHNAME)

  useEffect(() => {
    if (username) {
      setPathname(MANAGE_LIST_PATHNAME)
    } else {
      setPathname(HOME_PATHNAME)
    }
  }, [username])

  return { pathname }
}
