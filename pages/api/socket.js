import { Server } from "socket.io";

export const SocketHandler = (req, res) => {
  if (!res.socket.server.io) {
    console.log("Initializing Socket.io server...");
    const io = new Server(res.socket.server);
    res.socket.server.io = io;

    io.on("connection", (socket) => {
      console.log("A client connected:", socket.id);

      socket.on("join-room", (roomId, peerId) => {
        socket.join(roomId);
        socket.to(roomId).emit("user-connected", peerId);
        console.log(`Peer with ID ${peerId} joined room ${roomId}`);
      });

      socket.on("disconnect", () => {
        console.log("A client disconnected:", socket.id);
      });
    });
  } else {
    console.log("Socket.io server is already running.");
  }

  res.end();
};

export default SocketHandler;
