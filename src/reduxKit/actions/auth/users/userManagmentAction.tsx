import {axiosIn, configWithToken, configWithTokenMultiPart} from "../../../../config/constants";



import { createAsyncThunk } from "@reduxjs/toolkit";


  export const GetAllUsersAction= createAsyncThunk(
    "admin/getUsers",
    async (__,{rejectWithValue})=>{
        try {
            console.log( "admin get user ");
            const response = await axiosIn.get(`/admin/user`,configWithToken());
            return response.data.result.data; 
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
          } catch (error: any) {
            if (error.response && error.response.data) {
              return rejectWithValue(error.response.data.message);
            } else {
              return rejectWithValue({ message: "Something went wrong!" });
            }
          }
    }
  )



export const BanUserAction= createAsyncThunk(
    "admin/BanUserAction",
    async (id:string,{rejectWithValue})=>{ 

        console.log("my ban id is ", id );
        
        try {
            const response = await axiosIn.post(`/admin/user/ban/${id}`,configWithTokenMultiPart());
            console.log("the response get tyhe service data is ", response);
            return response.data.data;
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
          } catch (error: any) {
            if (error.response && error.response.data) {
              return rejectWithValue(error.response.data.message);
            } else {
              return rejectWithValue({ message: "Something went wrong!" });
            }
          }
    }
  )
export const UnBanUserAction= createAsyncThunk(
    "admin/UnBanUserAction",
    async (id:string,{rejectWithValue})=>{ 
        try {
            const response = await axiosIn.post(`/admin/user/unban/${id}`,configWithTokenMultiPart());
            console.log("the response get tyhe unban data is ", response);
            return response.data.data;
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
          } catch (error: any) {
            if (error.response && error.response.data) {
              return rejectWithValue(error.response.data.message);
            } else {
              return rejectWithValue({ message: "Something went wrong!" });
            }
          }
    }
  )



  export const GetUserByIdAction= createAsyncThunk(
    "admin/getUserById",
    async (id:string,{rejectWithValue})=>{ 
        try {
            console.log( "admin get user  ",id);
            const response = await axiosIn.get(`/admin/user/${id}`,configWithToken());
            console.log("the response user  ", response);
            return response.data
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
          } catch (error: any) {
            if (error.response && error.response.data) {
              return rejectWithValue(error.response.data.message);
            } else {
              return rejectWithValue({ message: "Something went wrong!" });
            }
          }
    }
  ) 




