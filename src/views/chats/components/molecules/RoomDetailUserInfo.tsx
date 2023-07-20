import React from 'react';
import styled from 'styled-components';
import { Column } from 'components/layouts';
import { Avatar, Heading3, Text } from 'components/atom';
import { JoinedUser } from 'modules/chats/rooms/types';

type Props = {
  user?: JoinedUser;
};

const Wrapper = styled(Column)`
  padding-top: 90px;
`;

const Name = styled(Heading3)`
  font-weight: 500;
  line-height: 24px;
  margin-top: 12px;
`;

const Tag = styled.p`
  color: #bcb3c5;
  font-size: 13px;
  line-height: 18px;
  margin: 4px 0 8px;
`;

const Contact = styled(Text)`
  line-height: 18px;
`;

export default function RoomDetailUser({ user }: Props) {
  return (
    <Wrapper>
      <Avatar src={user?.profileImage ? user?.profileImage : ''} size={120} />
      <Name>
        {user?.first_name} {user?.last_name}
      </Name>
      <Tag>{user?.uid}</Tag>
      <Contact variant="caption_S">{user?.contact}</Contact>
    </Wrapper>
  );
}
