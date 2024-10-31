import React, { useState, useRef, useEffect } from "react";
import { MessageCircle, Send, X, Paperclip, Smile } from "lucide-react";
import data from "@emoji-mart/data";
import Picker from "@emoji-mart/react";
import { formatFileSize } from "@/utils/formatters";

const Chat = ({ peerID, connections, onClose, className = "" }) => {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const [typing, setTyping] = useState(new Set());
  const [fileUpload, setFileUpload] = useState(null);
  const chatContainerRef = useRef(null);
  const fileInputRef = useRef(null);
  let typingTimeout = null;

  useEffect(() => {
    // Scroll to bottom when messages change
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop =
        chatContainerRef.current.scrollHeight;
    }
  }, [messages]);

  useEffect(() => {
    // Set up message and typing indicator handlers for each connection
    connections.forEach((conn) => {
      conn.on("data", handleIncomingData);
    });

    return () => {
      connections.forEach((conn) => {
        conn.off("data", handleIncomingData);
      });
    };
  }, [connections]);

  const handleIncomingFile = (data) => {
    const { file, sender } = data;

    if (file) {
      addMessage(`Sent a file`, sender, {
        name: file.name,
        size: file.size,
        type: file.type,
        data: file.data, // Ensure this contains the file data in base64 or URL
      });
    }
  };

  const handleIncomingData = (data) => {
    switch (data.type) {
      case "chat":
        addMessage(data.message, data.sender);
        break;
      case "typing":
        handleTypingIndicator(data.sender, data.isTyping);
        break;
      case "file":
        handleIncomingFile(data);
        break;
    }
  };

  const addMessage = (text, sender, file = null) => {
    setMessages((prev) => [
      ...prev,
      {
        id: Date.now(),
        text,
        sender,
        timestamp: new Date().toLocaleTimeString(),
        file,
      },
    ]);
  };

  const handleTypingIndicator = (sender, isTyping) => {
    setTyping((prev) => {
      const newTyping = new Set(prev);
      if (isTyping) {
        newTyping.add(sender);
      } else {
        newTyping.delete(sender);
      }
      return newTyping;
    });
  };

  const sendTypingIndicator = (isTyping) => {
    connections.forEach((conn) => {
      conn.send({
        type: "typing",
        sender: peerID,
        isTyping,
      });
    });
  };

  const handleMessageChange = (e) => {
    setNewMessage(e.target.value);

    // Handle typing indicator
    clearTimeout(typingTimeout);
    sendTypingIndicator(true);

    typingTimeout = setTimeout(() => {
      sendTypingIndicator(false);
    }, 1000);
  };

  const handleEmojiSelect = (emoji) => {
    setNewMessage((prev) => prev + emoji.native);
    setShowEmojiPicker(false);
  };

  const handleFileSelect = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setFileUpload({
      name: file.name,
      size: file.size,
      type: file.type,
    });

    // Convert file to base64
    const reader = new FileReader();
    reader.onload = (e) => {
      setFileUpload((prev) => ({
        ...prev,
        data: e.target.result,
      }));
    };
    reader.readAsDataURL(file);
  };

  const sendMessage = (e) => {
    e.preventDefault();
    if (!newMessage.trim() && !fileUpload) return;

    // Send message to all connections
    connections.forEach((conn) => {
      conn.send({
        type: fileUpload ? "file" : "chat",
        message: newMessage,
        sender: peerID,
        file: fileUpload,
      });
    });

    // Add own message to chat
    addMessage(newMessage, peerID, fileUpload);

    // Clear message and file
    setNewMessage("");
    setFileUpload(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }

    // Clear typing indicator
    clearTimeout(typingTimeout);
    sendTypingIndicator(false);
  };

  return (
    <div className={`flex flex-col bg-gray-800 rounded-lg ${className}`}>
      {/* Header */}
      <div className="p-4 border-b border-gray-700 flex justify-between items-center">
        <h2 className="text-white font-semibold flex items-center">
          <MessageCircle className="w-5 h-5 mr-2" /> Chat
        </h2>
        <button onClick={onClose} className="text-gray-400 hover:text-white">
          <X className="w-5 h-5" />
        </button>
      </div>

      {/* Messages */}
      <div
        ref={chatContainerRef}
        className="flex-1 overflow-y-auto p-4 space-y-4"
      >
        {messages.map((msg) => (
          <div
            key={msg.id}
            className={`flex flex-col ${
              msg.sender === peerID ? "items-end" : "items-start"
            }`}
          >
            <div
              className={`max-w-[80%] rounded-lg p-3 ${
                msg.sender === peerID
                  ? "bg-blue-600 text-white"
                  : "bg-gray-700 text-white"
              }`}
            >
              {msg.text}
              {msg.file && (
                <div className="mt-2 p-2 bg-black/20 rounded">
                  <div className="font-medium">{msg.file.name}</div>
                  <div className="text-sm opacity-75">
                    {formatFileSize(msg.file.size)}
                  </div>
                  <button
                    className="mt-1 text-sm text-blue-300 hover:text-blue-200"
                    onClick={() => window.open(msg.file.data)}
                  >
                    Download
                  </button>
                </div>
              )}
            </div>
            <span className="text-xs text-gray-400 mt-1">{msg.timestamp}</span>
          </div>
        ))}

        {/* Typing Indicator */}
        {typing.size > 0 && (
          <div className="text-gray-400 text-sm">
            {Array.from(typing)
              .map((sender) => `Peer ${sender.slice(0, 6)}`)
              .join(", ")}{" "}
            typing...
          </div>
        )}
      </div>

      {/* Emoji Picker */}
      {showEmojiPicker && (
        <div className="absolute bottom-20 right-4">
          <Picker data={data} onEmojiSelect={handleEmojiSelect} />
        </div>
      )}

      {/* File Upload Preview */}
      {fileUpload && (
        <div className="px-4 py-2 bg-gray-700 border-t border-gray-600">
          <div className="flex items-center justify-between">
            <div className="text-sm text-white">
              {fileUpload.name} ({formatFileSize(fileUpload.size)})
            </div>
            <button
              onClick={() => setFileUpload(null)}
              className="text-gray-400 hover:text-white"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {/* Message Input */}
      <form onSubmit={sendMessage} className="p-4 border-t border-gray-700">
        <div className="flex space-x-2">
          <button
            type="button"
            onClick={() => fileInputRef.current?.click()}
            className="text-gray-400 hover:text-white p-2"
          >
            <Paperclip className="w-5 h-5" />
          </button>
          <input
            ref={fileInputRef}
            type="file"
            onChange={handleFileSelect}
            className="hidden"
          />
          <button
            type="button"
            onClick={() => setShowEmojiPicker(!showEmojiPicker)}
            className="text-gray-400 hover:text-white p-2"
          >
            <Smile className="w-5 h-5" />
          </button>
          <input
            type="text"
            value={newMessage}
            onChange={handleMessageChange}
            placeholder="Type a message..."
            className="flex-1 bg-gray-700 text-white rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            type="submit"
            className="bg-blue-600 text-white rounded-lg px-4 py-2 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <Send className="w-5 h-5" />
          </button>
        </div>
      </form>
    </div>
  );
};

export default Chat;
