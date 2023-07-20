import React from 'react';
import styled from 'styled-components';
import { Row } from 'components/layouts';
import { COLOR } from 'constants/COLOR';
import { ReactComponent as Arrow } from 'assets/chats/ic_next.svg';

type Props = {
  title?: string;
  icon: React.ReactNode;
  path: string;
  onClick?: () => void;
};

const Wrapper = styled(Row)`
  width: 100%;
  padding: 20px 18px;
  border-bottom: 1px solid #ededed;
  cursor: pointer;
  &:last-child {
    border: none;
  }
`;

const Icon = styled.span``;
const Title = styled.p`
  color: ${COLOR.BLACK};
  font-size: 14px;

  margin-left: 18px;
`;

const ArrowIcon = styled(Arrow)`
  position: absolute;
  right: 18px;
`;

export default function RoomDetailNavItem({
  title,
  icon,
  path,
  onClick,
}: Props) {
  return (
    <Wrapper onClick={onClick}>
      <Icon>{icon}</Icon>
      <Title>{title}</Title>
      <ArrowIcon />
    </Wrapper>
  );
}
