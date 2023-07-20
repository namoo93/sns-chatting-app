import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import InfiniteScroll from 'react-infinite-scroll-component';
import { actions as messagesActions } from 'modules/chats/rooms/messages/redux';
import styled from 'styled-components';
import MessageItem from '../molecules/MessageItem';
import { MessageEntity } from 'modules/chats/rooms/messages/types';

type Props = {
  data: any;
  userId: number;
  searchValue: string;
  scrollMessageId?: string;
  disabled: boolean;
  innerRef: any;
  room_id: string;
};

const Wrapper = styled.div`
  background: #f8f8f8;
  width: 100%;
  height: 100%;
  overflow-y: auto;
  padding: 10px 20px;
  display: flex;
  flex-direction: column-reverse;
  .infinite-scroll-component {
    &::-webkit-scrollbar {
      display: none;
    }
  }
`;

export default function MessageList({
  data,
  userId,
  searchValue,
  scrollMessageId,
  innerRef,
  disabled,
  room_id,
}: Props) {
  const dispatch = useDispatch();
  const [activeDropdownIndex, setActiveDropdownIndex] = useState<null | number>(null);
  const [items, setItems] = useState<MessageEntity[]>([]);
  const [page, setPage] = useState(1);
  //@ts-ignore
  const messages = useSelector((state) => state.messages);

  useEffect(() => {
    dispatch(
      messagesActions.messages({
        room_id,
        page,
        limit: 30,
      }),
    );
  }, [dispatch, page, room_id]);

  useEffect(() => {
    if (!messages.loading) {
      setItems(messages.data.docs);
    }
  }, [messages.data, messages.loading]);

  useEffect(() => {
    window.addEventListener('click', () => {
      setActiveDropdownIndex(null);
    });
  }, [activeDropdownIndex]);

  return (
    <Wrapper ref={innerRef} id="scrollableDiv">
      <InfiniteScroll
        dataLength={items.length}
        next={() => setPage((prev) => prev + 1)}
        style={{ display: 'flex', flexDirection: 'column-reverse' }} //To put endMessage and loader to the top.
        inverse={true}
        hasMore={!disabled && !!messages.data?.nextPage}
        loader={<></>}
        scrollableTarget="scrollableDiv"
      >
        {/* <Column>
          <RoomTimeStamp>Today</RoomTimeStamp>
        </Column> */}
        {items.length ? (
          items.map((message, i) => {
            return (
              //@ts-ignore
              <MessageItem
                key={i}
                {...message}
                userId={userId}
                index={i}
                activeDropdown={activeDropdownIndex === i}
                setActiveDropdownIndex={setActiveDropdownIndex}
                isEnd={data.length - 1 === i}
                searchValue={searchValue}
                scrollMessageId={scrollMessageId}
              />
            );
          })
        ) : (
          <></>
        )}
        {/* <NotificationColumn>
        <Notification>Eileen Gu entered this chatroom</Notification>
      </NotificationColumn> */}
      </InfiniteScroll>
    </Wrapper>
  );
}
