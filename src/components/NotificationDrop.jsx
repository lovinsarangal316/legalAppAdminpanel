import React, { useEffect, useState } from "react";
import { Dropdown, Badge, ListGroup, Button } from "react-bootstrap";
import { FaBell } from "react-icons/fa";
import { IoMdCloseCircleOutline } from "react-icons/io";
import {
  DeleteNotificationService,
  GetNotificationDataService,
  GetReadNotificationService,
  GetUnreadCountService,
} from "../services/globalServices";
import { timeAgo } from "../helper";
import { useNavigate } from "react-router-dom";
import { pathData } from "../navigation/constants";
import ConfirmationModal from "./modals/Confirm";
const NotificationDropdown = () => {
  const [loading, setLoading] = useState(false);
  const [notificationData, setNotificationData] = useState(null);
  const [isConfirm, setisConfirm] = useState(false);
  const [selectedRowId, setSelectedRowId] = useState("");
  const [loadingForDelete, setLoadingForDelete] = useState(false)
  const [count, setCount] = useState(0);
  const navigate = useNavigate();
  // get notificationdata
  const getNotificationData = () => {
    GetNotificationDataService(setNotificationData, setLoading);
  };

  // function for show confirmation modal
  const showDeleteConfirm = (selectedID) => {
    setSelectedRowId(selectedID);
    setisConfirm(true);
  };

  // function for delete user by ID
  const deletehandler = async () => {
    const isDeleted = await DeleteNotificationService(setLoadingForDelete, selectedRowId);
    if (isDeleted) {
      await getNotificationData();

    }
    setisConfirm(false);
  }

  // get notificationdata
  const getUnreadCountData = () => {
    GetUnreadCountService(setCount, setLoading);
  };

  // redirect notification
  const handleRedirect = async (notificationData) => {
    const res = await GetReadNotificationService(setLoading, notificationData);
    if (res) {
      getNotificationData();
      getUnreadCountData();
      if (notificationData?.redirect_to == "TrademarkDetails") {
        return navigate(
          `${pathData.applicationDetail}${notificationData?.trademark_id}`
        );
      }
      if (notificationData?.redirect_to == "TicketDetails") {
        return navigate(
          `${pathData.supportTicketDetails}${notificationData?.ticket_id?._id}`
        );
      }
    }
  };
  // initial fetch notification data
  useEffect(() => {
    getNotificationData();
    getUnreadCountData();
  }, []);

  // BroadcastChannel to listen for new notifications
  useEffect(() => {
    const broadcast = new BroadcastChannel("firebase-notification-channel");
    broadcast.onmessage = (event) => {
      if (event.data.type === "NEW_NOTIFICATION") {
        getNotificationData(); // API call to update notification list
        getUnreadCountData();
      }
    };
    return () => {
      broadcast.close();
    };
  }, []);
  return (
    <Dropdown align="end" className="notification-dropdown custom_notification">
      <Dropdown.Toggle
        variant="light"
        id="dropdown-basic"
        className="d-flex align-items-center"
      >
        <FaBell />
        {
          count > 0 && <Badge bg="danger" pill className="ms-2">
            {count}
          </Badge>
        }
      </Dropdown.Toggle>
      <Dropdown.Menu style={{ width: "300px" }}>
        <Dropdown.Header className="fw-bold">Notifications</Dropdown.Header>
        {notificationData?.length > 0 ? (
          <>
            <ListGroup variant="flush">
              {notificationData?.map((notification) => (
                <div key={notification?._id} className="position-relative">
                  {/* {notification.read == false && ( */}
                  <ListGroup.Item
                    className={!notification?.read ? "d-flex justify-content-between align-items-start cursor fw-bold" : "d-flex justify-content-between align-items-start cursor"}
                    onClick={() => handleRedirect(notification)}
                  >
                    <div>
                      <div>{notification?.body}</div>
                      <small className="text-muted">
                        {timeAgo(notification?.createdAt)}
                      </small>
                    </div>
                  </ListGroup.Item>
                  {/* )} */}
                  <span style={{ position: "absolute", top: "2px", right: "2px" }}>
                    <IoMdCloseCircleOutline
                      size={18}
                      color="red"
                      cursor="pointer"
                      onClick={() => showDeleteConfirm(notification?._id)}
                    />
                  </span>
                </div>
              ))}
            </ListGroup>
            <Dropdown.Divider />
            <div className="text-center d-none">
              <Button
                variant="outline-danger"
                size="sm"
              // onClick={clearNotifications}
              >
                Clear All
              </Button>
            </div>
          </>
        ) : (
          <div className="text-center py-2">No new notifications</div>
        )}
      </Dropdown.Menu>
      {isConfirm && (
        <ConfirmationModal
          modalHeading="Delete"
          show={isConfirm}
          hide={() => setisConfirm(false)}
          success={deletehandler}
          loading={loadingForDelete}
        />
      )}
    </Dropdown>
  );
};

