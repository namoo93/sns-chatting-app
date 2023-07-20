import { useEffect, useState } from 'react';
import styled from 'styled-components';
import { useNavigate, useParams } from 'react-router-dom';
import { useMutation, useQuery } from 'react-query';
import { postBlockContact } from 'modules/block/api';
import { getRoom, postExitRoom, postReportRoom } from 'modules/chats/rooms/api';
import { getUser } from 'modules/user/api';
import { Row } from 'components/layouts';
import { ReactComponent as Kok } from 'assets/chats/ic_kok.svg';
import { ReactComponent as Loader } from 'assets/chats/ic_loading.svg';
import { IconTypeButton } from 'components/atom';
import { RoomDetailButtons, RoomDetailUserInfo } from './components/molecules';
import { RoomDetailMemberList, RoomDetailNavList } from './components/organisms';
import { COLOR } from 'constants/COLOR';
import { toast } from 'react-toastify';
import { useTranslation } from 'react-i18next';

const Wrapper = styled.div<{ hasPaddingTop: boolean }>`
  position: relative;
  width: 100%;
  height: 100%;
  overflow-y: auto;
  padding-top: ${({ hasPaddingTop }) => (hasPaddingTop ? 30 : 0)}px;
  &::-webkit-scrollbar {
    display: none;
  }
`;

const TimelineButton = styled(IconTypeButton)`
  position: absolute;
  top: 24px;
  left: 24px;
`;

const ReportLoading = styled(Row)`
  color: ${COLOR.BLACK};

  width: 330px;
  height: 40px;
  position: fixed;
  font-size: 13px;
  top: 30px;
  left: calc(50% - 165px);
  background: #fff;
  box-shadow: 0 5px 15px 0 rgba(0, 0, 0, 0.1);
  svg {
    margin: 0 16px 0 114px;
    animation: loader 1s infinite;
    @keyframes loader {
      100% {
        transform: rotate(360deg);
      }
    }
  }
`;

export default function ChatsRoomDetail() {
  const { t } = useTranslation();
  const { room_id } = useParams();
  const { data: userData } = useQuery('getUser', getUser);
  const { data: roomData } = useQuery('getRoom', () => getRoom({ user_id: userData?.id || 0, room_id: room_id || '' }));
  const navigate = useNavigate();

  const [checked, setChecked] = useState<boolean | null>(null);
  const [reportReason, setReportReason] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const isGroup = roomData ? roomData.joined_user_ids.length > 2 : false;

  const otherUser = roomData?.joined_users.filter((user) => user.id !== userData?.id)[0];

  const reportRoomMutation = useMutation(postReportRoom, {
    onSuccess: () => {
      if (checked && isGroup) {
        room_id &&
          userData?.id &&
          exitRoomMutation.mutate({
            room_id,
            user_id: userData?.id,
          });
      } else if (checked && !isGroup) {
        room_id &&
          otherUser?.id &&
          blockMutation.mutate({
            target_id: otherUser.id,
            type: 'sns',
          });
      } else {
        navigate('/chats');
        toast(`${t('chats.Report has been received')}`, { type: 'success' });
      }
    },
    onError: (e: any) => {
      console.log(e);
      toast('Error', { type: 'error' });
    },
  });

  useEffect(() => {
    if (typeof checked === 'boolean' && reportReason) {
      room_id &&
        reportReason &&
        room_id &&
        reportRoomMutation.mutate({
          report_issue: reportReason,
          room_id,
        });
    }
  }, [checked, reportReason, reportRoomMutation, room_id]);

  const blockMutation = useMutation(postBlockContact, {
    onSuccess: () => {
      navigate('/chats');
      toast(
        `${t('chats.Report has been received')}
        ${t('chats.And {user name} has been blocked')}
       ${otherUser?.first_name} ${otherUser?.last_name}`,
        { type: 'success' },
      );
    },
    onError: (e: any) => {
      console.log(e);
      toast('Error', { type: 'error' });
    },
  });
  const exitRoomMutation = useMutation(postExitRoom, {
    onSuccess: () => {
      navigate('/chats');
      toast(`${t('chats.Report has been received')} ${t('chats.And you are no longer a member in this group')}..`, {
        type: 'success',
      });
    },
  });

  const handleReport = (reportReason, _checked) => {
    setLoading(true);
    setChecked(_checked);
    setReportReason(reportReason);
  };

  return (
    <Wrapper hasPaddingTop={isGroup}>
      {loading && (
        <ReportLoading>
          <Loader />
          {t('chats.Reporting')}
          ...
        </ReportLoading>
      )}
      {!isGroup ? (
        <TimelineButton>
          <Kok />
        </TimelineButton>
      ) : (
        <></>
      )}
      {!isGroup ? <RoomDetailUserInfo user={otherUser} /> : <></>}
      <RoomDetailButtons userId={userData?.id} />
      <RoomDetailNavList handleReport={handleReport} />
      {isGroup ? (
        <RoomDetailMemberList
          isAdmin={userData?.id === roomData?.admin_id}
          users={roomData?.joined_users}
          admin_id={roomData?.admin_id}
          room_id={roomData?._id}
        />
      ) : (
        <></>
      )}
    </Wrapper>
  );
}
