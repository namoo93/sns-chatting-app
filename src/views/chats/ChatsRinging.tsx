import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { Column, Row } from 'components/layouts';
import { Avatar, Heading3, Text } from 'components/atom';
import { COLOR } from 'constants/COLOR';
import { getEllipsis } from 'lib/getStyle';
import { ChatsCallButtons } from './components/molecules';

const Wrapper = styled(Column)`
  z-index: 99;
  width: 100%;
  height: 100%;
`;

const AvatarWrapper = styled(Column)`
  width: 120px;
  height: 120px;
  flex-wrap: wrap;
  justify-content: space-around;
  gap: 6px;
  margin-bottom: 25px;
`;

const CenterWrapper = styled(Column)`
  margin-top: -100px;
`;

const UserNamesWrapper = styled(Row)`
  padding: 0 54px;
  margin-bottom: 12px;
`;

const UserNames = styled(Heading3)`
  color: ${COLOR.BLACK};
  word-break: break-all;
  font-weight: 500;
  ${getEllipsis(1, 18)}
`;

const UserCount = styled.span`
  color: ${COLOR.PRIMARY};
  font-size: 20px;
  font-weight: 500;
  margin-left: 5px;
`;

const RingingText = styled(Text)`
  font-size: 13px;
`;

const dummy = {
  users: [
    {
      name: 'Boummaly Sayasone',
      profile_image: '/images/chats/profile_image_ex.png',
    },
    {
      name: 'Boummaly Sayasone',
      profile_image: '/images/chats/profile_image_ex2.png',
    },
    {
      name: 'Boummaly Sayasone',
      profile_image: '/images/chats/profile_image_ex3.png',
    },
    {
      name: 'Boummaly Sayasone',
      profile_image: '/images/chats/profile_image_ex4.png',
    },
  ],
};

export default function ChatsRinging() {
  const [userNames, setUserNames] = useState('');

  useEffect(() => {
    let arr: string[] = [];
    dummy.users.forEach((user) => {
      arr.push(user.name);
    });
    setUserNames(arr.join());
  }, []);

  return (
    <Wrapper>
      <CenterWrapper>
        <AvatarWrapper>
          {dummy.users.map((user, i) => {
            if (i > 3) {
              return <></>;
            }
            return <Avatar key={i} size={dummy.users.length > 1 ? 57 : 120} src={user.profile_image} />;
          })}
        </AvatarWrapper>
        <UserNamesWrapper>
          <UserNames>{userNames} </UserNames>
          {dummy.users.length > 1 ? <UserCount>{dummy.users.length}</UserCount> : <></>}
        </UserNamesWrapper>
        <RingingText variant="smallText_S">Ringing..</RingingText>
      </CenterWrapper>
      <ChatsCallButtons />
    </Wrapper>
  );
}
