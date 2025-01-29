/* eslint-disable @typescript-eslint/no-explicit-any */
import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./reducers/auth/authSlice";
import sellerSlice from "./reducers/auth/seller";
import ServiceSlice from "./reducers/auth/serviceSlice";
import SubServiceSlice from "./reducers/auth/subServiceSlice";
 
export const store = configureStore({
    reducer:{
        auth:authSlice.reducer,
        seller:sellerSlice.reducer,
        service:ServiceSlice.reducer,
        subService:SubServiceSlice.reducer
    } 
})
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch;
export type ExtendedAppDispatch = (action: any) => any;
export default store;