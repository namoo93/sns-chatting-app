import { useState, useContext } from 'react';
import styled, { css } from 'styled-components';
import { useLocation } from 'react-router-dom';
import { COLOR } from 'constants/COLOR';
import { RADIUS } from 'constants/RADIUS';
import { AuthContainer } from 'components/containers';
import { Icon } from 'components/atom/images';
import logo from 'assets/landing/logo.png';
import { IconButton } from 'components/atom';
import TextInput from 'components/atom/input/TextInput';
import { toast } from 'react-toastify';
import { Dialog } from 'components/molecules';
import { ModalContext } from 'contexts';
import { useTranslation } from 'react-i18next';

const Wrapper = styled.div`
  padding-top: 90px;
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Description = styled.p`
  color: ${COLOR.BLACK};
  font-size: 14px;
  line-height: normal;
  font-weight: normal;
  letter-spacing: normal;
  margin-top: 15px;
  margin-bottom: 40px;
`;

const RegisterButton = styled.button<{ regist?: boolean }>`
  width: 100%;
  height: 60px;
  background: ${COLOR.GRAY};
  color: #fff;
  font-size: 18px;
  font-weight: bold;
  border-radius: ${RADIUS.MD}px;
  ${({ regist }) => {
    return (
      regist &&
      css`
        background: ${COLOR.PRIMARY};
        margin-bottom: 10px;
      `
    );
  }}
`;

const FormInlineBox = styled.div`
  position: relative;
  width: 330px;
  display: flex;
  div:nth-child(1) {
    margin-right: 10px;
  }
`;

const StyledIcon = styled(IconButton)`
  position: absolute;
  top: 50%;
  right: 0;
  transform: translateY(-50%);
`;

const BottomDesc = styled.div`
  position: absolute;
  width: 300px;
  bottom: 30px;
  left: 50%;
  transform: translateX(-50%);
  font-size: 12px;
  color: ${COLOR.TEXT_GRAY};
`;

const DescButton = styled.button`
  font-size: 12px;
  padding: 0 2px;
  text-decoration: underline;
  color: ${COLOR.PRIMARY};
`;
const InvalidEmail = styled.p`
  color: red;
  font-size: 13px;
  height: 13px;
  margin-bottom: 50px;
  width: 100%;
  text-align: left;
`;
const EmailTextInput = styled(TextInput)<{ valid: boolean }>`
  border-bottom-color: ${({ valid }) => (valid ? '' : COLOR.RED)};
`;
type PageType = {
  route: string;
};
export const EmailInput = () => {
  const { t } = useTranslation();
  const { openModal } = useContext(ModalContext);
  const [email, setEmail] = useState('');
  const location = useLocation();
  //@ts-ignore
  const [pages] = useState<PageType>(location.state ?? { route: 'register' });
  const { route } = pages;

  const regex = /[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*.[a-zA-Z]$/i;

  const onRegister = () => {
    if (!handleValidation()) {
      return;
    }
    openModal(
      <Dialog
        titleDesc={`${t('setting.Confirm E-mail')}`}
        title={email}
        text={`${t('setting.An activation code will be sent to this E-mail')}`}
        onClick={() => {}}
      />,
    );
  };

  const handleValidation = () => {
    if (!regex.test(email)) {
      //Todo_lang (누락)
      toast('Invalid E-mail', { type: 'error' });
      return false;
    }
    return true;
  };

  return (
    <AuthContainer>
      <Wrapper>
        <Icon src={logo} size={100} />
        {route === 'register' ? (
          <Description>{t('setting.Enter your E-mail to register E-mail')}</Description>
        ) : (
          <Description>{t('setting.Enter your new E-mail to change E-mail')}</Description>
        )}
        <FormInlineBox>
          <EmailTextInput
            width={330}
            type="text"
            placeholder="E-mail"
            onChange={(e) => setEmail(e.target.value)}
            value={email}
            valid={regex.test(email) || email === ''}
          />
          {email && (
            <StyledIcon
              iconName={'ic_close'}
              width={15}
              height={15}
              iconWidth={15}
              iconHeight={15}
              onClick={() => {
                setEmail('');
              }}
              borderRadiusRound
              iconOnly
              backgroundColor={`${COLOR.GRAY}`}
            />
          )}
        </FormInlineBox>
        <InvalidEmail>
          {regex.test(email) || email === '' ? ' ' : `${t('setting.Please enter a valid email address')}`}
        </InvalidEmail>
        <RegisterButton
          regist={!!email && regex.test(email)}
          onClick={() => {
            onRegister();
          }}
        >
          {t('button-common.NEXT')}
        </RegisterButton>
        <BottomDesc>
          {t('setting.By continuing, you agree to kokkok Terms of Service')}
          <DescButton
            onClick={() => {
              alert('[TODO]: 고객사 약관 Notion 이동');
            }}
          >
            kokkok
          </DescButton>
        </BottomDesc>
      </Wrapper>
    </AuthContainer>
  );
};
