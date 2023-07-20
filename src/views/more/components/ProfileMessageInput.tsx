import { Desc, ProfileInputContainer } from 'components/atom';
import TextInput from 'components/atom/input/TextInput';
import { useTranslation } from 'react-i18next';

export const ProfileMessageInput = ({ profileMsg, onChange }) => {
  const { t } = useTranslation();
  return (
    <ProfileInputContainer>
      <TextInput fontSize={16} placeholder="Profile Message" value={profileMsg} onChange={onChange} />
      <Desc>{t('sns.Any detail such as age, occupation or city')}</Desc>
    </ProfileInputContainer>
  );
};
