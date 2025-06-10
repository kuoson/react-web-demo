import { createSlice, type PayloadAction } from '@reduxjs/toolkit'
import type { ComponentsPropsType } from '@/components/question'

export type componentInfoType = {
  fe_id: string
  type: string
  title: string
  props: ComponentsPropsType
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
  },
})

export const { resetComponents, changeSelected } =
  questionComponentsSlice.actions

export default questionComponentsSlice.reducer
