import { useCallback, useEffect, useState } from 'react';
import { Alarm, Avatar, Favorite, IconTypeButton } from 'components/atom';
import styled from 'styled-components';
import { Column, Row } from 'components/layouts';
import { NO_FRAME_WINDOW_OPTIONS } from 'constants/CONST';
import { useQuery } from 'react-query';
import { getMyInfo } from 'modules/users/api';
import queryString from 'query-string';
import { Dropdown } from 'components/molecules/dropdown';
import { useNavigate } from 'react-router-dom';
import { patch } from '../../net/rest/api';

const Container = styled.div<{ background: string }>`
  width: 100%;
  height: 100%;
  &::before {
    position: fixed;
    top: 0;
    left: 0;
    content: '';
    display: block;
    width: 100%;
    height: 100%;
    opacity: 0.5;
    -webkit-filter: blur(1px);
    -moz-filter: blur(1px);
    -o-filter: blur(1px);
    -ms-filter: blur(1px);
    filter: blur(1px);
    background-position-x: center;
    background-position-y: center;
    background-size: cover;
    height: 100vh;
    background-repeat: no-repeat;
    background-image: linear-gradient(to bottom, black, rgba(0, 0, 0, 0) 20%),
      linear-gradient(to top, black, rgba(0, 0, 0, 0) 50%), url(${(props) => props.background});
  }
`;

const HeaderContainer = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 20px;
`;

const ButtonContainer = styled.div`
  display: flex;
  flex-direction: row;
  > * {
    margin-right: 20px;
  }
`;

const CancelButtonContainer = styled.div`
  display: flex;
  flex-direction: row;
`;

const TextBox = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  span:nth-child(1) {
    margin-top: 12px;
    font-size: 22px;
    font-weight: 500;
    color: #fff;
  }
  span:nth-child(2) {
    font-size: 13px;
    color: #ededed;
    margin-bottom: 20px;
  }
`;

const ProfileInfo = styled(Row)`
  position: relative;
  margin-top: 220px;
  border-bottom: 1px solid rgba(255, 255, 255, 0.3);
`;

const ProfileActions = styled(Row)`
  position: relative;
  padding: 42px 30px;
`;

const ProfileAction = styled(Column)`
  position: relative;
  width: 90px;
  span {
    font-size: 13px;
    margin-top: 8px;
    font-weight: 500;
    letter-spacing: normal;
    text-align: center;
    color: #e0dde5;
  }
`;

