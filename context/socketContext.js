import { createContext, useContext, useEffect, useState } from "react";
import { io } from "socket.io-client";

// Create a context to share the socket instance
const SocketContext = createContext();

export const SocketProvider = ({ children }) => {
  const [socket, setSocket] = useState(null);

  useEffect(() => {
    // Initialize server-side socket only once when the component mounts
    fetch("/api/socket");

    // Set up a new socket connection
    const connection = io();
    setSocket(connection);

    // Handle connection errors
    connection.on("connect_error", (err) => {
      console.error("Socket connection error:", err);
    });

    // Clean up the connection when the component unmounts
    return () => {
      connection.disconnect();
    };
  }, []);

  return (
    <SocketContext.Provider value={socket}>{children}</SocketContext.Provider>
  );
};

// Custom hook for easy access to the socket instance
export const useSocket = () => {
  return useContext(SocketContext);
};
