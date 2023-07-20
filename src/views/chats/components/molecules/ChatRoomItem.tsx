import React, { useEffect, useState, useRef, useContext } from 'react';
import styled from 'styled-components';

import { useMutation, useQueryClient } from 'react-query';
import { ModalContext } from 'contexts';
import { Avatar } from 'components/atom';
import { CustomDropdown, CustomDropdownStyleProps, Dialog } from 'components/molecules';

import { COLOR } from 'constants/COLOR';
import { getEllipsis } from 'lib/getStyle';
import { FIXED_SIZE_WINDOW_OPTIONS } from 'constants/CONST';
import { JoinedUser } from 'modules/chats/rooms/types';
import moment from 'moment';
import { postExitRoom } from 'modules/chats/rooms/api';
import { postArchive, postUnArchive } from 'modules/chats/rooms/archives/api';
import { useAtomValue } from 'jotai';
import userAtom from '../../../../stores/userAtom';
import Room from '../../../../types/chats/rooms/Room';
import { useTranslation } from 'react-i18next';

const Wrapper = styled.div`
  position: relative;
  padding: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100px;
  width: 100%;
  cursor: pointer;
`;

const LeftWrapper = styled.div`
  width: 46px;
  height: 46px;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
  align-items: center;
  gap: 2px;
  margin-right: 10px;
`;

const CenterWrapper = styled.div`
  flex: 1;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-content: center;
  align-items: start;
  justify-content: center;
`;

const CenterHead = styled.div`
  display: flex;
  justify-content: start;
  font-size: 13px;
  font-weight: 500;
  line-height: 18px;
  margin-bottom: 5px;
`;

const HeadTitle = styled.p`
  color: ${COLOR.BLACK};
  word-break: break-all;
  ${getEllipsis(1, 18)}
`;

const HeadCount = styled.span`
  color: ${COLOR.PRIMARY};

  margin-left: 5px;
`;

const Message = styled.p`
  color: ${COLOR.TEXT_GRAY};
  height: 13px;
  font-size: 13px;
  ${getEllipsis(2, 18)}
`;

const RightWrapper = styled.div`
  width: 68px;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  justify-content: start;
`;

const MessageCount = styled.span`
  color: #fff;

  font-size: 11px;
  line-height: 16px;
  background: ${COLOR.BLUEGREEN};
  padding: 0 5px;
  border-radius: 8px;
  margin-top: 6px;
`;

const Timestamp = styled.p`
  color: #cecece;

  font-size: 12px;
  line-height: 18px;
`;

interface ChatRoomItemProps {
  _id: string;
  room: Room;
}

