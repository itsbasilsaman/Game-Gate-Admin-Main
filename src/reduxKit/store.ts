/* eslint-disable @typescript-eslint/no-explicit-any */
import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./reducers/auth/authSlice";
import sellerSlice from "./reducers/auth/seller";


export const store = configureStore({
    reducer:{
        auth:authSlice.reducer,
        seller:sellerSlice.reducer,
    }
})
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch;
export type ExtendedAppDispatch = (action: any) => any;
export default store;