import React from 'react';
import styled from 'styled-components';
import { Modal } from 'components/molecules';
import { Heading4, Icon, IconTypeButton } from 'components/atom';
import { COLOR } from 'constants/COLOR';

type OptionType = {
  imgSrc: string;
  size: number;
  name: string;
};
type Props = {
  width: string;
  topMenuIcon: boolean;
  title?: string;
  rightTitle?: string;
  URLString?: string;
  options: OptionType[];
  onClickOption: (value: string) => void;
  closeModal: () => void;
};

type ComponentProps = {
  width?: string;
};

const Component = styled.div<ComponentProps>`
  ${({ width }) => width && `width: ${width};`}
`;
const RightTitle = styled.p`
  font-size: 15px;
  font-weight: 500;
  color: ${COLOR.BLACK};
  padding: 12px 19px;
  text-align: left;
`;
const CloseButton = styled(IconTypeButton)`
  width: fit-content;
  position: absolute;
  right: 16px;
  top: 10px;
`;

const ModalHeader = styled.div`
  border-bottom: 1px solid #eee;

  img {
    display: inline-block;
    margin-top: 30px;
    margin-bottom: 10px;
  }
`;
const ModalBody = styled.div`
  padding: 0 18px;
  padding-top: 25px;
  display: flex;
  flex-wrap: wrap;
  align-items: flex-start;
  justify-content: space-between;
`;
const Option = styled.button`
  width: 64px;
  text-align: center;
  margin-bottom: 30px;

  img {
    display: inline-block;
  }
  span {
    display: inline-block;
    font-size: 13px;
    color: ${COLOR.BLACK};
    word-break: keep-all;
    line-height: 1;
    padding-top: 5px;
  }
`;

const URLCopy = styled.button`
  display: block;
  padding: 10px;
  min-width: 100px;
  min-height: 40px;
  border-radius: 40px;
  background-color: #eee;
  margin: 0 auto;
  margin-bottom: 20px;
`;

export const IconModal = ({
  topMenuIcon,
  title,
  URLString,
  options,
  onClickOption,
  closeModal,
  width,
  rightTitle,
}: Props) => {
  return (
    <Modal hasPadding={false}>
      <Component width={width}>
        <CloseButton onClick={closeModal}>
          <Icon key={0} size={16} src={'/images/icon/ic-close-16.svg'} />
        </CloseButton>

        <ModalHeader>
          {topMenuIcon && <Icon src={'/images/modal_menu.png'} size={57} />}
          {title && <Heading4>{title}</Heading4>}
          {rightTitle && <RightTitle>{rightTitle}</RightTitle>}
          {URLString && <URLCopy>{URLString}</URLCopy>}
        </ModalHeader>

        <ModalBody>
          {options.map((option, key) => {
            return (
              <Option
                key={key}
                onClick={() => {
                  onClickOption(option.name);
                }}
              >
                <Icon src={option.imgSrc} size={option.size} />
                <span>{option.name}</span>
              </Option>
            );
          })}
        </ModalBody>
      </Component>
    </Modal>
  );
};
