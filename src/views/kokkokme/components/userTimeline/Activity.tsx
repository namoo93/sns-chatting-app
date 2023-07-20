import React, { useState } from 'react';
import { COLOR } from 'constants/COLOR';
import styled from 'styled-components';
import { Avatar, Button, ButtonVariant } from 'components/atom';
import { newFixedSizeWindowOptions_1024 } from 'constants/CONST';
import useFetch from 'net/useFetch';
import SwrContainer from 'components/containers/SwrContainer';
import { YScrollContainer } from 'components/containers/Scroll';
import { patch, remove } from 'net/rest/api';
import { NoResults } from 'components/molecules';
import { useTranslation } from 'react-i18next';

const Container = styled.div`
  overflow-y: scroll;
`;
const Title = styled.p`
  font-size: 16px;
  font-weight: 500;
  color: ${COLOR.BLACK};
  text-align: center;
  padding: 20px 0 15px;
  border-bottom: 1px solid #eee;
`;
const ListWrap = styled.ul`
  height: fit-content;

  li {
    display: flex;
    padding: 10px 20px;
    justify-content: space-between;
    align-items: center;
    flex: 1 1 0;
  }
`;
const ProfileWrap = styled.div`
  /* width: calc(100% - 65px); */
  display: flex;
  align-items: center;

  ::after {
    display: block;
    content: '';
    clear: both;
  }

  img {
    display: block;
    margin-right: 10px;
    float: left;
  }
  p {
    width: calc(100% - 50px);
  }
  .profile_name {
    display: inline;
    font-size: 15px;
    font-weight: bold;
    color: #262525;
    cursor: pointer;
    word-break: break-all;
  }
  .profile_action {
    display: inline;
    padding-left: 5px;
    font-weight: normal;
    cursor: pointer;
    word-break: keep-all;
  }
  .profile_time {
    display: inline;
    font-size: 13px;
    color: #bcb3c5;
    padding-left: 5px;
    word-break: keep-all;
  }
`;
const ButtonWrap = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;

  button {
    width: 70px;
    margin-left: 5px;
  }
`;

const Activity = () => {
  const { t } = useTranslation();
  const { data, error, mutate } = useFetch('/socials/notis?page=1&limit=10');

  const gotoDetail = (post_id) => {
    window.open(`/kokkokme/post-detail/${post_id}`, 'Post-detail', newFixedSizeWindowOptions_1024);
  };
  const gotoTimeline = (user_id, uid) => {
    const userInfo = `${user_id}&${uid}`;
    window.open(`/kokkokme/user-timeline/${userInfo}`, 'user-timeline', newFixedSizeWindowOptions_1024);
  };

  const timeCalculation = (createdAt) => {
    const today = new Date();
    const date = new Date(createdAt);

    const betweenTime = Math.floor((today.getTime() - date.getTime()) / 1000 / 60);
    if (betweenTime < 1) {
      return `${t('sns.now')}`;
    }
    if (betweenTime < 60) {
      return `${betweenTime} ${t('sns.min')}`;
    }

    const betweenTimeHour = Math.floor(betweenTime / 60);
    if (betweenTimeHour < 24) {
      return `${betweenTimeHour} ${t('sns.h')}`;
    }

    const betweenTimeDay = Math.floor(betweenTime / 60 / 24);
    if (betweenTimeDay < 57) {
      if (betweenTimeDay > 7) {
        const num = Math.floor(betweenTimeDay / 7);
        return `${num} ${t('sns.w')}`;
      } else {
        //Todo_lang (누락)
        return `${betweenTimeDay} d`;
      }
    } else {
      return `8${t('sns.w')}`;
    }
  };

  const handleAccept = (id) => {
    patch(`socials/follows/${id}/accept`, { follower_id: id }).then((res) => {
      console.log(res);
      mutate();
    });
  };

  const handleDeny = (id) => {
    remove(`socials/follows/${id}/denied`).then((res) => {
      console.log(res);
      mutate();
    });
  };

  return (
    <Container>
      <Title>{t('sns.Activity')}</Title>

      <SwrContainer data={data} error={error}>
        <YScrollContainer scrollHeight={52}>
          {data?.docs.length === 0 ? (
            <NoResults searchValue={'activity'}></NoResults>
          ) : (
            <ListWrap>
              {data?.docs.map((user, index) => (
                <li key={index}>
                  <ProfileWrap>
                    <Avatar size={40} src={user.user_info.profile_image} />
                    <p>
                      <span className="profile_name" onClick={() => gotoTimeline(user.user_id, user.user_info.uid)}>
                        {`${user.user_info.first_name} ${user.user_info.last_name}`}
                      </span>

                      {user.type === 'like' && (
                        <span className="profile_action" onClick={() => gotoDetail(user._id)}>
                          {t('sns.liked your post')}
                        </span>
                      )}
                      {user.type === 'comment' && (
                        <span className="profile_action" onClick={() => gotoDetail(user._id)}>
                          {t('sns.commented on your post')}
                        </span>
                      )}
                      {user.type === 'follow' && (
                        <span className="profile_action" onClick={() => gotoTimeline(user.user_id, user.user_info.uid)}>
                          {t('sns.started following you')}
                        </span>
                      )}

                      {user.type === 'applyfollow' && <span className="profile_action">requested to follow you.</span>}
                      {user.type === 'acceptfollow' && (
                        <span className="profile_action" onClick={() => gotoTimeline(user.user_id, user.user_info.uid)}>
                          {t('sns.accepted your follow request')}
                        </span>
                      )}
                      {user.type === 'denie' && (
                        <span onClick={() => gotoTimeline(user.user_id, user.user_info.uid)} className="profile_action">
                          {t('sns.requested to follow you')}
                        </span>
                      )}
                      {user.type === 'accept' && (
                        <span onClick={() => gotoTimeline(user.user_id, user.user_info.uid)} className="profile_action">
                          {t('sns.requested to follow you')}
                        </span>
                      )}

                      {user.type === 'tag' && (
                        <span className="profile_action" onClick={() => gotoDetail(user._id)}>
                          {t('sns.tagged you on a post')}
                        </span>
                      )}

                      <span className="profile_time">{timeCalculation(user.created_at)}</span>
                    </p>
                  </ProfileWrap>
                  {user.type === 'applyfollow' && (
                    <ButtonWrap>
                      <Button
                        type={'button'}
                        onClick={() => handleAccept(user.user_id)}
                        width={70}
                        height={32}
                        variant={ButtonVariant.Default}
                        borderRadius
                      >
                        {t('sns.Accept')}
                      </Button>
                      <Button
                        type={'button'}
                        onClick={() => handleDeny(user.user_id)}
                        width={70}
                        height={32}
                        variant={ButtonVariant.Outlined}
                        borderRadius
                      >
                        {t('sns.Deny')}
                      </Button>
                    </ButtonWrap>
                  )}
                  {user.type === 'accept' && (
                    <Button
                      type={'button'}
                      onClick={() => {}}
                      width={95}
                      height={32}
                      marginLeft={5}
                      variant={ButtonVariant.Outlined}
                      borderRadius
                    >
                      {t('sns.Accepted')}
                    </Button>
                  )}
                  {user.type === 'denie' && (
                    <Button
                      type={'button'}
                      onClick={() => {}}
                      width={95}
                      height={32}
                      marginLeft={5}
                      variant={ButtonVariant.Outlined}
                      borderRadius
                    >
                      {t('sns.Denied')}
                    </Button>
                  )}
                </li>
              ))}
            </ListWrap>
          )}
        </YScrollContainer>
      </SwrContainer>
    </Container>
  );
};

export default Activity;
