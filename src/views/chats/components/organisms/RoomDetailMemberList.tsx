import React from 'react';
import { Row } from 'components/layouts';
import styled from 'styled-components';
import { COLOR } from 'constants/COLOR';
import { ReactComponent as AddMember } from 'assets/chats/ic_add_member.svg';
import { RoomDetailMemberItem } from '../molecules';
import { FIXED_SIZE_WINDOW_OPTIONS } from 'constants/CONST';
import { JoinedUser } from 'modules/chats/rooms/types';
import { useTranslation } from 'react-i18next';

type Props = {
  users?: JoinedUser[];
  room_id?: string;
  admin_id?: number;
  isAdmin?: boolean;
};

const Wrapper = styled.div``;

const Header = styled(Row)`
  padding: 20px 20px 12px;
  border-bottom: 1px solid #ededed;
`;

const HeaderTitle = styled.p`
  color: #aaa;
  font-size: 13px;
  font-weight: 500;
  line-height: 18px;
`;

const HeaderCount = styled.span`
  color: ${COLOR.PRIMARY};
`;

const IconButton = styled.button`
  color: #bcb3c5;
  font-size: 13px;
  display: flex;
  svg {
    margin-right: 5px;
  }
`;

export default function RoomDetailMemberList({ users, room_id, admin_id, isAdmin }: Props) {
  const { t } = useTranslation();
  return (
    <Wrapper>
      <Header justify={'space-between'}>
        <HeaderTitle>
          {t('chats.members')}
          <HeaderCount>{users?.length}</HeaderCount>
        </HeaderTitle>
        <IconButton
          onClick={() => window.open(`/chats/add-friends/join/${room_id}`, 'Add Friends', FIXED_SIZE_WINDOW_OPTIONS)}
        >
          <AddMember />
          {t('chats.Add member')}
        </IconButton>
      </Header>
      {users?.map((user, i) => {
        return <RoomDetailMemberItem key={i} {...user} admin_id={admin_id} isAdmin={isAdmin} room_id={room_id || ''} />;
      })}
    </Wrapper>
  );
}
