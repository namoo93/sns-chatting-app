import React, { useEffect, useState } from 'react';
import { Timeline } from './components/timeline';
import styled from 'styled-components';
import TimelineHeader from './components/header/TimelineHeader';
import NavbarLayout from 'components/layouts/NavbarLayout';
import TimelineProfile from './components/timeline/TimelineProfile';
import useFetch from 'net/useFetch';
import SwrContainer from 'components/containers/SwrContainer';
import { useAtomValue } from 'jotai';
import userAtom from 'stores/userAtom';
import { useLocation } from 'react-router-dom';
// import uidAtom from 'stores/uidAtom';

const StickyWrapper = styled.div`
  position: sticky;
  top: 0;
  background-color: #fff;
  z-index: 1000;
`;

const UserTimeline = () => {
  const location = useLocation();
  const pathArr = location.pathname.split('/');
  const userInfo = pathArr[pathArr.length - 1].split('&');

  const userId = userInfo[0];
  const uid = userInfo[1];

  const userURL = `auth/users/detail?uid=${uid}`;
  const postURL = `/socials/users/${userId}/posts?page=1&limit=10`;

  const { data: postData, error: postError } = useFetch(postURL);
  const { data: userData, error: userError } = useFetch(userURL);

  const [myTimeline, setMyTimeline] = useState(false);
  const userMe = useAtomValue(userAtom);

  useEffect(() => {
    const myId = userMe && userMe.id;
    if (myId !== Number(userId)) {
      setMyTimeline(false);
    }
  }, [myTimeline, userId, userMe]);

  return (
    <SwrContainer data={postData} error={postError}>
      <NavbarLayout color={'#f8f8f8'} themeColor={false} scroll>
        <StickyWrapper>
          <SwrContainer data={userData} error={userError}>
            <TimelineHeader user={userData} myTimeline={myTimeline} />
          </SwrContainer>
        </StickyWrapper>

        <SwrContainer data={userData} error={userError}>
          <TimelineProfile myTimeline={myTimeline} user={userData} />
        </SwrContainer>

        {<Timeline data={postData} />}
      </NavbarLayout>
    </SwrContainer>
  );
};

export default UserTimeline;
