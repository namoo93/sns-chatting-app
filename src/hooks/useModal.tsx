import { useState } from 'react';

export const useModal = () => {
  let [modal, setModal] = useState(false);
  let [modalContent, setModalContent] = useState<any>(null);

  let closeModal = () => {
    setModal(false);
    setModalContent(null);
  };

  let openModal = (content) => {
    setModal(true);
    if (content) {
      setModalContent(content);
    }
  };

  return { modal, openModal, closeModal, modalContent };
};
