import { useState, useEffect, useRef } from "react";

const useMediaStream = () => {
  const [stream, setStream] = useState(null);
  const [error, setError] = useState(null); // State to store errors
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
      } catch (err) {
        console.error("Error accessing media devices:", err);
        setError(err); // Set the error state
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
  }, []); // Remove 'stream' from the dependency array

  return { stream, error }; // Return the stream and error
};

export default useMediaStream;
