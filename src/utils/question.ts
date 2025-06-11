import type {
  componentInfoType,
  ComponentsStateType,
} from '@/store/reducers/questionComponentsSlice'

export const getNextSelectedId = (
  componentList: componentInfoType[],
  selectedId: string,
) => {
  if (!selectedId || componentList.length <= 0) {
    return ''
  }

  const componentDisplayList: componentInfoType[] = componentList.filter(
    (cpn) => !cpn.isHidden,
  )
  const curIndex = componentDisplayList.findIndex(
    (cpn) => cpn.fe_id === selectedId,
  )

  if (curIndex < 0 || componentDisplayList.length === 1) {
    return ''
  }

  if (curIndex + 1 === componentDisplayList.length) {
    return componentDisplayList[curIndex - 1].fe_id
  }

  return componentDisplayList[curIndex + 1].fe_id
}

export const insertComponent = (
  state: ComponentsStateType,
  newComponent: componentInfoType,
) => {
  const { componentList, selectedId } = state

  if (!selectedId) {
    state.componentList = [...componentList, newComponent]
  } else {
    const index = componentList.findIndex((cpn) => cpn.fe_id === selectedId)
    componentList.splice(index + 1, 0, newComponent)

    state.componentList = [...componentList]
    state.selectedId = newComponent.fe_id
  }
}
