import React from 'react';
import styled from 'styled-components';
import { PrevHeader } from 'components/molecules';
import { MediaContents } from './components/molecules';

const Wrapper = styled.div`
  width: 100%;
  padding: 0 15px;
`;

const dummy = [
  {
    timestamp: 'Jan 3, 2022',
    medias: [
      {
        type: 'image',
        contents: [
          {
            src: '/images/chats/image_ex.png',
          },
          {
            src: '/images/chats/image_ex.png',
          },
          {
            src: '/images/chats/image_ex.png',
          },
          {
            src: '/images/chats/image_ex.png',
          },
        ],
      },
      {
        type: 'image',
        contents: [
          {
            src: '/images/chats/image_ex.png',
          },
        ],
      },
      {
        type: 'video',
        contents: [
          {
            src: '/images/chats/video_ex.mp4',
          },
        ],
      },
    ],
  },
];

export default function ChatsRoomMedia() {
  return (
    <Wrapper>
      <PrevHeader title="Media" border onClick={() => window.close()} />
      {dummy.map((el, i) => {
        return <MediaContents {...el} key={i} />;
      })}
    </Wrapper>
  );
}
