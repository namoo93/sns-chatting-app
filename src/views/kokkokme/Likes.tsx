import React from 'react';
import { COLOR } from 'constants/COLOR';
import styled from 'styled-components';
import { Avatar, Icon } from 'components/atom';
import Iconkok from 'assets/ic-kok-24.svg';
import { useLocation, useNavigate } from 'react-router-dom';
import { useFetchWithType } from 'net/useFetch';
import SwrContainer from 'components/containers/SwrContainer';
import LikesList from 'types/socials/likes/LikesList';
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
const ListWrap = styled.ul`
  li {
    display: flex;
    padding: 10px 20px;
    justify-content: space-between;
    align-items: center;
    cursor: pointer;
  }
`;
const ProfileWrap = styled.div`
  width: calc(100% - 65px);

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

const Likes = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const goToTimeline = (user_id, uid) => {
    let userId = user_id.toString();
    const userInfo = `${userId}&${uid}`;
    navigate(`/kokkokme/user-timeline/${userInfo}`);
  };

  const location = useLocation();
  const pathArr = location.pathname.split('/');
  const postId = pathArr[pathArr.length - 1];
  console.log(pathArr);

  const { data: likesData, error: likesError } = useFetchWithType<LikesList>(
    `/socials/likes/${postId}?page=1&limit=10`,
  );

  console.log(postId);

  return (
    <Container>
      <Title>{t('sns.Likes')}</Title>

      <SwrContainer data={likesData} error={likesError}>
        <ListWrap>
          {likesData &&
            likesData.docs.map((user, index) => (
              <li key={index} onClick={() => goToTimeline(user.user_info.id, user.user_info.uid)}>
                <ProfileWrap>
                  <Avatar size={40} src={user.user_info.profile_image} />
                  <p className="profile_title">{user.user_info.first_name + ' ' + user.user_info.last_name}</p>
                  <p className="profile_sub">{user.user_info.email}</p>
                </ProfileWrap>

                <Icon size={24} src={Iconkok} />
              </li>
            ))}
        </ListWrap>
      </SwrContainer>
    </Container>
  );
};

export default Likes;
