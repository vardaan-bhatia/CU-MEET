import { Server } from "socket.io";

// SocketHandler initializes the Socket.io server if not already running
export const SocketHandler = (req, res) => {
  // Check if the Socket.io server is already initialized
  if (!res.socket.server.io) {
    console.log("Initializing Socket.io server...");

    // Create a new Socket.io server instance
    const io = new Server(res.socket.server);
    res.socket.server.io = io; // Attach the server to `res.socket.server.io`

    // Listen for client connections
    io.on("connection", (socket) => {
      console.log("A client connected:", socket.id);

      // Listen for client disconnections
      socket.on("disconnect", () => {
        console.log("A client disconnected:", socket.id);
      });
    });
  } else {
    console.log("Socket.io server is already running.");
  }

  // End the response to prevent any additional data being sent back
  res.end();
};

export default SocketHandler;
