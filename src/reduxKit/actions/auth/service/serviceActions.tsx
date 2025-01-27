import {configWithToken,axiosIn,config} from "../../../../config/constants";



import { createAsyncThunk } from "@reduxjs/toolkit";



export interface Iservice{
    name: string
    nameAr:string 
    icon:File|null
}




export const AddServiceAction= createAsyncThunk(
    "admin/addService",
    async (adminCredentials:Iservice,{rejectWithValue})=>{
        try {
            console.log( "admin service data  ",adminCredentials);
            const response = await axiosIn.post(`/admin/service`, adminCredentials,configWithToken());
            console.log("the response data is ", response);
            return response.data;
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
  
export const GetServiceAction= createAsyncThunk(
    "admin/getService",
    async (__,{rejectWithValue})=>{
        try {
            console.log( "admin get service ");
            const response = await axiosIn.get(`/admin/service`,config);
            console.log("the response get tyhe service data is ", response);
            return response.data;
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
  
export const GetServiceByIdAction= createAsyncThunk(
    "admin/getService",
    async (__,{rejectWithValue})=>{
        try {
            console.log( "admin get servic ");
            const response = await axiosIn.get(`/admin/service`,config);
            console.log("the response get tyhe service data is ", response);
            return response.data;
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
  

