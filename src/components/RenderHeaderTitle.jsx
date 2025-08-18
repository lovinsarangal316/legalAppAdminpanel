import { NavLink } from "react-router-dom";
import { pathData } from "../navigation/constants";
import { getBasePath } from "../helper";

const RenderHeaderTitle = (pathname) => {
  const withNoDigits = getBasePath(pathname);
  // const withNoDigits = pathname.replace(/\/([0-9a-fA-F-e]+|R[a-zA-Z0-9]*)$/, "/");
  // const withNoDigits = pathname.replace(/\/([0-9a-fA-F\-e]+|R[a-zA-Z0-9]*|[a-zA-Z]+)$/, "/");
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
  } else if (withNoDigits === pathData.userManagementCreateUser) {
    return (
      <>
        <NavLink className="nav-link" to={pathData.userManagement}>User Management</NavLink> / Create
        User
      </>
    );
  } else if (withNoDigits === pathData.userManagementUpdateUser) {
    return (
      <>
        <NavLink className="nav-link" to={pathData.userManagement}>User Management</NavLink> / Update
        User
      </>
    );
  } else if (withNoDigits === pathData.userMgmtUsersDetail) {
    return (
      <>
        <NavLink className="nav-link" to={pathData.userManagement}>User Management</NavLink> / User
        Detail
      </>
    );
  } else if (pathname == pathData.createBanner) {
    return (
      <>
        <NavLink className="nav-link" to={pathData.bannersManagement}>Banner Management</NavLink> /
        Create Banner
      </>
    );
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
  } else if (withNoDigits == pathData.updateBanner) {
    return (
      <>
        <NavLink className="nav-link" to={pathData.bannersManagement}>Banner Management</NavLink> /
        Update Banner
      </>
    );
  } else if (withNoDigits == pathData.supportChat) {
    return "Chats";
  } else if (withNoDigits == pathData.supportTicket) {
    return "Tickets";
  } else if (pathname == pathData.contentCreatePublication) {
    return (
      <>
        <NavLink className="nav-link" to={pathData.contentPublication}>Publication</NavLink> / Create
      </>
    );
  } else if (withNoDigits == pathData.contentUpdatePublication) {
    return (
      <>
        <NavLink className="nav-link" to={pathData.contentPublication}>Publication</NavLink> / Update
      </>
    );
  } else if (withNoDigits == pathData.contentDetailPublication) {
    return (
      <>
        <NavLink className="nav-link" to={pathData.contentPublication}>Publication</NavLink> / Detail
      </>
    );
  } else if (pathname == pathData.contentCreateFaq) {
    return (
      <>
        <NavLink className="nav-link" to={pathData.contentFaq}>FAQ</NavLink> / Create
      </>
    );
  } else if (withNoDigits == pathData.contentUpdateFaq) {
    return (
      <>
        <NavLink className="nav-link" to={pathData.contentFaq}>FAQ</NavLink> / Update
      </>
    );
  } else if (withNoDigits == pathData.contentDetailFaq) {
    return (
      <>
        <NavLink className="nav-link" to={pathData.contentFaq}>FAQ</NavLink> / Detail
      </>
    );
  } else if (withNoDigits == pathData.applicationDetail) {
    return (
      <>
        <NavLink className="nav-link" to={pathData.applicationManagement}>
          APPLICATION MANAGEMENT
        </NavLink>{" "}
        /TRADE MARK APPLICATION DETAILS
      </>
    );
  } else if (withNoDigits == pathData.profile) {
    return "Profile";
  } else if (withNoDigits == pathData.editProfile) {
    return (
      <>
        <NavLink className="nav-link" to={pathData.profile}>Profile</NavLink> / Edit Profile
      </>
    );
  } else if (withNoDigits == pathData.payments) {
    return "Payments";
  } else if (withNoDigits == pathData.paymentDetails) {
    return (
      <>
        <NavLink className="nav-link" to={pathData.payments}>Payments</NavLink> / detail
      </>
    );
  } else if (withNoDigits == pathData.tradeMarks) {
    return "Trademarks";
  } else if (withNoDigits == pathData.tradeMarkDetails) {
    return (
      <>
        <NavLink className="nav-link" to={pathData.tradeMarks}>Trademarks</NavLink> / detail
      </>
    );
  } else if (withNoDigits == pathData.supportTicket) {
    return "Tickets";
  } else if (withNoDigits == pathData.supportTicketDetails) {
    return (
      <>
        <NavLink className="nav-link" to={pathData.supportTicket}>Ticket</NavLink> / Detail
      </>
    );
  }
};




export default RenderHeaderTitle;
