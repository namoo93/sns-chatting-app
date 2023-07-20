import React, { useCallback, useState } from 'react';
import NavbarLayout from 'components/layouts/NavbarLayout';
import styled from 'styled-components';
import { Avatar, Button, ButtonVariant, Heading4, Icon } from 'components/atom';
import { useNavigate } from 'react-router-dom';
import { COLOR } from 'constants/COLOR';
import ic_nocontract from 'assets/auth/ic_nocontract.svg';
import useFetch from 'net/useFetch';
import { post, remove } from 'net/rest/api';
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
//user
const usersList = [
  {
    img: '',
    name: 'Aaysone',
    id: '@lorem',
  },
];

const BlockedUsers = () => {
  const navigate = useNavigate();

  const { data: contactData, mutate: contactMutate } = useFetch('/auth/contacts');
  const { data: blockData, error: blockError, mutate: blockMutate } = useFetch(`auth/block`);

  return (
    <NavbarLayout setting={true}>
      <HeadingWrap>
        <LeftButtonWrapper>
          <button>
            <Icon size={22} src={'/images/icon/ic-prev-22.png'} onClick={() => navigate(-1)} />
          </button>
          <Heading4>Blocked users</Heading4>
        </LeftButtonWrapper>
      </HeadingWrap>
      <ScrollWrapper>
        <ProfileListWrap>
          {blockData?.blocklist?.length === 0 ? (
            <InfoNoUsersWrap>
              <Avatar size={52} src={ic_nocontract} />
              <strong className="info_title bottom_90">No users have been blocked.</strong>
              <div className="info_box">
                <p className="info_box_title">The blocked friend infomation.</p>
                <p>1) It does not appear in the friend list.</p>
                <p>2) Blocked users cannot search for you or add you as friends.</p>
                <p>3) It does not appear in my SNS posts and comments.</p>
              </div>
              <p>
                However, you can be invited to group chat, group voice chat, and group video chat. At this time, the
                blocked friends mark is only shown to you.
              </p>
            </InfoNoUsersWrap>
          ) : (
            <div>
              <strong className="title">Blocked users</strong>
              <ProfileList>
                {blockData?.blocklist?.map((user) => (
                  <li key={user.user_id}>
                    <ProfileWrap>
                      <Avatar size={40} src={user?.friend?.profile_image} />
                      <p className="profile_title">{`${user?.target?.first_name} ${user?.target?.last_name}`}</p>
                      <p className="profile_sub">@{user?.target?.uid}</p>
                    </ProfileWrap>
                    <Button
                      className="profileListBtn"
                      type={'button'}
                      onClick={async () => {
                        remove(`/auth/block/${user.target_id}`).then(async () => {
                          await contactMutate();
                          await blockMutate();
                        });
                      }}
                      width={65}
                      height={32}
                      variant={ButtonVariant.Outlined}
                      blacklined
                    >
                      Unblock
                    </Button>
                  </li>
                ))}
              </ProfileList>
            </div>
          )}
        </ProfileListWrap>
        <GrayLineBold />

        <ProfileListWrap>
          {contactData?.length === 0 ? (
            <InfoNoUsersWrap>
              <Avatar size={52} src={ic_nocontract} />
              <strong className="info_title">No Contacts</strong>
              <p className="bottom_90">Add friends to chat with them.</p>
            </InfoNoUsersWrap>
          ) : (
            <div>
              <strong className="title">Friends</strong>
              <ProfileList>
                {contactData?.map((user, index) => (
                  <li key={index}>
                    <ProfileWrap>
                      <Avatar size={40} src={user.img} />
                      <p className="profile_title">
                        {user.custom_name || `${user.friend.first_name} ${user.friend.last_name}`}
                      </p>
                      <p className="profile_sub">@{user.friend.uid}</p>
                    </ProfileWrap>
                    <Button
                      className="profileListBtn red"
                      type={'button'}
                      onClick={() => {
                        post('auth/block', {
                          type: 'chat',
                          target_id: user.friend.id,
                        }).then(async () => {
                          await contactMutate();
                          await blockMutate();
                        });
                      }}
                      width={62}
                      height={32}
                      variant={ButtonVariant.Outlined}
                    >
                      Block
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

export default BlockedUsers;
