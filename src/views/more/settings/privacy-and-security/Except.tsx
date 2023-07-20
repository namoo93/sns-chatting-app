import React, { useState } from 'react';
import NavbarLayout from 'components/layouts/NavbarLayout';
import { useNavigate } from 'react-router-dom';
import { Avatar, Button, ButtonVariant, Heading4, Icon } from 'components/atom';
import styled from 'styled-components';
import { COLOR } from 'constants/COLOR';
import ic_nocontract from 'assets/auth/ic_nocontract.svg';
import useFetch from 'net/useFetch';
// import { DUMMY_USERS } from 'views/kokkokme/KokKokMeMain';

const DUMMY_USERS: any[] = [];

const HeadingWrap = styled.div`
  padding: 40px 0 14px;
  text-align: center;
  border-bottom: 1px solid #eee;
`;
const LeftButtonWrapper = styled.div`
  position: relative;
  button {
    position: absolute;
    left: 14px;
  }
`;
const ScrollWrapper = styled.div`
  overflow-y: auto;
  max-height: calc(100vh - 80px);
`;
const GrayLineBold = styled.div`
  height: 8px;
  background-color: #f8f8f8;
`;
const ProfileListWrap = styled.div`
  .title {
    display: block;
    color: #bbb;
    font-size: 13px;
    font-weight: 500;
    padding: 20px 20px 10px;
    border-bottom: 1px solid #ededed;
  }
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
`;
//user
const usersList = [
  {
    img: '',
    name: 'Aaysone',
    id: '@lorem',
  },
];

const Except = () => {
  const navigate = useNavigate();

  const [exceptedList] = useState(DUMMY_USERS);
  const [userList] = useState(usersList);

  const { data: contactData, mutate: contactMutate } = useFetch('/auth/contacts');
  const { data: blockData, error: blockError, mutate: blockMutate } = useFetch(`auth/block`);

  return (
    <NavbarLayout setting={true}>
      <HeadingWrap>
        <LeftButtonWrapper>
          <button>
            <Icon size={22} src={'/images/icon/ic-prev-22.png'} onClick={() => navigate(-1)} />
          </button>
          <Heading4>Except from</Heading4>
        </LeftButtonWrapper>
      </HeadingWrap>

      <ScrollWrapper>
        <ProfileListWrap>
          {exceptedList.length === 0 ? (
            <InfoNoUsersWrap>
              <Avatar size={52} src={ic_nocontract} />
              <strong className="info_title">No users have been excepted.</strong>
              <p className="bottom_90">Users excepted cannot see your activities on Kok Kok Me</p>
            </InfoNoUsersWrap>
          ) : (
            <div>
              <strong className="title">Excepted users</strong>
              <ProfileList>
                {exceptedList.map((user, index) => (
                  <li key={index}>
                    <ProfileWrap>
                      <Avatar size={40} src={user.avatar} />
                      <p className="profile_title">{user.name}</p>
                      <p className="profile_sub">{user.id}</p>
                    </ProfileWrap>
                    <Button
                      className="profileListBtn"
                      type={'button'}
                      onClick={() => {}}
                      width={65}
                      height={32}
                      variant={ButtonVariant.Outlined}
                      blacklined
                    >
                      Include
                    </Button>
                  </li>
                ))}
              </ProfileList>
            </div>
          )}
        </ProfileListWrap>
        <GrayLineBold />

        <ProfileListWrap>
          {userList.length === 0 ? (
            <InfoNoUsersWrap>
              <Avatar size={52} src={ic_nocontract} />
              <strong className="info_title">No Followers</strong>
              <p className="bottom_90">Follow users to enjoy Kok Kok Me</p>
            </InfoNoUsersWrap>
          ) : (
            <div>
              <strong className="title">Followers</strong>
              <ProfileList>
                {userList.map((user, index) => (
                  <li key={index}>
                    <ProfileWrap>
                      <Avatar size={40} src={user.img} />
                      <p className="profile_title">{user.name}</p>
                      <p className="profile_sub">{user.id}</p>
                    </ProfileWrap>
                    <Button
                      className="profileListBtn red"
                      type={'button'}
                      onClick={() => {}}
                      width={65}
                      height={32}
                      variant={ButtonVariant.Outlined}
                    >
                      Except
                    </Button>
                  </li>
                ))}
              </ProfileList>
            </div>
          )}
        </ProfileListWrap>
      </ScrollWrapper>
    </NavbarLayout>
  );
};

export default Except;
