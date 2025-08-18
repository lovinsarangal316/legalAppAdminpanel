import { toast } from "react-toastify";
import {
  allowedMonths,
  apiEndPoint,
  AppUrl,
  clearDataFromLocalStorage,
  EnumForStoreImaage,
  localKey,
  localKeyForThirdParty,
  setDataInLocalStorage,
  ThirtPartyAppURL,
} from "../helper";
import axiosInstance from "./axiosInstance";
import { pathData } from "../navigation/constants";
import axios from "axios";
import axiosInstanceVersionTwo from "./axiosInstanceVersionTwo";

// Function for Login api
export const LoginService = async (payload, setLoading, navigate) => {
  try {
    setLoading(true);
    const res = await axios.post(AppUrl + apiEndPoint.Login, payload);
    setLoading(false);
    if (res?.status === 200) {
      setDataInLocalStorage(localKey, res?.data?.data);
      LoginServiceForThirdParty();
      toast.success(res?.data?.message);
      navigate(pathData.dashboard);
    }
  } catch (error) {
    toast.error(error?.response?.data?.message);
    setLoading(false);
  }
};

// function for forgot password
export const ForgotPasswordService = async (payload, setLoading, navigate) => {
  try {
    setLoading(true);
    const res = await axiosInstance.post(apiEndPoint.ForgotPass, payload);
    setLoading(false);
    if (res?.status === 202) {
      toast.success(res?.data?.message);
      navigate(pathData.otp, { state: { id: res?.data?.data?._id } });
    }
  } catch (error) {
    toast.error(error?.response?.data?.message);
    setLoading(false);
  }
};

// function for Verify otp
export const VerifyOtpService = async (payload, setLoading, navigate) => {
  try {
    setLoading(true);
    const res = await axiosInstance.post(apiEndPoint.VerifyOtp, payload);
    setLoading(false);
    if (res?.status === 200) {
      toast.success(res?.data?.message);
      navigate(pathData?.createPassword, {
        state: { token: res?.data?.data?.token },
      });
    }
  } catch (error) {
    toast.error(error?.response?.data?.message);
    setLoading(false);
  }
};

// function for Reset pass
export const ResetPasswordService = async (payload, setLoading, navigate) => {
  try {
    setLoading(true);
    const res = await axiosInstance.put(apiEndPoint.ResetPassword, payload);
    setLoading(false);
    if (res?.status === 200) {
      toast.success(res?.data?.message);
      navigate(pathData?.login);
    }
  } catch (error) {
    toast.error(error?.response?.data?.message);
    setLoading(false);
  }
};

// function for Logout
export const LogoutService = async (payload, setLoading, navigate) => {
  try {
    setLoading(true);
    const res = await axiosInstance.post(apiEndPoint.Logout, payload);
    setLoading(false);
    if (res?.status === 200) {
      toast.success(res?.data?.message);
      navigate(pathData?.login);
      clearDataFromLocalStorage(localKey);
      clearDataFromLocalStorage(localKeyForThirdParty);
    }
  } catch (error) {
    toast.error(error?.response?.data?.message);
    setLoading(false);
  }
};

// function for Profile
export const GetProfileService = async (setData, setLoading) => {
  try {
    setLoading(true);
    const res = await axiosInstance.get(apiEndPoint.GetProfile);
    setLoading(false);
    if (res?.status === 200) {
      setData(res?.data?.data);
    }
  } catch (error) {
    toast.error(error?.response?.data?.message);
    setLoading(false);
  }
};

// function for Update Profile
export const UpdateProfileService = async (payload, setLoading, navigate) => {
  try {
    setLoading(true);
    const res = await axiosInstance.put(apiEndPoint.UpdateProfile, payload);
    setLoading(false);
    if (res?.status === 200) {
      toast.success(res?.data?.message);
      navigate(pathData?.profile);
    }
  } catch (error) {
    toast.error(error?.response?.data?.message);
    setLoading(false);
  }
};

