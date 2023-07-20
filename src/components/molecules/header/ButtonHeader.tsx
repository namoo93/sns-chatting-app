import Padding from 'components/containers/Padding';
import {Icon} from 'components/atom/images';
import React from 'react';
import {useNavigate} from 'react-router-dom';
import styled, {css} from 'styled-components';

interface ButtonProps {
  onClick?: () => void;
  title?: string;
  border?: boolean;
  button?: Array<React.ReactElement>;
  close?: boolean;
  color?: 'black' | 'white';
}

const HeaderContainer = styled.div<{border: boolean}>`
  ${props =>
    props.theme.dark || !props.border
      ? css``
      : css`
          border-bottom-width: 1px;
          border-color: #e3e3e3;
        `}
  position: relative;
  display: flex;
  align-items: center;
  justify-content: 'center';
  padding-top: 32px;
`;
const CloseButton = styled.button`
  position: absolute;
  right: 0;
  margin-right: 15px;
`;
const IconFilter = styled.div`
  ${props =>
    props.theme.dark || props.color === 'white'
      ? 'filter: brightness(800%)'
      : 'filter: brightness(100%)'}
`;
const Title = styled.h3`
  font-size: 18px;
  font-weight: 500;
  line-height: 24px;
  color: ${props => (props.theme.dark ? '#ffffff' : props.theme.colors.BLACK)};
`;
const ButtonContainer = styled.div`
  position: absolute;
  display: flex;
  flex-direction: row;
  left: 0;
  margin-left: 15px;
`;
export function ButtonHeader({
  onClick,
  title,
  border = true,
  button,
  close = false,
  color = 'white',
}: ButtonProps) {
  const navigate = useNavigate();

  return (
    <HeaderContainer border={border}>
      <ButtonContainer>{button}</ButtonContainer>
      <Padding>
        {title ? <Title>{title}</Title> : <div className="p-3" />}
      </Padding>
      {close && (
        <CloseButton
          onClick={() => {
            if (onClick) {
              onClick();
            } else {
              navigate(-1);
            }
          }}>
          <IconFilter color={color}>
            <Icon size={24} src={'/images/ic-close.png'} />
          </IconFilter>
        </CloseButton>
      )}
    </HeaderContainer>
  );
}
