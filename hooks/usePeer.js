import { useState, useEffect } from "react";
import Peer from "peerjs";
import { useRouter } from "next/router";
import { useSocket } from "@/context/socketContext";
import useMediaStream from "./useMediaStream";

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
      console.log(`Your Peer ID ${id} `);
    });

    newPeer.on("connection", (conn) => {
      setConnections((prev) => [...prev, conn]);
      console.log(`New connection established with peer: ${conn.peer}`);
      conn.on("data", (data) => {
        console.log("Received data from peer:", data);
      });
    });

    socket?.on("user-connected", (newPeerId) => {
      const conn = newPeer.connect(newPeerId);
      setConnections((prev) => [...prev, conn]);
      conn.on("open", () => {
        console.log(
          `Peer ${peerID} connected to peer ${newPeerId} in room ${roomId}`
        );
      });
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
