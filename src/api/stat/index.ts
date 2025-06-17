import request from '@/api'
import type { ResDataType } from '@/api'

export const reqGetQuestionStatList = (
  id: string,
  params: {
    page: number
    pageSize: number
  },
) => request.get<any, ResDataType>(`/api/stat/${id}`, { params })