export const ProfileDetailMain = () => {
  const myInfoQuery = useQuery('getMyInfo', getMyInfo);
  const myInfo = myInfoQuery?.data;

  const navigate = useNavigate();

  const [queryData, setQueryData] = useState(queryString.parse(window.location.search));

  useEffect(() => {
    setQueryData(queryString.parse(window.location.search));
  }, []);

  useEffect(() => {
    const query = queryString.stringify(queryData, {
      arrayFormat: 'comma',
      skipEmptyString: true,
      skipNull: true,
    });
    if (queryString.stringify(queryString.parse(window.location.search)) === query) {
      return;
    }
  }, [queryData]);

  const me = myInfo?.id === Number(queryData.id);
  const profile_image: string = queryData?.profile_image === 'null' ? '' : (queryData?.profile_image as string);

  const favorite = useCallback(
    async (is_favorite: number) => {
      const friend_id = Number(queryData?.id);
      const data = await patch(`/auth/contacts/target/${friend_id}`, {
        friend_id,
        is_favorite,
      });
      console.log(data);
    },
    [queryData?.id],
  );

  const onClickFavoriteOrMute = async (e, type) => {
    if (!e) return false;
    if (type === 'favorite') {
      if (Number(queryData?.is_favorite) === 0) {
        favorite(1);
        setQueryData({ ...queryData, is_favorite: '1' });
      } else {
        favorite(0);
        setQueryData({ ...queryData, is_favorite: '0' });
      }
    } else {
      if (Number(queryData?.is_mute) === 0) {
        favorite(1);
        setQueryData({ ...queryData, is_mute: '1' });
      } else {
        favorite(0);
        setQueryData({ ...queryData, is_mute: '0' });
      }
    }
  };

  window.onblur = () => {
    windowClose();
  };

  //@ts-ignore
  const windowClose = () => {
    const openObj = window.open('/profile-detail', 'Profile-detail', NO_FRAME_WINDOW_OPTIONS);
    openObj?.close();
  };

  const menuList = [
    {
      label: 'Voice Call',
      onClick: () => {
        alert('[TODO] Voice call');
      },
    },
    {
      label: 'Video Call',
      onClick: () => {
        alert('[TODO] Video call');
      },
    },
  ];

  return (
    <Container background={profile_image}>
      <HeaderContainer>
        <ButtonContainer>
          {me ? (
            <IconTypeButton
              iconSrc="settings/ic-bookmark-on"
              iconType="svg"
              onClick={() => {
                alert('[TODO] : bookmark 연결');
              }}
            />
          ) : (
            <>
              <Favorite
                active={Number(queryData?.is_favorite) === 1}
                onClick={(e) => {
                  onClickFavoriteOrMute(e, 'favorite');
                }}
              />
              <Alarm
                active={Number(queryData?.is_mute) === 1}
                onClick={(e) => {
                  onClickFavoriteOrMute(e, 'alarm');
                }}
              />
            </>
          )}
        </ButtonContainer>
        <CancelButtonContainer>
          <IconTypeButton
            iconSrc="profile-detail/ic-close"
            iconType="svg"
            onClick={() => {
              windowClose();
            }}
          />
        </CancelButtonContainer>
      </HeaderContainer>
      <ProfileInfo justify="center">
        <Column>
          <Avatar size={120} src={profile_image} />
          <TextBox>
            <span>{`${queryData?.first_name} ${queryData?.last_name}`}</span>
            <span>{queryData?.uid}</span>
          </TextBox>
        </Column>
      </ProfileInfo>
      <ProfileActions justify="space-around">
        {me ? (
          <>
            <ProfileAction>
              <IconTypeButton
                iconSrc="profile-detail/ic-profile-chat"
                iconType="svg"
                size={48}
                icSize={48}
                onClick={() => {}}
              />
              <span>MY Chatroom</span>
            </ProfileAction>
            <ProfileAction>
              <IconTypeButton
                iconSrc="profile-detail/ic-profile-edit"
                iconType="svg"
                size={48}
                icSize={48}
                onClick={() => {
                  navigate(`/kokkokme/user-timeline/${queryData?.id}&${queryData?.uid}`);
                }}
              />
              <span>Profile Edit</span>
            </ProfileAction>
          </>
        ) : (
          <>
            <ProfileAction>
              <IconTypeButton
                iconSrc="profile-detail/ic-profile-chat"
                iconType="svg"
                size={48}
                icSize={48}
                onClick={() => {
                  alert('[TODO] : Chat 연결');
                }}
              />
              <span>Chat</span>
            </ProfileAction>
            <ProfileAction>
              <Dropdown
                menuList={menuList}
                width={151}
                x={60}
                y={-60}
                renderButton={() => (
                  <IconTypeButton iconSrc="profile-detail/ic-profile-call" iconType="svg" size={48} icSize={48} />
                )}
              />
              <span>Call</span>
            </ProfileAction>
          </>
        )}

        <ProfileAction>
          <IconTypeButton
            iconSrc="profile-detail/ic-profile-kok"
            iconType="svg"
            size={48}
            icSize={48}
            onClick={() => {
              navigate(`/kokkokme/user-timeline/${queryData?.id}&${queryData?.uid}`);
            }}
          />
          <span>Kok kok me</span>
        </ProfileAction>
      </ProfileActions>
    </Container>
  );
};

export default ProfileDetailMain;

//
