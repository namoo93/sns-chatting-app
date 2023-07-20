import { useCallback, useContext, useEffect, useState } from 'react';
import styled from 'styled-components';
import { useLocation, useNavigate } from 'react-router-dom';
import { v4 as uuid } from 'uuid';
import { COLOR } from 'constants/COLOR';
import { AuthContainer } from 'components/containers';
import { Icon } from 'components/atom/images';
import ic_activation from 'assets/auth/ic_activation.svg';
import ic_phone from 'assets/auth/ic-phone.svg';
import { CountDownTimer, Dialog } from 'components/molecules';
import { Button, ButtonVariant } from 'components/atom';
import { ModalContext } from 'contexts';
import { post, rememberToken } from '../../net/rest/api';
import Certification from '../../types/auth/Certification';
import userAtom from '../../stores/userAtom';
import { useAtom } from 'jotai';
import tokenAtom from '../../stores/tokenAtom';
import CertificationPayload from '../../types/auth/CertificationPayload';
import { useCookies } from 'react-cookie';
import { useTranslation } from 'react-i18next';

const Wrapper = styled.div`
  padding-top: 70px;
  text-align: center;
  display: flex;
  width: 100%;
  flex-direction: column;
  align-items: center;
`;

const InfoBox = styled.div`
  margin-top: 12px;
  margin-bottom: 12px;
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Title = styled.p`
  font-size: 20px;
  font-weight: bold;
  line-height: 1.3;
  letter-spacing: normal;
  text-align: center;
  color: ${COLOR.BLACK};
`;

const ActivationTitle = styled.p`
  font-size: 15px;
  font-weight: 500;
  color: ${COLOR.BLACK};
`;

const ActivationNumber = styled.p`
  font-size: 15px;
  font-weight: 500;
  color: ${COLOR.BLACK};
`;

const ActivationIcon = styled(Icon)`
  margin-top: 10px;
  width: 70px;
  height: 70px;
`;

const ActivationDesc = styled.span`
  margin-top: 7px;
  font-size: 13px;
  line-height: 1.57;
  font-weight: normal;
  text-align: center;
  color: ${COLOR.TEXT_GRAY};
`;

const BottomDesc = styled.div`
  margin-top: 70px;
  margin-bottom: 23px;
  display: flex;
  justify-content: center;
`;

const DescButton = styled.button`
  font-size: 13px;
  font-weight: normal;
  text-align: center;
  color: #bbb; ;
`;

const ResendCodeBtn = styled.button`
  margin-top: 47px;
  margin-bottom: 23px;
  font-size: 14px;
  line-height: 1.86;
  text-align: center;
  text-decoration: underline;
  color: ${COLOR.TEXT_GRAY};
`;

const CountDownTimerWrapper = styled.div`
  font-size: 13px;
  margin-top: 10px;
`;

const StyledForm = styled.form`
  display: flex;
  justify-content: space-between;
  width: 252px;
  position: relative;
`;

const OTPSingleInput = styled.input`
  width: 40px;
  height: 50px;
  padding: 12px 12px;
  border-radius: 4px;
  border: solid 1px #ededed;
  background-color: #fff;
  font-size: 20px;
  font-weight: bold;
  color: ${COLOR.BLACK};
`;

const FormBottom = styled.div`
  position: relative;
  width: 100%;

  span {
    left: 15px;
    top: 10px;
    position: absolute;
    font-size: 13px;
    line-height: normal;
    text-align: center;
    color: #f00;
  }
