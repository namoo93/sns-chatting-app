import { useEffect, useRef, useState } from 'react';
import NavbarLayout from 'components/layouts/NavbarLayout';
import { Dropdown, MainHeader } from 'components/molecules';
import { Icon, IconButton, Tooltip } from 'components/atom';
import { ChatRoomList, NoChatRoom } from './components/organisms';
import { ArchivedChatNav } from './components/molecules';
import { FIXED_SIZE_WINDOW_OPTIONS } from 'constants/CONST';
import ChatRoomListSocketUtil from '../../utils/ChatRoomListSocketUtil';
import Room from '../../types/chats/rooms/Room';
import { useAtom } from 'jotai';
import roomsAtom from '../../stores/roomsAtom';
import { useTranslation } from 'react-i18next';

const ChatsMain = () => {
  const { t } = useTranslation();
  const [tooltipVisible, setTooltipVisible] = useState(false);
  const chatSocketUtilRef = useRef<ChatRoomListSocketUtil>();
  const [onRoomsData, setOnRoomsData] = useAtom(roomsAtom);
  const archivedRoomList: Room[] = onRoomsData?.archivedRooms ?? [];
  const unArchivedRoomList: Room[] = onRoomsData?.unArchivedRooms ?? [];
  const [ready, setReady] = useState<boolean>(false);

  const menuList = [
    {
      label: `${t('chats.New chat')}`,
      onClick: () => {
        window.open('/chats/add-friends/create', 'Add Friends', FIXED_SIZE_WINDOW_OPTIONS);
      },
    },
    {
      label: `${t('chats.New voice chat')}`,
      onClick: () => {
        window.open('/chats/add-friends/create', 'Add Friends', FIXED_SIZE_WINDOW_OPTIONS);
      },
    },
    {
      label: `${t('chats.New video chat')}`,
      onClick: () => {
        window.open('/chats/add-friends/create', 'Add Friends', FIXED_SIZE_WINDOW_OPTIONS);
      },
    },
  ];

  const onStart = async () => {
    chatSocketUtilRef.current = new ChatRoomListSocketUtil('채팅목록');
    await chatSocketUtilRef.current.connect();

    const util = chatSocketUtilRef.current;
    const socket = util.socket!;

    util.onJoinRoomList((res) => {
      util.emitRooms();
    });
    util.onRooms((res) => {
      setReady(true);
      setOnRoomsData(res);
    });
    util.onChatRoomList(({ message, room }) => {
      util.emitRooms();
    });

    util.emitJoinRoomList();
  };

  const onEnd = () => {
    const util = chatSocketUtilRef.current;
    if (util) {
      util.onExitRoomList((res) => {
        util.close();
      });
      util.emitExitRoomList();
    }
  };

  useEffect(() => {
    onStart();
    return onEnd;
  }, []);

  return (
    <NavbarLayout>
      <MainHeader
        title={`${t('chats.Chats')}`}
        button={[
          <IconButton key={0} width={22} iconName={'ic_filter'} backgroundColor={'#fff'} iconOnly />,
          <IconButton key={1} width={22} iconName={'ic_search'} backgroundColor={'#fff'} marginLeft={20} iconOnly />,
          <>
            <Dropdown
              key={2}
              menuList={menuList}
              width={150}
              x={57}
              y={8}
              renderButton={() => (
                <div
                  onClick={() => {
                    tooltipVisible && setTooltipVisible(false);
                  }}
                >
                  <Icon size={20} src={'/images/icon/ic_add.png'} marginLeft={20} />
                </div>
              )}
            />

            <Tooltip
              x={42}
              y={44}
              width={154}
              visible={tooltipVisible}
              hDirection="right"
              text={`${t('chats.Create new chat room')}`}
            />
          </>,
          <IconButton key={3} width={22} iconName={'ic_set'} backgroundColor={'#fff'} marginLeft={20} iconOnly />,
        ]}
      />
      {archivedRoomList?.length ? <ArchivedChatNav data={archivedRoomList} /> : <></>}
      {unArchivedRoomList.length ? (
        <ChatRoomList data={unArchivedRoomList} hasPadding={!!archivedRoomList.length} />
      ) : (
        <NoChatRoom />
      )}
    </NavbarLayout>
  );
  return <></>;
};

export default ChatsMain;
