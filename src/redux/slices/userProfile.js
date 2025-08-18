import { createSlice } from "@reduxjs/toolkit";
import StatusCode from "../../utils/statuscode";
import { userprofile } from "../thunks/userprofile";

const initialState = {
  profileData: null,
  search: "",
  searchFlag: "",
  currentPageNumber: "",
  status: StatusCode.IDLE,
};

const userProfileSlice = createSlice({
  name: "profile",
  initialState,
  reducers: {
    searchHandler: (state, action) => {
      state.search = action.payload;
    },
    searchHandlerFlag: (state, action) => {
      state.searchFlag = action.payload;
    },
    currentPagehandler: (state, action) => {
      state.currentPageNumber = action.payload;
    },
    resetCurrentPagehandler: (state, action) => {
      state.currentPageNumber = "";
    },
    resetSearchhandler: (state, action) => {
      state.search = "";
    },
  },
  extraReducers: (builder) => {
    // login user thunk
    builder
      .addCase(userprofile.pending, (state) => {
        state.status = StatusCode.LOADING;
      })
      .addCase(userprofile.fulfilled, (state, action) => {
        state.profileData = action?.payload;
        state.status = StatusCode.IDLE;
      })
      .addCase(userprofile.rejected, (state, action) => {
        state.status = StatusCode.ERROR;
      });
  },
});

export const {
  searchHandler,
  currentPagehandler,
  resetCurrentPagehandler,
  resetSearchhandler,
  searchHandlerFlag,
} = userProfileSlice.actions;

export default userProfileSlice.reducer;
