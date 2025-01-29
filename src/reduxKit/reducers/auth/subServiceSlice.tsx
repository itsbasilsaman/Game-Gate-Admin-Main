/* eslint-disable @typescript-eslint/no-unused-expressions */
import { createSlice } from "@reduxjs/toolkit";

import { GetSubServiceAction } from "../../actions/auth/subService/subServiceAction";
import { DeleteSubServiceAction } from "../../actions/auth/subService/subServiceAction";
import { AddSubServiceAction } from "../../actions/auth/subService/subServiceAction";


export interface UserState {
  userData: UserState | null;
  error: string | null;
  loading: boolean;
  Serviceid?: string | null;
}



const initialState:UserState  = {
  userData: localStorage.getItem("user")
    ? JSON.parse(localStorage.getItem("user")!)
    : null,
  error: null,
  loading: false,
  Serviceid: localStorage.getItem("Serviceid")
    ? JSON.parse(localStorage.getItem("Serviceid")!)
    : null,
};






export const SubServiceSlice = createSlice({
  name: "user",
  initialState:initialState,
  reducers: {
    updateError: (state, { payload }) => {
      state.error = payload;
    },
  },

  extraReducers: (builder) => {
    builder
    .addCase(GetSubServiceAction.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
       
      .addCase(GetSubServiceAction.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.error = null;
        state.Serviceid=payload.id
        state.userData = payload;
        localStorage.setItem("user", JSON.stringify(state.userData));
      })

      .addCase(GetSubServiceAction.rejected, (state, { payload }) => {
        state.loading = false;
        state.userData = null;
        state.error = payload as string;
      })

    .addCase(DeleteSubServiceAction.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
       
      .addCase(DeleteSubServiceAction.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.error = null;
        state.Serviceid=null
        state.userData = payload;
      })
      .addCase(DeleteSubServiceAction.rejected, (state, { payload }) => {
        state.loading = false;
        state.userData = null;
        state.error = payload as string;
      })

      
    .addCase(AddSubServiceAction.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
       
      .addCase(AddSubServiceAction.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.error = null;
        state.Serviceid=null
        state.userData = payload;
      })
      .addCase(AddSubServiceAction.rejected, (state, { payload }) => {
        state.loading = false;
        state.userData = null;
        state.error = payload as string;
      })


  },
});



export const {updateError}= SubServiceSlice.actions
export default SubServiceSlice
