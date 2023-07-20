import React, { useState, useEffect, useRef } from 'react';
import styled, { css } from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { COLOR } from 'constants/COLOR';
import { ReactComponent as Multiple } from 'assets/chats/ic_pictures.svg';
import { secondsToTimestamp } from 'lib/time';

type ImageNavProps = {
  width?: number;
  height?: string | number;
  multiple?: boolean;
  backgroundImage?: string;
};

const MediaImageNavWrapper = styled.div<ImageNavProps>`
  position: relative;
  background: ${({ backgroundImage }) => `url(${backgroundImage})`};
  background-size: cover;
  width: ${({ width = 100 }) => width}px;
  height: ${({ height = 100 }) => height}px;
  ${({ multiple }) => {
    return (
      multiple &&
      css`
        svg {
          position: absolute;
          right: 7px;
          bottom: 7px;
        }
      `
    );
  }}
`;
export const MediaImageNav = ({ width, height, multiple, backgroundImage }: ImageNavProps) => {
  const navigate = useNavigate();

  return (
    <MediaImageNavWrapper
      onClick={() => {
        navigate('/media-detail/1');
      }}
      width={width}
      height={height}
      backgroundImage={backgroundImage}
      multiple={multiple}
    >
      {multiple ? <Multiple /> : <></>}
    </MediaImageNavWrapper>
  );
};

export const MediaImagesNav = () => {
  return <></>;
};

type VideoNavProps = {
  width?: number;
  height?: string | number;
  src?: string;
};

const MediaVideoNavWrapper = styled.div<ImageNavProps>`
  position: relative;
  width: ${({ width = 100 }) => width}px;
  height: ${({ height = 100 }) => height}px;
  background: ${COLOR.BLACK};
`;

const MediaVideo = styled.video`
  width: 100%;
  height: 100%;
`;

const MediaVideoDuration = styled.p`
  color: #fff;
  font-size: 12px;
  position: absolute;
  bottom: 7px;
  right: 7px;
`;

export const MediaVideoNav = ({ width, height, src }: VideoNavProps) => {
  const navigate = useNavigate();
  const [duration, setDuration] = useState(0);
  const ref = useRef<HTMLVideoElement>(null);
  useEffect(() => {
    setTimeout(() => {
      setDuration(Math.floor(ref.current?.duration || 0));
    }, 100);
  }, []);
  return (
    <MediaVideoNavWrapper
      width={width}
      height={height}
      onClick={() => {
        navigate('/media-detail/1');
      }}
    >
      <MediaVideo src={src} ref={ref} />
      <MediaVideoDuration>{secondsToTimestamp(duration)}</MediaVideoDuration>
    </MediaVideoNavWrapper>
  );
};
