import { useSearchParams } from 'react-router-dom'
import { useRequest } from 'ahooks'
import { reqGetQuestionList } from '@/api/question'
import type { getQuestionListSearchParamsType } from '@/api/question'
import { LIST_SEARCH_PARAM_KEY } from '@/const'

export const useLoadQuestionList = (
  opt?: Partial<getQuestionListSearchParamsType>,
) => {
  const [searchParams] = useSearchParams()
  const keyword = searchParams.get(LIST_SEARCH_PARAM_KEY) || ''
  const { isStar, isDeleted } = opt || {}

  return useRequest(
    async () => {
      const resData = await reqGetQuestionList({
        keyword,
        isStar,
        isDeleted,
      })

      return resData
    },
    { refreshDeps: [searchParams] },
  )
}
