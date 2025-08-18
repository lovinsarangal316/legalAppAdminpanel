import React from "react";
import { Navigate } from "react-router-dom";
import { pathData } from "../../navigation/constants";
import { getDataFromLocalStorage, localKey } from "../../helper";

const PublicRoute = ({ children }) => {
  const isAuth = getDataFromLocalStorage(localKey)

  if (isAuth) {
    return <Navigate to={pathData.dashboard} />;
  }
  return children;
};

export default PublicRoute;
