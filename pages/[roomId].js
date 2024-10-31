import React from "react";
import { useSocket } from "@/context/socketContext";
import { usePeer } from "@/hooks/usePeer";
import useMediaStream from "@/hooks/useMediaStream";
import { Player } from "@/components/player";
import { Loading } from "@/components/loading";
import { useEffect } from "react";

const Room = () => {
  const socket = useSocket();
  const { peer, peerID, connections } = usePeer();
  const { stream } = useMediaStream();

  useEffect(() => {
    if (peer) {
      connections.forEach((conn) => {
        conn.on("data", (data) => {
          if (data.stream) {
            console.log("Received stream from:", conn.peer);
          }
        });
      });
    }
  }, [peer, connections]);

  return (
    <div style={{ height: "100vh", width: "100vw" }}>
      {stream ? (
        <Player stream={stream} muted={true} playing={true} playerId={peerID} />
      ) : (
        <div className="flex items-center justify-center h-full">
          <Loading />
        </div>
      )}
    </div>
  );
};

export default Room;
