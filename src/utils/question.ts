import type { componentInfoType } from '@/store/reducers/questionComponentsSlice'

export const getNextSelectedId = (
  componentList: componentInfoType[],
  selectedId: string,
) => {
  const curIndex = componentList.findIndex((cpn) => cpn.fe_id === selectedId)

  if (curIndex < 0 || componentList.length === 1) {
    return ''
  }

  if (curIndex + 1 === componentList.length) {
    return componentList[curIndex - 1].fe_id
  }

  return componentList[curIndex + 1].fe_id
}
