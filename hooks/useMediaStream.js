// useMediaStream.js
import { useState, useEffect, useRef } from "react";

const useMediaStream = () => {
  const [stream, setStream] = useState(null);
  const isStreamInitialized = useRef(false);

  useEffect(() => {
    const initStream = async () => {
      try {
        const mediaStream = await navigator.mediaDevices.getUserMedia({
          audio: true,
          video: true,
        });
        console.log("Initializing media stream...");
        setStream(mediaStream);
      } catch (error) {
        console.error("Error accessing media devices:", error);
      }
    };

    if (!isStreamInitialized.current) {
      isStreamInitialized.current = true;
      initStream();
    }

    // Cleanup function to stop all tracks when the component unmounts
    return () => {
      if (stream) {
        stream.getTracks().forEach((track) => track.stop());
        console.log("Media stream stopped");
      }
    };
  }, [stream]);

  return { stream };
};

export default useMediaStream;