`;

export const VerificationAccount = () => {
  const { t } = useTranslation();
  const [cookies] = useCookies(['machineId']);
  const { openModal, closeModal } = useContext(ModalContext);
  const navigate = useNavigate();
  const location = useLocation();
  const [, setUser] = useAtom(userAtom);
  const [, setToken] = useAtom(tokenAtom);
  const { contact, formattedPhoneNumber }: any = location.state;
  const [restart, setRestart] = useState(false);

  const [OTPState, setOTPState] = useState({
    value: '',
    otp1: '',
    otp2: '',
    otp3: '',
    otp4: '',
  });
  const [error, setError] = useState<boolean>();

  const cert = useCallback(async () => {
    let device_id = localStorage.getItem('device_id');
    if (!device_id) {
      alert('no device id');
      return;
    }
    // TODO: 타입 오류로 인해 임시로 any 처리 했음 추후 확인 후 수정 필요
    const data = await post<Certification, CertificationPayload>(
      '/pub/auth/certification',
      {
        contact,
        code: OTPState.value,
        device_id: cookies.machineId || uuid().toString(),
        device_name: navigator.userAgent,
        mode: 'dev',
      },
      null,
      (error) => {
        // Todo_lang (누락)
        if (error.response.data === '번호 인증 성공! 존재하지 않는 계정입니다.(회원가입필요)') {
          navigate(`/auth/sign-up/profile-enroll`, {
            replace: true,
            state: { contact },
          });
        } else if (error.response.data === '인증정보가 존재하지 않습니다. 인증번호를 신청해주세요.') {
          setError(true);
        }
      },
    );

    if (data) {
      setUser(data.user);
      setToken(data.token.token);
      rememberToken(data.token.token);
      navigate('/chats');
    } else {
      // alert('Error : Unknown data');
    }
  }, [OTPState.value, contact, navigate, setToken, setUser]);

  const certSMS = useCallback(async () => {
    // TODO: 타입 확인 필요
    const data = await post<any, any>('/pub/auth/sms-certification', {
      contact,
      mode: 'dev',
    });
    if (data) {
      closeModal();
      alert(data.code);
      setRestart(false);
    } else {
      // alert('Error : Unknown data');
    }
  }, [closeModal, contact]);

  useEffect(() => {
    if (OTPState.value.length === 4) {
      let device_id = localStorage.getItem('device_id');
      device_id && cert();
    }
  }, [OTPState, cert]);

  const Inputfocus = (el) => {
    if (el.key === 'Delete' || el.key === 'Backspace') {
      const next = el.target.tabIndex - 2;
      if (next > -1) {
        el.target.form.elements[next].focus();
      }
    } else {
      const next = el.target.tabIndex;
      if (next < 5) {
        el.target.form.elements[next].focus();
      }
    }
  };

  const onSubmit = () => {
    setOTPState({
      ...OTPState,
      value: OTPState.otp1.concat(OTPState.otp2, OTPState.otp3, OTPState.otp4),
    });
  };

  return (
    <AuthContainer>
      <Wrapper>
        <Title>{t('sign-up.Verification Account')}</Title>
        <ActivationIcon size={70} src={ic_activation}></ActivationIcon>
        <InfoBox>
          <ActivationTitle>{t('sign-up.Activation code was sent to')}</ActivationTitle>
          <ActivationNumber>{formattedPhoneNumber}</ActivationNumber>
          <ActivationDesc>{t('sign-up.Enter active code from SMS you received')}. </ActivationDesc>
          <CountDownTimerWrapper>
            <CountDownTimer mm={1} ss={0} restart={restart} />
          </CountDownTimerWrapper>
        </InfoBox>
        <StyledForm>
          <OTPSingleInput
            name="otp1"
            type="text"
            value={OTPState.otp1}
            onChange={(e) => {
              setOTPState({
                ...OTPState,
                [e.target.name]: e.target.value,
              });
            }}
            tabIndex={1}
            maxLength={1}
            onKeyUp={(e) => Inputfocus(e)}
          />
          <OTPSingleInput
            name="otp2"
            type="text"
            value={OTPState.otp2}
            onChange={(e) => {
              setOTPState({
                ...OTPState,
                [e.target.name]: e.target.value,
              });
            }}
            tabIndex={2}
            maxLength={1}
            onKeyUp={(e) => Inputfocus(e)}
          />
          <OTPSingleInput
            name="otp3"
            type="text"
            value={OTPState.otp3}
            onChange={(e) => {
              setOTPState({
                ...OTPState,
                [e.target.name]: e.target.value,
              });
            }}
            tabIndex={3}
            maxLength={1}
            onKeyUp={(e) => Inputfocus(e)}
          />
          <OTPSingleInput
            name="otp4"
            type="text"
            value={OTPState.otp4}
            onChange={(e) => {
              setOTPState({
                ...OTPState,
                [e.target.name]: e.target.value,
              });
            }}
            tabIndex={4}
            maxLength={1}
            onKeyUp={(e) => Inputfocus(e)}
          />
        </StyledForm>
        <FormBottom>
          {error && <span>{t('sign-up.Invalid activation code Please check and try again')}</span>}
          <ResendCodeBtn
            onClick={() => {
              openModal(
                <Dialog
                  isConfirm
                  title={contact}
                  titleDesc={'Activation code was sent to'}
                  onClick={() => {
                    certSMS();
                    setRestart(true);
                    if (OTPState.value) {
                      setOTPState({
                        value: '',
                        otp1: '',
                        otp2: '',
                        otp3: '',
                        otp4: '',
                      });
                    }
                  }}
                />,
              );
            }}
          >
            {t('sign-up.Resend code')}
          </ResendCodeBtn>
        </FormBottom>

        <BottomDesc>
          <Icon size={20} src={ic_phone} inline></Icon>
          <DescButton
            onClick={() => {
              navigate('/auth/sign-up');
            }}
          >
            {t('sign-up.Using another number')}
          </DescButton>
        </BottomDesc>

        <Button
          className={'string'}
          type={'button'}
          height={60}
          onClick={onSubmit}
          fontSize={18}
          fullWidth
          variant={ButtonVariant.Default}
          margin={10}
          inactive={!OTPState.otp1 || !OTPState.otp2 || !OTPState.otp3 || !OTPState.otp4}
          borderRadius
        >
          {t('button-common.Next')}
        </Button>
      </Wrapper>
    </AuthContainer>
  );
};
