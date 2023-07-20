import React, { useRef, useState } from 'react';
import styled from 'styled-components';
import { Row } from 'components/layouts';
import { IconTypeButton } from 'components/atom';
import { ReactComponent as Play } from 'assets/chats/ic_play.svg';
import { useWavesurfer } from 'hooks';
import { secondsToTimestamp } from 'lib/time';

type Props = {
  url: string;
  theme?: 'light' | 'dark';
};

type StyleProps = {
  theme?: 'light' | 'dark';
};
const Wrapper = styled(Row)<StyleProps>`
  background-color: ${({ theme }) => (theme === 'light' ? '#f8f8f8' : 'transparent')};
  padding: 7px 18px;
  flex: 1;
  border-radius: 23px;
`;

const WavesurferWrapper = styled.div`
  width: 100%;
  margin: 0 14px;
  wave {
    overflow: visible !important;
    > wave {
      width: 100% !important;
    }
    > canvas {
      position: static !important;
      width: 100% !important;
    }
  }
`;

const PlayButton = styled(IconTypeButton)<StyleProps>`
  svg {
    stroke: ${({ theme }) => (theme === 'light' ? '#262525' : '#fff')};
    path {
      fill: ${({ theme }) => (theme === 'light' ? '#262525' : '#fff')};
    }
  }
`;

const Timestamp = styled.p<StyleProps>`
  font-size: 13px;
  color: ${({ theme }) => (theme === 'light' ? '#bbb' : '#fff')};
`;

export default function Wavesurfer({ url }: Props) {
  const [play, setPlay] = useState(false);
  const waveformRef = useRef<HTMLDivElement>(null);
  const wavesurfer = useRef<any>(null);
  const { playerState } = useWavesurfer({
    waveformRef,
    wavesurfer,
    url,
    play,
    setPlay,
  });
  const { duration } = playerState;

  return (
    <Wrapper theme={'light'}>
      <PlayButton theme={'light'}>
        <Play onClick={() => setPlay(true)} />
      </PlayButton>
      <WavesurferWrapper ref={waveformRef} />
      <Timestamp theme={'light'}>{secondsToTimestamp(duration)}</Timestamp>
    </Wrapper>
  );
}
