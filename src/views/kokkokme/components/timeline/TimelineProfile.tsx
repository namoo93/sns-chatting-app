import React, { useState } from 'react';
import styled from 'styled-components';
import editImg from 'assets/ic-edit-12.svg';
import { Avatar, Button, Select } from 'components/atom';
import { COLOR } from 'constants/COLOR';
import { noFrameWindowOptions } from 'constants/CONST';
import { useFetchWithType } from 'net/useFetch';
import SwrContainer from 'components/containers/SwrContainer';
import { FollowCount } from '../../../../types/socials/follow';
import { MIN_WIDTH } from 'constants/WIDTH';
import { useTranslation } from 'react-i18next';

const Container = styled.div`
  margin: 0 auto;
  max-width: 675px;
  min-width: ${MIN_WIDTH}px;
  min-height: 394px;
  background-color: #fff;
  height: fit-content;
  border-bottom: 1px solid #ededed;
  position: relative;
  padding-top: 110px;
`;
const ProfileContainer = styled.div`
  .background_wrap {
    position: absolute;
    top: 0;
    width: 100%;
    height: 104px;
    overflow: hidden;

    img {
      filter: blur(10px);
      width: 100%;
    }
  }
  .profile_wrap {
    position: absolute;
    z-index: 2;
    width: 88px;
    height: 88px;
    border-radius: 50%;
    top: 60px;
    left: 50%;
    transform: translateX(-50%);
    overflow: hidden;

    img {
      background-color: #fff;
    }
  }
  .button_wrap {
    display: inline-block;

    .border_select {
      margin: 20px;
      border: 1px solid #ededed;
      border-radius: 6px;

      select {
        font-size: 12px;
      }
    }

    button.follow {
      font-weight: normal;
      margin: 20px;
      border-radius: 6px;
    }

    button.edit {
      padding: 8px;
      font-size: 12px;
      font-weight: normal;
      color: #bcb3c5;

      img {
        display: inline-block;
        padding-right: 5px;
      }
    }
  }
  .title_wrap {
    display: inline-block;
    background-color: #fff;
    width: 100%;
    min-height: 289px;
    padding: 59px 42px 20px;
    text-align: center;

    .name {
      font-size: 20px;
      font-weight: bold;
      color: ${COLOR.BLACK};
    }
    .kokokname {
      font-size: 13px;
      font-weight: normal;
      color: #bcb3c5;
      margin-bottom: 10px;
    }
    .follower_wrap {
      display: flex;
      justify-content: center;
      cursor: pointer;

      span {
        padding: 0 15px;

        .title {
          font-size: 13px;
          font-weight: normal;
          padding-bottom: 10px;
        }
        .num {
          font-size: 20px;
          font-weight: bold;
          color: ${COLOR.BLACK};
        }

        &:last-child {
          border-left: 1px solid #ededed;
        }
      }
    }
    .profile_text {
      color: #999;
      font-size: 12px;
      line-height: 1.42;
    }
  }
`;

const TimelineProfile = ({ myTimeline, user }) => {
  const { t } = useTranslation();
  const [youFollowing] = useState<'not' | 'yes' | 'ing'>('not');
  console.log(user?.id);

  const countURL = `/socials/follows/${user?.id}/count`;
  const { data: countData, error: countError } = useFetchWithType<FollowCount>(countURL);
  const userInfo = `${user.id}&${user.uid}`;

  const gotoFollower = () => {
    window.open(`/kokkokme/user-timeline/followers/${userInfo}`, 'Followers', noFrameWindowOptions);
  };

  return (
    <Container>
      <ProfileContainer>
        <div className="background_wrap">
          <Avatar src={user?.profile_background} size={88} />
        </div>

        <div className="profile_wrap">
          <Avatar src={user?.profile_image} size={88} />
        </div>

        <div className="title_wrap">
          <p className="name">{user?.first_name + ' ' + user?.last_name}</p>
          <p className="kokokname">{user?.email}</p>
          <SwrContainer data={countData} error={countError}>
            <>
              <p className="follower_wrap" onClick={() => gotoFollower()}>
                <span className="followers">
                  <p className="title">{t('sns.followers')}</p>
                  <p className="num">{countData?.follower}</p>
                </span>
                <span className="followings">
                  <p className="title">{t('sns.following')}</p>
                  <p className="num">{countData?.following}</p>
                </span>
              </p>

              <p className="button_wrap">
                {myTimeline ? (
                  <button className="edit">
                    <img src={editImg} alt="img" />
                    <span>{t('button-common.Edit')}</span>
                  </button>
                ) : !countData?.following ? (
                  <>
                    {youFollowing === 'not' && (
                      <Button
                        className={'follow'}
                        type={'button'}
                        onClick={() => {}}
                        width={92}
                        height={32}
                        borderRadius
                      >
                        {/* //Todo_lang (누락) */}+ {t('sns.Follow')}
                      </Button>
                    )}
                    {youFollowing === 'yes' && (
                      <Button
                        className={'follow'}
                        type={'button'}
                        onClick={() => {}}
                        width={132}
                        height={32}
                        borderRadius
                      >
                        {/* //Todo_lang (누락) */}+ {t('sns.Follow Back')}
                      </Button>
                    )}
                    {youFollowing === 'ing' && (
                      <Button
                        className={'follow'}
                        type={'button'}
                        onClick={() => {}}
                        width={92}
                        height={32}
                        borderRadius
                      >
                        {t('sns.Requested')}
                      </Button>
                    )}
                  </>
                ) : (
                  <Select
                    className="border_select"
                    width={132}
                    height={32}
                    options={[
                      { label: `${t('sns.Following')}`, value: 0 },
                      { label: `${t('sns.Hide all activities')}`, value: 1 },
                      { label: `${t('sns.Show all activities')}`, value: 1 },
                      { label: `${t('sns.Unfollow this user')}`, value: 2 },
                    ]}
                  />
                )}
              </p>
            </>
          </SwrContainer>
          <p className="profile_text">{user?.profile_message}</p>
        </div>
      </ProfileContainer>
    </Container>
  );
};

export default TimelineProfile;
