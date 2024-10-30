import { useState, useEffect, useRef } from "react";

const useMediaStream = () => {
  const [stream, setStream] = useState(null);
  const [streamUrl, setStreamUrl] = useState(null);
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
        const url = URL.createObjectURL(mediaStream);
        setStreamUrl(url);
      } catch (error) {
        console.error("Error accessing media devices:", error);
      }
    };

    if (!isStreamInitialized.current) {
      isStreamInitialized.current = true;
      initStream();
    }

    // Cleanup function to stop all tracks and revoke URL when the component unmounts
    return () => {
      if (stream) {
        stream.getTracks().forEach((track) => track.stop());
        console.log("Media stream stopped");
      }
      if (streamUrl) {
        URL.revokeObjectURL(streamUrl);
      }
    };
  }, [stream, streamUrl]);

  return { stream, streamUrl };
};

export default useMediaStream;
