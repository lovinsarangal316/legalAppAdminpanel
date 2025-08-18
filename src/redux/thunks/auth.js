import { createAsyncThunk } from "@reduxjs/toolkit";
// import { tryCatchWrapper } from "../../utils/methods";
import { pathData } from "../../navigation/constants";
import axiosInstance from "../../services/axiosInstance";
import { toast } from "react-toastify";
import { localKey, setDataInLocalStorage } from "../../helper";
// import httpRequest from "../../services/httpsRequest";

// export const login = createAsyncThunk(
//   "auth/login",
//   async ({ email, password, navigate }, { rejectWithValue, thunkApi }) => {
//     return tryCatchWrapper(
//       async ({ email, password, navigate }) => {
//         const data = await httpRequest({
//           method: "get",
//           url: "/posts",
//           params: { id: 123 },
//           token: true,
//           setLoader: (loading) => console.log("Loader:", loading),
//         });
//         console.log("API Data:", data);

//         if (email === "admin@gmail.com" && password === "password") {
//           const token = "aBcD12345EfGhIjKlMnOpQrStUvWxYz67890AbCdEfGhIjKlMnOp";
//           setDataInLocalStorage("token", token);
//           navigate(pathData.dashboard);
//           return { token };
//         } else {
//           throw new Error("Invalid credentials");
//         }
//       },
//       { email, password, navigate },
//       rejectWithValue
//     );
//   }
// );

export const login = createAsyncThunk(
  "user/login",
  async ({ payload, navigate }) => {
    try {
      // const res = await axiosInstance.post(`${LOGIN}`, data);
      // if (res.data?.status === 200) {
      //   toast.success(res.data?.message);
      // }
      if (
        payload.email === "admin@gmail.com" &&
        payload.password === "password"
      ) {
        const token = "aBcD12345EfGhIjKlMnOpQrStUvWxYz67890AbCdEfGhIjKlMnOp";
        setDataInLocalStorage(localKey, token);
        navigate(pathData.dashboard);
        toast.success("Logged in successfull");
        return { token };
      } else {
        toast("Invalid credentials");
      }
      return token;
    } catch (error) {
      toast.error(error.data?.message);
    }
  }
);
