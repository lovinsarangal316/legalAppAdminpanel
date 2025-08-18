import { createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../../services/axiosInstance";
import { toast } from "react-toastify";
import { apiEndPoint } from "../../helper";

export const userprofile = createAsyncThunk("/profile", async () => {
  try {
    const res = await axiosInstance.get(apiEndPoint.GetProfile);
    return res?.data?.data;
  } catch (error) {
    toast.error(error?.response?.data?.message);
  }
});
