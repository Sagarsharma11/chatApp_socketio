import { configureStore } from '@reduxjs/toolkit'
import userReducer from './userSlice'
import chatuserReducer from './chatuserSlice'
const store = configureStore({
    reducer:{
        user:userReducer,
        chatuser:chatuserReducer
    }
})

export default store;