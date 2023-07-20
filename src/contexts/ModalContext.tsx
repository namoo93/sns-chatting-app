import React from 'react';
import {useModal} from 'hooks';
import {Modal} from 'components/molecules/modal';

let ModalContext;
let {Provider} = (ModalContext = React.createContext({}));

let ModalContextProvider = ({children}) => {
  const {modal, openModal, closeModal, modalContent} = useModal();

  return (
    <Provider value={{modal, openModal, closeModal, modalContent}}>
      {modal && <Modal>{modalContent}</Modal>}
      {children}
    </Provider>
  );
};

export {ModalContext, ModalContextProvider};
