import { useState, useEffect } from "react";
import Peer from "peerjs";

// Hook for managing PeerJS connection
export const usePeer = () => {
  const [peer, setPeer] = useState(null); // State to store the Peer instance
  const [peerID, setPeerID] = useState(""); // State to store the current peer's ID
  const [connections, setConnections] = useState([]); // Array to store connections from other peers

  useEffect(() => {
    // Initialize Peer instance when the component mounts
    const newPeer = new Peer(); // Optionally pass an ID or options here
    setPeer(newPeer);

    // Handle 'open' event, fired when the Peer instance is ready and has an ID
    newPeer.on("open", (id) => {
      setPeerID(id); // Save the peer's ID to state
      console.log("peerid", id);
    });

    // Listen for incoming connections from other peers
    newPeer.on("connection", (conn) => {
      setConnections((prev) => [...prev, conn]); // Add new connection to connections array

      // Listen for data received on the connection
      conn.on("data", (data) => {
        console.log("Received data from peer:", data);
      });
    });

    // Handle disconnection event
    newPeer.on("disconnected", () => {
      console.log("Peer disconnected");
    });

    // Handle errors
    newPeer.on("error", (err) => {
      console.error("PeerJS error:", err);
    });

    // Cleanup function to destroy the Peer instance on unmount
    return () => {
      newPeer.destroy(); // Disconnect and clean up
      setPeer(null); // Reset state
      setPeerID("");
      setConnections([]);
    };
  }, []);

  return { peer, peerID, connections }; // Return peer instance, ID, and connections
};
