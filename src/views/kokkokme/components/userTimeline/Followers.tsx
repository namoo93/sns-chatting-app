import { Avatar, Button, ButtonVariant } from 'components/atom';
import { SearchBar, TabMenu } from 'components/molecules';
import { COLOR } from 'constants/COLOR';
import React, { useEffect, useMemo, useState } from 'react';
import { useLocation } from 'react-router-dom';
import styled from 'styled-components';
import ic_nocontract from 'assets/auth/ic_nocontract.svg';
import useFetch, { useFetchWithType } from 'net/useFetch';
import SwrContainer from 'components/containers/SwrContainer';
import FollowingResponse from '../../../../types/socials/follow/FollowingResponse';
import FollowerResponse from '../../../../types/socials/follow/FollowerResponse';
import { useAtomValue } from 'jotai';
import userAtom from 'stores/userAtom';
import { YScrollContainer } from 'components/containers/Scroll';
import { post, remove } from 'net/rest/api';
import { NO_FRAME_WINDOW_OPTIONS } from 'constants/CONST';
import UserDetail from 'types/auth/UserDetail';
import FollowerItem from 'types/socials/follow/FollowerItem';
import FollowingItem from 'types/socials/follow/FollowingItem';
import { useTranslation } from 'react-i18next';

const Container = styled.div``;
const Title = styled.p`
  font-size: 16px;
  font-weight: 500;
  color: ${COLOR.BLACK};
  text-align: center;
  padding: 20px 0 15px;
  border-bottom: 1px solid #eee;
`;
const ProfileList = styled.ul`
  li {
    display: flex;
    padding: 10px 20px;
    justify-content: space-between;
    align-items: center;
  }
  .profileListBtn {
    border-radius: 6px;
  }
  .red {
    border: 1px solid ${COLOR.RED};
    color: ${COLOR.RED};
  }
`;
const ProfileWrap = styled.div`
  width: calc(100% - 120px);
  cursor: pointer;

  img {
    float: left;
  }
  p {
    float: left;
    margin-left: 10px;
    width: calc(100% - 60px);
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
  .profile_title {
    font-size: 15px;
    font-weight: 500;
    color: #262525;
    padding-top: 6px;
  }
  .profile_sub {
    font-size: 13px;
    color: #bcb3c5;
    padding-top: 2px;
  }
`;
const InfoNoUsersWrap = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  padding: 20px;

  img {
    margin-top: 80px;
  }
  .info_title {
    font-size: 16px;
    font-weight: 500;
    color: #262525;
    padding-top: 10px;
  }
  .bottom_90 {
    padding-bottom: 90px;
  }

  p {
    font-size: 12px;
    color: #999;
  }

  .info_box {
    width: 100%;
    padding: 20px;
    opacity: 0.8;
    border-radius: 10px;
    background-color: #f8f8f8;
    margin-bottom: 20px;

    .info_box_title {
      color: #262525;
    }
  }
