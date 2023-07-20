import {getCenter} from 'lib/getStyle';
import {useRef, useEffect} from 'react';
import styled from 'styled-components';

type Props = {
  mediaStream: MediaStream | undefined;
};

const Video = styled.video`
  width: 100%;
  height: 100%;
  ${getCenter({v: true, h: true})}
`;

export function RTCStream({mediaStream}: Props) {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (!videoRef.current) return;
    videoRef.current.srcObject = mediaStream ? mediaStream : null;
  }, [mediaStream]);

  return <Video ref={videoRef} autoPlay controls={false} />;
}
