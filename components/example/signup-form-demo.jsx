"use client";
import React, { useState } from "react";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { cn } from "@/lib/utils";

export default function SignupFormDemo() {
  const [roomId, setRoomId] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Joining room with ID:", roomId);
    // Here, you can add your logic to join the room
  };

  return (
    <div className="max-w-md w-full mx-auto rounded-none md:rounded-2xl p-4 md:p-8 shadow-input bg-white dark:bg-black">
      <h2 className="font-bold text-xl text-neutral-800 dark:text-neutral-200">
        Join a Room
      </h2>
      <p className="text-neutral-600 text-sm max-w-sm mt-2 dark:text-neutral-300">
        Enter your Room ID below to join the meeting.
      </p>
      <form className="my-8" onSubmit={handleSubmit}>
        <LabelInputContainer className="mb-4">
          <Label htmlFor="roomId">Room ID</Label>
          <Input
            id="roomId"
            placeholder="Enter your Room ID"
            type="text"
            value={roomId}
            onChange={(e) => setRoomId(e.target.value)}
          />
        </LabelInputContainer>
        <button
          className="bg-black text-white rounded-md h-10 w-full font-medium transition duration-200 hover:bg-gray-800"
          type="submit"
        >
          Join Room
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
