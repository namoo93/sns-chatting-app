import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { IconTypeButton } from 'components/atom';
import { ReactComponent as Add } from 'assets/chats/ic_add.svg';
import { ReactComponent as Spotlight } from 'assets/chats/ic_spotlight.svg';
import { ReactComponent as Tile } from 'assets/chats/ic_tile.svg';
import { ChatsCallButtons } from './components/molecules';
import { CallSpotlight, CallTile } from './components/organisms';
import { useTranslation } from 'react-i18next';

const Wrapper = styled.div`
  width: 100%;
  height: 100%;
  &::before {
    z-index: 1;
    content: '';
    display: block;
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    opacity: 0.5;
    background-image: linear-gradient(to bottom, #000, rgba(0, 0, 0, 0) 50%);
  }
`;

const AddFriendsButton = styled(IconTypeButton)`
  position: absolute;
  top: 25px;
  left: 15px;
  z-index: 9;
`;

const LayoutButton = styled(IconTypeButton)`
  position: absolute;
  top: 25px;
  right: 15px;
  z-index: 9;
  @media (max-width: 1023px) {
    display: none;
  }
`;

const dummy = {
  users: [
    {
      uid: '1',
      name: 'Boummaly Sayasone',
      profile_image: '/images/chats/profile_image_ex.png',
    },
    {
      uid: '2',
      name: 'Boummaly Sayasone',
      profile_image: '/images/chats/profile_image_ex2.png',
    },
    {
      uid: '3',
      name: 'Boummaly Sayasone',
      profile_image: '/images/chats/profile_image_ex3.png',
    },
    {
      uid: '4',
      name: 'Boummaly Sayasone',
      profile_image: '/images/chats/profile_image_ex4.png',
    },
    {
      uid: '5',
      name: 'Boummaly Sayasone',
      profile_image: '/images/chats/profile_image_ex4.png',
    },
    {
      uid: '6',
      name: 'Boummaly Sayasone',
      profile_image: '/images/chats/profile_image_ex4.png',
    },
    {
      uid: '7',
      name: 'Boummaly Sayasone',
      profile_image: '/images/chats/profile_image_ex4.png',
    },
    {
      uid: '8',
      name: 'Boummaly Sayasone',
      profile_image: '/images/chats/profile_image_ex4.png',
    },
    {
      uid: '9',
      name: 'Boummaly Sayasone',
      profile_image: '/images/chats/profile_image_ex4.png',
    },
  ],
};

export default function ChatsCall() {
  const { t } = useTranslation();
  const [localStream, setLocalStream] = useState<MediaStream>();
  const [windowWidth, setWindowWidth] = useState(0);
  const [tileLayout, setTileLayout] = useState(false);

  const getMedia = async (constraints) => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia(constraints);
      setLocalStream(stream);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    console.log(document.body.clientWidth);
    setWindowWidth(document.body.clientWidth);
    window.addEventListener('resize', () => {
      setWindowWidth(document.body.clientWidth);
      if (document.body.clientWidth < 1024) {
        setTileLayout(false);
      }
    });
  }, []);

  useEffect(() => {
    getMedia({
      video: true,
      audio: false,
    });
  }, []);

  return (
    <Wrapper>
      <AddFriendsButton>
        <Add />
      </AddFriendsButton>
      <LayoutButton
        onClick={() => {
          setTileLayout(!tileLayout);
        }}
      >
        {!tileLayout ? <Tile /> : <Spotlight />}
      </LayoutButton>
      {tileLayout ? (
        <CallTile data={dummy} localStream={localStream} />
      ) : (
        <CallSpotlight data={dummy} localStream={localStream} windowWidth={windowWidth} />
      )}
      <ChatsCallButtons />
    </Wrapper>
  );
}
