// @@ function for handling header title on the basis of url
import { pathData } from "../navigation/constants";

// @@ param is url
export const renderHeaderTitle = (pathname) => {
  const withNoDigits = pathname.replace(/[0-9]/g, "");
  if (withNoDigits == pathData.dashboard) {
    return "Dashboard";
  } else if (withNoDigits == pathData.userManagement) {
    return "User Management";
  } else if (withNoDigits == pathData.applicationManagement) {
    return "Application Management";
  } else if (withNoDigits == pathData.bannersManagement) {
    return "Banner Management";
  } else if (withNoDigits == pathData.support) {
    return "Support";
  } else if (withNoDigits == pathData.userManagementCreateUser) {
    return "User Management / Create user";
  } else if (withNoDigits == pathData.userManagementUpdateUser) {
    return "User Management / Update user";
  } else if (withNoDigits == pathData.createBanner) {
    return "Banner Management / Create Banner";
  } else if (withNoDigits == pathData.privacyPolicy) {
    return "Privacy Policy";
  } else if (withNoDigits == pathData.termsAndCondition) {
    return "Terms And Condition";
  } else if (withNoDigits == pathData.aboutUs) {
    return "About Us";
  } else if (withNoDigits == pathData.contentPublication) {
    return "Publication";
  } else if (withNoDigits == pathData.contentFaq) {
    return "FAQ";
  } else if (withNoDigits == pathData.userMgmtUsersDetail) {
    return "User Management / user detail";
  } else if (withNoDigits == pathData.updateBanner) {
    return "Banner Management / Update Banner";
  } else if (withNoDigits == pathData.supportChat) {
    return "Chats";
  } else if (withNoDigits == pathData.supportTicket) {
    return "Tickets";
  } else if (withNoDigits == pathData.contentCreatePublication) {
    return "Publication / Create";
  } else if (withNoDigits == pathData.contentUpdatePublication) {
    return "Publication / Update";
  } else if (withNoDigits == pathData.contentDetailPublication) {
    return "Publication / Detail";
  } else if (withNoDigits == pathData.contentCreateFaq) {
    return "FAQ / Create";
  } else if (withNoDigits == pathData.contentUpdateFaq) {
    return "FAQ / Update";
  } else if (withNoDigits == pathData.contentDetailFaq) {
    return "FAQ / Detail";
  } else if (withNoDigits == pathData.applicationDetail) {
    return "Application Management / Detail";
  } else if (withNoDigits == pathData.profile) {
    return "Profile";
  } else if (withNoDigits == pathData.editProfile) {
    return "Profile / Edit Profile";
  } else if (withNoDigits == pathData.payments) {
    return "Payments";
  } else if (withNoDigits == pathData.paymentDetails) {
    return "Payments / detail";
  } else if (withNoDigits == pathData.tradeMarks) {
    return "Trademarks";
  } else if (withNoDigits == pathData.tradeMarkDetails) {
    return "Trademarks / detail";
  } else if (withNoDigits == pathData.supportTicket) {
    return "Tickets";
  } else if (withNoDigits == pathData.supportTicketDetails) {
    return "Ticket / Detail";
  }
};

export const AppUrl = "https://legalapi.billetteriesoftware.com/api/v1";
export const ThirtPartyAppURL = "https://mapi.billetteriesoftware.com/api";

// @@ function for set data into localStorage
export const setDataInLocalStorage = (key, data) => {
  return localStorage.setItem(key, JSON.stringify(data));
};

// @@ function for retriew data from localstorage

export const getDataFromLocalStorage = (key) => {
  return JSON.parse(localStorage.getItem(key));
};

// @@ function for remove data from localstorage

export const clearDataFromLocalStorage = (key) => {
  return localStorage.removeItem(key);
};

