interface RouteMeta {
  title: string
}

export interface Route {
  path: string
  element: React.ReactNode
  meta?: RouteMeta
  children?: Route[]
}
