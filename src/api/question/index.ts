import request from '@/utils/request'
import type { ResDataType } from '@/utils/request'

export const reqCreateQuestion = () =>
  request.post<any, ResDataType>('/api/question')

export type getQuestionListSearchParamsType = {
  keyword: string
  isDeleted: boolean
  isStar: boolean
}
export const reqGetQuestionList = (
  params: Partial<getQuestionListSearchParamsType>,
) => request.get<any, ResDataType>('/api/question', { params })
