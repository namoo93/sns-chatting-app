import { useState, useEffect, useRef } from 'react';
import styled from 'styled-components';
import { useMutation, useQuery } from 'react-query';
import { useParams } from 'react-router-dom';
import { getUser } from 'modules/user/api';
import { postCreateRooms, postJoinRoom } from 'modules/chats/rooms/api';
import { Button, ButtonVariant } from 'components/atom';
import { TitleHeader, SearchBar } from 'components/molecules';
import { FriendList, NoResults } from './components/organisms';
import { Tag } from './components/atom';
import { getContacts } from 'modules/contacts/api';
import { useTranslation } from 'react-i18next';

const Wrapper = styled.div`
  padding-top: 32px;
  overflow-y: hidden;
  height: 100vh;
  padding-bottom: 100px;
`;

const TagWrapper = styled.div`
  margin-bottom: 18px;
  padding: 0 20px;
  display: flex;
  flex-wrap: wrap;
`;

const ButtonWrapper = styled.div`
  background: #fff;
  box-shadow: 0 -5px 15px 0 rgba(0, 0, 0, 0.08);

  position: fixed;
  bottom: 0;
  width: 100%;
  display: flex;
  justify-content: center;
  padding: 15px 30px;
`;

export default function ChatsAddFriends() {
  const { t } = useTranslation();
  const { add_type, room_id } = useParams();
  const [searchValue, setSearchValue] = useState<string>('');
  const [checkedList, setCheckedList] = useState<any[]>([]);
  const [friendList, setFriendList] = useState<any[]>([]);
  const [scrollHeight, setScrollHeight] = useState(0);
  const ref = useRef<HTMLDivElement>(null);

  const createRoomMutation = useMutation(postCreateRooms, {
    onSuccess: () => {
      window.close();
    },
  });
  const joinRoomMutation = useMutation(postJoinRoom, {
    onSuccess: (data) => {
      // window.close();
      console.log(data);
    },
  });
  const { data: userData } = useQuery('getUser', getUser);
  const { data: contactsData } = useQuery('getContacts', getContacts);
  useEffect(() => {
    if (ref.current) {
      setScrollHeight(ref.current.offsetHeight);
    }
  }, [checkedList]);
  useEffect(() => {
    if (contactsData?.length) {
      if (searchValue) {
        setFriendList(
          contactsData?.filter((friend) =>
            `${friend.friend.first_name.toLowerCase()} ${friend.friend.last_name.toLowerCase()}`.includes(
              searchValue.toLowerCase(),
            ),
          ),
        );
      } else {
        setFriendList(contactsData);
      }
    }
  }, [searchValue, contactsData]);

  const handleCheckedList = (id) => {
    if (checkedList.includes(Number(id))) {
      setCheckedList(checkedList.filter((checkedId) => Number(checkedId) !== Number(id)));
    } else {
      setCheckedList(checkedList.concat(Number(id)));
    }
  };
  const checkedFriendList = contactsData?.filter((friend) => checkedList.includes(friend.friend.id));
  return (
    <>
      <TitleHeader border title={`${t('chats.Choose Friends')}`} />
      <Wrapper>
        {checkedFriendList?.length ? (
          <TagWrapper ref={ref}>
            {checkedFriendList.map((friend, i) => {
              return (
                <Tag
                  key={i}
                  value={`${friend.friend.first_name} ${friend.friend.last_name}`}
                  id={friend.friend.id}
                  handleCheckedList={handleCheckedList}
                />
              );
            })}
          </TagWrapper>
        ) : (
          <></>
        )}
        <SearchBar
          placeholder={`${t('chats.Search by name, phone number, E-mail')}`}
          onChange={(value) => setSearchValue(value)}
          value={searchValue}
        />
        {(searchValue &&
          contactsData?.filter((friend) =>
            `${friend.friend.first_name.toLowerCase()} ${friend.friend.last_name.toLowerCase()}`.includes(
              searchValue.toLowerCase(),
            ),
          ).length) ||
        !searchValue ? (
          <FriendList
            data={friendList}
            handleCheckedList={handleCheckedList}
            checkedList={checkedList}
            scrollHeight={scrollHeight + 302}
          />
        ) : (
          <NoResults searchValue={searchValue} />
        )}
        <ButtonWrapper>
          <Button
            className={'string'}
            type={'button'}
            onClick={() => {
              window.close();
            }}
            width={160}
            height={50}
            fontSize={18}
            marginRight={10}
            variant={ButtonVariant.Outlined}
            borderRadius
          >
            {t('button-common.Cancel')}
          </Button>
          <Button
            className={'string'}
            type={'button'}
            onClick={() => {
              if (add_type === 'create') {
                createRoomMutation.mutate({
                  joined_user_ids: checkedList,
                  type: 'chat',
                  admin_id: userData?.id || 0,
                });
              } else {
                room_id &&
                  joinRoomMutation.mutate({
                    user_ids: checkedList,
                    room_id,
                  });
              }
            }}
            width={160}
            height={50}
            fontSize={18}
            variant={checkedList.length ? ButtonVariant.Default : ButtonVariant.Gray}
            inactive={!checkedList.length}
            borderRadius
          >
            {checkedList.length} {t('chats.Select')}
          </Button>
        </ButtonWrapper>
      </Wrapper>
    </>
  );
}
