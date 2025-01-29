/* eslint-disable @typescript-eslint/no-unused-expressions */
import { createSlice } from "@reduxjs/toolkit";

import { AddBrandAction } from "../../actions/auth/brand/brandAction";
import { GetAllBrandAction } from "../../actions/auth/brand/brandAction";
import { GetBrandByIdAction } from "../../actions/auth/brand/brandAction";


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






export const brandSlice = createSlice({
  name: "user",
  initialState:initialState,
  reducers: {
    updateError: (state, { payload }) => {
      state.error = payload;
    },
  },

  extraReducers: (builder) => {
    builder
    .addCase(GetAllBrandAction.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
       
      .addCase(GetAllBrandAction.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.error = null;
        state.Serviceid=payload.id
        state.userData = payload;
        localStorage.setItem("user", JSON.stringify(state.userData));
      })

      .addCase(GetAllBrandAction.rejected, (state, { payload }) => {
        state.loading = false;
        state.userData = null;
        state.error = payload as string;
      })

    .addCase(GetBrandByIdAction.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
       
      .addCase(GetBrandByIdAction.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.error = null;
        state.Serviceid=null
        state.userData = payload;
      })
      .addCase(GetBrandByIdAction.rejected, (state, { payload }) => {
        state.loading = false;
        state.userData = null;
        state.error = payload as string;
      })

      
    .addCase(AddBrandAction.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
       
      .addCase(AddBrandAction.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.error = null;
        state.Serviceid=null
        state.userData = payload;
      })
      .addCase(AddBrandAction.rejected, (state, { payload }) => {
        state.loading = false;
        state.userData = null;
        state.error = payload as string;
      })


  },
});

export const {updateError}= brandSlice.actions
export default brandSlice
