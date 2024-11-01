import { useState, useEffect, useRef } from "react";

const useMediaStream = () => {
  const [stream, setStream] = useState(null);
  const [error, setError] = useState(null);
  const isStreamInitialized = useRef(false);

  useEffect(() => {
    const initStream = async () => {
      try {
        const mediaStream = await navigator.mediaDevices.getUserMedia({
          audio: true,
          video: true,
        });
        setStream(mediaStream);
      } catch (err) {
        setError(err);
      }
    };

    if (!isStreamInitialized.current) {
      isStreamInitialized.current = true;
      initStream();
    }

    return () => {
      if (stream) {
        stream.getTracks().forEach((track) => track.stop());
      }
    };
  }, []);

  return { stream, error };
};

export default useMediaStream;
