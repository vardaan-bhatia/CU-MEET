import React, { useEffect, useRef } from "react";

export const Player = ({ stream, muted, playing, playerId }) => {
  const videoRef = useRef(null);

  useEffect(() => {
    // Attach the media stream to the video element when the component mounts
    if (videoRef.current && stream) {
      videoRef.current.srcObject = stream;
    }

    // Clean up by detaching the media stream when the component unmounts
    return () => {
      if (videoRef.current) {
        videoRef.current.srcObject = null;
      }
    };
  }, [stream]); // Dependency array ensures this effect only runs when the stream changes

  return (
    <div className="relative w-full h-full bg-gray-800 overflow-hidden">
      <video
        ref={videoRef} // Reference to access the DOM node
        muted={muted} // Controls whether the audio is muted
        autoPlay={playing} // Automatically plays if 'playing' is true
        playsInline // Prevents full-screen autoplay on some devices
        className="w-full h-full object-cover" // CSS to make the video fill its container
      />
    </div>
  );
};