// function for set time
export function timeAgo(timestamp) {
  const now = new Date();
  const past = new Date(timestamp);
  const diffInSeconds = Math.floor((now - past) / 1000);

  if (diffInSeconds < 60) {
    return `${diffInSeconds} sec ago`;
  }

  const diffInMinutes = Math.floor(diffInSeconds / 60);
  if (diffInMinutes < 60) {
    return `${diffInMinutes} min ago`;
  }

  const diffInHours = Math.floor(diffInMinutes / 60);
  if (diffInHours < 24) {
    return `${diffInHours} hour${diffInHours > 1 ? "s" : ""} ago`;
  }

  const diffInDays = Math.floor(diffInHours / 24);
  if (diffInDays < 7) {
    return `${diffInDays} day${diffInDays > 1 ? "s" : ""} ago`;
  }

  const diffInWeeks = Math.floor(diffInDays / 7);
  if (diffInWeeks < 4) {
    return `${diffInWeeks} week${diffInWeeks > 1 ? "s" : ""} ago`;
  }

  const diffInMonths = Math.floor(diffInDays / 30);
  if (diffInMonths < 12) {
    return `${diffInMonths} month${diffInMonths > 1 ? "s" : ""} ago`;
  }

  const diffInYears = Math.floor(diffInDays / 365);
  return `${diffInYears} year${diffInYears > 1 ? "s" : ""} ago`;
}

// Helper function to sanitize ReactQuill value
export const sanitizeQuillValue = (value) => {
  const sanitizedValue = value.replace(/<(.|\n)*?>/g, "").trim(); // Remove HTML tags and trim
  return sanitizedValue === "" ? "" : value;
};

// @@ function for return only number formmat
export function onChangeToNumber(value) {
  return String(value)?.replace(/[^\d]/g, "").trimStart();
}
// Name of local storage key
export const localKey = "token";
export const localKeyForThirdParty = "tokenForThirdPart";

// function for get date into 21-January-2025 this format

export function formatDate(createdAt) {
  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  const dateObj = new Date(createdAt);
  const day = dateObj.getDate(); // Din (21)
  const month = months[dateObj.getMonth()]; // Month ka naam (January)
  const year = dateObj.getFullYear(); // Year (2025)
  return `${day}-${month}-${year}`;
}

// function for convert date and time for chat

export function formatTimeStampChat(timestamp) {
  const date = new Date(timestamp);

  // Extracting date components
  const day = date.getDate();
  const month = date.toLocaleString("en-US", { month: "short" });
  const year = date.getFullYear();

  // Extracting time components
  let hours = date.getHours();
  const minutes = date.getMinutes().toString().padStart(2, "0");
  const ampm = hours >= 12 ? "PM" : "AM";

  // Convert hours to 12-hour format and pad with zero if needed
  hours = hours % 12 || 12;
  const formattedHours = hours.toString().padStart(2, "0");
  return `${day} ${month} ${year} ${formattedHours}:${minutes} ${ampm}`;
}
// Enum for store image
export const EnumForStoreImaage = {
  PROFILE: "profile-images",
  BANNER: "banner-images",
  PUBLICATION: "publication-images",
};
// Enum for CMS
export const EnumForCMS = {
  PrivacyPolicy: "privacy-policy",
  TermsAndCondition: "terms-and-conditions",
  AboutUS: "about-us",
};
// enum for status

export const EnumForStatus = {
  All: "all",
  Pending: "pending",
  Approved: "approved",
  Reject: "rejected",
  InProgress: "inprogress",
};
// enum for color

export const EnumForStatusColor = {
  Info: "info",
  Success: "success",
  Warning: "warning",
  Danger: "danger",
};

export const EnumForTicketStatus = {
  All: "all",
  Open: "open",
  Closed: "closed",
  Inprogress: "inprogress",
};
// function for remove tag
export function removeHTMLTags(str) {
  return str.replace(/<[^>]*>/g, "").trim();
}
// array for allowed months
export const allowedMonths = [
  { value: 1, data: 0, label: "Jan" },
  { value: 2, data: 0, label: "Feb" },
  { value: 3, data: 0, label: "Mar" },
  { value: 4, data: 0, label: "Apr" },
  { value: 5, data: 0, label: "May" },
  { value: 6, data: 0, label: "Jun" },
  { value: 7, data: 0, label: "Jul" },
  { value: 8, data: 0, label: "Aug" },
  { value: 9, data: 0, label: "Sep" },
  { value: 10, data: 0, label: "Oct" },
  { value: 11, data: 0, label: "Nov" },
  { value: 12, data: 0, label: "Dec" },
];

