import React, { useState } from 'react';
import { Row } from 'components/layouts';
import styled from 'styled-components';
import { ReactComponent as SpeakerOff } from 'assets/chats/speaker_off.svg';
import { ReactComponent as SpeakerOn } from 'assets/chats/speaker_on.svg';
import { ReactComponent as VideoOff } from 'assets/chats/video_off.svg';
import { ReactComponent as VideoOn } from 'assets/chats/video_on.svg';
import { ReactComponent as MuteOff } from 'assets/chats/mute_off.svg';
import { ReactComponent as MuteOn } from 'assets/chats/mute_on.svg';
import { ReactComponent as EndCall } from 'assets/chats/end_call.svg';
import { COLOR } from 'constants/COLOR';
import { useTranslation } from 'react-i18next';

const Wrapper = styled(Row)`
  position: absolute;
  bottom: 0;
  height: 100px;
  width: 100%;
  gap: 50px;
  padding: 0 22px;

  background: #fff;
`;

const IconLabelButton = styled.button`
  width: 50px;
`;
const Label = styled.p`
  color: #bcb3c5;

  line-height: 18px;
  margin-top: 5px;
  font-size: 13px;
`;

const EndCallLabel = styled(Label)`
  color: ${COLOR.RED};
`;

export default function ChatsCallButtons() {
  const { t } = useTranslation();
  const [speaker, setSpeaker] = useState(false);
  const [video, setVideo] = useState(false);
  const [mute, setMute] = useState(false);

  return (
    <Wrapper justify="center">
      <IconLabelButton onClick={() => setSpeaker(!speaker)}>
        {speaker ? <SpeakerOn /> : <SpeakerOff />}
        <Label>{t('chats.Speaker')}</Label>
      </IconLabelButton>
      <IconLabelButton onClick={() => setVideo(!video)}>
        {video ? <VideoOn /> : <VideoOff />}
        <Label>{t('chats.Video')}</Label>
      </IconLabelButton>
      <IconLabelButton onClick={() => setMute(!mute)}>
        {mute ? <MuteOn /> : <MuteOff />}
        <Label>{t('chats.mute')}</Label>
      </IconLabelButton>
      <IconLabelButton>
        <EndCall />
        <EndCallLabel>{t('chats.End Call')}</EndCallLabel>
      </IconLabelButton>
    </Wrapper>
  );
}
