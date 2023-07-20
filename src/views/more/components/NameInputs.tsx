import { Desc, ProfileInputContainer } from 'components/atom';
import TextInput from 'components/atom/input/TextInput';
import { useTranslation } from 'react-i18next';

export const NameInputs = ({ firstName, lastName, onChangeFirstName, onChangeLastName }) => {
  const { t } = useTranslation();

  return (
    <ProfileInputContainer>
      <TextInput
        fontSize={16}
        marginBottom={20}
        placeholder={`${t('sign-up.First Name')}`}
        value={firstName}
        onChange={onChangeFirstName}
      />
      <TextInput fontSize={16} placeholder={`${t('sign-up.Last Name')}`} value={lastName} onChange={onChangeLastName} />
      <Desc>{t('sns.Enter your name and add an optional profile photo')}</Desc>
    </ProfileInputContainer>
  );
};