export default NotificationDropdown;

// import React, { useEffect, useState } from "react";
// import { Dropdown, Badge, ListGroup, Button } from "react-bootstrap";
// import { FaBell } from "react-icons/fa";
// import { IoMdCloseCircleOutline } from "react-icons/io";
// import {
//   GetNotificationDataService,
//   GetReadNotificationService,
//   GetUnreadCountService,
// } from "../services/globalServices";
// import { timeAgo } from "../helper";
// import { useNavigate } from "react-router-dom";
// import { pathData } from "../navigation/constants";

// const NotificationDropdown = () => {
//   const [loading, setLoading] = useState(false);
//   const [notificationData, setNotificationData] = useState(null);
//   const [count, setCount] = useState(0);
//   const [showDropdown, setShowDropdown] = useState(false); // 🔥 Dropdown state added
//   const navigate = useNavigate();

//   const getNotificationData = () => {
//     GetNotificationDataService(setNotificationData, setLoading);
//   };

//   const getUnreadCountData = () => {
//     GetUnreadCountService(setCount, setLoading);
//   };

//   const handleRedirect = async (notificationData) => {
//     const res = await GetReadNotificationService(setLoading, notificationData);
//     if (res) {
//       getNotificationData();
//       getUnreadCountData();
//       setShowDropdown(false); // 🔥 Dropdown close karo

//       if (notificationData?.redirect_to === "TrademarkDetails") {
//         return navigate(
//           `${pathData.tradeMarkDetails}${notificationData?.trademark_id?._id}`
//         );
//       }
//       if (notificationData?.redirect_to === "TicketDetails") {
//         return navigate(
//           `${pathData.supportTicketDetails}${notificationData?.ticket_id?._id}`
//         );
//       }
//     }
//   };

//   useEffect(() => {
//     getNotificationData();
//     getUnreadCountData();
//   }, []);

//   useEffect(() => {
//     const broadcast = new BroadcastChannel("firebase-notification-channel");
//     broadcast.onmessage = (event) => {
//       if (event.data.type === "NEW_NOTIFICATION") {
//         getNotificationData();
//         getUnreadCountData();
//       }
//     };
//     return () => {
//       broadcast.close();
//     };
//   }, []);

//   return (
//     <Dropdown
//       align="end"
//       className="notification-dropdown custom_notification"
//       show={showDropdown} // 🔥 Control Dropdown manually
//       onToggle={(isOpen) => setShowDropdown(isOpen)} // 🔥 Update state on toggle
//     >
//       <Dropdown.Toggle
//         variant="light"
//         id="dropdown-basic"
//         className="d-flex align-items-center"
//         onClick={() => setShowDropdown(!showDropdown)} // 🔥 Toggle manually
//       >
//         <FaBell />
//         <Badge bg="danger" pill className="ms-2">
//           {count}
//         </Badge>
//       </Dropdown.Toggle>

//       <Dropdown.Menu style={{ width: "300px" }}>
//         <Dropdown.Header>Notifications</Dropdown.Header>
//         {notificationData?.length > 0 ? (
//           <>
//             <ListGroup variant="flush">
//               {notificationData?.map((notification) => (
//                 <div key={notification?._id}>
//                   {!notification.read && (
//                     <ListGroup.Item
//                       className="d-flex justify-content-between align-items-start cursor"
//                       onClick={() => handleRedirect(notification)}
//                     >
//                       <div>
//                         <div className="fw-bold">{notification?.body}</div>
//                         <small className="text-muted">
//                           {timeAgo(notification?.createdAt)}
//                         </small>
//                       </div>
//                       <IoMdCloseCircleOutline color="red" cursor="pointer" />
//                     </ListGroup.Item>
//                   )}
//                 </div>
//               ))}
//             </ListGroup>
//             <Dropdown.Divider />
//             <div className="text-center">
//               <Button variant="outline-danger" size="sm">
//                 Clear All
//               </Button>
//             </div>
//           </>
//         ) : (
//           <div className="text-center py-2">No new notifications</div>
//         )}
//       </Dropdown.Menu>
//     </Dropdown>
//   );
// };

// export default NotificationDropdown;
