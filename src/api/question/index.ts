import request from '@/utils/request'
import type { ResDataType } from '@/utils/request'

export const reqCreateQuestion = () =>
  request.post<any, ResDataType>('/api/question')

export type getQuestionListSearchParamsType = {
  keyword: string
  page: number
  pageSize: number
  isDeleted: boolean
  isStar: boolean
}

export const reqGetQuestionList = (
  params: Partial<getQuestionListSearchParamsType>,
) => request.get<any, ResDataType>('/api/question', { params })

export const reqUpdateQuestion = (
  id: string,
  params: {
    [key: string]: any
  },
) => request.patch<any, ResDataType>(`/api/question/${id}`, params)

export const reqDuplicateQuestion = (id: string) =>
  request.post<any, ResDataType>(`/api/question/duplicate/${id}`)

export const reqDeleteQuestion = (ids: string[]) =>
  request.delete<any, ResDataType>('/api/question', { data: { ids } })
