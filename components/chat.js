// import React, { useState, useRef, useEffect } from "react";
// import { MessageCircle, Send, X, Paperclip, Smile } from "lucide-react";
// import data from "@emoji-mart/data";
// import Picker from "@emoji-mart/react";
// import { formatFileSize } from "@/utils/formatters";

// const Chat = ({ socket, roomId }) => {
//   const [messages, setMessages] = useState([]);
//   const [newMessage, setNewMessage] = useState("");
//   const [showEmojiPicker, setShowEmojiPicker] = useState(false);
//   const [typing, setTyping] = useState(new Set());
//   const [fileUpload, setFileUpload] = useState(null);
//   const [isConnected, setIsConnected] = useState(false);
//   const chatContainerRef = useRef(null);
//   const fileInputRef = useRef(null);
//   const typingTimeout = useRef(null);

//   useEffect(() => {
//     if (!socket || !roomId) return;

//     // Set up socket connection status
//     setIsConnected(socket.connected);

//     socket.on("connect", () => {
//       console.log("Socket connected");
//       setIsConnected(true);
//     });

//     socket.on("disconnect", () => {
//       console.log("Socket disconnected");
//       setIsConnected(false);
//     });

//     // Join room when component mounts
//     socket.emit("join-room", roomId, socket.id);

//     // Room join confirmation
//     socket.on("room-joined", (data) => {
//       console.log("Joined room:", data);
//     });

//     // Listen for incoming messages
//     socket.on("receive-message", (data) => {
//       console.log("Received message:", data);
//       setMessages((prev) => [
//         ...prev,
//         {
//           id: Date.now(),
//           text: data.message,
//           sender: data.senderId,
//           timestamp: new Date(data.timestamp).toLocaleTimeString(),
//           file: data.file,
//         },
//       ]);
//     });

//     // Message sent confirmation
//     socket.on("message-sent", (data) => {
//       console.log("Message sent confirmation:", data);
//     });

//     // Listen for typing indicators
//     socket.on("typing-indicator", ({ senderId, isTyping }) => {
//       setTyping((prev) => {
//         const newTyping = new Set(prev);
//         if (isTyping) {
//           newTyping.add(senderId);
//         } else {
//           newTyping.delete(senderId);
//         }
//         return newTyping;
//       });
//     });

//     return () => {
//       socket.off("connect");
//       socket.off("disconnect");
//       socket.off("room-joined");
//       socket.off("receive-message");
//       socket.off("message-sent");
//       socket.off("typing-indicator");
//     };
//   }, [socket, roomId]);

//   useEffect(() => {
//     // Scroll to bottom when messages change
//     if (chatContainerRef.current) {
//       chatContainerRef.current.scrollTop =
//         chatContainerRef.current.scrollHeight;
//     }
//   }, [messages]);

//   const handleTypingIndicator = (isTyping) => {
//     if (!socket || !roomId) return;

//     socket.emit("typing", {
//       roomId,
//       isTyping,
//     });
//   };

//   const handleMessageChange = (e) => {
//     setNewMessage(e.target.value);

//     clearTimeout(typingTimeout.current);
//     handleTypingIndicator(true);

//     typingTimeout.current = setTimeout(() => {
//       handleTypingIndicator(false);
//     }, 1000);
//   };

//   const handleEmojiSelect = (emoji) => {
//     setNewMessage((prev) => prev + emoji.native);
//     setShowEmojiPicker(false);
//   };

//   const handleFileSelect = (e) => {
//     const file = e.target.files[0];
//     if (!file) return;

//     // Limit file size (e.g., 5MB)
//     if (file.size > 5 * 1024 * 1024) {
//       alert("File size must be less than 5MB");
//       return;
//     }

//     setFileUpload({
//       name: file.name,
//       size: file.size,
//       type: file.type,
//     });

//     const reader = new FileReader();
//     reader.onload = (e) => {
//       setFileUpload((prev) => ({
//         ...prev,
//         data: e.target.result,
//       }));
//     };
//     reader.readAsDataURL(file);
//   };

//   const sendMessage = (e) => {
//     e.preventDefault();
//     if (!socket || !isConnected || (!newMessage.trim() && !fileUpload)) return;

//     const messageData = {
//       roomId,
//       message: newMessage.trim(),
//       file: fileUpload,
//     };

//     // Emit message to server
//     socket.emit("send-message", messageData);

//     // Add message to local state immediately
//     setMessages((prev) => [
//       ...prev,
//       {
//         id: Date.now(),
//         text: newMessage.trim(),
//         sender: socket.id,
//         timestamp: new Date().toLocaleTimeString(),
//         file: fileUpload,
//       },
//     ]);

