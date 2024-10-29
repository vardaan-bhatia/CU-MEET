import React from "react";
import { useSocket } from "@/context/socketContext";
import { usePeer } from "@/hooks/usePeer";
import { useEffect } from "react";

const Room = () => {
  const socket = useSocket();

  usePeer();
  useEffect(() => {
    socket?.on("connect", () => {
      console.log("socket id", socket.id);
    });
  }, [socket]);

  return <div></div>;
};

export default Room;
