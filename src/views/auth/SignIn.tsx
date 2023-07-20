import { Button, ContrySelect, Icon, IconButton } from 'components/atom';
import QRCode from 'react-qr-code';
import TextInput from 'components/atom/input/TextInput';
import Padding from 'components/containers/Padding';
import { Center, Column } from 'components/layouts';
import MainLayout from 'components/layouts/MainLayout';
import { TitleHeader } from 'components/molecules';
import { useCallback, useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { COUNTRIES_DATA } from 'data/countriesData';
import { COLOR } from 'constants/COLOR';
import parsePhoneNumber from 'libphonenumber-js';
import { ModalContext } from 'contexts';
import { post } from '../../net/rest/api';
import { useTranslation } from 'react-i18next';
// import SmsCertification from '../../types/auth/SmsCertification';
// import SmsCertificationPayload from '../../types/auth/SmsCertificationPayload';

const TabContainer = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
  height: 50px;
`;
const Tab = styled.button<{ active: boolean }>`
  display: flex;
  flex: 1;
  border-bottom-width: 2px;
  justify-content: center;
  align-items: center;
`;
const TabText = styled.span<{ active: boolean }>`
  color: ${({ active }) => (active ? COLOR.PRIMARY : COLOR.BLACK)};
  font-size: 14px;
`;
const Inner = styled.div`
  position: relative;
  width: 390px;
  height: 640px;
`;
const ReloadButton = styled.button``;
const Timeout = styled.p`
  padding: 4.5px;
  font-size: 14px;
  color: ${COLOR.PRIMARY};
`;
const GuideContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
`;
const GuideText = styled.p`
  font-size: 14px; ;
`;
const CodeVerifyButton = styled.button`
  text-decoration: underline;
  font-size: 14px;
  color: ${COLOR.TEXT_GRAY};
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
  margin: 20px;
  font-size: 14px;
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
const InvalidPhoneNumber = styled.p`
  color: red;
  font-size: 13px;
  margin-left: 90px;
  height: 13px;
`;
const Description = styled.p`
  color: ${COLOR.BLACK};
  font-size: 14px;
  line-height: normal;
  font-weight: normal;
  letter-spacing: normal;
  text-align: center;
  margin-top: 20px;
  margin-bottom: 5px;
`;
const Expired = styled.p`
  color: red;
  font-size: 14px;
  padding: 4.5px;
`;
const Resend = styled.button`
  color: #999999;
  text-decoration: underline;
  font-size: 14px;
`;

function SignIn() {
  const { t } = useTranslation();
  const [active, setActive] = useState<'QR' | 'Mobile'>('QR');
  const [minutes, setMinutes] = useState(1);
  const [seconds, setSeconds] = useState(0);
  const [phoneNumber, setPhoneNumber] = useState('');
  const [contryCode, setContryCode] = useState('');
  const [status, setStatus] = useState<'none' | 'waitng'>('none');
  const { closeModal } = useContext(ModalContext);
  const [code, setCode] = useState<string>('');
  const navigate = useNavigate();

  useEffect(() => {
    const device_id = localStorage.getItem('device_id');
    const source = new EventSource(`${process.env.REACT_APP_API_HOST}pub/auth/qr-certification?device_id=${device_id}`);

    source.addEventListener('request', (e) => {
      const { code } = JSON.parse(e.data);
      setCode(code);
    });

    source.addEventListener('login', (e: any) => {
      const { token } = JSON.parse(e.data);
      localStorage.setItem('token', token);
      navigate('/chats');
    });

    return () => {
      source.close();
    };
  }, [navigate]);

  // * Tel Url (Not format)
  const _phoneNumber = parsePhoneNumber(`+${contryCode}${phoneNumber}`)?.number;

  // * PhoneNumber inValid
  const isValidPhoneNumber = parsePhoneNumber(`+${contryCode}${phoneNumber}`)?.isValid();

  // * Formatted PhoneNumber
  const formattedPhoneNumber = parsePhoneNumber(`+${contryCode}${phoneNumber}`)?.formatInternational();

  const certSMS = useCallback(async () => {
    // TODO : SmsCertification Type 확인 필요
    const data = await post<any, any>('/pub/auth/sms-certification', {
      contact: _phoneNumber?.toString() || '',
      mode: 'dev',
    });
    if (data) {
      navigate(`/auth/sign-up/verification`, {
        state: { contact: _phoneNumber, formattedPhoneNumber },
      });
      alert(data.code);
      closeModal();
    } else {
      alert('Error : Unknown error');
    }
  }, [_phoneNumber, closeModal, formattedPhoneNumber, navigate]);

  useEffect(() => {
    const countdown = setInterval(() => {
      if (seconds > 0) {
        setSeconds(seconds - 1);
      }
      if (seconds === 0) {
        if (minutes === 0) {
        } else {
          setMinutes(minutes - 1);
          setSeconds(59);
        }
      }
    }, 1000);
    return () => clearInterval(countdown);
  }, [minutes, seconds]);

  function resetTime() {
    setMinutes(1);
    setSeconds(0);
  }

  async function resetCode() {
    console.log('resetCode');
    resetTime();
  }

  async function send() {
    console.log('send request');
    setStatus('waitng');
    resetTime();
    _phoneNumber && certSMS();
  }

  async function resend() {
    console.log('resend request');
    setStatus('waitng');
    resetTime();
  }

  return (
    <MainLayout>
      <Center>
        <Inner>
          <TitleHeader title="Kokkok" />
          <TabContainer>
            <Tab
              active={active === 'QR'}
              onClick={() => {
                setActive('QR');
                setStatus('none');
              }}
            >
              <TabText active={active === 'QR'}>{t('sign-in.Scan QR')}</TabText>
            </Tab>
            <Tab
              active={active === 'Mobile'}
              onClick={() => {
                setActive('Mobile');
                setStatus('none');
              }}
            >
              <TabText active={active === 'Mobile'}>{t('sign-in.Verify by mobile device')}</TabText>
            </Tab>
          </TabContainer>
          <Padding />
          {active === 'QR' && (
            <>
              <Column>
                <Padding>
                  {minutes === 0 && seconds === 0 ? (
                    <ReloadButton onClick={() => resetCode()}>
                      <Icon size={160} src="/images/reload-code.png" />
                    </ReloadButton>
                  ) : (
                    /**@ts-ignore */
                    <QRCode value={code} size={160} />
                  )}
                </Padding>
                <Timeout>
                  {minutes}:{seconds < 10 ? `0${seconds}` : seconds}
                </Timeout>
              </Column>
              <GuideContainer>
                <Padding>
                  <GuideText>
                    {t('sign-in.Scan QR code with your Kok Kok mobile')}
                    <br />({t('sign-in.More - QR icon - Code Scan')})
                  </GuideText>
                </Padding>
                <div style={{ padding: 22.5 }} />
                <BackButton onClick={() => navigate(-1)}>Back</BackButton>
                <CodeVerifyButton onClick={() => navigate('/auth/sms')}>
                  {t('sign-in.Cant login to your Kok Kok?')}
                </CodeVerifyButton>
              </GuideContainer>
            </>
          )}
          {active === 'Mobile' && (
            <>
              <Padding>
                <GuideText>{t('sign-in.Please enter your phone number to login by mobile device')}</GuideText>
              </Padding>
              <Padding>
                <FormInlineBox>
                  <ContrySelect
                    options={COUNTRIES_DATA}
                    iconName={'ic-phone-16'}
                    width={80}
                    onChange={(e) => setContryCode(e.target.value)}
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
                    ? ''
                    : `${t('sign-in.Please enter a valid phone number')}`}
                </InvalidPhoneNumber>
                {status !== 'none' && (
                  <GuideContainer>
                    <Description>
                      {t('sign-in.A request has been sent to your Kok Kok mobile app')}
                      <br />
                      {t('sign-in.Please open application and confirm the request')}
                    </Description>
                    {minutes === 0 && seconds === 0 ? (
                      <>
                        <Expired>{t('sign-in.A request has expired')}</Expired>
                        <Resend onClick={() => resend()}>{t('sign-in.Resend Request')}</Resend>
                      </>
                    ) : (
                      <Timeout>
                        {minutes}:{seconds < 10 ? `0${seconds}` : seconds}
                      </Timeout>
                    )}
                  </GuideContainer>
                )}
              </Padding>
              <ButtonContainer>
                {status === 'none' && (
                  <Button
                    borderRadius={true}
                    variant={!!phoneNumber ? 'default' : 'gray'}
                    type="button"
                    className="w-11/12"
                    fontSize={18}
                    onClick={() => send()}
                  >
                    {t('button-common.Next')}
                  </Button>
                )}
                <div className="p-1" />
                <BackButton
                  onClick={() => {
                    if (status === 'none') {
                      navigate(-1);
                    } else {
                      setStatus('none');
                    }
                  }}
                >
                  {t('button-common.Back')}
                </BackButton>
                {status === 'none' && (
                  <CodeVerifyButton onClick={() => navigate('/auth/sms')}>
                    {t('sign-in.Cant login to your Kok Kok?')}
                  </CodeVerifyButton>
                )}
                <div className="p-5" />
              </ButtonContainer>
            </>
          )}
        </Inner>
      </Center>
    </MainLayout>
  );
}

export default SignIn;
