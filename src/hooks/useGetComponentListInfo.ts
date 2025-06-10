import { useSelector } from 'react-redux'
import type { componentInfoType } from '@/store/reducers/questionComponentsSlice'

export const useGetComponentListInfo = () => {
  const { componentList, selectedId } = useSelector(
    (state) => state.questionComponents,
  )

  const selectedComponent = componentList.find(
    (cpn: componentInfoType) => cpn.fe_id === selectedId,
  )

  return { componentList, selectedId, selectedComponent }
}
