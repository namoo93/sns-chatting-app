import React, { useState } from 'react';
import styled from 'styled-components';
import { Row } from 'components/layouts';
import { IconTypeButton } from 'components/atom';
import { Wavesurfer } from 'components/molecules';
import { Record } from '../atom';
import { ReactComponent as Delete } from 'assets/chats/ic_delete.svg';
import { ReactComponent as Send } from 'assets/chats/ic_send.svg';
import { COLOR } from 'constants/COLOR';

type Props = {
  setRecord: (record: boolean) => void;
};

const Wrapper = styled(Row)`
  width: 100%;
  padding: 11px 20px;
`;

const DeleteButton = styled(IconTypeButton)`
  margin-right: 14px;
`;
const SendButton = styled(IconTypeButton)`
  fill: ${COLOR.PRIMARY};
  margin-left: 14px;
`;

export default function RecordContents({ setRecord }: Props) {
  const [audioUrl, setAudioUrl] = useState('');

  return (
    <Wrapper>
      <DeleteButton onClick={() => setRecord(false)}>
        <Delete />
      </DeleteButton>
      {audioUrl ? <Wavesurfer url={audioUrl} /> : <Record setAudioUrl={setAudioUrl} />}
      <SendButton>
        <Send />
      </SendButton>
    </Wrapper>
  );
}