`;

interface FollowButtonProps {
  userData: UserDetail;
  follower: FollowerItem;
  onClick: () => void;
}

interface FollowingButtonProps {
  userData: UserDetail;
  following: FollowingItem;
  handleFollow: (id) => void;
  handleUnFollow: (id) => void;
}

//팔로워 탭 버튼
function FollowButton({ userData, follower, onClick }: FollowButtonProps) {
  const { t } = useTranslation();
  const me = useAtomValue(userAtom);
  const label = useMemo(() => {
    if (!me) {
      return '';
    }

    if (userData.id === me.id) {
      // 화면 주인이 본인일때
      return !follower.connected ? `+ ${t('sns.Follow Back')}` : `${t('sns.Following')}`;
    } else {
      // 화면 주인이 친구일때

      if (follower.user_id === me.id) {
        // 내가 표시된다면
        return `${t('sns.Its Me!')}`;
      } else {
        // 친구의 친구일 때
        if (!follower.connected && follower.user_id !== me.id) {
          return `+ ${t('sns.Follow')}`;
        } else if (follower.connected) {
          // 나랑도 친구
          return `${t('sns.Following')}`;
        } else {
          if (follower.status === 'approve') {
            return `${t('sns.Following')}`;
          } else {
            return `${t('sns.Requested')}`;
          }
        }
      }
    }
  }, [userData, follower, me]);

  const variant = useMemo(() => {
    if (!me) return ButtonVariant.Default;

    if (userData.id === me.id) {
      // 화면 주인이 본인일때
      return !follower.connected ? ButtonVariant.Default : ButtonVariant.Outlined;
    } else {
      // 화면 주인이 친구일때

      if (follower.user_id === me.id) {
        // 내가 표시된다면
        return ButtonVariant.Outlined;
      } else {
        // 친구의 친구일 때
        if (!follower.connected && follower.user_id !== me.id) {
          return ButtonVariant.Default;
        } else if (follower.connected) {
          // 나랑도 친구
          return ButtonVariant.Outlined;
        } else {
          if (follower.status === 'approve') {
            return ButtonVariant.Outlined;
          } else {
            return ButtonVariant.Outlined;
          }
        }
      }
    }
  }, [userData, follower, me]);

  return (
    <Button className="profileListBtn" type={'button'} variant={variant} onClick={onClick} width={120} height={32}>
      {label}
    </Button>
  );
}

//팔로잉 탭 버튼
function FollowingButton({ userData, following, handleFollow, handleUnFollow }: FollowingButtonProps) {
  const { t } = useTranslation();
  const me = useAtomValue(userAtom);
  const [isFollowing, setIsFollowing] = useState(following.connected ? true : false);

  const handleFollowing = () => {
    if (!me) return;
    if (userData.id === me.id) {
      // 화면 주인이 본인일때
      if (!isFollowing) {
        handleFollow(following.user_id);
      } else {
        handleUnFollow(following.user_id);
      }
    } else {
      // 화면 주인이 친구일때
      if (following.user_id === me.id) {
        // 아무 동작 없음
      } else {
        // 친구의 친구일 때
        if (isFollowing) {
          handleUnFollow(following.user_id);
        } else {
          if (following.status === 'approve') {
            handleUnFollow(following.user_id);
          } else {
            // 아무 동작 없음
          }
        }
      }
    }
    setIsFollowing(!isFollowing);
  };

  const label = useMemo(() => {
    if (!me) {
      return '';
    }

    if (userData.id === me.id) {
      // 화면 주인이 본인일때
      if (following.status === 'private') {
        return `${t('sns.Requested')}`;
      } else {
        return !isFollowing ? `+ ${t('sns.Follow Back')}` : `${t('sns.Following')}`;
      }
    } else {
      // 화면 주인이 친구일때

      if (following.user_id === me.id) {
        // 내가 표시된다면
        return `${t('sns.Its Me!')}`;
      } else {
        // 친구의 친구일 때
        if (!isFollowing && following.user_id !== me.id) {
          return `+ ${t('sns.Follow')}`;
        } else if (isFollowing) {
          // 나랑도 친구
          return `${t('sns.Following')}`;
        } else {
          if (following.status === 'approve') {
            return `${t('sns.Following')}`;
          } else {
            return `${t('sns.Requested')}`;
          }
        }
      }
    }
  }, [userData, following, me]);
  const variant = useMemo(() => {
    if (!me) return;

    if (userData.id === me.id) {
      // 화면 주인이 본인일때
      if (following.status === 'private') {
        return ButtonVariant.Outlined;
      } else {
        return !isFollowing ? ButtonVariant.Default : ButtonVariant.Outlined;
      }
    } else {
      // 화면 주인이 친구일때

      if (following.user_id === me.id) {
        // 내가 표시된다면
        return ButtonVariant.Outlined;
      } else {
        // 친구의 친구일 때
        if (!isFollowing && following.user_id !== me.id) {
          return ButtonVariant.Default;
        } else if (isFollowing) {
          // 나랑도 친구
          return ButtonVariant.Outlined;
        } else {
          if (following.status === 'approve') {
            return ButtonVariant.Outlined;
          } else {
            return ButtonVariant.Outlined;
          }
        }
      }
    }
  }, [userData, following, me]);
  return (
    <Button
      className="profileListBtn"
      type={'button'}
      variant={variant}
      onClick={handleFollowing}
      width={120}
      height={32}
    >
      {label}
    </Button>
  );
}

const Followers = () => {
  const { t } = useTranslation();
  const location = useLocation();
  const [searchFollowerValue, setSearchFollowerValue] = useState<string>('');
  const [searchFollowingValue, setSearchFollowingValue] = useState<string>('');
  const [tabValue, setTabValue] = useState<string>('Followers');

  console.log(location);
  const userIdArray = location.pathname.split('followers/');
  const userMe = useAtomValue(userAtom);
  //유저아이디값으로 유저 전체 값 가져오기(유저 네임, 유저 팔로우, 팔로워)
  const userId = userIdArray[1].split('&')[0];
  const uid = userIdArray[1].split('&')[1];

  const userURL = `auth/users/detail?uid=${uid}`;
  // const friendURL = `auth/contacts/target/${userId}`;
  const followingURL = `/socials/follows/${userId}/following`;
  const followerURL = `/socials/follows/${userId}/follower`;

  const { data: userData, error: userError } = useFetchWithType<UserDetail>(userURL);
  // const { data: friendData, error: friendError } = useFetch(friendURL);
  const {
    data: followingData,
    error: followingError,
    mutate: followingMutate,
  } = useFetchWithType<FollowingResponse>(followingURL);
  const {
    data: followerData,
    error: followerError,
    mutate: followerMutate,
  } = useFetchWithType<FollowerResponse>(followerURL);

  const handleFollowerValue = (value: string) => {
    setSearchFollowerValue(value);
  };
  const handleFollowingValue = (value: string) => {
    setSearchFollowingValue(value);
  };

  const handleFollow = (id) => {
    post(`socials/follows/`, { follower_id: id }).then((res) => {
      followerMutate();
      followingMutate();
      console.log(res);
    });
  };
  const handleUnFollow = (id) => {
    remove(`socials/follows/${id}`).then((res) => {
      followerMutate();
      followingMutate();
      console.log(res);
    });
  };
  const openProfile = (id: number, first_name: string, last_name: string, uid: string) => {
    window.open(
      `/profile-detail?id=${id}&first_name=${first_name}&last_name=${last_name}&uid=${uid}
      `,
      'Profile-detail',
      NO_FRAME_WINDOW_OPTIONS,
    );
  };

  return (
    <Container>
      <SwrContainer data={userData} error={userError}>
        <>
          <Title>{userData?.first_name + ' ' + userData?.last_name}</Title>

          <TabMenu
            menu={[
              { value: 'Followers', label: `${t('sns.Followers')}` },
              { value: 'Following', label: `${t('sns.Following')}` },
            ]}
            length={2}
            initialValue={tabValue}
            setTabValue={setTabValue}
          />

          <ProfileList>
            {tabValue === 'Followers' && (
              <SwrContainer data={followerData} error={followerError}>
                <>
                  {!!followerData?.items.length && (
                    <SearchBar
                      onChange={handleFollowerValue}
                      placeholder={`${t('sns.Search by Name or KokKok ID')}`}
                      value={searchFollowerValue}
                    />
                  )}

                  <YScrollContainer scrollHeight={180}>
                    {followerData?.items.length ? (
                      followerData.items
                        .filter(
                          (user) =>
                            user.follower.first_name.includes(searchFollowerValue) ||
                            user.follower.last_name.includes(searchFollowerValue) ||
                            (user.follower.email && user.follower.email.includes(searchFollowerValue)),
                        )
                        .map(
                          (user) =>
                            user.follower && (
                              <li key={user.follower.id}>
                                <>
                                  <ProfileWrap
                                    onClick={() => {
                                      openProfile(
                                        user.follower.id,
                                        user.follower.first_name,
                                        user.follower.last_name,
                                        user.follower.uid,
                                      );
                                    }}
                                  >
                                    <Avatar size={40} src={user.follower.profile_image} />
                                    <p className="profile_title">
                                      {user.follower.first_name} {user.follower.last_name}
                                    </p>
                                    <p className="profile_sub">{user.follower.email}</p>
                                  </ProfileWrap>
                                </>

                                <SwrContainer data={userData} error={userError}>
                                  {userData && (
                                    <FollowButton
                                      userData={userData}
                                      follower={user}
                                      onClick={() => {
                                        if (!userMe) return;
                                        if (userData.id === userMe.id) {
                                          // 화면 주인이 본인일때
                                          if (!user.connected) {
                                            handleFollow(user.user_id);
                                          } else {
                                            handleUnFollow(user.user_id);
                                          }
                                        } else {
                                          // 화면 주인이 친구일때
                                          if (user.user_id === userMe.id) {
                                            // 아무 동작 없음
                                          } else {
                                            // 친구의 친구일 때
                                            if (user.connected) {
                                              handleUnFollow(user.user_id);
                                            } else {
                                              if (user.status === 'approve') {
                                                handleUnFollow(user.user_id);
                                              } else {
                                                // 아무 동작 없음
                                              }
                                            }
                                          }
                                        }
                                      }}
                                    />
                                  )}
                                </SwrContainer>
                              </li>
                            ),
                        )
                    ) : (
                      <InfoNoUsersWrap>
                        <Avatar size={52} src={ic_nocontract} />
                        <strong className="info_title">{t('sns.No Followers')}</strong>
                      </InfoNoUsersWrap>
                    )}
                  </YScrollContainer>
                </>
              </SwrContainer>
            )}
            {tabValue === 'Following' && (
              <SwrContainer data={followingData} error={followingError}>
                <>
                  {!!followingData?.items.length && (
                    <SearchBar
                      onChange={handleFollowingValue}
                      placeholder={`${t('sns.Search by Name or KokKok ID')}`}
                      value={searchFollowingValue}
                    />
                  )}
                  <YScrollContainer scrollHeight={180}>
                    {followingData?.items.length ? (
                      followingData.items
                        .filter(
                          (user) =>
                            user.following.first_name.includes(searchFollowingValue) ||
                            user.following.last_name.includes(searchFollowingValue) ||
                            (user.following.email && user.following.email.includes(searchFollowingValue)),
                        )
                        .map(
                          (user) =>
                            user.following && (
                              <li key={user.following.id}>
                                <>
                                  <ProfileWrap
                                    onClick={() =>
                                      openProfile(
                                        user.following.id,
                                        user.following.first_name,
                                        user.following.last_name,
                                        user.following.uid,
                                      )
                                    }
                                  >
                                    <Avatar size={40} src={user.following.profile_image} />
                                    <p className="profile_title">
                                      {user.following.first_name} {user.following.last_name}
                                    </p>
                                    <p className="profile_sub">{user.following.email}</p>
                                  </ProfileWrap>
                                </>

                                <SwrContainer data={userData} error={userError}>
                                  {userData && (
                                    <FollowingButton
                                      userData={userData}
                                      following={user}
                                      handleFollow={handleFollow}
                                      handleUnFollow={handleUnFollow}
                                    />
                                  )}
                                </SwrContainer>
                              </li>
                            ),
                        )
                    ) : (
                      <InfoNoUsersWrap>
                        <Avatar size={52} src={ic_nocontract} />
                        <strong className="info_title">{t('sns.No Followers')}</strong>
                      </InfoNoUsersWrap>
                    )}
                  </YScrollContainer>
                </>
              </SwrContainer>
            )}
          </ProfileList>
        </>
      </SwrContainer>
    </Container>
  );
};

export default Followers;
