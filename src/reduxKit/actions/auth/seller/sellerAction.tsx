
import { configWithToken,axiosIn} from "../../../../config/constants";



import { createAsyncThunk } from "@reduxjs/toolkit";



export const getAllsellersAction  = createAsyncThunk(
  "admin/getSellers",
  async (__, { rejectWithValue }) => {
    try {
    const response = await  axiosIn.get(`/admin/seller`, configWithToken() )
        return response.data
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      if (error.response && error.response.data) {
        return rejectWithValue(error.response.data);
      } else {
        return rejectWithValue({ message: "Something went wrong!" });
      }
    }
  }
);

