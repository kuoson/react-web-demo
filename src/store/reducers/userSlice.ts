import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { reqGetUserInfo } from '@/api/user'

const INIT_STATE = { username: '', nickname: '' }

export const getUserInfo = createAsyncThunk(
  'user/info',
  async () => await reqGetUserInfo(),
)

export const userSlice = createSlice({
  name: 'user',
  initialState: INIT_STATE,
  reducers: {
    logout: () => INIT_STATE,
  },
  extraReducers(builder) {
    builder
      .addCase(getUserInfo.pending, () => {})
      .addCase(getUserInfo.fulfilled, (state, action) => {
        console.log(state, 'state')
        return action.payload
      })
      .addCase(getUserInfo.rejected, () => INIT_STATE)
  },
})

export const { logout } = userSlice.actions

export default userSlice.reducer
