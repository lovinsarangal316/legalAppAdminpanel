import React, { useEffect, useRef, useState } from "react";
import { BiCheckDouble } from "react-icons/bi";
import "./css/chat.css";
import Panel from "./Panel";
import whimage from "../assets/images/whatupbg.jpg";
import {
  apiEndPoint,
  baseUrlForImage,
  formatTimeStampChat,
  getDataFromLocalStorage,
  getInitials,
  localKey,
  localKeyForThirdParty,
} from "../helper";
import axiosInstance from "../services/axiosInstance";
import io from "socket.io-client";
import Loader from "./loaders/Loader";
import ChatModal from "./modals/ChatModal";
import axiosInstanceVersionTwo from "../services/axiosInstanceVersionTwo";

const baseUrlForChat = "https://legalapi.billetteriesoftware.com";

const Chat = () => {
  const [openChatModal, setOpenChatModal] = useState(false)
  const chatEndRef = useRef(null);
  const socketRef = useRef(null);
  const [loading, setLoading] = useState(false);
  const [activeUserID, setActiveUserID] = useState("")
  const isAuth = getDataFromLocalStorage(localKey);
  const [chatState, setChatState] = useState({
    users_listing: [],
    user_data: [],
    chat_history: [],
  });
  const [searchForAllUserListing, setSearchForAlluserListing] = useState("")
  const [currentPageForScrollPagination, setCurrentPageForScrollPagination] = useState(1)
  const [selectedUser, setSelectedUser] = useState(null);
  const [input, setInput] = useState("");
  const [searchUserInput, setSearchUserInput] = useState("");
  const filteredData = chatState?.user_data?.filter((item) => {
    const matchesSearch = item?.full_name?.toLowerCase()?.includes(searchUserInput?.toLowerCase());
    return matchesSearch;
  });

  const clickHandlerForShifting = (selected_User) => {
    const isDropdownUser = chatState.user_data.some((curElm) => curElm?._id == selected_User?._id)
    if (!isDropdownUser) {
      chatState.user_data.unshift(selected_User)
      setChatState((prev) => ({
        ...prev,
        chat_history: [],
      }));
      setSelectedUser(selected_User)
    } else {
      setSelectedUser(selected_User)
    }
    setOpenChatModal(false)
  }

  // Initialize socket connection
  useEffect(() => {
    if (!socketRef.current) {
      socketRef.current = io(baseUrlForChat);
    }
    const socket = socketRef.current;
    // Join chat
    socket.emit("join", { userId: isAuth?._id, isAdmin: true });
    // Listen for new messages
    const handleReceiveMessage = (message) => {
      console.log(message, "----received message");
      if (message.senderId == activeUserID) {
        setChatState((prev) => ({
          ...prev,
          chat_history: [...prev.chat_history, message],
        }));
      } else if (message?.isAdmin && message.senderId === isAuth?._id) {
        setChatState((prev) => ({
          ...prev,
          chat_history: [...prev.chat_history, message],
        }));
      }
      const findIndex = chatState.user_data.findIndex((item) => {
        if (message?.isAdmin) {
          return item?._id === message?.receiverId
        }
        return item?._id === message?.senderId
      });
      if (findIndex > -1) {
        const currentIndexData = chatState.user_data.find((item) => {
          if (message?.isAdmin) {
            return item?._id === message?.receiverId
          }
          return item?._id === message?.senderId
        })
        chatState.user_data.splice(findIndex, 1)
        if (currentIndexData) {
          chatState?.user_data.unshift(currentIndexData)
        }
        setChatState((prev) => ({ ...prev, user_data: chatState.user_data }));
        setSelectedUser(currentIndexData)
        getMessageHistory(currentIndexData)
      }
    };
    socket.on("receiveMessage", handleReceiveMessage);
    return () => {
      socket.off("receiveMessage", handleReceiveMessage);
      socket.disconnect();
      socketRef.current = null; // Cleanup reference
    };
  }, [activeUserID, selectedUser]);
  // Send message
  const sendMessage = (e) => {
    e.preventDefault();
    if (!input.trim()) return;
    const newMessage = {
      senderId: isAuth?._id,
      receiverId: selectedUser?._id,
      message: input,
      isAdmin: true,
    };
    socketRef.current.emit("sendMessage", newMessage);
    setInput("");
  };

  const sectionStyle = {
    backgroundImage: `url(${whimage})`,
  };


  // Get user chat list
  const getUserChatList = async () => {
    const isAuthData = getDataFromLocalStorage(localKeyForThirdParty);
    const url = `${baseUrlForChat}/${apiEndPoint.UsersChatList}/${isAuth?._id}?search=${searchUserInput}`;
    try {
      setLoading(true);
      const response = await axiosInstance.post(url, { token: isAuthData?.token });
      if (response?.status === 200) {
        setChatState((prev) => ({
          ...prev,
          user_data: response?.data,
        }));
        if (response?.data.length > 0) {
          getMessageHistory(response?.data[0]);
          setSelectedUser(response?.data[0]);
        }
        setLoading(false);
      }
    } catch (error) {
      console.error(error);
      setLoading(false);
    }
  };

  // Get chat history of selected user
  const getMessageHistory = async (user) => {
    setActiveUserID(user?._id)
    const url = `${baseUrlForChat}/${apiEndPoint.ChatHistory}/${user?._id}/${isAuth?._id}`;
    try {
      const response = await axiosInstance.post(url);
      if (response?.status === 200) {
        setSelectedUser(user);
        setChatState((prev) => ({
          ...prev,
          chat_history: response?.data || [],
        }));
      }
    } catch (error) {
      console.error(error);
    }
  };


  const [isScroll, setIsScroll] = useState(true);

  // get allusers listing

  const getAllUsersListing = async () => {
    try {
      const res = await axiosInstanceVersionTwo.get(
        `${apiEndPoint.thirdParty.getUsers
        }?PageNumber=${currentPageForScrollPagination}&PageSize=${10}&KeyWord=${searchForAllUserListing}`
      );
      if (res?.data?.length < 10) {
        setIsScroll(false)
      }
      const updatedData = res?.data?.map((curElm) => {
        return {
          ...curElm,
          _id: curElm?.id,
          full_name: curElm.usR_Names,
          email: curElm.usR_EmailAccount
        }
      })
      if (res?.status === 200 && res?.data?.length > 0) {
        setChatState((prev) => ({ ...prev, users_listing: prev.users_listing.concat(updatedData) }))
      }
    } catch (error) {
      console.log(error)
    }
  }
  // Fetch chat list on mount or when search changes
  useEffect(() => {
    const delayDebounce = setTimeout(
      () => {
        getUserChatList();
      },
      searchUserInput ? 1000 : 0
    );
    return () => clearTimeout(delayDebounce);
  }, []);

  // Scroll to bottom when chat history updates
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [chatState.chat_history]);

  // useeffect for get all third party user listing

  useEffect(() => {
    let delayDebounce
    if (searchForAllUserListing) {
      delayDebounce = setTimeout(
        () => {
          getAllUsersListing();
        },
        searchForAllUserListing ? 800 : 0
      );
    } else {
      getAllUsersListing();
    }
    return () => clearTimeout(delayDebounce);
  }, [searchForAllUserListing, currentPageForScrollPagination])

  if (loading) return <Loader />;
  return (
    <Panel>

      <div className="chat-page">
        {/* User List */}

        <div className="user-list">
          <div className="new_chat">
            <button className="btn btn-dark rounded-0" style={{ width: "100%", padding: "14px" }} onClick={() => setOpenChatModal(true)}>New Chat</button>
          </div>
          <input
            type="search"
            className="form-control"
            placeholder="Search..."
            onChange={(e) => setSearchUserInput(e.target.value)}
            style={{
              padding: "15px",
              border: "0",
              borderRadius: "0",
              position: "sticky",
              top: "0",
              left: "0",
              zIndex: "99",
            }}
          />
          {filteredData && filteredData?.length > 0 ? (
            filteredData?.map((user) => (
              <div
                key={user?._id}
                className={`user ${selectedUser?._id === user._id ? "active" : ""
                  }`}
                onClick={() => getMessageHistory(user)}
              >
                {/* <img
                  src={baseUrlForImage + user?.image}
                  alt={user?.full_name}
                  className="user-avatar"
                /> */}

                <span style={{ backgroundColor: "gray", display: "flex", justifyContent: "center", alignItems: "center", height: "40px", width: "40px", borderRadius: "50%", marginRight: "10px", textTransform: "uppercase" }}>
                  {user?.full_name && getInitials(user?.full_name)}
                </span>
                <h6 className="user-name text-uppercase mb-0">
                  {user?.full_name}
                </h6>
                <span className="unread_chat_counter bg-secondary d-none">10</span>
              </div>
            ))
          ) : (
            <p className="mt-3 text-center">User not found</p>
          )}
        </div>

        {/* Chat Container */}
        <div className="chat-container">
          <div className="chat-header">
            <span style={{ backgroundColor: "gray", display: "flex", justifyContent: "center", alignItems: "center", height: "40px", width: "40px", borderRadius: "50%", marginRight: "10px", textTransform: "uppercase" }}>
              {selectedUser?.full_name && getInitials(selectedUser?.full_name)}
            </span>
            {/* <img
              src={baseUrlForImage + selectedUser?.image}
              alt={selectedUser?.full_name}
              className="chat-avatar"
            /> */}
            <h6 className="text-uppercase mb-0">{selectedUser?.full_name}</h6>
          </div>
          <div
            className="chat-body"
            style={sectionStyle}
            key={selectedUser?._id}
          >
            {chatState?.chat_history?.map((msg, index) => (
              <div
                key={msg?._id || `msg-${index}`}
                className={
                  msg?.isAdmin
                    ? "chat-message chat-message-sent"
                    : "chat-message"
                }
              >
                <span className="chat-sender">{msg?.message}</span>
                <small className="text-end mb-0 d-block">
                  {formatTimeStampChat(msg?.timestamp)}
                  {msg?.isAdmin && (
                    <span className="text-primary d-none">
                      {" "}
                      <BiCheckDouble size={20} />
                    </span>
                  )}
                </small>
              </div>
            ))}
            <div ref={chatEndRef} />
          </div>

          {/* Chat Input */}
          <div className="chat-footer">
            <form onSubmit={sendMessage} className="chat-form">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e?.target?.value)}
                placeholder="Type a message"
                className="chat-input"
                disabled={!selectedUser}
              />
              <button
                type="submit"
                className="chat-send-button"
                disabled={!input}
              >
                Send
              </button>
            </form>
          </div>
        </div>
      </div>
      {
        openChatModal && <ChatModal
          show={openChatModal}
          data={chatState.users_listing}
          hide={() => setOpenChatModal(false)}
          search={searchForAllUserListing}
          setSearch={setSearchForAlluserListing}
          heading={"Start new chat"}
          clickHandlerForShifting={clickHandlerForShifting}
          currentPageForScrollPagination={currentPageForScrollPagination}
          setCurrentPageForScrollPagination={setCurrentPageForScrollPagination}
          isScroll={isScroll}
        />
      }
    </Panel>
  );
};

export default Chat;
