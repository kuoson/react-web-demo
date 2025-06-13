import { createSlice, type PayloadAction } from '@reduxjs/toolkit'

export type pageInfoType = {
  title: string
  desc?: string
  js?: string
  css?: string
}

const INIT_STATE: pageInfoType = { title: '', desc: '', js: '', css: '' }

export const pageInfoSlice = createSlice({
  name: 'pageInfo',
  initialState: INIT_STATE,
  reducers: {
    restPageInfo: (state: pageInfoType, action: PayloadAction<pageInfoType>) =>
      action.payload,
  },
})

export const { restPageInfo } = pageInfoSlice.actions

export default pageInfoSlice.reducer
