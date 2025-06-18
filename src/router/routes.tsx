import { lazy } from 'react'
import type { Route } from './routesType'
import MainLayout from '@/layouts/MainLayout'
import ManageLayout from '@/layouts/ManageLayout'
import QuestionLayout from '@/layouts/QuestionLayout'

import Home from '@/pages/Home'
import Login from '@/pages/Login'
import Register from '@/pages/Register'
import NotFound from '@/pages/NotFound'

import List from '@/pages/manage/List'
import Star from '@/pages/manage/Star'
import Trash from '@/pages/manage/Trash'

// vite基于 Rollup 打包，无法使用魔法注释命名块
const Edit = () =>
  lazy(() => import(/* webpackChunkName: "editPage" */ '@/pages/question/Edit'))
const Stat = () =>
  lazy(() => import(/* webpackChunkName: "statPage" */ '@/pages/question/Stat'))

const getPathSegment = (path: string, index: number) => {
  if (path === '/') {
    return '/'
  }

  const segments = path.split('/').filter(Boolean)
  if (index < 0 || index >= segments.length) {
    return ''
  }
  return segments[index]
}

const HOME_PATHNAME = '/'
const LOGIN_PATHNAME = '/login'
const REGISTER_PATHNAME = '/register'
const MANAGE_LIST_PATHNAME = '/manage/list'
const MANAGE_STAR_PATHNAME = '/manage/star'
const MANAGE_TRASH_PATHNAME = '/manage/trash'
const QUESTION_EDIT_PATHNAME = '/question/edit'
const QUESTION_STAT_PATHNAME = '/question/stat'

const routes: Route[] = [
  {
    path: '/',
    element: <MainLayout />,
    children: [
      {
        path: getPathSegment(HOME_PATHNAME, 0),
        element: <Home />,
        meta: { title: 'Home' },
      },
      {
        path: getPathSegment(LOGIN_PATHNAME, 0),
        element: <Login />,
        meta: { title: 'Login' },
      },
      {
        path: getPathSegment(REGISTER_PATHNAME, 0),
        element: <Register />,
        meta: { title: 'Register' },
      },
      {
        path: getPathSegment(MANAGE_LIST_PATHNAME, 0),
        element: <ManageLayout />,
        children: [
          {
            path: getPathSegment(MANAGE_LIST_PATHNAME, 1),
            element: <List />,
            meta: { title: 'List' },
          },
          {
            path: getPathSegment(MANAGE_STAR_PATHNAME, 1),
            element: <Star />,
            meta: { title: 'Star' },
          },
          {
            path: getPathSegment(MANAGE_TRASH_PATHNAME, 1),
            element: <Trash />,
            meta: { title: 'Trash' },
          },
        ],
      },
      {
        path: '*', // 最后，用于兜底
        element: <NotFound />,
        meta: { title: '404' },
      },
    ],
  },
  {
    path: getPathSegment(QUESTION_EDIT_PATHNAME, 0),
    element: <QuestionLayout />,
    children: [
      {
        path: `${getPathSegment(QUESTION_EDIT_PATHNAME, 1)}/:id`,
        element: <Edit />,
        meta: { title: 'Edit' },
      },
      {
        path: `${getPathSegment(QUESTION_STAT_PATHNAME, 1)}/:id`,
        element: <Stat />,
        meta: { title: 'Stat' },
      },
    ],
  },
]

export {
  HOME_PATHNAME,
  LOGIN_PATHNAME,
  REGISTER_PATHNAME,
  MANAGE_LIST_PATHNAME,
  MANAGE_STAR_PATHNAME,
  MANAGE_TRASH_PATHNAME,
  QUESTION_EDIT_PATHNAME,
  QUESTION_STAT_PATHNAME,
}
export default routes
