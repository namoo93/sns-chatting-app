import { Avatar } from 'components/atom';
import { COLOR } from 'constants/COLOR';
import React from 'react';
import styled from 'styled-components';
import officialAccountImg from 'assets/authenticaton-check.svg';
import { useNavigate } from 'react-router-dom';

const HeaderContainer = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 37px 20px 15px 20px;
  border-bottom: 1px solid #f8f8f8;
`;

const ProfileWrap = styled.button`
  width: calc(100% - 65px);
  text-align: left;

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
    font-size: 18px;
    font-weight: bold;
    color: ${COLOR.BLACK};
    height: 40px;
    line-height: 40px;

    img {
      float: none;
      display: inline-block;
      width: 18px;
      height: 18px;
      margin-left: 5px;
    }
  }
  .profile_sub {
    font-size: 13px;
    color: #bcb3c5;
    line-height: 1;
  }
`;

const ButtonContainer = styled.div`
  display: flex;
  flex-direction: row;
  > * {
    margin-left: 15px;
  }
`;

export function SnsHeader({ user, button }) {
  const navigate = useNavigate();
  const goToTimeline = (id) => {
    let userId = id.toString();
    const userInfo = `${userId}&${user.uid}`;
    navigate(`/kokkokme/user-timeline/${userInfo}`);
  };
  return (
    <HeaderContainer>
      <ProfileWrap onClick={() => goToTimeline(user?.id)}>
        <Avatar size={40} src={user?.profile_image} />
        <p className="profile_title">
          {user?.first_name} &nbsp;
          {user?.last_name}
          {user?.officialAccount ? <img alt="" src={officialAccountImg} /> : <></>}
        </p>
        {/* <p className="profile_sub">
					{user?.email}
        </p> */}
      </ProfileWrap>
      <ButtonContainer>{button}</ButtonContainer>
    </HeaderContainer>
  );
}
