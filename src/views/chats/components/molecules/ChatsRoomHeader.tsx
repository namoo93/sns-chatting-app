import React from 'react';
import styled from 'styled-components';
import { Row } from 'components/layouts';
import { Avatar, Heading5, Text, IconTypeButton } from 'components/atom';
import { COLOR } from 'constants/COLOR';
import { FIXED_SIZE_WINDOW_OPTIONS } from 'constants/CONST';
import { RoomEntity } from 'modules/chats/rooms/types';
import moment from 'moment';

type Props = {
  data: RoomEntity;
  userId?: number;
  handleSearchVisible: () => void;
};

const Wrapper = styled(Row)`
  padding: 30px 15px 14px;
  width: 100%;
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

const HeadTitle = styled(Heading5)`
  font-weight: bold;
`;
const HeadCount = styled.span`
  color: ${COLOR.PRIMARY};
`;

const Timestamp = styled(Text)`
  font-size: 11px;
  color: #bbb;
`;

const RightWrapper = styled(Row)`
  background: #f8f8f8;
  padding: 8px;
  border-radius: 18px;
  button {
    &:first-child {
      margin-left: 0;
    }
    margin-left: 12px;
  }
`;

export default function ChatsRoomHeader({ data, userId, handleSearchVisible }: Props) {
  return (
    <Wrapper>
      <LeftWrapper>
        {data.joined_users.map((user, i) => {
          if (i > 3 || (user.id === userId && data.joined_users.length === 2)) {
            return <></>;
          }
          return (
            <Avatar
              key={i}
              size={data.joined_users.length > 2 ? 22 : 46}
              src={user.profileImage ? user.profileImage : ''}
            />
          );
        })}
      </LeftWrapper>
      <CenterWrapper>
        <HeadTitle>
          {data.joined_users.length > 2 ? (
            <>
              Group<HeadCount> {data.joined_users.length}</HeadCount>
            </>
          ) : (
            `${data.joined_users[0].first_name} ${data.joined_users[0].last_name}`
          )}
        </HeadTitle>
        {data.joined_users.length === 2 && (
          <Timestamp>{moment(data.updatedAt).format('YYYY-MM-DD hh:mm:ss')}</Timestamp>
        )}
      </CenterWrapper>
      <RightWrapper>
        <IconTypeButton
          iconSrc={'/chats/ic_call'}
          iconType={'svg'}
          size={22}
          onClick={() => {
            window.open('/chats/call/1', '', 'width=640,height=580');
          }}
        />
        <IconTypeButton iconSrc={'/chats/ic_mov'} iconType={'svg'} size={22} />
        <IconTypeButton iconSrc={'/chats/ic_search'} iconType={'svg'} size={20} onClick={handleSearchVisible} />
        <IconTypeButton
          iconSrc={'/chats/ic_menu'}
          iconType={'svg'}
          size={22}
          onClick={() => {
            window.open(`/chats/${data._id}/detail`, '', FIXED_SIZE_WINDOW_OPTIONS);
          }}
        />
      </RightWrapper>
    </Wrapper>
  );
}
