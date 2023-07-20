import React from 'react';
import styled from 'styled-components';
import { Modal } from 'components/molecules';
import { Heading4, IconTypeButton } from 'components/atom';
import { ReactComponent as Close } from 'assets/common/ic_close.svg';
type Props = {
  title: string;
  options: string[];
  onClickOption: (value: string) => void;
  closeModal: () => void;
};

const CloseButton = styled(IconTypeButton)`
  position: absolute;
  right: 14px;
  top: 14px;
`;

const Options = styled.ul`
  width: 330px;
  border-top: 1px solid #ededed;
  text-align: left;
`;

const Option = styled.li`
  line-height: 50px;
  padding: 0 20px;
  font-size: 14px;
  cursor: pointer;
  &:hover {
    background: #fcf2e8;
  }
`;

export function SelectModal({
  title,
  options,
  onClickOption,
  closeModal,
}: Props) {
  return (
    <Modal hasPadding={false}>
      <CloseButton onClick={closeModal}>
        <Close />
      </CloseButton>
      <Heading4
        style={{ textAlign: 'left', lineHeight: '50px', padding: '0 20px' }}>
        {title}
      </Heading4>
      <Options>
        {options.map((option, key) => {
          return (
            <Option
              key={key}
              onClick={() => {
                onClickOption(option);
              }}>
              {option}
            </Option>
          );
        })}
      </Options>
    </Modal>
  );
}
