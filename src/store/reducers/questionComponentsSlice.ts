import { createSlice, type PayloadAction } from '@reduxjs/toolkit'
import cloneDeep from 'lodash.clonedeep'
import { nanoid } from 'nanoid'
import { arrayMove } from '@dnd-kit/sortable'
import type { ComponentsPropsType } from '@/components/question'
import { getNextSelectedId, insertComponent } from '@/utils/question'

export type componentInfoType = {
  fe_id: string // 前端生成的 id, 服务端 mongodb 不认这种格式，所以自定义
  type: string
  title: string
  isHidden?: boolean
  isLocked?: boolean
  props?: ComponentsPropsType
}

export type ComponentsStateType = {
  componentList: Array<componentInfoType>
  selectedId: string
  copiedComponent: componentInfoType | null
}

const INIT_STATE: ComponentsStateType = {
  componentList: [],
  selectedId: '',
  copiedComponent: null,
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
      insertComponent(state, action.payload)
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

    removeSelectedComponent: (state: ComponentsStateType) => {
      const { componentList, selectedId } = state

      const nextSelectedId = getNextSelectedId(componentList, selectedId)
      state.componentList = componentList.filter(
        (cpn) => cpn.fe_id !== selectedId,
      )
      state.selectedId = nextSelectedId
    },

    hiddenComponent: (
      state: ComponentsStateType,
      action: PayloadAction<{ fe_id: string; isHidden: boolean }>,
    ) => {
      const { componentList } = state
      const { fe_id, isHidden } = action.payload

      if (!fe_id) {
        return
      }

      const nextSelectedId = getNextSelectedId(componentList, fe_id)
      state.componentList = componentList.map((cpn) =>
        cpn.fe_id === fe_id ? { ...cpn, isHidden } : cpn,
      )

      if (isHidden) {
        state.selectedId = nextSelectedId
      } else {
        state.selectedId = fe_id
      }
    },

    toggleComponentLocked: (
      state: ComponentsStateType,
      action: PayloadAction<string>,
    ) => {
      const { componentList } = state

      state.componentList = componentList.map((cpn) =>
        cpn.fe_id === action.payload
          ? { ...cpn, isLocked: !cpn.isLocked }
          : cpn,
      )
    },

    copySelectedComponent: (state: ComponentsStateType) => {
      const { componentList, selectedId } = state

      const selectedCpn = componentList.find((cpn) => cpn.fe_id === selectedId)
      state.copiedComponent = cloneDeep(selectedCpn) || null
    },

    pasteCopiedComponent: (state: ComponentsStateType) => {
      const { copiedComponent } = state
      if (!copiedComponent) {
        return
      }

      copiedComponent.fe_id = nanoid()
      insertComponent(state, copiedComponent)
    },

    selectPrevComponent: (state: ComponentsStateType) => {
      const { componentList, selectedId } = state

      const selectedIndex = componentList.findIndex(
        (cpn) => cpn.fe_id === selectedId,
      )

      if (selectedIndex < 0) {
        return
      }

      if (selectedIndex === 0) {
        return
      }

      state.selectedId = componentList[selectedIndex - 1].fe_id
    },

    selectNextComponent: (state: ComponentsStateType) => {
      const { componentList, selectedId } = state

      const selectedIndex = componentList.findIndex(
        (cpn) => cpn.fe_id === selectedId,
      )

      if (selectedIndex < 0) {
        return
      }

      if (selectedIndex + 1 === componentList.length) {
        return
      }

      state.selectedId = componentList[selectedIndex + 1].fe_id
    },

    changeComponentTitle: (
      state: ComponentsStateType,
      action: PayloadAction<{ fe_id: string; newTitle: string }>,
    ) => {
      const { componentList } = state
      const { fe_id, newTitle } = action.payload
      state.componentList = componentList.map((c) => {
        if (c.fe_id === fe_id) {
          c.title = newTitle
          return c
        }

        return c
      })
    },

    moveComponent: (
      state: ComponentsStateType,
      action: PayloadAction<{ oldIndex: number; newIndex: number }>,
    ) => {
      const { componentList: curComponentList } = state
      const { oldIndex, newIndex } = action.payload
      state.componentList = arrayMove(curComponentList, oldIndex, newIndex)
    },
  },
})

export const {
  resetComponents,
  changeSelected,
  addComponent,
  changeComponentProps,
  removeSelectedComponent,
  hiddenComponent,
  toggleComponentLocked,
  copySelectedComponent,
  pasteCopiedComponent,
  selectPrevComponent,
  selectNextComponent,
  changeComponentTitle,
  moveComponent,
} = questionComponentsSlice.actions

export default questionComponentsSlice.reducer
