import { createSlice, type PayloadAction } from '@reduxjs/toolkit'
import type { ComponentsPropsType } from '@/components/question'
import { getNextSelectedId } from '@/utils/question'

export type componentInfoType = {
  fe_id: string // 前端生成的 id, 服务端 mongodb 不认这种格式，所以自定义
  type: string
  title: string
  isHidden?: boolean
  props?: ComponentsPropsType
}

export type ComponentsStateType = {
  componentList: Array<componentInfoType>
  selectedId: string
}

const INIT_STATE: ComponentsStateType = {
  componentList: [],
  selectedId: '',
}

export const questionComponentsSlice = createSlice({
  name: 'questionComponents',
  initialState: INIT_STATE,
  reducers: {
    resetComponents: (
      state: ComponentsStateType,
      action: PayloadAction<ComponentsStateType>,
    ) => action.payload,
    changeSelected: (
      state: ComponentsStateType,
      action: PayloadAction<string>,
    ) => ({ ...state, selectedId: action.payload }),
    addComponent: (
      state: ComponentsStateType,
      action: PayloadAction<componentInfoType>,
    ) => {
      const { componentList, selectedId } = state

      if (!selectedId) {
        state.componentList = [...componentList, action.payload]
      } else {
        const index = componentList.findIndex((cpn) => cpn.fe_id === selectedId)
        componentList.splice(index + 1, 0, action.payload)

        state.componentList = [...componentList]
        state.selectedId = action.payload.fe_id
      }
    },
    changeComponentProps: (
      state: ComponentsStateType,
      action: PayloadAction<{ fe_id: string; newProps: ComponentsPropsType }>,
    ) => {
      const { fe_id, newProps } = action.payload

      state.componentList = state.componentList.map((cpn) =>
        cpn.fe_id === fe_id
          ? { ...cpn, props: { ...cpn.props, ...newProps } }
          : cpn,
      )
    },
    removeComponent: (state: ComponentsStateType) => {
      const { componentList, selectedId } = state

      const nextSelectedId = getNextSelectedId(componentList, selectedId)
      state.componentList = componentList.filter(
        (cpn) => cpn.fe_id !== selectedId,
      )
      state.selectedId = nextSelectedId
    },
    hiddenComponent: (
      state: ComponentsStateType,
      action: PayloadAction<{ id: string; isHidden: boolean }>,
    ) => {
      const { componentList } = state
      const { id, isHidden } = action.payload

      if (!id) {
        return
      }

      const nextSelectedId = getNextSelectedId(componentList, id)
      state.componentList = componentList.map((cpn) =>
        cpn.fe_id === id ? { ...cpn, isHidden } : cpn,
      )

      if (isHidden) {
        state.selectedId = nextSelectedId
      } else {
        state.selectedId = id
      }
    },
  },
})

export const {
  resetComponents,
  changeSelected,
  addComponent,
  changeComponentProps,
  removeComponent,
  hiddenComponent,
} = questionComponentsSlice.actions

export default questionComponentsSlice.reducer
