import React, { useState } from "react";
import { Github, Menu, XCircle } from "lucide-react"; // Importing GitHub and Menu icons from Lucide
import Modal from "./Modal";
import { useModal } from "@/context/modalContext";
import { useRouter } from "next/navigation";
import { v4 as uuidv4 } from "uuid";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { openModal } = useModal();
  const router = useRouter();

  const createRoom = () => {
    const roomId = uuidv4();
    router.push(`/${roomId}`);
  };

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };
  const handleRefresh = () => {
    window.location.reload();
  };

  return (
    <nav className="fixed top-0 left-0 w-full p-6 z-50 font-sans">
      <div className="container mx-auto flex items-center justify-between">
        {/* Logo */}
        <h1
          className="text-gray-200 text-2xl md:text-3xl font-bold cursor-pointer"
          onClick={handleRefresh}
        >
          CU-Meet.
        </h1>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center space-x-8">
          <button
            className="text-gray-200 font-semibold transition duration-200 hover:underline px-3 py-2 rounded"
            onClick={openModal}
          >
            Join Room
          </button>
          <button
            className="text-gray-200 font-semibold transition duration-200 hover:underline px-3 py-2 rounded"
            onClick={createRoom}
          >
            New Meeting
          </button>
          <a
            href="https://github.com/vardaan-bhatia/CU-MEET"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-200 transition duration-200 hover:text-gray-400"
          >
            <Github size={26} />
          </a>
        </div>
        <Modal />

        {/* Mobile Menu Icon */}
        <div className="md:hidden flex items-center">
          {isOpen ? (
            <button onClick={toggleMenu} className="text-white">
              <XCircle size={28} />
            </button>
          ) : (
            <button onClick={toggleMenu} className="text-white">
              <Menu size={28} />
            </button>
          )}
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div
          className="md:hidden mt-5 flex flex-col items-center space-y-4 bg-black p-4 rounded-lg shadow-2xl"
          onClick={toggleMenu}
        >
          <button
            className="text-white font-semibold transition duration-200 hover:underline w-full py-2 rounded"
            onClick={openModal}
          >
            Join Room
          </button>
          <button
            className="text-white font-semibold transition duration-200 hover:underline w-full py-2 rounded"
            onClick={createRoom}
          >
            New Meeting
          </button>
          <Modal />
          <a
            href="https://github.com/vardaan-bhatia/CU-MEET"
            target="_blank"
            rel="noopener noreferrer"
            className="text-white transition duration-200 hover:text-gray-400"
          >
            <Github size={24} />
          </a>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
