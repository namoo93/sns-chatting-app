import { useCallback, useContext, useState } from 'react';
import styled, { css } from 'styled-components';
import { useLocation, useNavigate } from 'react-router-dom';
import { COLOR } from 'constants/COLOR';
import { RADIUS } from 'constants/RADIUS';
import { AuthContainer } from 'components/containers';
import { Icon } from 'components/atom/images';
import logo from 'assets/landing/logo.png';
import { ContrySelect, IconButton } from 'components/atom';
import TextInput from 'components/atom/input/TextInput';
import { COUNTRIES_DATA } from 'data/countriesData';
import parsePhoneNumber from 'libphonenumber-js';
import { toast } from 'react-toastify';
import { Dialog } from 'components/molecules';
import { ModalContext } from 'contexts';
import { post } from '../../net/rest/api';
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
  margin-bottom: 50px;
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

export const PhoneNumberInput = () => {
  const { t } = useTranslation();
  const location = useLocation();
  const navigate = useNavigate();

  const { openModal, closeModal } = useContext(ModalContext);
  const [phoneNumber, setPhoneNumber] = useState('');
  const [contryCode, setContryCode] = useState('82');
  // @ts-ignore
  const [pages] = useState<PageType>(location.state ?? { route: 'sign-up' });
  const { route } = pages;

  // Const
  // * Tel Url (Not format)
  const _phoneNumber = parsePhoneNumber(`+${contryCode}${phoneNumber}`)?.number;

  // * PhoneNumber inValid
  const IsValidPhoneNumber = parsePhoneNumber(`+${contryCode}${phoneNumber}`)?.isValid();

  // * Formatted PhoneNumber
  const formattedPhoneNumber = parsePhoneNumber(`+${contryCode}${phoneNumber}`)?.formatInternational();

  // TODO : 22년 7월 26일 이후에도 아래 코드가 있을 경우 삭제 바람
  // const certSMS = useCallback(async () => {
  //   // TODO : SmsCertification Type 확인 필요
  //   const data = await post<any, any>('/pub/auth/sms-certification', {
  //     contact: _phoneNumber?.toString() || '',
  //     mode: 'dev',
  //   });
  //   if (data) {

  //     alert(data.code);
  //     closeModal();
  //   } else {
  //     // alert('Error : Unknown data');
  //   }
  // }, [_phoneNumber, closeModal, navigate]);

  const submit = useCallback(async () => {
    try {
      await post('/pub/auth/sms-check', {
        contact: _phoneNumber,
      });
      navigate(`/auth/sign-up/verification`, {
        state: { contact: _phoneNumber },
      });
      closeModal();
    } catch (error) {}
  }, [_phoneNumber]);

  const onRegister = () => {
    if (!handleValidation()) {
      return;
    }
    openModal(
      <Dialog
        titleDesc={`${t('sign-up.Confirm phone number')}}`}
        title={formattedPhoneNumber}
        text={`${t('sign-up.An activation code will be sent to this phone number')}}`}
        onClick={() => {
          _phoneNumber && submit();
        }}
      />,
    );
  };

  const handleValidation = () => {
    if (!IsValidPhoneNumber) {
      toast('Invalid phone number', { type: 'error' }); //Todo_lang
      return false;
    }
    return true;
  };

  return (
    <AuthContainer>
      <Wrapper>
        <Icon src={logo} size={100} />
        {route === 'sign-up' ? (
          <Description>{t('sign-up.Enter your new phone number to register new account')}</Description>
        ) : (
          <Description>{t('sign-up.Enter your new phone number to change new account')}</Description>
        )}
        <FormInlineBox>
          <ContrySelect
            options={COUNTRIES_DATA}
            iconName={'ic-phone-16'}
            width={80}
            onChange={(e) => {
              setContryCode(e.target.value);
            }}
          />
          <TextInput
            width={240}
            type="number"
            placeholder={t('sign-up.Phone number')}
            onChange={(e) => setPhoneNumber(e.target.value)}
            value={phoneNumber}
          />
          {phoneNumber && (
            <StyledIcon
              iconName={'ic_close'}
              width={15}
              height={15}
              iconWidth={15}
              iconHeight={15}
              onClick={() => {
                setPhoneNumber('');
              }}
              borderRadiusRound
              iconOnly
              backgroundColor={`${COLOR.GRAY}`}
            />
          )}
        </FormInlineBox>
        <RegisterButton
          regist={!!phoneNumber}
          onClick={() => {
            onRegister();
          }}
        >
          {t('button-common.Next')}
        </RegisterButton>
        <BottomDesc>
          {/* Todo_lang (변수처리) */}
          {t('sign-up.By continuing, you agree to kokkok Terms of Service')}
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
