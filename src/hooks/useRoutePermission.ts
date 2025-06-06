import { useEffect, useState } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { store, persistor } from '@/store'
import { LOGIN_PATHNAME, HOME_PATHNAME } from '@/router/routes'

export const useRoutePermission = () => {
  const nav = useNavigate()
  const { pathname } = useLocation()
  const [loading, setLoading] = useState(true)

  const waitForPersistorBootstrapped = () => {
    return new Promise<void>((resolve) => {
      if (persistor.getState().bootstrapped) {
        resolve()
      } else {
        const unsubscribe = persistor.subscribe(() => {
          const { bootstrapped } = persistor.getState()
          if (bootstrapped) {
            unsubscribe()
            resolve()
          }
        })
      }
    })
  }

  const routePermission = async () => {
    // 等待持久化恢复完成
    await waitForPersistorBootstrapped()

    const state = store.getState()
    const isLogin = !!state.user.username
    if (!isLogin) {
      nav(LOGIN_PATHNAME)
    }

    if (isLogin && pathname === LOGIN_PATHNAME) {
      nav(HOME_PATHNAME)
    }

    const timer = setTimeout(() => {
      setLoading(false)
      clearTimeout(timer)
    }, 1)
  }

  useEffect(() => {
    routePermission()
  }, [pathname])

  return { loading }
}
