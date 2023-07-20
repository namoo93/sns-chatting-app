import { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import { useQuery } from 'react-query';
import { useDispatch, useSelector } from 'react-redux';
import { actions as messagesActions } from 'modules/chats/rooms/messages/redux';
import { useParams } from 'react-router-dom';
import { getRoom } from 'modules/chats/rooms/api';
import { getUser } from 'modules/user/api';
import { Column } from 'components/layouts';
import { ChatsRoomHeader, MessageContents, SearchMessage } from './components/molecules';
import { ChatsStickers, MessageList } from './components/organisms';
import { IconTypeButton } from 'components/atom';
import { ReactComponent as Close } from 'assets/common/ic_close.svg';
import ChatRoomSocketUtil from '../../utils/ChatRoomSocketUtil';
import Message, { KokKokIMessage, KokKokIMessageDocs, MessageDocs } from '../../types/chats/rooms/messages/Message';

const Wrapper = styled(Column)`
  width: 100%;
  height: 100%;
`;

const StickerWrapper = styled.div<{ stickersVisible: boolean }>`
  position: fixed;
  bottom: ${({ stickersVisible }) => (stickersVisible ? 318 : 58)}px;
  width: 100vw;
  height: 120px;
  background: rgba(255, 255, 255, 0.5);
  z-index: 99;
  button {
    position: absolute;
    left: 24px;
    top: 10px;
  }
  img {
    height: 100px;
    margin-right: 24px;
    float: right;
  }
`;

export default function ChatsRoom() {
  const params = useParams();
  const room_id: string = params.room_id || '';
  const dispatch = useDispatch();
  const [stickersVisible, setStickersVisible] = useState(false);
  const [stickerUrl, setStickerUrl] = useState('');
  const [searchVisible, setSearchVisible] = useState(false);
  const [searchValue, setSearchValue] = useState('');
  const [messageList] = useState<any[]>([]);
  const [searchedMessageList, setSearchedMessageList] = useState<any[]>([]);
  const [scrollMessageId, setScrollMessageId] = useState('');
  const [, setPage] = useState(1);
  const [disabled] = useState(false);
  // 새 소켓 연결 하면서 추가
  const chatSocketUtilRef = useRef<ChatRoomSocketUtil>();
  const [kokkokIMessageDocs, setKokkokIMessageDocs] = useState<KokKokIMessageDocs>(); //kokkokIMessageDocs:onMessages 이벤트에 의해서 변경되는 주체.

  const innerRef = useRef<HTMLDivElement>(null);

  const { data: userData } = useQuery('getUser', getUser);

  const { data: roomData } = useQuery('getRoom', () => getRoom({ user_id: userData?.id || 0, room_id: room_id || '' }));
  //@ts-ignore
  const messages = useSelector((state) => state.messages);

  function messageToIMessage(message: Message): KokKokIMessage {
    return {
      _id: Math.round(Math.random() * 1000000),
      text: message.content,
      createdAt: new Date(message.createdAt),
      unread_count: message.unread_count,
      type: message.type,
      original_message_by_server: message,
      system: message.type === 'system',
      user: {
        _id: message.sender_id,
        name: `${message.user.first_name}${message.user.last_name !== null && ` ${message.user.last_name}`}`,
        avatar: message.user.profile_image,
      },
    };
  }

  const onStart = async () => {
    if (!chatSocketUtilRef.current) {
      chatSocketUtilRef.current = new ChatRoomSocketUtil('채팅방');
      await chatSocketUtilRef.current.connect();
    }
    await chatSocketUtilRef.current.connect();

    const util = chatSocketUtilRef.current;
    const socket = util.socket!;

    util.onJoinRoom((room) => {
      //동현TODO: 추후 테스트 이후에 page, list 적용 필요.
      return util.emitMessages(room_id || '');
    });
    util.onMessages((messageDocs: MessageDocs) => {
      // LogUtil.info('1개의채팅방 onMessages res ', messageDocs);
      ChatRoomSocketUtil.room = messageDocs.room;
      console.log({ messageDocs });

      setKokkokIMessageDocs({
        kokKokIMessages: (messageDocs?.docs ?? [])
          .sort((a, b) => (a.createdAt > b.createdAt ? -1 : 1))
          .map(messageToIMessage),
        messageDocs: messageDocs,
      });
    });
    util.onChatRoom((message: Message) => {
      util.emitMessages(room_id);
    });

    util.emitJoinRoom(room_id);
  };

  const onEnd = () => {
    const util = chatSocketUtilRef.current;
    if (util) {
      util.onExitRoom((res) => {
        util.close();
      });
      util.emitExitRoom(room_id);
    }
  };

  useEffect(() => {
    if (room_id) {
      if (searchValue) {
        dispatch(
          messagesActions.allMessages({
            room_id,
            type: 'all',
          }),
        );
        dispatch(
          messagesActions.searchedMessages({
            room_id,
            search_word: searchValue,
          }),
        );
      }
    }
  }, [dispatch, room_id, searchValue]);

  useEffect(() => {
    if (messages.data?.searchedDocs) {
      setSearchedMessageList(messages.data?.searchedDocs);
    }
  }, [messages.data]);

  // let socket;
  // useEffect(() => {
  //   //@ts-ignore
  //   socket = io.connect(`http://54.169.154.127:2004/${room_id}`, {
  //     transports: ['websocket'],
  //   });
  //   socket.on('connect_failed', function () {
  //     console.log('Connection Failed');
  //   });
  //   socket.on('connect', function () {
  //     console.log('Connected');
  //   });
  //   socket.on('disconnect', function () {
  //     console.log('Disconnected');
  //   });
  // }, []);
  useEffect(() => {
    if (!stickersVisible) {
      setStickerUrl('');
    }
  }, [stickersVisible]);

  useEffect(() => {
    if (!searchVisible) {
      setSearchValue('');
      setScrollMessageId('');
    }
  }, [searchVisible]);

  const handleStickersVisible = () => {
    setStickersVisible(!stickersVisible);
  };
  const handleSearchVisible = () => {
    setSearchVisible(!searchVisible);
  };

  useEffect(() => {
    onStart();
    return onEnd;
  }, []);

  if (roomData && userData?.id && room_id) {
    return (
      <Wrapper>
        <ChatsRoomHeader data={roomData} userId={userData?.id} handleSearchVisible={handleSearchVisible} />
        {searchVisible && (
          <SearchMessage
            handleSearchVisible={handleSearchVisible}
            setSearchValue={setSearchValue}
            searchedMessageList={searchedMessageList}
            setScrollMessageId={setScrollMessageId}
          />
        )}
        {/* <FeatureHeader /> */}
        <MessageList
          data={messageList}
          userId={userData?.id}
          room_id={room_id}
          searchValue={searchValue}
          scrollMessageId={scrollMessageId}
          disabled={disabled}
          innerRef={innerRef}
        />
        {stickerUrl && (
          <StickerWrapper stickersVisible={stickersVisible}>
            <IconTypeButton
              onClick={() => {
                setStickerUrl('');
              }}
            >
              <Close />
            </IconTypeButton>
            <img src={stickerUrl} alt="emoji" />
          </StickerWrapper>
        )}
        <MessageContents handleStickersVisible={handleStickersVisible} setPage={setPage} stickerUrl={stickerUrl} />
        {stickersVisible && <ChatsStickers setStickerUrl={setStickerUrl} />}
      </Wrapper>
    );
  } else {
    return <></>;
  }
}
