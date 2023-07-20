import React, { useCallback, useContext, useState } from 'react';
import { ModalContext } from 'contexts';
import styled, { css } from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { COLOR } from 'constants/COLOR';
import { RADIUS } from 'constants/RADIUS';
import { Icon } from 'components/atom/images';
import logo from 'assets/landing/logo.png';
import { ContrySelect, IconButton } from 'components/atom';
import TextInput from 'components/atom/input/TextInput';
import { COUNTRIES_DATA } from 'data/countriesData';
import MainLayout from 'components/layouts/MainLayout';
import { Center } from 'components/layouts';
import parsePhoneNumber from 'libphonenumber-js';
import Padding from 'components/containers/Padding';
import { post } from '../../net/rest/api';
import { useTranslation } from 'react-i18next';
// import SmsCertification from '../../types/auth/SmsCertification';
// import SmsCertificationPayload from '../../types/auth/SmsCertificationPayload';

const Description = styled.p`
  color: ${COLOR.BLACK};
  font-size: 14px;
  line-height: normal;
  font-weight: normal;
  letter-spacing: normal;
  margin-top: 15px;
  margin-bottom: 40px;
`;
const Inner = styled.div`
  position: relative;
  width: 390px;
  height: 640px;
`;
const Wrapper = styled.div`
  padding-top: 90px;
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
`;
const SignInButton = styled.button<{ regist?: boolean }>`
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
      `
    );
  }}
`;
const FormInlineBox = styled.div`
  position: relative;
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
const ButtonContainer = styled.div`
  position: absolute;
  bottom: 0;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
`;
const BackButton = styled.button`
  margin: 40px;
  text-decoration: underline;
  color: ${COLOR.POINT_GRAY};
  font-size: 14px;
`;
const InvalidPhoneNumber = styled.p`
  color: red;
  font-size: 13px;
  margin-left: 35px;
`;

function SMS() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [phoneNumber, setPhoneNumber] = useState('');
  const [countryCode, setCountryCode] = useState('');
  const { closeModal } = useContext(ModalContext);

  // * Tel Url (Not format)
  const _phoneNumber = parsePhoneNumber(`+${countryCode}${phoneNumber}`)?.number;

  // * Formatted PhoneNumber
  const formattedPhoneNumber = parsePhoneNumber(`+${countryCode}${phoneNumber}`)?.formatInternational();

  const certSMS = useCallback(async () => {
    try {
      // TODO 타입 지정
      const data = await post<any, any>('/pub/auth/sms-certification', {
        contact: formattedPhoneNumber?.replace(/\s/gi, '') || '',
        mode: 'dev',
      });
      if (data) {
        navigate(`/auth/sign-in/verification`, {
          state: { contact: formattedPhoneNumber, formattedPhoneNumber },
        });
        alert(data.code);
        closeModal();
      } else {
        // alert('Error : Unknown data');
      }
    } catch (error) {
      alert('Login Error');
    }
  }, [closeModal, formattedPhoneNumber, navigate, phoneNumber]);

  // * PhoneNumber inValid
  const isValidPhoneNumber = parsePhoneNumber(`+${countryCode}${phoneNumber}`)?.isValid();

  return (
    <MainLayout>
      <Center>
        <Inner>
          <Wrapper>
            <Icon src={logo} size={100} />
            <div className="p-2" />
            <Description>{t('sign-in.You can log in with your mobile phone number')}</Description>
            <Padding>
              <FormInlineBox>
                <ContrySelect
                  options={COUNTRIES_DATA}
                  iconName={'ic-phone-16'}
                  width={80}
                  onChange={(e) => setCountryCode(e.target.value)}
                />
                <TextInput
                  width={270}
                  placeholder="Phone number"
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
              <InvalidPhoneNumber>
                {phoneNumber === ''
                  ? ''
                  : isValidPhoneNumber
                  ? ' '
                  : `${t('sign-in.Please enter a valid phone number')}`}
              </InvalidPhoneNumber>
            </Padding>
          </Wrapper>
          <ButtonContainer>
            <SignInButton
              className="w-11/12"
              regist={!!phoneNumber}
              onClick={() => {
                _phoneNumber && certSMS();
              }}
            >
              {t('button-common.Next')}
            </SignInButton>
            <div style={{ padding: 30 }} />
            <BackButton onClick={() => navigate(-1)}>{t('button-common.Back')}</BackButton>
          </ButtonContainer>
        </Inner>
      </Center>
    </MainLayout>
  );
}

export default SMS;
