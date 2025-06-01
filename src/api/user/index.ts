import request from '@/api'
import type { ResDataType } from '@/api'

export const reqRegister = (
  username: string,
  password: string,
  nickname?: string,
) =>
  request.post<any, ResDataType>('/api/user/register', {
    username,
    password,
    nickname,
  })