// Define api end point
export const apiEndPoint = {
  Login: "/admin/auth/signin",
  ForgotPass: "/admin/auth/forgot-password",
  VerifyOtp: "/admin/auth/verify-otp",
  ResetPassword: "/admin/auth/reset-password",
  Logout: "/admin/auth/logout",
  GetProfile: "/admin/auth/profile",
  UpdateProfile: "/admin/auth/profile",
  UploadImage: "/upload/images",
  GetUsers: "/user/list",
  GetUser: "/user",
  AddUser: "/user",
  UpdateUser: "/user",
  DeleteUser: "/user",
  DeleteNotification: "/notification",

  GetBannersList: "/banner/list",
  AddBanner: "/banner",
  DeleteBanner: "/banner",
  GetBanner: "/banner",
  UpdateBanner: "/banner",
  GetPublicationList: "/publication/list",
  AddPublication: "/publication",
  UpdatePublication: "/publication",
  GetPublication: "/publication",
  DeletePublication: "/publication",
  AddCMS: "/cms",
  GetCMS: "/cms",
  GetFAQList: "/faq/list",
  AddFAQ: "/faq",
  UpdateFAQ: "/faq",
  GetFAQ: "/faq",
  DeleteFAQ: "/faq",
  GetTrademarks: "/trademark/list",
  GetTrademark: "/trademark",
  UpdateTrademarkStatus: "/trademark",
  UsersChatList: "users/chatting-with-admin",
  ChatHistory: "chat",
  GetTickets: "/ticket/list",
  GetTicket: "/ticket",
  AddComment: "/ticket/response",
  UpdateTicketStatus: "/ticket",
  GetDashboardCounter: "/admin/auth/dashboard",
  GetNotification: "/notification",
  GetNotificationCount: "/notification/unread-count",
  ReadNotification: "/notification",

  thirdParty: {
    login: "/Auth/login",
    getUsers: "/User/GetUsersPaged",
    getUser: "/User/GetUser",
    getTrademarks: "/TradeMark/GetTradeMarkResults",
    getApplicationTrademarks: "/TradeMark/GetTradeMarkApplicationsResults",
    getTrademarkByID: "/TradeMark/GetTradeMarkByRef",
    getAppCount: "/TradeMark/GetApplicationsCount",
    getUserCount: "/User/GetUserCount",
    getAppStatusChart: "/TradeMark/GetApplicationsByStatus",
    getUsersStatusChart: "/User/GetUsersByStatus",
  },
};
// function for download pdf file
export const downloadPDF = async (pdfUrl, fileName = "downloaded-file.pdf") => {
  try {
    const response = await fetch(pdfUrl);
    if (!response.ok) throw new Error("Network response was not ok");

    const blob = await response.blob();
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = fileName;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  } catch (error) {
    console.error("PDF Download failed:", error);
  }
};
// function for download the image

export const handleImageDownload = async (imageUrl, imageName) => {
  try {
    const response = await fetch(imageUrl);
    const blob = await response.blob();
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = imageName; // File name in downloads folder
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  } catch (error) {
    console.error("Download failed:", error);
  }
};

// function for get Avatar from a given string
export function getInitials(name) {
  const nameArr = name?.trim()?.toUpperCase().split(" ");
  return `${nameArr[0]?.charAt(0)}${nameArr[1]?.charAt(0) ?? ""}`;
}

export function getBasePath(path) {
  const segments = path.split("/").filter(Boolean); // remove empty strings
  if (segments.length === 0) {
    return "/"; // Handle root case
  }
  if (segments.length === 1) {
    return "/" + segments[0]; // e.g., /user-management
  }
  return "/" + segments.slice(0, -1).join("/") + "/"; // e.g., /content-faq/
}

export const baseUrlForImage = "https://legalapi.billetteriesoftware.com/";
