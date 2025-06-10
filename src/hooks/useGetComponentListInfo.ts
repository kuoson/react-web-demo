import { useSelector } from 'react-redux'

export const useGetComponentListInfo = () => {
  const { componentList, selectedId } = useSelector(
    (state) => state.questionComponents,
  )

  return { componentList, selectedId }
}
