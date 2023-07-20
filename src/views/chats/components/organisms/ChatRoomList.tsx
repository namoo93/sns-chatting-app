import { useState, useEffect } from 'react';
import styled from 'styled-components';
import { ChatRoomItem } from '../molecules';
import Room from '../../../../types/chats/rooms/Room';

const Wrapper = styled.div<{ blockScroll: boolean; hasPadding?: boolean }>`
  height: 100%;

  padding-bottom: ${({ hasPadding }) => (hasPadding ? 145 : 80)}px;
  overflow: ${({ blockScroll }) => (blockScroll ? 'hidden' : 'scroll')};
  &::-webkit-scrollbar {
    display: none;
  }
`;

type Props = {
  data: Room[];
  hasPadding?: boolean;
  isMain?: boolean;
  userId?: number;
};
const ChatRoomList = ({ data, hasPadding, isMain = true }: Props) => {
  const [activeDropdownIndex, setActiveDropdownIndex] = useState<null | number>(null);
  useEffect(() => {
    window.addEventListener('click', () => {
      setActiveDropdownIndex(null);
    });
  }, [activeDropdownIndex]);

  return (
    <Wrapper blockScroll={!!activeDropdownIndex} hasPadding={hasPadding}>
      {data.map((el, i) => {
        console.log({ el });
        return <ChatRoomItem key={i} room={el} _id={el._id} />;
      })}
    </Wrapper>
  );
};

export default ChatRoomList;
