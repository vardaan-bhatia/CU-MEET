import React, { useEffect, useRef } from "react";

export const Player = ({ stream, muted, playing, playerId }) => {
  const videoRef = useRef(null);

  useEffect(() => {
    if (videoRef.current && stream) {
      videoRef.current.srcObject = stream;
    }

    return () => {
      if (videoRef.current) {
        videoRef.current.srcObject = null;
      }
    };
  }, [stream]);

  return (
    <div className="relative w-full h-full bg-gray-800 rounded-lg overflow-hidden">
      <video
        ref={videoRef}
        muted={muted}
        autoPlay={playing}
        playsInline
        className="w-full h-full object-cover"
      />
    </div>
  );
};
