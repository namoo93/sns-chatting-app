import React from 'react';
import styled from 'styled-components';

interface MainHeaderProps {
  title?: string;
  button?: Array<React.ReactElement>;
}

const HeaderContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 42px 20px 15px 20px;
`;

const Title = styled.h3`
  font-size: 18px;
  font-weight: bold;
  line-height: 24px;
`;
const ButtonContainer = styled.div`
  position: relative;
  display: flex;
  flex-direction: row;
`;

export function MainHeader({title, button}: MainHeaderProps) {
  return (
    <HeaderContainer>
      <Title>{title}</Title>
      <ButtonContainer>{button}</ButtonContainer>
    </HeaderContainer>
  );
}