//     // Clear input and file
//     setNewMessage("");
//     setFileUpload(null);
//     if (fileInputRef.current) {
//       fileInputRef.current.value = "";
//     }

//     // Clear typing indicator
//     clearTimeout(typingTimeout.current);
//     handleTypingIndicator(false);
//   };

//   if (!isConnected) {
//     return (
//       <div className="absolute w-96 h-full flex items-center justify-center bg-gray-800 right-0">
//         <p className="text-white">Connecting to chat...</p>
//       </div>
//     );
//   }

//   return (
//     <div className="absolute w-96 h-full flex flex-col bg-gray-800 ">
//       {/* Header */}
//       <div className="p-4 border-b border-gray-700 flex justify-between items-center">
//         <h2 className="text-white font-semibold flex items-center">
//           <MessageCircle className="w-5 h-5 mr-2" /> Chat
//         </h2>
//       </div>

//       {/* Messages */}
//       <div
//         ref={chatContainerRef}
//         className="flex-1 overflow-y-auto p-4 space-y-4"
//       >
//         {messages.map((msg) => (
//           <div
//             key={msg.id}
//             className={`flex flex-col ${
//               msg.sender === socket.id ? "items-end" : "items-start"
//             }`}
//           >
//             <div
//               className={`max-w-[80%] rounded-lg p-3 ${
//                 msg.sender === socket.id
//                   ? "bg-blue-600 text-white"
//                   : "bg-gray-700 text-white"
//               }`}
//             >
//               {msg.text}
//               {msg.file && (
//                 <div className="mt-2 p-2 bg-black/20 rounded">
//                   <div className="font-medium">{msg.file.name}</div>
//                   <div className="text-sm opacity-75">
//                     {formatFileSize(msg.file.size)}
//                   </div>
//                   <button
//                     className="mt-1 text-sm text-blue-300 hover:text-blue-200"
//                     onClick={() => window.open(msg.file.data)}
//                   >
//                     Download
//                   </button>
//                 </div>
//               )}
//             </div>
//             <div className="text-xs text-gray-400 mt-1">
//               <span>
//                 {msg.sender === socket.id
//                   ? "You"
//                   : `User ${msg.sender.slice(0, 6)}`}
//               </span>
//               <span className="ml-2">{msg.timestamp}</span>
//             </div>
//           </div>
//         ))}

//         {/* Typing Indicator */}
//         {typing.size > 0 && (
//           <div className="text-gray-400 text-sm">
//             {Array.from(typing)
//               .map((sender) =>
//                 sender === socket.id ? "You" : `User ${sender.slice(0, 6)}`
//               )
//               .join(", ")}{" "}
//             typing...
//           </div>
//         )}
//       </div>

//       {/* Emoji Picker */}
//       {showEmojiPicker && (
//         <div className="absolute bottom-full right-0 mb-2">
//           <Picker data={data} onEmojiSelect={handleEmojiSelect} />
//         </div>
//       )}

//       {/* File Upload Preview */}
//       {fileUpload && (
//         <div className="px-4 py-2 bg-gray-700 border-t border-gray-600">
//           <div className="flex items-center justify-between">
//             <div className="text-sm text-white">
//               {fileUpload.name} ({formatFileSize(fileUpload.size)})
//             </div>
//             <button
//               onClick={() => setFileUpload(null)}
//               className="text-gray-400 hover:text-white"
//             >
//               <X className="w-4 h-4" />
//             </button>
//           </div>
//         </div>
//       )}

//       {/* Message Input */}
//       <form onSubmit={sendMessage} className="p-4 border-t border-gray-700">
//         <div className="flex">
//           <button
//             type="button"
//             onClick={() => fileInputRef.current?.click()}
//             className="text-gray-400 hover:text-white p-2"
//           >
//             <Paperclip className="w-5 h-5" />
//           </button>
//           <input
//             ref={fileInputRef}
//             type="file"
//             onChange={handleFileSelect}
//             className="hidden"
//           />
//           <button
//             type="button"
//             onClick={() => setShowEmojiPicker(!showEmojiPicker)}
//             className="text-gray-400 hover:text-white p-2"
//           >
//             <Smile className="w-5 h-5" />
//           </button>
//           <input
//             type="text"
//             value={newMessage}
//             onChange={handleMessageChange}
//             placeholder="Type a message..."
//             className="flex-1 mr-2 bg-gray-700 text-white rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
//           />
//           <button
//             type="submit"
//             disabled={!isConnected || (!newMessage.trim() && !fileUpload)}
//             className="bg-blue-600 text-white rounded-lg px-4 py-2 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
//           >
//             <Send className="w-4 h-5" />
//           </button>
//         </div>
//       </form>
//     </div>
//   );
// };

// export default Chat;
