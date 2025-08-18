import React, { useEffect, useState } from "react";
import Navbar from "react-bootstrap/Navbar";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import { Image } from "react-bootstrap";
import { pathData } from "../navigation/constants";
import NotificationDropdown from "./NotificationDrop";
import BackBtn from "./BackBtn";
import "./css/header.css";
import RenderHeaderTitle from "./RenderHeaderTitle";
import profileLogo from "../assets/images/profile.png";
import { useDispatch, useSelector } from "react-redux";
import { userprofile } from "../redux/thunks/userprofile";
import { baseUrlForImage } from "../helper";
import { currentPagehandler, searchHandler } from "../redux/slices/userProfile";

const Header = () => {
  const { pathname } = useLocation();
  const { profileData, search, currentPageNumber } = useSelector((state) => state?.userProfile);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const headerTitle = RenderHeaderTitle(pathname);
  const isBreadcrumb =
    typeof headerTitle !== "string" || headerTitle.includes("/");

  useEffect(() => {
    dispatch(userprofile());
  }, []);
  return (
    <div className="container-fluid">
      <Navbar expand="lg">
        <div className="d-flex justify-content-between align-items-center w-100">
          <Navbar.Brand className="text-uppercase fw-bold d-flex align-items-center" onClick={() => {
            dispatch(searchHandler(search));
            dispatch(currentPagehandler(currentPageNumber));
          }}
          >
            {isBreadcrumb && <BackBtn />}{headerTitle}
          </Navbar.Brand>
          <div className="pe-3 d-flex align-items-center">
            <Image
              onClick={() => {
                navigate(pathData.profile);
              }}
              className="rounded-circle me-3 avatar"
              src={
                profileData && profileData?.image
                  ? baseUrlForImage + profileData?.image
                  : profileLogo
              }
            />
            <NotificationDropdown />
          </div>
        </div>
        <Navbar.Toggle aria-controls="navbarScroll" />
      </Navbar>
    </div>
  );
};

export default Header;
