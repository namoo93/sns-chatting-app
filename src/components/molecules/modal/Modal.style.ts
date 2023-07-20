import styled, { css } from 'styled-components';

export const ModalWrapper = styled.div`
  position: fixed;
  top: 0;
  width: 100vw;
  height: 100vh;
  z-index: 1001;
`;

export const DimWrapper = styled.div`
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
`;

export const StyledModal = styled.div<{ hasPadding?: boolean }>`
  position: absolute;
  top: 50%;
  left: 50%;
  background: #fff;
  text-align: center;
  box-shadow: 5px 8px 30px 0 rgba(23, 40, 73, 0.2);
  transform: translate(-50%, -50%);
  z-index: 999;
  ${({ hasPadding = true }) => {
    return (
      hasPadding &&
      css`
        padding: 35px 15px;
      `
    );
  }}
`;

export const StyledCloseButton = styled.button`
  position: absolute;
  top: 20px;
  right: 20px;
  font-size: 28px;
`;
