import { useState, useEffect } from "react";
import Peer from "peerjs";
import { useRouter } from "next/router";
import { useSocket } from "@/context/socketContext";

export const usePeer = () => {
  const [peer, setPeer] = useState(null);
  const [peerID, setPeerID] = useState("");
  const [connections, setConnections] = useState([]);
  const roomId = useRouter().query.roomId;
  const socket = useSocket();

  useEffect(() => {
    const newPeer = new Peer();
    setPeer(newPeer);

    newPeer.on("open", (id) => {
      setPeerID(id);
      socket?.emit("join-room", roomId, id);
    });

    newPeer.on("connection", (conn) => {
      setConnections((prev) => [...prev, conn]);
      conn.on("data", (data) => {
        // Handle received data here
      });
    });

    socket?.on("user-connected", (newPeerId) => {
      const conn = newPeer.connect(newPeerId);
      setConnections((prev) => [...prev, conn]);
    });

    newPeer.on("disconnected", () => console.log("Peer disconnected"));
    newPeer.on("error", (err) => console.error("PeerJS error:", err));

    return () => {
      newPeer.destroy();
      setPeer(null);
      setPeerID("");
      setConnections([]);
      socket?.off("user-connected");
    };
  }, [roomId, socket]);

  return { peer, peerID, connections };
};
