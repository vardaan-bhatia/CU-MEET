import React, { useEffect, useRef } from "react";

export const Player = ({ stream, muted, playing, playerId }) => {
  const videoRef = useRef(null);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.srcObject = stream; // Set the MediaStream directly
    }

    return () => {
      // Cleanup function to reset the srcObject when component unmounts
      if (videoRef.current) {
        videoRef.current.srcObject = null;
      }
    };
  }, [stream]);

  return (
    <div style={{ position: "relative", width: "100%", height: "100vh" }}>
      {stream ? (
        <video ref={videoRef} muted={muted} autoPlay={playing} />
      ) : (
        <p>No video stream available</p>
      )}
    </div>
  );
};
