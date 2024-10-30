"use client";
import React, { useState } from "react";
import { Input } from "../ui/input";
import { cn } from "@/lib/utils";
import { HeadsetIcon } from "lucide-react";
import { useRouter } from "next/navigation";

export default function InputModal({ onClose }) {
  const [roomId, setRoomId] = useState("");
  const [error, setError] = useState(null);
  const router = useRouter();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (roomId) {
      router.push(`/${roomId}`);
    } else {
      setError("Please Enter Room id"); // Set a specific error message
      return; // Prevent further execution
    }
    // Add your logic to join the room here
    setError(null); // Clear error if roomId is valid
  };

  const handleChange = (e) => {
    setRoomId(e.target.value);
    if (error) {
      setError(null); // Clear error on input change
    }
  };

  return (
    <div className="max-w-md w-full mx-auto">
      <h2 className="font-bold text-xl text-center text-neutral-800 dark:text-neutral-200">
        Join/Create
      </h2>
      <p className="text-neutral-600 text-sm max-w-sm mt-2 dark:text-neutral-300">
        Enter your Room ID below to join the meeting.
      </p>
      <form className="my-4" onSubmit={handleSubmit}>
        <LabelInputContainer className="mb-5">
          <Input
            id="roomId"
            placeholder="Enter Room ID"
            type="text"
            value={roomId}
            onChange={handleChange} // Use the new handleChange function
          />
        </LabelInputContainer>
        {error && <div className="text-red-500 mb-5">{error}</div>}{" "}
        {/* Display error message */}
        <button
          className="bg-black text-white rounded-md h-10 w-full font-medium transition duration-200 hover:bg-gray-800"
          type="submit"
        >
          <span className="flex items-center justify-center gap-2">
            Start Joining <HeadsetIcon />
          </span>
        </button>
      </form>
    </div>
  );
}

const LabelInputContainer = ({ children, className }) => {
  return (
    <div className={cn("flex flex-col space-y-2 w-full", className)}>
      {children}
    </div>
  );
};
