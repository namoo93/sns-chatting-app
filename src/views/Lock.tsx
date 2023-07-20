import { useState } from 'react';
import styled from 'styled-components';
import { COLOR } from 'constants/COLOR';
import { AuthContainer } from 'components/containers';
import { Button, ButtonVariant, Text } from 'components/atom';
import { Icon } from 'components/atom/images';
import logo from 'assets/landing/logo.png';
import { useTranslation } from 'react-i18next';

const Wrapper = styled.div`
  padding-top: 90px;
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
`;

const ErrorText = styled(Text)`
  display: inline-block;
  width: 100%;
  text-align: left;
  height: 50px;
  padding-top: 10px;
`;

const PassCodeInput = styled.input`
  width: 100%;
  height: 48px;
  margin-top: 40px;
  border-bottom: 1px solid ${COLOR.LIGHT_GRAY};
  outline: none;
  &::placeholder {
    color: ${COLOR.GRAY};
  }
`;

const Lock = () => {
  const { t } = useTranslation();
  const [passCode, setPassCode] = useState('');
  const [error, setError] = useState(false);

  return (
    <AuthContainer>
      <Wrapper>
        <Icon src={logo} size={100} />
        <PassCodeInput
          type="password"
          placeholder={`${t('sentence-common.Enter your passcode (4-digit)')}`}
          value={passCode}
          onChange={(e) => {
            const clean = e.target.value.replace(/[^0-9]/g, '');
            if (clean.length > 4) {
              return;
            }
            setError(false);
            setPassCode(clean);
          }}
        />
        <ErrorText variant="caption_S_red">
          {error ? `${t('landing.Current passcode doesnt match Please try again')}` : ''}
        </ErrorText>
        <Button
          className={'string'}
          type={'button'}
          onClick={() => {
            setError(true);
          }}
          fontSize={18}
          fullWidth
          variant={ButtonVariant.Default}
          margin={'0 0 30px'}
          inactive={passCode.length < 4}
          borderRadius
        >
          {t('landing.Unlock')}
        </Button>
        <Text variant="caption_S">
          {t('landing.If you forget the passcode, youll need to delete and reinstall the app All chats will be lost')}
        </Text>
      </Wrapper>
    </AuthContainer>
  );
};

export default Lock;
