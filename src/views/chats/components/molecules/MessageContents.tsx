import { useState, useRef, useEffect } from 'react';
import styled from 'styled-components';
import { IconTypeButton } from 'components/atom';
import { Row } from 'components/layouts';
import { MessageTextarea } from '../atom';
import RecordContents from './RecordContents';

type Props = {
  handleStickersVisible: () => void;
  setPage: (page: number) => void;
  stickerUrl: string;
};

const Wrapper = styled(Row)`
  width: 100%;
  padding: 18px 20px;
  background: #fff;
`;

const MediaButton = styled(IconTypeButton)`
  margin-right: 20px;
`;
const StickerButton = styled(IconTypeButton)`
  margin: 0 18px;
`;

export default function MessageContents({ handleStickersVisible, setPage, stickerUrl }: Props) {
  const ref = useRef<HTMLTextAreaElement>(null);
  const [value, setValue] = useState<string>('');
  const [record, setRecord] = useState(false);
  useEffect(() => {
    if (ref.current) {
      ref.current?.focus();
      ref.current.style.height = `1px`;
      ref.current.style.height = `${ref.current.scrollHeight < 111 ? ref.current.scrollHeight : 110}px`;
    }
  }, [value, ref]);

  return record ? (
    <RecordContents setRecord={setRecord} />
  ) : (
    <Wrapper align={'end'}>
      <MediaButton iconSrc={'/chats/ic_plus'} iconType={'svg'} size={22} />
      <MessageTextarea
        value={value}
        setValue={setValue}
        setPage={setPage}
        stickerUrl={stickerUrl}
        handleStickersVisible={handleStickersVisible}
      />
      <StickerButton
        iconSrc={'/chats/ic_sticker'}
        iconType={'svg'}
        size={22}
        onClick={() => {
          handleStickersVisible();
        }}
      />
      <IconTypeButton
        iconSrc={'/chats/ic_mic'}
        iconType={'svg'}
        size={22}
        onClick={() => {
          setRecord(true);
        }}
      />
    </Wrapper>
  );
}
