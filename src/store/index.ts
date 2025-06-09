import { configureStore, combineReducers } from '@reduxjs/toolkit'
import { persistStore, persistReducer } from 'redux-persist'
// 导入本地存储插件，可选storage，cookie，session等
import storage from 'redux-persist/lib/storage'
import userSlice from './reducers/userSlice'

const rootReducer = combineReducers({
  user: userSlice,
})

const persistConfig = {
  key: 'root', // 存储的 key
  storage, // 使用 localStorage
  // whitelist: [users], // 需要持久化保存的模块，默认保存所有模块（语义：白名单）
  // blacklist: [], // 不需要持久化保存的模块，默认不排除任何模块（语义：黑名单）
}

// 创建持久化 reducer
const persistedReducer = persistReducer(persistConfig, rootReducer)

const store = configureStore({
  reducer: persistedReducer,
  devTools: true, // 是否开启开发者工具，默认true
  // 配置中间件：如果使用redux-persist，则需要设置为false，否则控制台报错（非序列化数据）
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
})

// 创建持久化后的store
const persistor = persistStore(store)

export { store, persistor }
