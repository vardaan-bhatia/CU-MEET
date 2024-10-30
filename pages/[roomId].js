// Room.js
import React from "react";
import { useSocket } from "@/context/socketContext";
import { usePeer } from "@/hooks/usePeer";
import useMediaStream from "@/hooks/useMediaStream";
import { Player } from "@/components/player";

const Room = () => {
  const socket = useSocket();
  const { peer, peerID } = usePeer();
  const { stream } = useMediaStream();

  return (
    <div>
      <Player stream={stream} muted={true} playing playerId={peerID} />
    </div>
  );
};

export default Room;
