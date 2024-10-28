import React, { useState } from "react";
import { Github, Menu, XCircle } from "lucide-react"; // Importing GitHub and Menu icons from Lucide

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <nav className="fixed top-0 left-0 w-full p-6 z-50 font-sans">
      <div className="container mx-auto flex items-center justify-between">
        {/* Logo */}
        <h1 className="text-gray-200 text-2xl md:text-3xl font-bold">
          CU-Meet.
        </h1>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center space-x-8">
          <button className="text-gray-200 font-semibold transition duration-200 hover:underline px-3 py-2 rounded">
            Join Room
          </button>
          <button className="text-gray-200 font-semibold transition duration-200 hover:underline px-3 py-2 rounded">
            Create Room
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
        <div className="md:hidden mt-4 flex flex-col items-center space-y-4 bg-gray-800 p-4 rounded-lg">
          <button className="text-white font-semibold transition duration-200 hover:underline w-full py-2 rounded">
            Join Room
          </button>
          <button className="text-white font-semibold transition duration-200 hover:underline w-full py-2 rounded">
            Create Room
          </button>
          <a
            href="https://github.com/your-repo-url"
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
