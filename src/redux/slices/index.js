import { combineReducers } from "@reduxjs/toolkit";
import authSlice from "./auth";
import userProfileSlice from "./userProfile";
const rootReducer = combineReducers({
  auth: authSlice,
  userProfile: userProfileSlice,
});

export default rootReducer;
