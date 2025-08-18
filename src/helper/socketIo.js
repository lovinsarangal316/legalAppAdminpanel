import { io } from "socket.io-client";
import { getDataFromLocalStorage, localKey } from ".";

let socket;

export const baseurl = "https://api.rentranzact.com";

/**
 *
//  * @param {*} accessToken jwt token for which we can connect securely
 */
const initializeSocket = (accessToken) => {
  if (socket) {
    socket.disconnect(); // Disconnect previous socket if it exists
  }
  socket = io(baseurl, {
    autoConnect: true,
    extraHeaders: {
      authorization: `Bearer ${accessToken}`,
    },
  });
  console.log("socket", socket);
  socket.on("connect", () => {
    console.log("Socket connected:", socket.id);
  });

  socket.on("disconnect", () => {
    console.log("Socket disconnected");
  });

  socket.on("error", (error) => {
    console.error("Socket error:", error);
  });
};

// Function to set up the socket connection's based on the current user
const setupSocketConnection = () => {
  const user = getDataFromLocalStorage(localKey);
  const finalizedToken = user?.access_token?.token;
  if (finalizedToken) {
    initializeSocket(finalizedToken);
  } else {
    console.warn("No access token found. Socket connection not established.");
  }
};

// Call setupSocketConnection initially
setupSocketConnection();

// Export the socket object for use in other modules
export { socket, setupSocketConnection };
