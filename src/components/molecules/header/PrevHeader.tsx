import Padding from 'components/containers/Padding';
import { Icon } from 'components/atom/images';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

interface PrevHeaderProps {
  onClick?: () => void;
  title?: string;
  customTitle?: React.ReactElement;
  border?: boolean;
  button?: Array<React.ReactElement>;
}

const HeaderContainer = styled.div<{ border: boolean; custom: boolean }>`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: ${(props) => (props.custom ? 'left' : 'center')};
  ${({ border }) => border && `border-bottom:1px solid #eeeeee;`}
`;
const PrevHeaderButton = styled.button`
  position: absolute;
  left: 0;
  margin-left: 15px;
`;
const IconFilter = styled.div`
  ${(props) => (props.theme.dark ? 'filter: brightness(200%)' : 'filter: brightness(100%)')}
`;
const Title = styled.h3`
  font-size: 18px;
  font-weight: 500;
  line-height: 24px;
`;
const ButtonContainer = styled.div`
  position: absolute;
  display: flex;
  flex-direction: row;
  right: 0;
  margin-right: 15px;
`;
const CustomTitle = styled.div`
  margin-left: 35px;
`;
export function PrevHeader({ onClick, title, customTitle, border = true, button }: PrevHeaderProps) {
  const navigate = useNavigate();

  return (
    <HeaderContainer border={border} custom={customTitle !== undefined}>
      <PrevHeaderButton
        onClick={() => {
          if (onClick) {
            onClick();
          } else {
            navigate(-1);
          }
        }}
      >
        <IconFilter>
          <Icon size={22} src={'/images/ic-prev.png'} />
        </IconFilter>
      </PrevHeaderButton>
      <Padding>
        {title ? (
          <Title>{title}</Title>
        ) : customTitle ? (
          <CustomTitle>{customTitle}</CustomTitle>
        ) : (
          <div className="p-3" />
        )}
      </Padding>
      <ButtonContainer>{button}</ButtonContainer>
    </HeaderContainer>
  );
}
