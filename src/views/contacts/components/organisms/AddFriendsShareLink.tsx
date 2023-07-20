import styled from 'styled-components';
import { Icon } from 'components/atom';
import { useTranslation } from 'react-i18next';

const Container = styled.div`
  padding: 0 30px;
  margin-top: 75px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const TextBox = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  span:nth-child(1) {
    margin-top: 15px;
    margin-bottom: 10px;
    font-size: 15px;
    font-weight: 500;
    color: #262525;
  }
  span:nth-child(2),
  span:nth-child(3) {
    width: 234px;
    font-size: 13px;
    color: #bcb3c5;
    text-align: center;
  }
`;

export const AddFriendsShareLink = ({
  src = '/images/ic-link-share.png',
  link = 'https://kokkok/-mmecrJ7MbA',
  ...props
}) => {
  const { t } = useTranslation();
  return (
    <Container {...props}>
      <Icon size={70} src={src} />
      <TextBox>
        <span>{link}</span>
        <span>{t('contact.You can share Kokkok application link with friends you want to add')}</span>
      </TextBox>
    </Container>
  );
};
