import {COLOR} from 'constants/COLOR';
import React from 'react';
import styled, {css} from 'styled-components';

interface TitleHeaderProps {
  title?: string;
  justify?: 'flex-start' | 'center';
  border?: boolean;
  button?: Array<React.ReactElement>;
  buttonRight?: string;
}

const HeaderContainer = styled.div<{border: boolean; justify: string}>`
  ${props =>
    props.theme.dark || !props.border
      ? css``
      : css`
          border-bottom: 1px solid #e3e3e3;
        `}
  position: relative;
  display: flex;
  align-items: center;
  justify-content: ${props => props.justify};
  padding: 40px 0 14px;
`;
const Title = styled.h3<{justify: string}>`
  color: ${COLOR.BLACK};
  font-size: ${props => (props.justify === 'center' ? '16px' : '18px')};
  margin-left: ${({ justify }) => (justify === 'center' ? '0px' : '15px') };
  font-weight: 500;
  line-height: 24px;
`;
const ButtonContainer = styled.div<{buttonRight: string}>`
  position: absolute;
  display: flex;
  flex-direction: row;
  right: ${({buttonRight}) => buttonRight? buttonRight :'0px'};
`;

export function TitleHeader({
  title,
  justify = 'center',
  border = true,
  button,
  buttonRight = '0px'
}: TitleHeaderProps) {
  return (
    <HeaderContainer border={border} justify={justify} >
      {title ? (
        <Title justify={justify}>{title}</Title>
      ) : (
        <div className="p-3" />
      )}
      <ButtonContainer buttonRight={buttonRight}>{button}</ButtonContainer>
    </HeaderContainer>
  );
}
