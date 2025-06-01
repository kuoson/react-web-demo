import axios from 'axios'
import { message } from 'antd'
import { getToken } from '@/utils/userToken'

const request = axios.create({
  timeout: 10 * 1000,
})

request.interceptors.request.use((config) => {
  const token = getToken()
  if (token) {
    config.headers['Authorization'] = `Bearer ${token}`
  }

  return config
})

request.interceptors.response.use(
  (res) => {
    const resData = res.data || {}
    const { errno, data, msg } = resData

    // 统一错误处理, 适用于后端统筹错误; 否则的话需要前端抛出 errno, 定义错误信息
    if (errno !== 0) {
      if (msg) {
        message.error(msg)
      }

      throw new Error(msg)
    }

    return data
  },
  (err) => {
    let msg = ''

    const status = err.response.status
    switch (status) {
      case 401:
        msg = '没有登录'
        break
      case 403:
        msg = '登录了，没有权限'
        break
      case 404:
        msg = '没有找到资源'
        break
      case 500:
        msg = '服务器错误'
        break
    }

    message.error(msg)
    return Promise.reject(err)
  },
)

export default request

export type ResType = {
  errno: number
  msg?: string
  data?: ResDataType
}

export type ResDataType = {
  [key: string]: any
}
