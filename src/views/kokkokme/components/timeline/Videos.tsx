import React from 'react';
import styled from 'styled-components';
import { getCenter } from 'lib/getStyle';

const Container = styled.div``;

const Video = styled.video`
  width: 100%;
  margin-bottom: 10px;
  max-width: 100%;
  max-height: 100%;
  border-radius: 10px;
  /* ${getCenter({ v: true, h: true })} */
`;

const Videos = ({ video }) => {
  console.log(video);

  return (
    <Container>
      {video?.map((videos) => (
        <Video src={videos} controls muted autoPlay />
      ))}
    </Container>
  );
};

export default Videos;
