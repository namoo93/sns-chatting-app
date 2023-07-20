import styled from 'styled-components';
import { IconButton, Text } from 'components/atom';
import { COLOR } from 'constants/COLOR';
import { Column } from 'components/layouts';
import { useTranslation } from 'react-i18next';

const Wrapper = styled(Column)`
  padding-top: 100px;
`;

const Title = styled.p`
  font-size: 18px;
  font-weight: 500;
  line-height: 24px;
  color: ${COLOR.BLACK};
  margin: 15px 0 8px;
`;

const NoChatRoom = () => {
  const { t } = useTranslation();
  return (
    <Wrapper>
      <IconButton
        iconName={'ic_addchat'}
        width={52}
        height={52}
        iconWidth={52}
        iconHeight={52}
        onClick={() => {}}
        iconOnly
        backgroundColor={'#fff'}
      />
      <Title>{t('chats.No Chat Room')}</Title>
      <Text variant="caption_M">{t('chats.Create a chat room and chat with your friends')}</Text>
    </Wrapper>
  );
};

export default NoChatRoom;
