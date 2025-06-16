import { useSelector } from 'react-redux'
import type { componentInfoType } from '@/store/reducers/questionComponentsSlice'

export default function useGetComponentListInfo() {
  const { componentList, selectedId, copiedComponent } = useSelector(
    (state) => state.questionComponents.present,
  )

  const selectedComponent =
    componentList.find((cpn: componentInfoType) => cpn.fe_id === selectedId) ||
    {}

  return { componentList, selectedId, selectedComponent, copiedComponent }
}
