import React from 'react';
import { ModalContext } from 'contexts';
import ModalPortal from './ModalPortal';
import { ModalWrapper, DimWrapper, StyledModal } from './Modal.style';

export interface ModalProps {
  visible?: boolean;
  hasPadding?: boolean;
}

export const Modal: React.FC<ModalProps> = ({ children, hasPadding }) => {
  let { closeModal } = React.useContext(ModalContext);
  return (
    <>
      <ModalPortal>
        <ModalWrapper>
          <DimWrapper onClick={() => closeModal()} />
          <StyledModal hasPadding={hasPadding}>{children}</StyledModal>
        </ModalWrapper>
      </ModalPortal>
    </>
  );
};
