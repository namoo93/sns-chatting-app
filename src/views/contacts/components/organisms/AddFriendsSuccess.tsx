import styled from 'styled-components';
import { Avatar } from 'components/atom';
import { useTranslation } from 'react-i18next';

const Container = styled.div`
  padding: 0 30px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Label = styled.p`
  font-size: 16px;
  margin-top: 60px;
  margin-bottom: 40px;
  font-weight: 500;
  line-height: 1.38;
  color: #262525;
`;

const TextBox = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  span:nth-child(1) {
    margin-top: 12px;
    font-size: 18px;
    font-weight: 500;
    color: #262525;
  }
  span:nth-child(2) {
    margin-top: 3px;
    font-size: 13px;
    color: #bcb3c5;
  }
  span:nth-child(3) {
    margin-top: 7px;
    font-size: 13px;
    color: #999;
  }
`;

export const AddFriendsSuccess = ({ profile }) => {
  const { t } = useTranslation();
  const profile_image: string = profile?.profile_image === 'null' ? '' : (profile?.profile_image as string);
  return (
    <Container>
      <Label>{t('contact.Successfully added')}</Label>
      <Avatar size={120} src={profile_image} />
      <TextBox>
        <span>{`${profile?.first_name} ${profile?.last_name}`}</span>
        <span>{profile?.uid}</span>
        <span>{profile?.profile_message}</span>
      </TextBox>
    </Container>
  );
};
