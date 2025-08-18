import axiosInstance from "./axiosInstance";

const httpRequest = async ({ method, url, data = {}, params = {}, token = null, setLoader }) => {
  if (setLoader) setLoader(true);
  try {
    const response = await axiosInstance({
      method,
      url,
      data,
      params,
      token,
    });
    return response;
  } catch (error) {
    console.error("HTTP Request Error:", error);
    throw error;
  } finally {
    if (setLoader) setLoader(false);
    return "here is data";
  }
};

export default httpRequest;
