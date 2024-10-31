// import React, { useState, useEffect } from "react";
// import { usePeer } from "@/hooks/usePeer";

// export const Chat = () => {
//   const { sendMessage, useIncomingMessages } = usePeer();
//   const [messages, setMessages] = useState([]);
//   const [input, setInput] = useState("");

//   useIncomingMessages((message) => {
//     setMessages((prevMessages) => [
//       ...prevMessages,
//       { sender: "Peer", text: message },
//     ]);
//   });

//   const handleSend = () => {
//     if (input.trim()) {
//       const messageData = { sender: "You", text: input };
//       setMessages((prevMessages) => [...prevMessages, messageData]);
//       sendMessage(input);
//       setInput("");
//     }
//   };

//   return (
//     <div className="flex flex-col w-full max-w-md p-4 bg-white border rounded shadow-md">
//       <div className="flex-1 overflow-y-auto p-2 space-y-2 mb-4 bg-gray-100 rounded-md">
//         {messages.map((msg, index) => (
//           <p key={index} className="text-gray-700">
//             <strong className="text-blue-500">{msg.sender}:</strong> {msg.text}
//           </p>
//         ))}
//       </div>
//       <div className="flex items-center space-x-2">
//         <input
//           type="text"
//           value={input}
//           onChange={(e) => setInput(e.target.value)}
//           placeholder="Type your message"
//           className="flex-1 px-4 py-2 text-black border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
//         />
//         <button
//           onClick={handleSend}
//           className="px-4 py-2 text-white bg-blue-500 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
//         >
//           Send
//         </button>
//       </div>
//     </div>
//   );
// };
