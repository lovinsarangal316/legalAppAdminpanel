import axios from "axios";
import {
  ThirtPartyAppURL,
  clearDataFromLocalStorage,
  getDataFromLocalStorage,
  localKeyForThirdParty,
} from "../helper";
import { LoginServiceForThirdParty } from "./globalServices";
const axiosInstanceVersionTwo = axios.create({
  baseURL: ThirtPartyAppURL,
});

const requestHandler = async (request) => {
  const isAuthData = getDataFromLocalStorage(localKeyForThirdParty);
  try {
    request.headers["Authorization"] = "Bearer " + isAuthData?.token;
  } catch (e) {
    console.log(e, "err");
  }
  return request;
};

const responseHandler = (response) => {
  return response;
};
axiosInstanceVersionTwo.interceptors.request.use(requestHandler, (error) => {
  Promise.reject(error);
});
axiosInstanceVersionTwo.interceptors.response.use(
  responseHandler,
  async (error) => {
    const originalRequest = error.config;
    console.log("intercepter console", error);
    if (error?.response?.status === 401) {
      originalRequest._retry = true;
      const isSucceed = await LoginServiceForThirdParty();
      if (isSucceed) {
        return axiosInstanceVersionTwo(originalRequest);
      } else {
        clearDataFromLocalStorage(localKeyForThirdParty);
        window.location.href = "/login";
      }
    }
    return Promise.reject(error);
  }
);
export default axiosInstanceVersionTwo;
