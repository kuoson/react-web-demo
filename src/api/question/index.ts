import request from '@/utils/request'
import type { ResDataType } from '@/utils/request'

export const reqCreateQuestion = () =>
  request.post<any, ResDataType>('/api/question')
