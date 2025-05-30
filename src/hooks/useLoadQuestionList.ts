import { useSearchParams } from 'react-router-dom'
import { useRequest } from 'ahooks'
import { reqGetQuestionList } from '@/api/question'
import type { getQuestionListSearchParamsType } from '@/api/question'
import {
  LIST_SEARCH_PARAM_KEY,
  LIST_SEARCH_PARAM_CUR_PAGE_KEY,
  LIST_SEARCH_PARAM_PAGE_SIZE_KEY,
} from '@/const'

export const useLoadQuestionList = (
  opt?: Partial<getQuestionListSearchParamsType>,
) => {
  const [searchParams] = useSearchParams()
  const keyword = searchParams.get(LIST_SEARCH_PARAM_KEY) || ''
  const page = parseInt(searchParams.get(LIST_SEARCH_PARAM_CUR_PAGE_KEY) || '1')
  const pageSize = parseInt(
    searchParams.get(LIST_SEARCH_PARAM_PAGE_SIZE_KEY) || '10',
  )
  const { isStar, isDeleted } = opt || {}

  return useRequest(
    async () => {
      const resData = await reqGetQuestionList({
        keyword,
        page,
        pageSize,
        isStar,
        isDeleted,
      })

      return resData
    },
    { refreshDeps: [searchParams] },
  )
}
