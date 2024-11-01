import React, { useEffect, useState } from "react";
import { useSocket } from "@/context/socketContext";
import { usePeer } from "@/hooks/usePeer";
import useMediaStream from "@/hooks/useMediaStream";
import { Player } from "@/components/player";
import { Loading } from "@/components/loading";
import {
  Video,
  VideoOff,
  Mic,
  MicOff,
  Phone,
  UserCircle,
  MessageCircle,
} from "lucide-react";
import { useRouter } from "next/navigation";
import { useParams } from "next/navigation";

const Room = () => {
  const socket = useSocket();
  const { peer, peerID } = usePeer();
  const { stream } = useMediaStream();
  const [remoteStreams, setRemoteStreams] = useState(new Map());
  const [isVideoMuted, setIsVideoMuted] = useState(false);
  const [isAudioMuted, setIsAudioMuted] = useState(false);
  const router = useRouter();
  const roomId = useParams()?.roomId;

  // Join room on component mount
  useEffect(() => {
    if (!socket || !peer || !stream || !roomId) return;

    socket.emit("join-room", roomId, peerID);
    socket.emit("update-mute-status", {
      peerId: peerID,
      videoMuted: isVideoMuted,
      audioMuted: isAudioMuted,
    });
  }, [socket, peer, stream, roomId, peerID]);

  useEffect(() => {
    if (!socket || !peer || !stream) return;

    peer.on("call", (call) => {
      call.answer(stream);
      call.on("stream", (remoteStream) => {
        setRemoteStreams((prev) => {
          const newMap = new Map(prev);
          newMap.set(call.peer, {
            stream: remoteStream,
            videoMuted: false,
            audioMuted: false,
          });
          return newMap;
        });
      });
    });

    socket.on("user-connected", (newPeerId) => {
      const call = peer.call(newPeerId, stream);
      call.on("stream", (remoteStream) => {
        setRemoteStreams((prev) => {
          const newMap = new Map(prev);
          newMap.set(newPeerId, {
            stream: remoteStream,
            videoMuted: false,
            audioMuted: false,
          });
          return newMap;
        });
      });
    });

    socket.on("mute-status-update", ({ peerId, videoMuted, audioMuted }) => {
      setRemoteStreams((prev) => {
        const newMap = new Map(prev);
        const existingRemoteUser = newMap.get(peerId);
        if (existingRemoteUser) {
          newMap.set(peerId, {
            ...existingRemoteUser,
            videoMuted,
            audioMuted,
          });
        }
        return newMap;
      });
    });

    socket.on("user-disconnected", (peerId) => {
      setRemoteStreams((prev) => {
        const newMap = new Map(prev);
        newMap.delete(peerId);
        return newMap;
      });
    });

    return () => {
      peer.removeAllListeners("call");
      socket.off("user-connected");
      socket.off("mute-status-update");
      socket.off("user-disconnected");
      setRemoteStreams(new Map());
    };
  }, [peer, socket, stream]);

  useEffect(() => {
    if (!socket || !peerID) return;

    socket.emit("update-mute-status", {
      peerId: peerID,
      videoMuted: isVideoMuted,
      audioMuted: isAudioMuted,
    });
  }, [isVideoMuted, isAudioMuted, socket, peerID]);

  const toggleVideo = () => {
    if (!stream) return;
    const videoTrack = stream.getVideoTracks()[0];
    if (videoTrack) {
      videoTrack.enabled = !videoTrack.enabled;
      setIsVideoMuted(!videoTrack.enabled);
    }
  };

  const toggleAudio = () => {
    if (!stream) return;
    const audioTrack = stream.getAudioTracks()[0];
    if (audioTrack) {
      audioTrack.enabled = !audioTrack.enabled;
      setIsAudioMuted(!audioTrack.enabled);
    }
  };

  const endCall = () => {
    remoteStreams.forEach(({ stream }) => {
      stream.getTracks().forEach((track) => track.stop());
    });
    if (stream) {
      stream.getTracks().forEach((track) => track.stop());
    }
    if (socket) {
      socket.disconnect();
    }
    if (peer) {
      peer.destroy();
    }
    router.push("/sessionend");
  };

  if (!stream) {
    return (
      <div className="flex items-center justify-center h-screen">
        <Loading />
      </div>
    );
  }

  return (
    <div className="relative h-screen w-screen overflow-hidden">
      {/* Local video */}
      <div className="absolute inset-0">
        {isVideoMuted ? (
          <div className="w-full h-full bg-gray-800">
            <div className="flex items-center justify-center h-full">
              <UserCircle className="w-32 h-32 text-gray-400" />
            </div>
          </div>
        ) : (
          <Player
            stream={stream}
            muted
            playing
            playerId={peerID}
            className="w-full h-full object-cover"
          />
        )}
        <div className="absolute bottom-4 left-4 bg-black/50 text-white px-3 py-1.5 rounded">
          <span>You</span>
        </div>
      </div>

      {/* Remote videos */}
      <div className="absolute top-4 right-4 z-10">
        <div className="grid grid-cols-1 gap-3 max-w-md">
          {Array.from(remoteStreams).map(
            ([peerId, { stream: remoteStream, videoMuted, audioMuted }]) => (
              <div
                key={peerId}
                className="relative w-52 h-36 bg-gray-700 rounded-lg overflow-hidden shadow-lg"
              >
                {videoMuted ? (
                  <div className="flex flex-col items-center justify-center h-full bg-gray-800 relative">
                    <UserCircle className="w-24 h-24 text-gray-400" />
                    {audioMuted && (
                      <div className="absolute bottom-2 right-2">
                        <MicOff className="w-4 h-4 text-gray-400" />
                      </div>
                    )}
                  </div>
                ) : (
                  <div className="relative w-full h-full">
                    <Player
                      stream={remoteStream}
                      muted={false}
                      playing
                      playerId={peerId}
                      className="w-full h-full object-cover"
                    />
                    {audioMuted && (
                      <div className="absolute bottom-2 right-2 bg-black/50 rounded-full p-1">
                        <MicOff className="w-4 h-4 text-white" />
                      </div>
                    )}
                  </div>
                )}
                <div className="absolute bottom-2 left-2 bg-black/50 text-white px-2 py-1 rounded text-sm">
                  User {peerId.slice(0, 6)}
                </div>
              </div>
            )
          )}
        </div>
      </div>

      {/* Controls */}
      <div className="absolute bottom-5 left-1/2 transform -translate-x-1/2 flex items-center space-x-4 z-20">
        <button
          onClick={toggleVideo}
          className={`bg-gray-700 text-white p-3 rounded-full hover:bg-gray-600 transition-colors ${
            isVideoMuted ? "bg-red-600 hover:bg-red-700" : ""
          }`}
        >
          {isVideoMuted ? <VideoOff /> : <Video />}
        </button>
        <button
          onClick={toggleAudio}
          className={`bg-gray-700 text-white p-3 rounded-full hover:bg-gray-600 transition-colors ${
            isAudioMuted ? "bg-red-600 hover:bg-red-700" : ""
          }`}
        >
          {isAudioMuted ? <MicOff /> : <Mic />}
        </button>
        <button
          onClick={endCall}
          className="bg-red-600 text-white p-3 rounded-full hover:bg-red-700 transition-colors"
        >
          <Phone />
        </button>
      </div>
    </div>
  );
};

export default Room;