// function for Upload profile image
export const UploadProfileImageService = async (
  payload,
  setLoading,
  setLocalState,
  navigate,
  isFormikState
) => {
  try {
    const data = {
      folder: EnumForStoreImaage.PROFILE,
      media: payload,
    };
    setLoading(true);
    const res = await axiosInstance.post(apiEndPoint.UploadImage, data, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    setLoading(false);
    if (res?.status === 200) {
      setLocalState((prev) => ({
        ...prev,
        inputData: {
          ...prev.inputData,
          image: res?.data?.data[0]?.shortPath,
        },
      }));
    }
  } catch (error) {
    toast.error(error?.response?.data?.message);
    setLoading(false);
  }
};

// function for Upload profile image
export const UploadProfileImageViaFormikStateService = async (
  payload,
  setLoading,
  setImage,
  slug
) => {
  try {
    const data = {
      folder: slug,
      media: payload,
    };
    setLoading(true);
    const res = await axiosInstance.post(apiEndPoint.UploadImage, data, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    setLoading(false);
    if (res?.status === 200) {
      const shortPath = res?.data?.data[0]?.shortPath;
      setImage(shortPath);
    }
  } catch (error) {
    toast.error(error?.response?.data?.message || "Something went wrong");
    setLoading(false);
  }
};

// function for add user
export const AddUserService = async (payload, setLoading, navigate) => {
  try {
    setLoading(true);
    const res = await axiosInstance.post(apiEndPoint.AddUser, payload);
    setLoading(false);
    if (res?.status === 201) {
      toast.success(res?.data?.message);
      navigate(pathData?.userManagement);
    }
  } catch (error) {
    toast.error(error?.response?.data?.message);
    setLoading(false);
  }
};

// function for update user
export const UpdateUserService = async (payload, setLoading, navigate) => {
  try {
    setLoading(true);
    const res = await axiosInstance.put(apiEndPoint.UpdateUser, payload);
    setLoading(false);
    if (res?.status === 200) {
      toast.success(res?.data?.message);
      navigate(pathData?.userManagement);
    }
  } catch (error) {
    toast.error(error?.response?.data?.message);
    setLoading(false);
  }
};

// function for delete user
export const DeleteUserService = async (setLoading, userID) => {
  try {
    setLoading(true);
    const res = await axiosInstance.delete(
      `${apiEndPoint.DeleteUser}?id=${userID}`
    );
    setLoading(false);
    if (res?.status === 200) {
      toast.success("User deleted successfully");
      return true;
    }
  } catch (error) {
    toast.error(error?.response?.data?.message);
    setLoading(false);
    return false;
  }
};

// function for delete notification
export const DeleteNotificationService = async (setLoading, notificationID) => {
  try {
    setLoading(true);
    const res = await axiosInstance.delete(
      `${apiEndPoint.DeleteNotification}/${notificationID}`
    );
    setLoading(false);
    if (res?.status === 200) {
      toast.success(res?.data?.message);
      return true;
    }
  } catch (error) {
    toast.error(error?.response?.data?.message);
    setLoading(false);
    return false;
  }
};

// function for Banners List
export const GetBannersListService = async (
  setData,
  setLoading,
  setTotalPages,
  currentPage,
  search = ""
) => {
  try {
    setLoading(true);
    const res = await axiosInstance.get(
      `${
        apiEndPoint.GetBannersList
      }?page=${currentPage}&count=${10}&search=${search}`
    );
    setLoading(false);
    if (res?.status === 200) {
      setData(res?.data?.data[0]?.banners);
      setTotalPages(Math.ceil(res?.data?.data[0]?.pagination[0]?.total / 10));
    }
  } catch (error) {
    toast.error(error?.response?.data?.message);
    setLoading(false);
  }
};

// function for add user
export const AddBannerService = async (payload, setLoading, navigate) => {
  try {
    setLoading(true);
    const res = await axiosInstance.post(apiEndPoint.AddBanner, payload);
    setLoading(false);
    if (res?.status === 201) {
      toast.success(res?.data?.message);
      navigate(pathData?.bannersManagement);
    }
  } catch (error) {
    toast.error(error?.response?.data?.message);
    setLoading(false);
  }
};

// function for delete banner
export const DeleteBannerService = async (setLoading, userID) => {
  try {
    setLoading(true);
    const res = await axiosInstance.delete(
      `${apiEndPoint.DeleteBanner}?id=${userID}`
    );
    setLoading(false);
    if (res?.status === 200) {
      toast.success(res?.data?.message);
      return true;
    }
  } catch (error) {
    toast.error(error?.response?.data?.message);
    setLoading(false);
    return false;
  }
};

// function for get banner

export const GetBannerService = async (setData, setLoading, userID) => {
  try {
    setLoading(true);
    const res = await axiosInstance.get(
      `${apiEndPoint.GetBanner}?id=${userID}`
    );
    setLoading(false);
    if (res?.status === 200) {
      setData(res?.data?.data);
    }
  } catch (error) {
    toast.error(error?.response?.data?.message);
    setLoading(false);
  }
};

// function for update banner
export const UpdateBannerService = async (payload, setLoading, navigate) => {
  try {
    setLoading(true);
    const res = await axiosInstance.put(apiEndPoint.UpdateBanner, payload);
    setLoading(false);
    if (res?.status === 200) {
      toast.success(res?.data?.message);
      navigate(pathData?.bannersManagement);
    }
  } catch (error) {
    toast.error(error?.response?.data?.message);
    setLoading(false);
  }
};

// function for get publication

export const GetPublicationListService = async (
  setData,
  setLoading,
  setTotalPages,
  currentPage,
  search = ""
) => {
  try {
    setLoading(true);
    const res = await axiosInstance.get(
      `${
        apiEndPoint.GetPublicationList
      }?page=${currentPage}&count=${10}&search=${search}`
    );
    setLoading(false);
    if (res?.status === 200) {
      setData(res?.data?.data[0]?.publications);
      setTotalPages(Math.ceil(res?.data?.data[0]?.pagination[0]?.total / 10));
    }
  } catch (error) {
    toast.error(error?.response?.data?.message);
    setLoading(false);
  }
};

// function for add publication
export const AddPublicationService = async (payload, setLoading, navigate) => {
  try {
    setLoading(true);
    const res = await axiosInstance.post(apiEndPoint.AddPublication, payload);
    setLoading(false);
    if (res?.status === 201) {
      toast.success(res?.data?.message);
      navigate(pathData?.contentPublication);
    }
  } catch (error) {
    toast.error(error?.response?.data?.message);
    setLoading(false);
  }
};

// function for update publication
export const UpdatePublicationService = async (
  payload,
  setLoading,
  navigate
) => {
  try {
    setLoading(true);
    const res = await axiosInstance.put(apiEndPoint.UpdatePublication, payload);
    setLoading(false);
    if (res?.status === 200) {
      toast.success(res?.data?.message);
      navigate(pathData?.contentPublication);
    }
  } catch (error) {
    toast.error(error?.response?.data?.message);
    setLoading(false);
  }
};

// function for get publication by ID

export const GetPublicationService = async (setData, setLoading, userID) => {
  try {
    setLoading(true);
    const res = await axiosInstance.get(
      `${apiEndPoint.GetPublication}?id=${userID}`
    );
    setLoading(false);
    if (res?.status === 200) {
      setData(res?.data?.data);
    }
  } catch (error) {
    toast.error(error?.response?.data?.message);
    setLoading(false);
  }
};

// function for delete publication by ID
export const DeletePublicationService = async (setLoading, userID) => {
  try {
    setLoading(true);
    const res = await axiosInstance.delete(
      `${apiEndPoint.DeletePublication}?id=${userID}`
    );
    setLoading(false);
    if (res?.status === 200) {
      toast.success(res?.data?.message);
      return true;
    }
  } catch (error) {
    toast.error(error?.response?.data?.message);
    setLoading(false);
    return false;
  }
};

// function for add cms
export const AddCMSService = async (payload, setLoading, callback) => {
  try {
    setLoading(true);
    const res = await axiosInstance.post(apiEndPoint.AddCMS, payload);
    setLoading(false);
    if (res?.status === 201) {
      toast.success(res?.data?.message);
      if (callback) {
        callback();
      }
    }
  } catch (error) {
    toast.error(error?.response?.data?.message);
    setLoading(false);
  }
};

// function for get cms data on the basis of cms type
export const GetCmsDataFromType = async (setData, setLoading, type) => {
  try {
    setLoading(true);
    const res = await axiosInstance.get(`${apiEndPoint.GetCMS}/?type=${type}`);
    setLoading(false);
    if (res?.status === 200) {
      setData(res?.data?.data);
    }
  } catch (error) {
    toast.error(error?.response?.data?.message);
    setLoading(false);
  }
};

// function for get faq list

export const GetFAQListService = async (
  setData,
  setLoading,
  setTotalPages,
  currentPage,
  search = ""
) => {
  try {
    setLoading(true);
    const res = await axiosInstance.get(
      `${
        apiEndPoint.GetFAQList
      }?page=${currentPage}&count=${10}&search=${search}`
    );
    setLoading(false);
    if (res?.status === 200) {
      setData(res?.data?.data[0]?.faqs);
      setTotalPages(Math.ceil(res?.data?.data[0]?.pagination[0]?.total / 10));
    }
  } catch (error) {
    toast.error(error?.response?.data?.message);
    setLoading(false);
  }
};

// function for add faq
export const AddFAQService = async (payload, setLoading, navigate) => {
  try {
    setLoading(true);
    const res = await axiosInstance.post(apiEndPoint.AddFAQ, payload);
    setLoading(false);
    if (res?.status === 201) {
      toast.success(res?.data?.message);
      navigate(pathData?.contentFaq);
    }
  } catch (error) {
    toast.error(error?.response?.data?.message);
    setLoading(false);
  }
};

// function for update faq
export const UpdateFAQService = async (payload, setLoading, navigate) => {
  try {
    setLoading(true);
    const res = await axiosInstance.put(apiEndPoint.UpdateFAQ, payload);
    setLoading(false);
    if (res?.status === 200) {
      toast.success(res?.data?.message);
      navigate(pathData?.contentFaq);
    }
  } catch (error) {
    toast.error(error?.response?.data?.message);
    setLoading(false);
  }
};

// function for get faq by ID

export const GetFAQService = async (
  setData,
  setLoading,
  userID,
  setCount,
  setCountAnswer
) => {
  try {
    setLoading(true);
    const res = await axiosInstance.get(`${apiEndPoint.GetFAQ}?id=${userID}`);
    setLoading(false);
    if (res?.status === 200) {
      setData(res?.data?.data);
      const textOnly = res?.data?.data?.question.replace(/<[^>]*>/g, ""); // Remove HTML tags
      const textOnlyForAnswer = res?.data?.data?.answer.replace(/<[^>]*>/g, ""); // Remove HTML tags
      setCount(textOnly?.length);
      setCountAnswer(textOnlyForAnswer?.length);
    }
  } catch (error) {
    toast.error(error?.response?.data?.message);
    setLoading(false);
  }
};

// function for delete faq by ID
export const DeleteFAQService = async (setLoading, userID) => {
  try {
    setLoading(true);
    const res = await axiosInstance.delete(
      `${apiEndPoint.DeleteFAQ}?id=${userID}`
    );
    setLoading(false);
    if (res?.status === 200) {
      toast.success(res?.data?.message);
      return true;
    }
  } catch (error) {
    toast.error(error?.response?.data?.message);
    setLoading(false);
    return false;
  }
};

// function for update status of trademark
export const UpdateTrademarkStatusService = async (
  payload,
  setLoading,
  navigate
) => {
  try {
    setLoading(true);
    const res = await axiosInstance.patch(
      apiEndPoint.UpdateTrademarkStatus,
      payload
    );
    setLoading(false);
    if (res?.status === 200) {
      toast.success(res?.data?.message);
      return true;
      // navigate(pathData?.applicationManagement);
    }
  } catch (error) {
    toast.error(error?.response?.data?.message);
    setLoading(false);
    return false;
  }
};

// function for ticket list (Application mgmt)
export const GetTicketsListService = async (
  setData,
  setLoading,
  setTotalPages,
  currentPage,
  search = "",
  status
) => {
  try {
    setLoading(true);
    const res = await axiosInstance.get(
      `${
        apiEndPoint.GetTickets
      }?page=${currentPage}&count=${10}&search=${search}&ticket_status=${
        status == "all" ? "" : status
      }`
    );
    setLoading(false);
    if (res?.status === 200) {
      setData(res?.data?.data[0]?.tickets);
      setTotalPages(Math.ceil(res?.data?.data[0]?.pagination[0]?.total / 10));
    }
  } catch (error) {
    toast.error(error?.response?.data?.message);
    setLoading(false);
  }
};

// function for get ticket detail

export const GetTicketService = async (
  setData,
  setLoading,
  userID,
  setStatus
) => {
  try {
    setLoading(true);
    const res = await axiosInstance.get(
      `${apiEndPoint.GetTicket}?id=${userID}`
    );
    setLoading(false);
    if (res?.status === 200) {
      setData(res?.data?.data);
      setStatus(res?.data?.data?.ticket_status);
    }
  } catch (error) {
    toast.error(error?.response?.data?.message);
    setLoading(false);
  }
};

// function for add comment
export const addCommentService = async (payload, setLoading) => {
  try {
    setLoading(true);
    const res = await axiosInstance.post(apiEndPoint.AddComment, payload);
    setLoading(false);
    if (res?.status === 201) {
      toast.success(res?.data?.message);
      return true;
    }
  } catch (error) {
    toast.error(error?.response?.data?.message);
    setLoading(false);
    return false;
  }
};

// function for update ticket status
export const UpdateTicketStatusService = async (payload, setLoading) => {
  try {
    setLoading(true);
    const res = await axiosInstance.patch(
      apiEndPoint.UpdateTicketStatus,
      payload
    );
    setLoading(false);
    if (res?.status === 200) {
      toast.success(res?.data?.message);
      return true;
    }
  } catch (error) {
    toast.error(error?.response?.data?.message);
    setLoading(false);
    return false;
  }
};

// function for get dashboard data

export const GetDashboardCounterService = async (
  setDashCount,
  setChartStatePie,
  setChartStateColumn,
  setLoading
) => {
  try {
    setLoading(true);
    const res = await axiosInstance.get(`${apiEndPoint.GetDashboardCounter}`);
    const totalUser = res?.data?.data?.totalUsers;
    const totalApplication = res?.data?.data?.totalApplications;
    if (res?.status === 200) {
      //  setdashboard counter state
      setDashCount((prev) =>
        prev.map((item) => {
          if (item.label === "Applications") {
            return { ...item, value: totalApplication.toString() };
          }
          if (item.label === "Users") {
            return { ...item, value: totalUser.toString() };
          }
          return item;
        })
      ); // set pie chart state
      setChartStatePie((prev) => ({
        ...prev,
        series: [
          Number(res?.data?.data?.applicationStatus?.pending) || 0,
          Number(res?.data?.data?.applicationStatus?.approved) || 0,
          // Number(res?.data?.data?.applicationStatus?.rejected) || 0, Remove on 21-03-2025
        ],
      }));
      const updatedValue = allowedMonths?.map((curElm) => {
        const findMonths = res?.data?.data?.monthlyUsers.find(
          (month) => month?._id == curElm?.value
        );
        return findMonths
          ? { ...curElm, data: parseInt(findMonths.count) }
          : curElm;
      });
      // set column chart
      setChartStateColumn((prev) => ({
        ...prev,
        series: [
          { ...prev?.series[0], data: updatedValue.map((item) => item.data) },
        ],
      }));
    }
    setLoading(false);
  } catch (error) {
    toast.error(error?.response?.data?.message);
    setLoading(false);
  }
};

// get notification data
export const GetNotificationDataService = async (
  setNotificationData,
  setLoading
) => {
  try {
    setLoading(true);
    const res = await axiosInstance.get(apiEndPoint.GetNotification);
    setLoading(false);
    if (res?.status === 200) {
      setNotificationData(res?.data?.data?.notifications);
    }
  } catch (error) {
    toast.error(error?.response?.data?.message);
    setLoading(false);
  }
};

// get notification count data
export const GetUnreadCountService = async (setCount, setLoading) => {
  try {
    setLoading(true);
    const res = await axiosInstance.get(apiEndPoint.GetNotificationCount);
    setLoading(false);
    if (res?.status === 200) {
      setCount(res?.data?.data?.count);
    }
  } catch (error) {
    toast.error(error?.response?.data?.message);
    setLoading(false);
  }
};

// get notification count data
export const GetReadNotificationService = async (
  setLoading,
  notificationData
) => {
  try {
    setLoading(true);
    const res = await axiosInstance.put(
      `${apiEndPoint.ReadNotification}/${notificationData?._id}/read`
    );
    if (res?.status === 200) {
      // toast.success(res?.data?.message);  Remove 21-03-2025
      return true;
    }
    setLoading(false);
  } catch (error) {
    toast.error(error?.response?.data?.message);
    setLoading(false);
    return false;
  }
};

//**************** */ Third party api start***********

// third party login service
export const LoginServiceForThirdParty = async () => {
  const payloadForThirdParty = {
    // username: "T50228",
    // password: "Junior2020",
    username: "admin@localhost.com",
    password: "Junior2020",
  };
  try {
    const res = await axios.post(
      ThirtPartyAppURL + apiEndPoint.thirdParty.login,
      payloadForThirdParty
    );
    if (res?.status === 200) {
      setDataInLocalStorage(localKeyForThirdParty, res?.data);
      return true;
    }
  } catch (error) {
    console.log(error);
  }
};

// function for Users List with third party api
export const GetUsersService = async (
  setData,
  setLoading,
  setTotalPages,
  currentPage,
  search = ""
) => {
  try {
    setLoading(true);
    const res = await axiosInstanceVersionTwo.get(
      `${
        apiEndPoint.thirdParty.getUsers
      }?PageNumber=${currentPage}&PageSize=${10}&KeyWord=${search}`
    );
    setLoading(false);
    if (res?.status === 200) {
      setData(res?.data);
      // setData(res?.data?.data[0]?.users);
      const pagination = res?.headers["pagination"]
        ? JSON.parse(res.headers["pagination"])
        : {};
      if (pagination?.totalPages) {
        setTotalPages(Number(pagination.totalPages));
      }
    }
  } catch (error) {
    toast.error(error?.response?.data?.message);
    setLoading(false);
  }
};

// function for get user list with third party api

export const GetUserService = async (setData, setLoading, userID) => {
  try {
    setLoading(true);
    const res = await axiosInstanceVersionTwo.get(
      `${apiEndPoint.thirdParty.getUser}/${userID}`
    );
    setLoading(false);
    if (res?.status === 200) {
      setData(res?.data);
    }
  } catch (error) {
    toast.error(error?.response?.data?.message);
    setLoading(false);
  }
};

// function for trademark list
export const GetTrademarkListService = async (
  setData,
  setLoading,
  setTotalPages,
  currentPage,
  search = ""
) => {
  try {
    setLoading(true);
    const res = await axiosInstanceVersionTwo.get(
      `${
        apiEndPoint.thirdParty.getTrademarks
      }?PageNumber=${currentPage}&PageSize=${10}&KeyWord=${search}`
    );
    setLoading(false);
    if (res?.status === 200) {
      setData(res?.data);
      const pagination = res?.headers["pagination"]
        ? JSON.parse(res.headers["pagination"])
        : {};
      if (pagination?.totalPages) {
        setTotalPages(Number(pagination.totalPages));
      }
      // setTotalPages(Math.ceil(res?.data?.data[0]?.pagination[0]?.total / 10));
    }
  } catch (error) {
    toast.error(error?.response?.data?.message);
    setLoading(false);
  }
};

// function for application trademark list
export const GetApplicationTrademarkListService = async (
  setData,
  setLoading,
  setTotalPages,
  currentPage,
  search = ""
) => {
  try {
    setLoading(true);
    const res = await axiosInstanceVersionTwo.get(
      `${
        apiEndPoint.thirdParty.getApplicationTrademarks
      }?PageNumber=${currentPage}&PageSize=${10}&KeyWord=${search}`
    );
    setLoading(false);
    if (res?.status === 200) {
      setData(res?.data);
      const pagination = res?.headers["pagination"]
        ? JSON.parse(res.headers["pagination"])
        : {};
      if (pagination?.totalPages) {
        setTotalPages(Number(pagination.totalPages));
      }
      // setTotalPages(Math.ceil(res?.data?.data[0]?.pagination[0]?.total / 10));
    }
  } catch (error) {
    toast.error(error?.response?.data?.message);
    setLoading(false);
  }
};

// function for get trademark by id
export const GetTrademarkService = async (
  setData,
  setLoading,
  userID,
  setStatus
) => {
  try {
    setLoading(true);
    const res = await axiosInstanceVersionTwo.get(
      `${apiEndPoint.thirdParty.getTrademarkByID}/${userID}`
    );
    setLoading(false);
    if (res?.status === 200) {
      setData(res?.data);
      setStatus(res?.data?.data?.trademark_status);
    }
  } catch (error) {
    toast.error(error?.response?.data?.message);
    setLoading(false);
  }
};

// function for get application count
export const GetApplicationCount = async (setData, setLoading) => {
  try {
    setLoading(true);
    const res = await axiosInstanceVersionTwo.get(
      apiEndPoint.thirdParty.getAppCount
    );
    setLoading(false);
    if (res?.status === 200) {
      setData((prev) =>
        prev.map((item) => {
          if (item?.label === "Applications") {
            return { ...item, value: res?.data };
          }
          return item;
        })
      );
    }
  } catch (error) {
    console.log(error);
    setLoading(false);
  }
};

// function for get application count
export const GetUsersCount = async (setData, setLoading) => {
  try {
    setLoading(true);
    const res = await axiosInstanceVersionTwo.get(
      apiEndPoint.thirdParty.getUserCount
    );
    setLoading(false);
    if (res?.status === 200) {
      setData((prev) =>
        prev.map((item) => {
          if (item?.label === "Users") {
            return { ...item, value: res?.data };
          }
          return item;
        })
      );
    }
  } catch (error) {
    console.log(error);
    setLoading(false);
  }
};

// function for get application count
export const GetApplicationStatusChartData = async (setData, setLoading) => {
  try {
    setLoading(true);
    const res = await axiosInstanceVersionTwo.get(
      apiEndPoint.thirdParty.getAppStatusChart
    );
    setLoading(false);
    if (res?.status === 200) {
      setData((prev) => ({
        ...prev,
        series: [
          Number(res?.data[0]?.count) || 0,
          Number(res?.data[1]?.count) || 0,
          Number(res?.data[2]?.count) || 0,
        ],
      }));
    }
  } catch (error) {
    console.log(error);
    setLoading(false);
  }
};

// function for get application count
export const GetUsersStatusChartData = async (setData, setLoading) => {
  try {
    setLoading(true);
    const res = await axiosInstanceVersionTwo.get(
      apiEndPoint.thirdParty.getUsersStatusChart
    );
    setLoading(false);
    if (res?.status === 200) {
      const updatedValue = allowedMonths?.map((curElm) => {
        const findMonths = res?.data?.find(
          (month) => month?.month == curElm?.label
        );
        return findMonths
          ? { ...curElm, data: parseInt(findMonths.count) }
          : curElm;
      });
      // set column chart
      setData((prev) => ({
        ...prev,
        series: [
          { ...prev?.series[0], data: updatedValue.map((item) => item.data) },
        ],
      }));
    }
  } catch (error) {
    console.log(error);
    setLoading(false);
  }
};
