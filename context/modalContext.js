import { useContext, useState, createContext } from "react";

const ModalContext = createContext(null);

export const ModalContextprovider = ({ children }) => {
  const [isModelOpen, setisModelOpen] = useState(false);

  const openModal = () => {
    setisModelOpen(true);
  };
  const closeModal = () => {
    setisModelOpen(false);
  };
  return (
    <ModalContext.Provider value={{ isModelOpen, openModal, closeModal }}>
      {children}
    </ModalContext.Provider>
  );
};

export const useModal = () => {
  return useContext(ModalContext);
};
