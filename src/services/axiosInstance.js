import axios from "axios";
import {
  AppUrl,
  clearDataFromLocalStorage,
  getDataFromLocalStorage,
  localKey,
} from "../helper";
const axiosInstance = axios.create({
  baseURL: AppUrl,
});

const requestHandler = async (request) => {
  const isAuthData = getDataFromLocalStorage(localKey);
  try {
    request.headers["Authorization"] =
      "Bearer " + isAuthData?.access_token?.token;
  } catch (e) {
    console.log(e, "err");
  }
  return request;
};

const responseHandler = (response) => {
  return response;
};
axiosInstance.interceptors.request.use(requestHandler, (error) => {
  Promise.reject(error);
});
axiosInstance.interceptors.response.use(responseHandler, async (error) => {
  console.log("intercepter console", error);
  if (error?.response?.status === 401) {
    clearDataFromLocalStorage(localKey);
    window.location.href = "/login";
  }
  return Promise.reject(error);
});
export default axiosInstance;
