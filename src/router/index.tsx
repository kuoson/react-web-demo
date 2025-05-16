import { createBrowserRouter } from 'react-router-dom'
import type { Route } from './routesType'
import routes from './routes'
import PageWrapper from '@/components/PageWrapper'

const wrapRoutesWithPageWrapper = (routes: Route[]) => {
  return routes.map((route) => {
    const wrappedRoute = {
      ...route,
      element: route?.meta?.title ? (
        <PageWrapper title={route?.meta?.title}>{route.element}</PageWrapper>
      ) : (
        route.element
      ),
    }

    if (route.children) {
      wrappedRoute.children = wrapRoutesWithPageWrapper(route.children)
    }

    return wrappedRoute
  })
}

const router = createBrowserRouter(wrapRoutesWithPageWrapper(routes))

export default router
