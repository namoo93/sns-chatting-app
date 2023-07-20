import { useEffect, useRef } from 'react';
import styled from 'styled-components';
import { useParams } from 'react-router-dom';
import { useMutation, useQueryClient } from 'react-query';
import { postSendMessage } from 'modules/chats/rooms/api';

type Props = {
  value: string;
  setValue: (value: string) => void;
  setPage: (page: number) => void;
  stickerUrl?: string;
  handleStickersVisible: () => void;
};

const Textarea = styled.textarea`
  flex: 1;
  outline: none;
  border: none;
  resize: none;
  height: 22px;
  line-height: 22px;
  &::placeholder {
    line-height: 22px;
  }
  &::-webkit-scrollbar {
    display: none;
  }
`;

export function MessageTextarea({ value, setValue, setPage, stickerUrl, handleStickersVisible }: Props) {
  const ref = useRef<HTMLTextAreaElement>(null);
  const { room_id } = useParams();

  useEffect(() => {
    if (ref && ref.current) {
      ref.current?.focus();
      ref.current.style.height = `1px`;
      ref.current.style.height = `${ref.current.scrollHeight < 111 ? ref.current.scrollHeight : 110}px`;
    }
  }, [value, ref, stickerUrl]);

  const queryClient = useQueryClient();

  const sendMessageMutation = useMutation(postSendMessage, {
    onSuccess: (data) => {
      queryClient.invalidateQueries(['getMessages']);
    },
    onError: (e: any) => {},
  });

  return (
    <Textarea
      ref={ref}
      placeholder={'Message'}
      value={value}
      onChange={(e) => setValue(e.target.value)}
      onKeyDown={(e) => {
        if (e.keyCode === 13 && !e.shiftKey) {
          e.preventDefault();
          if (stickerUrl) {
            room_id &&
              sendMessageMutation.mutate({
                room_id,
                content: stickerUrl,
              });
            handleStickersVisible();
          }
          if (value) {
            room_id &&
              sendMessageMutation.mutate({
                room_id,
                content: value,
              });
            setValue('');
          }
          return;
        }
      }}
    />
  );
}
