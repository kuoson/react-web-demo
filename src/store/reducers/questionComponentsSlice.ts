import { createSlice, type PayloadAction } from '@reduxjs/toolkit'
import type { ComponentsPropsType } from '@/components/question'

export type componentInfoType = {
  fe_id: string // 前端生成的 id, 服务端 mongodb 不认这种格式，所以自定义
  type: string
  title: string
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
  },
})

export const {
  resetComponents,
  changeSelected,
  addComponent,
  changeComponentProps,
} = questionComponentsSlice.actions

export default questionComponentsSlice.reducer
