import React, { useState } from "react";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import ConfirmationModal from "./modals/Confirm";
import minilogo from "../assets/logo/mini-logo.svg";
import { IoMdLogOut } from "react-icons/io";
import sidebarMenu from "../utils/sidebarMenu";
import { MdOutlineArrowDropDown } from "react-icons/md";
import { IoIosArrowBack } from "react-icons/io";
import "./css/sidebar.css";
import { OverlayTrigger, Tooltip } from "react-bootstrap";
import { getDataFromLocalStorage, localKey } from "../helper";
import { LogoutService } from "../services/globalServices";
const Sidebar = ({ toggle, onToggleHandler }) => {
  const [loading, setLoading] = useState(false)
  const [isConfirm, setisConfirm] = useState(false);
  const [openSubmenu, setOpenSubmenu] = useState(null);
  const { pathname } = useLocation();
  const navigate = useNavigate();
  // const withNoDigits = pathname.replace(/\/[0-9a-fA-F]+$/, "/");
  const withNoDigits = pathname.replace(/\/([0-9a-fA-F-e]+|R[a-zA-Z0-9]*)$/, "/");
  const isAuth = getDataFromLocalStorage(localKey)
  const logoutHandler = () => {
    const payload = {
      session_id: isAuth?.session_id
    }
    LogoutService(payload, setLoading, navigate)
  };
  const toggleSubmenu = (index) => {
    setOpenSubmenu(openSubmenu === index ? null : index);
  };
  return (
    <div className="inner">
      <div className="logo mt-2 mb-2">
        <img src={minilogo} alt="logo" />
      </div>
      <button className="toggle-btn" onClick={onToggleHandler}>
        <IoIosArrowBack />
      </button>
      <hr className="text-white" style={{ marginTop: "30px", display: "none" }} />
      {toggle ? (
        <ul className="sidebar_links">
          {sidebarMenu.map((menuItem, index) =>
            menuItem.isSubmenu ? (
              <li
                key={index}
                className={
                  menuItem?.ismatchurl?.includes(withNoDigits)
                    ? "active_list_sidebar text-white cursor submenu_list_wrapper"
                    : "text-white cursor submenu_list_wrapper"
                }
              >
                <div
                  className="submenu-title"
                  onClick={() => toggleSubmenu(index)}
                >
                  <span className="me-2">{menuItem.subIcon}</span>
                  <span className="me-2">
                    <MdOutlineArrowDropDown />
                  </span>
                </div>
                {openSubmenu === index && (
                  <ul className="submenu-list">
                    {menuItem.submenu.map((subItem, subIndex) => (
                      <li
                        key={subIndex}
                        className={
                          subItem?.ismatchurl?.includes(withNoDigits)
                            ? "active_list_sidebar text-white cursor submenu_list_wrapper"
                            : "text-white cursor submenu_list_wrapper"
                        }
                      >
                        <OverlayTrigger
                          placement="right"
                          overlay={<Tooltip>{subItem.label}</Tooltip>}
                        >
                          <NavLink
                            to={subItem.path}
                            className={
                              subItem?.ismatchurl?.includes(withNoDigits)
                                ? "active_list_sidebar nav-link"
                                : "nav-link"
                            }
                          >
                            {subItem.icon}
                          </NavLink>
                        </OverlayTrigger>
                      </li>
                    ))}
                  </ul>
                )}
              </li>
            ) : (
              <li
                key={index}
                className={
                  menuItem?.ismatchurl?.includes(withNoDigits)
                    ? "active_list_sidebar"
                    : ""
                }
              >
                <OverlayTrigger
                  placement="right"
                  overlay={<Tooltip>{menuItem.label}</Tooltip>}
                >
                  <NavLink to={menuItem.path} className={"nav-link"}>
                    <span className="me-2">{menuItem.icon}</span>
                  </NavLink>
                </OverlayTrigger>
              </li>
            )
          )}
          <li className="cursor" onClick={() => setisConfirm(true)}>
            <span>
              <IoMdLogOut className="mb-1 text-white" />
            </span>
          </li>
        </ul>
      ) : (
        <ul className="sidebar_links">
          {sidebarMenu.map((menuItem, index) =>
            menuItem.isSubmenu ? (
              <li
                key={index}
                className={
                  menuItem?.ismatchurl?.includes(withNoDigits)
                    ? "active_list_sidebar text-white cursor submenu_list_wrapper"
                    : "text-white cursor submenu_list_wrapper"
                }
              >
                <div
                  className="submenu-title d-flex justify-content-between"
                  onClick={() => toggleSubmenu(index)}
                >
                  <div>
                    <span className="me-2">{menuItem.subIcon}</span>
                    {menuItem.label}
                  </div>
                  <span className="me-2">
                    <MdOutlineArrowDropDown />
                  </span>
                </div>
                {openSubmenu === index && (
                  <ul className="submenu-list">
                    {menuItem.submenu.map((subItem, subIndex) => (
                      <li
                        key={subIndex}
                        className={
                          subItem?.ismatchurl?.includes(withNoDigits)
                            ? "active_list_sidebar text-white cursor submenu_list_wrapper"
                            : "text-white cursor submenu_list_wrapper"
                        }
                      >
                        <NavLink
                          to={subItem.path}
                          className={
                            subItem?.ismatchurl?.includes(withNoDigits)
                              ? "active_list_sidebar nav-link"
                              : "nav-link"
                          }
                        >
                          {subItem.icon}
                          {subItem.label}
                        </NavLink>
                      </li>
                    ))}
                  </ul>
                )}
              </li>
            ) : (
              <li
                key={index}
                className={
                  menuItem?.ismatchurl?.includes(withNoDigits)
                    ? "active_list_sidebar"
                    : ""
                }
              >
                <NavLink to={menuItem.path} className={"nav-link"}>
                  <span className="me-2">{menuItem.icon}</span>
                  {menuItem.label}
                </NavLink>
              </li>
            )
          )}
          <li
            className="cursor"
            onClick={() => setisConfirm(true)}
            style={{ marginBottom: "100px" }}
          >
            <span>
              <IoMdLogOut className="mb-1 text-white" />
            </span>
            <span className="text-white ms-2">Logout</span>
          </li>
        </ul>
      )}
      {isConfirm && (
        <ConfirmationModal
          modalHeading="Logout"
          show={isConfirm}
          hide={() => setisConfirm(false)}
          success={logoutHandler}
          loading={loading}
        />
      )}
    </div>
  );
};
export default Sidebar;
