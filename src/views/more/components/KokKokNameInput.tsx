import { useEffect, useState } from 'react';
import styled from 'styled-components';
import { Desc, ProfileInputContainer } from 'components/atom';
import TextInput from 'components/atom/input/TextInput';
import { COLOR } from 'constants/COLOR';
import { kokkokNameRegExp } from 'constants/REGEXP';
import { useTranslation } from 'react-i18next';

const NotAvailableName = styled.p`
  color: ${COLOR.RED};
  font-size: 13px;
  margin: 10px 0 5px;
  width: 100%;
`;

export const KokKokNameInput = ({ kokkokName, onChange }) => {
  const { t } = useTranslation();
  const [isValidName, setIsValidName] = useState<boolean>(true);
  const [errorMsg, setErrorMsg] = useState('');

  useEffect(() => {
    // kokkokName 중복 확인 필요

    if (kokkokName.length < 2) {
      setErrorMsg(`${t('setting.ID must have at least 2 characters')}`);
      setIsValidName(false);
    } else if (kokkokName.length > 40) {
      setErrorMsg(`${t('setting.ID cannot be used more than 40 characters')}`);
      setIsValidName(false);
    } else if (!kokkokNameRegExp.test(kokkokName)) {
      setErrorMsg(`${t('setting.ID can only use letters, numbers, underscores and periods')}`);
      setIsValidName(false);
      kokkokNameRegExp.lastIndex = 0;
    } else {
      setErrorMsg('');
      setIsValidName(true);
    }
  }, [kokkokName]);

  return (
    <ProfileInputContainer>
      <TextInput
        fontSize={16}
        placeholder={`${t('sign-up.Kok Kok Name')}`}
        value={kokkokName}
        valid={isValidName}
        onChange={onChange}
      />
      <NotAvailableName>{errorMsg}</NotAvailableName>
      <Desc>{t('sign-up.Kok Kok Name will be shown on your profile and searched by others')}</Desc>
    </ProfileInputContainer>
  );
};
