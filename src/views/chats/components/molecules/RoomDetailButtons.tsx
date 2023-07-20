import { useContext } from 'react';
import { ModalContext } from 'contexts';
import { useMutation } from 'react-query';
import { useParams, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { Row } from 'components/layouts';
import { Dropdown, Dialog } from 'components/molecules';
import { ReactComponent as BtnCall } from 'assets/chats/btn_call.svg';
import { ReactComponent as BtnVideo } from 'assets/chats/btn_video.svg';
import { ReactComponent as BtnAlarm } from 'assets/chats/btn_alarm.svg';
import { ReactComponent as BtnMore } from 'assets/chats/btn_more.svg';
import { IconTypeButton } from 'components/atom';
import { postExitRoom } from 'modules/chats/rooms/api';
import { postArchive } from 'modules/chats/rooms/archives/api';
import { useTranslation } from 'react-i18next';

type Props = {
  userId?: number;
};

const Wrapper = styled(Row)`
  width: 100%;
  gap: 10px;
  padding: 30px 0 22px;
`;

export default function RoomDetailButtons({ userId: user_id }: Props) {
  const { t } = useTranslation();
  const { openModal, closeModal } = useContext(ModalContext);
  const { room_id } = useParams();
  const navigate = useNavigate();
  const exitRoomMutation = useMutation(postExitRoom, {
    onSuccess: () => {
      closeModal();
      navigate('/chats');
    },
  });
  const archiveMutation = useMutation(postArchive, {
    onSuccess: () => {
      navigate('/chats');
    },
  });

  const menuList = [
    {
      label: `${t('chats.Clear chat')}`,
      onClick: () => {},
    },
    {
      label: `${t('chats.Archive this chatroom')}`,
      onClick: () => {
        room_id &&
          user_id &&
          archiveMutation.mutate({
            room_id,
            user_id,
          });
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
              room_id &&
                user_id &&
                exitRoomMutation.mutate({
                  room_id,
                  user_id,
                });
            }}
          />,
        );
      },
    },
    {
      label: `${t('button-common.Cancel')}`,
      onClick: () => {},
    },
  ];
  return (
    <Wrapper justify={'center'}>
      <IconTypeButton size={56}>
        <BtnCall />
      </IconTypeButton>
      <IconTypeButton size={56}>
        <BtnVideo />
      </IconTypeButton>
      <IconTypeButton size={56}>
        <BtnAlarm />
      </IconTypeButton>
      <Dropdown
        menuList={menuList}
        width={176}
        x={-116}
        y={8}
        renderButton={() => (
          <IconTypeButton size={56}>
            <BtnMore />
          </IconTypeButton>
        )}
      />
    </Wrapper>
  );
}
