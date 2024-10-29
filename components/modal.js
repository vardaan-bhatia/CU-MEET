import { useModal } from "@/context/modalContext";
import InputModal from "./example/input-modal";
import { X } from "lucide-react"; // Import X icon
import React from "react";

const Modal = () => {
  const { isModalOpen, closeModal } = useModal();

  if (!isModalOpen) return null; // Early return for better readability

  return (
    <div
      role="dialog"
      aria-modal="true"
      className="fixed inset-0 flex items-center justify-center backdrop-blur-sm bg-opacity-80 z-50 transition-opacity duration-300"
    >
      <div className="relative bg-white dark:bg-black rounded-lg shadow-lg p-6">
        <InputModal onClose={closeModal} />

        <button
          onClick={closeModal}
          aria-label="Close Modal"
          className="absolute top-2 right-2 text-black dark:text-white hover:text-gray-600"
        >
          <X className="hover:bg-white hover:text-black hover:rounded-xl" />
        </button>
      </div>
    </div>
  );
};

export default Modal;
