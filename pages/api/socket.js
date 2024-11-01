import { Server } from "socket.io";

export const SocketHandler = (req, res) => {
  if (!res.socket.server.io) {
    const io = new Server(res.socket.server);
    res.socket.server.io = io;

    io.on("connection", (socket) => {
      // Track room and user information for each socket
      const userInfo = {
        roomId: null,
        peerId: null,
        videoMuted: false,
        audioMuted: false,
      };

      socket.on("join-room", (roomId, peerId) => {
        // Leave any previous rooms
        if (userInfo.roomId) {
          socket.leave(userInfo.roomId);
        }

        // Join new room
        socket.join(roomId);
        userInfo.roomId = roomId;
        userInfo.peerId = peerId;

        // Broadcast user connection to others in the room
        socket.to(roomId).emit("user-connected", peerId);
      });

      socket.on("update-mute-status", (muteStatus) => {
        if (!userInfo.roomId) return;

        // Update mute status
        userInfo.videoMuted = muteStatus.videoMuted;
        userInfo.audioMuted = muteStatus.audioMuted;

        // Broadcast updated mute status to other users in the room
        socket.to(userInfo.roomId).emit("mute-status-update", {
          peerId: userInfo.peerId,
          videoMuted: userInfo.videoMuted,
          audioMuted: userInfo.audioMuted,
        });
      });

      socket.on("disconnect", () => {
        if (userInfo.roomId) {
          // Emit user disconnection event
          socket.to(userInfo.roomId).emit("user-disconnected", userInfo.peerId);
        }
      });
    });
  }

  res.end();
};

export default SocketHandler;
