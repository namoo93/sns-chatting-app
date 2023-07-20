import React from 'react';
import styled from 'styled-components';
import { Heading6 } from 'components/atom';
import { YScrollContainer } from 'components/containers/Scroll';
import { FriendItem } from '../molecules';
import { COLOR } from 'constants/COLOR';
import { useTranslation } from 'react-i18next';

type Props = {
  data: any[];
  handleCheckedList: (id: any) => void;
  checkedList: any[];
  scrollHeight: number;
};

const Wrapper = styled.div`
  padding-top: 20px;
`;

const Head = styled(Heading6)`
  border-bottom: 1px solid ${COLOR.LIGHT_GRAY};
  padding: 0 20px 8px;
`;

export default function FriendList({ data, handleCheckedList, checkedList, scrollHeight }: Props) {
  const { t } = useTranslation();
  return (
    <Wrapper>
      <Head>{t('chats.Friends')}</Head>
      <YScrollContainer scrollHeight={scrollHeight}>
        {data.map((friend, i) => {
          return (
            <FriendItem
              key={i}
              {...friend}
              handleCheckedList={handleCheckedList}
              checked={checkedList.includes(friend.friend.id)}
            />
          );
        })}
      </YScrollContainer>
    </Wrapper>
  );
}
