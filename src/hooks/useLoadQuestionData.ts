import { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { useRequest } from 'ahooks'
import { reqGetQuestionInfo } from '@/api/question'
import { resetComponents } from '@/store/reducers/questionComponentsSlice'
import { restPageInfo } from '@/store/reducers/pageInfoSlice'

export default function useLoadQuestionData() {
  const dispatch = useDispatch()
  const { id } = useParams()

  const { loading, run } = useRequest(
    async () => {
      if (!id) {
        throw '问卷id为空！'
      }

      return await reqGetQuestionInfo(id)
    },
    {
      manual: true,
      onSuccess: (resData) => {
        const { componentList, title, desc, js, css } = resData
        let selectedId: string = ''
        if (componentList.length > 0) {
          selectedId = componentList[0].fe_id
        }
        dispatch(
          resetComponents({
            componentList,
            selectedId,
            copiedComponent: null,
          }),
        )
        dispatch(restPageInfo({ title, desc, js, css }))
      },
    },
  )

  useEffect(() => {
    run()
  }, [id])

  return { loading }
}
