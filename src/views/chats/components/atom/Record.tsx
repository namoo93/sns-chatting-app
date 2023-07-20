import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { ReactMic } from 'react-mic';
import { v4 as uuidv4 } from 'uuid';
import { IconTypeButton } from 'components/atom';
import { Row } from 'components/layouts';
import { ReactComponent as Stop } from 'assets/chats/ic_stop.svg';
import { uploadS3 } from 'lib/uploadS3';
import { secondsToTimestamp } from 'lib/time';

type Props = {
  setAudioUrl: (url: string) => void;
};

const Wrapper = styled(Row)`
  background-color: #f8f8f8;
  padding: 0 18px;
  flex: 1;
  border-radius: 23px;
  .sound-wave {
    height: 36px;
    width: calc(100% - 82px);
  }
`;

const StopButton = styled(IconTypeButton)`
  border-radius: 50%;
  margin-right: 14px;
  svg {
    stroke: #262525;
    path {
      fill: #262525;
    }
  }
`;

const Timestamp = styled.p`
  font-size: 13px;
  color: #bbb;
  margin-left: 14px;
`;

export function Record({ setAudioUrl }: Props) {
  const [recordReady, setRecordReady] = useState(false);
  const [duration, setDuration] = useState(0);

  useEffect(() => {
    let id;
    if (recordReady) {
      const count = () => {
        setDuration(duration + 1);
      };
      id = setInterval(count, 1000);
      return () => clearInterval(id);
    }
  }, [recordReady, duration]);
  useEffect(() => {
    setRecordReady(true);
  }, []);

  const onData = (recordedBlob) => {
    console.log('chunk of real-time data is: ', recordedBlob);
  };

  const onStop = async (recordedBlob) => {
    const file = new File([recordedBlob.blob], `${uuidv4()}`, {
      type: recordedBlob.options.mimeType,
    });
    const res = await uploadS3(file);
    if (res.location) {
      setAudioUrl(res.location);
      setRecordReady(false);
    }
  };

  return (
    <Wrapper>
      <StopButton onClick={() => setRecordReady(false)}>
        <Stop />
      </StopButton>
      <ReactMic
        record={recordReady}
        className="sound-wave"
        onStop={onStop}
        onData={onData}
        strokeColor="#262525"
        backgroundColor="#f8f8f8"
      />
      <Timestamp>{secondsToTimestamp(duration)}</Timestamp>
    </Wrapper>
  );
}
