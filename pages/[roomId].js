import React, { useEffect, useState } from "react";
import { useSocket } from "@/context/socketContext";
import { usePeer } from "@/hooks/usePeer";
import useMediaStream from "@/hooks/useMediaStream";
import { Player } from "@/components/player";
import { Loading } from "@/components/loading";
import Chat from "@/components/chat";
import { MessageCircle } from "lucide-react";

const Room = () => {
  const socket = useSocket();
  const { peer, peerID, connections } = usePeer();
  const { stream } = useMediaStream();
  const [remoteStreams, setRemoteStreams] = useState(new Map());
  const [showChat, setShowChat] = useState(true);

  useEffect(() => {
    if (!socket || !peer || !stream) return;

    // Handle incoming calls
    peer.on("call", async (call) => {
      console.log("Receiving call from:", call.peer);
      call.answer(stream);

      call.on("stream", (remoteStream) => {
        console.log("Received stream from:", call.peer);
        setRemoteStreams((prev) => new Map(prev).set(call.peer, remoteStream));
      });
    });

    // When a new user connects, call them
    socket.on("user-connected", (newPeerId) => {
      console.log("New user connected, calling:", newPeerId);

      // Call the new user and send our stream
      const call = peer.call(newPeerId, stream);
      call.on("stream", (remoteStream) => {
        setRemoteStreams((prev) => new Map(prev).set(newPeerId, remoteStream));
      });
    });

    return () => {
      peer.removeAllListeners("call");
      socket.off("user-connected");
      setRemoteStreams(new Map());
    };
  }, [peer, socket, stream]);

  if (!stream) {
    return (
      <div className="flex items-center justify-center h-screen">
        <Loading />
      </div>
    );
  }

  return (
    <div className="h-screen w-screen bg-gray-900 p-4 flex">
      {/* Video Grid */}
      <div className="flex-1">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-4 h-full">
          {/* Local video */}
          <div className="relative">
            <Player
              stream={stream}
              muted={true}
              playing={true}
              playerId={peerID}
            />
            <div className="absolute bottom-4 left-4 bg-black/50 text-white px-2 py-1 rounded">
              You
            </div>
          </div>

          {/* Remote videos */}
          {Array.from(remoteStreams).map(([peerId, remoteStream]) => (
            <div key={peerId} className="relative">
              <Player
                stream={remoteStream}
                muted={false}
                playing={true}
                playerId={peerId}
              />
              <div className="absolute bottom-4 left-4 bg-black/50 text-white px-2 py-1 rounded">
                Peer {peerId.slice(0, 6)}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Chat */}
      {showChat && (
        <Chat
          peerID={peerID}
          connections={connections}
          onClose={() => setShowChat(false)}
          className="w-80 ml-4"
        />
      )}

      {/* Chat Toggle Button */}
      {!showChat && (
        <button
          onClick={() => setShowChat(true)}
          className="fixed bottom-4 right-4 bg-blue-600 text-white rounded-full p-3 shadow-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <MessageCircle className="w-6 h-6" />
        </button>
      )}
    </div>
  );
};

export default Room;