const ChatRoomItem: ({ _id: room_id, room }: ChatRoomItemProps) => JSX.Element = ({
  _id: room_id,
  room,
}: ChatRoomItemProps) => {
  const { t } = useTranslation();
  const { openModal, closeModal } = useContext(ModalContext);
  const ref = useRef<HTMLDivElement>(null);
  const [dropdownOptions, setDropdownOptions] = useState<CustomDropdownStyleProps>({
    open: false,
    width: 170,
  });
  const me = useAtomValue(userAtom);
  const queryClient = useQueryClient();

  const exitRoomMutation = useMutation(postExitRoom, {
    onSuccess: () => {
      queryClient.invalidateQueries(['getRooms']);
      queryClient.invalidateQueries(['getArchives']);
      closeModal();
    },
  });
  const archiveMutation = useMutation(postArchive, {
    onSuccess: () => {
      queryClient.invalidateQueries(['getArchives']);
      closeModal();
    },
  });
  const unArchiveMutation = useMutation(postUnArchive, {
    onSuccess: () => {
      queryClient.invalidateQueries(['getArchives']);
      closeModal();
    },
  });

  // useEffect(() => {
  //   setDropdownOptions({ ...dropdownOptions, open: activeDropdown });
  // }, [activeDropdown, dropdownOptions]);

  // useEffect(() => {
  //   ref.current &&
  //     ref.current.addEventListener('contextmenu', (e) => {
  //       const { offsetWidth, offsetHeight } = document.body;
  //       const x = e.clientX + 170 > offsetWidth ? e.clientX - 170 : e.clientX;
  //       const y = e.clientY + (isMain ? 190 : 76) > offsetHeight ? e.clientY - (isMain ? 190 : 76) : e.clientY;
  //       setDropdownOptions({
  //         ...dropdownOptions,
  //         x,
  //         y,
  //       });
  //
  //       setActiveDropdownIndex(index);
  //     });
  // }, [dropdownOptions, index, isMain, setActiveDropdownIndex]);

  const mainMenuList = [
    {
      label: `${t('chats.Mark as Read')}`,
      onClick: () => {},
    },
    {
      label: `${t('chats.Mute notifications')}`,
      onClick: () => {},
    },
    {
      label: `${t('chats.Pin to top')}`,
      onClick: () => {},
    },
    {
      label: `${t('chats.Archive this chat room')}`,
      onClick: () => {
        openModal(
          <Dialog
            title={`${t('chats.Are you sure you want to leave the chatroom?')}`}
            text={`${t(
              'chats.If you leave, all the conversation history will be deleted and this chatroom will be removed from the chat list',
            )}`}
            onClick={() => {
              // me?.id &&
              //   archiveMutation.mutate({
              //     room_id,
              //     me?.id,
              //   });
            }}
          />,
        );
      },
    },
    {
      label: `${t('chats.Leave this chatroom')}`,
      onClick: () => {
        openModal(
          <Dialog
            title={`${t('chats.Are you sure you want to leave the chatroom?')}`}
            text={`${t(
              'chats.If you leave, all the conversation history will be deleted and this chatroom will be removed from the chat list',
            )}`}
            onClick={() => {
              // user_id &&
              //   exitRoomMutation.mutate({
              //     room_id,
              //     user_id,
              //   });
            }}
          />,
        );
      },
    },
  ];

  const archivedMenuList = [
    {
      label: `${t('chats.Unarchive')}`,
      onClick: () => {
        openModal(
          <Dialog
            title={`${t('chats.Are you sure you want to leave the chatroom?')}`}
            text={`${t(
              'chats.If you leave, all the conversation history will be deleted and this chatroom will be removed from the chat list',
            )}`}
            onClick={() => {
              // user_id &&
              //   unArchiveMutation.mutate({
              //     room_id,
              //     user_id,
              //   });
            }}
          />,
        );
      },
    },
    {
      label: `${t('chats.Leave this chatroom')}`,
      onClick: () => {
        openModal(
          <Dialog
            title={`${t('chats.Are you sure you want to leave the chatroom?')}`}
            text={`${t(
              'chats.If you leave, all the conversation history will be deleted and this chatroom will be removed from the chat list',
            )}`}
            onClick={() => {
              // user_id &&
              //   exitRoomMutation.mutate({
              //     room_id,
              //     user_id,
              //   });
            }}
          />,
        );
      },
    },
  ];

  const handleClick = () => {
    window.open(`/chats/${room_id}`, 'Chats Room', FIXED_SIZE_WINDOW_OPTIONS);
  };

  const renderTime = () => {
    const time = moment(room.updatedAt);
    if (time.isSame(moment(), 'date')) {
      return time.format('hh:mm A');
    } else if (time.isSame(moment(), 'year')) {
      return time.format('MM.DD');
    } else {
      return time.format('YYYY.MM.DD');
    }
  };

  const otherUsers = room.joined_users.filter((user) => user.id !== me?.id);

  return (
    <>
      <CustomDropdown menuList={1 == 1 ? mainMenuList : archivedMenuList} {...dropdownOptions} />
      <Wrapper onClick={handleClick} ref={ref}>
        <LeftWrapper>
          {room.joined_users.map((user, i) => {
            if (i > 3 || (me?.id === user.id && room.joined_users.length === 2)) {
              return <></>;
            }
            return (
              <Avatar
                key={i}
                size={room.joined_users.length > 2 ? 22 : 46}
                src={user.profile_image ? user.profile_image : ''}
              />
            );
          })}
        </LeftWrapper>
        <CenterWrapper>
          <CenterHead>
            <HeadTitle>
              {otherUsers.length > 1 ? room.name : `${otherUsers[0]?.first_name} ${otherUsers[0]?.last_name}`}
            </HeadTitle>
            {room.joined_users.length > 2 && <HeadCount>{room.joined_users.length}</HeadCount>}
          </CenterHead>
          <Message>{room.preview_message?.content}</Message>
        </CenterWrapper>
        <RightWrapper>
          <Timestamp>{renderTime()}</Timestamp>
          {room.unread_count ? <MessageCount>{room.unread_count}</MessageCount> : <></>}
        </RightWrapper>
      </Wrapper>
    </>
  );
};

export default ChatRoomItem;
