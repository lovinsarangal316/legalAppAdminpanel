import { createSlice } from "@reduxjs/toolkit";
import { login } from "../thunks/auth";
import { toast } from "react-toastify";
import StatusCode from "../../utils/statuscode";

const initialState = {
  token: null,
  status: StatusCode.IDLE,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout: (state) => {
      state.token = null;
      toast.success("Logged Out Successfully");
    },
  },
  extraReducers: (builder) => {
    // login user thunk
    builder
      .addCase(login.pending, (state) => {
        state.status = StatusCode.LOADING;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.token = action?.payload?.token;
        state.status = StatusCode.IDLE;
      })
      .addCase(login.rejected, (state, action) => {
        state.status = StatusCode.ERROR;
      });
  },
});

export const { logout } = authSlice.actions;

export default authSlice.reducer;
