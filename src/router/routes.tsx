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

import Edit from '@/pages/question/Edit'
import Stat from '@/pages/question/Stat'

const routes: Route[] = [
  {
    path: '/',
    element: <MainLayout />,
    children: [
      {
        path: '/',
        element: <Home />,
        meta: { title: 'Home' },
      },
      {
        path: 'login',
        element: <Login />,
        meta: { title: 'Login' },
      },
      {
        path: 'register',
        element: <Register />,
        meta: { title: 'Register' },
      },
      {
        path: 'manage',
        element: <ManageLayout />,
        children: [
          {
            path: 'list',
            element: <List />,
            meta: { title: 'List' },
          },
          {
            path: 'star',
            element: <Star />,
            meta: { title: 'Star' },
          },
          {
            path: 'trash',
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
    path: 'question',
    element: <QuestionLayout />,
    children: [
      {
        path: 'edit/:id',
        element: <Edit />,
        meta: { title: 'Edit' },
      },
      {
        path: 'stat/:id',
        element: <Stat />,
        meta: { title: 'Stat' },
      },
    ],
  },
]

export default routes
