import React, { useEffect, useState } from 'react';
import NavbarLayout from 'components/layouts/NavbarLayout';
import styled from 'styled-components';
import { Heading4, Icon, Select, Switch, Text } from 'components/atom';
import { useNavigate } from 'react-router-dom';
import { COLOR } from 'constants/COLOR';
import { PASSCODE_LOCAL, AUTO_LOCK_LIMIT } from 'constants/CONST';

const HeadingWrap = styled.div`
  padding: 40px 0 14px;
  text-align: center;
  border-bottom: 1px solid #eee;
`;
const LeftButtonWrapper = styled.div`
  position: relative;

  button {
    position: absolute;
    left: 14px;
  }

  .text_btn {
    width: 34px;
    left: auto;
    top: 3px;
    right: 20px;
    font-size: 14px;
    font-weight: normal;
    color: ${COLOR.PRIMARY};

    &:disabled {
      color: #ddd;
    }
  }
`;

const SideSwitchWrapper = styled.div`
  position: relative;
`;
const SideSwitch = styled.div`
  position: absolute;
  top: 50%;
  right: 0;
  transform: translateY(-10px);
`;
const GrayLine = styled.div`
  height: 1px;
  background: #eee;
`;
const Wrapper = styled.div`
  margin: 20px;
  strong {
    display: block;
    width: calc(100% - 50px);
    font-size: 14px;
    color: ${COLOR.BLACK};
    font-weight: normal;
  }
  &.margin_select {
    margin: 16px 20px;
  }
  .border_select {
    border: 1px solid #ededed;
    border-radius: 6px;

    select {
      font-size: 12px;
    }
  }
`;
const AllButtonWrapper = styled.button`
  display: flex;
  width: 100%;
  text-align: left;
  align-items: center;
  justify-content: space-between;
`;

//Text Input
const TextInputWrap = styled.div`
  margin-bottom: 20px;

  .title {
    display: block;
    font-size: 14px;
    color: ${COLOR.BLACK};
    margin-bottom: 10px;
  }
`;
const PassCodeInput = styled.input`
  width: 100%;
  height: 48px;
  border-bottom: 1px solid ${COLOR.LIGHT_GRAY};
  outline: none;

  &::placeholder {
    font-size: 16px;
    font-weight: normal;
    color: ${COLOR.GRAY};
  }
  &.error {
    border-bottom: 1px solid ${COLOR.RED};
  }
`;
const ErrorText = styled(Text)`
  display: inline-block;
  width: 100%;
  text-align: left;
  height: 50px;
  padding-top: 10px;
`;

const Passcode = () => {
  const navigate = useNavigate();

  const passcode_local = localStorage.getItem(PASSCODE_LOCAL);
  const auto_lock = localStorage.getItem(AUTO_LOCK_LIMIT);

  //pageView
  const [pageView, setPageView] = useState<'' | 'New ' | 'Change '>('');

  const [locktime, setLockTime] = useState(auto_lock);

  //passCode
  const [localCode, setLocalCode] = useState(passcode_local);
  const [passCode, setPassCode] = useState('');
  const [passCodeCheck, setPassCodeCheck] = useState('');
  const [passCodeCurrent, setPassCodeCurrent] = useState('');

  //error
  const [error, setError] = useState<boolean>(false);
  const [currentPassCodeError, setcurrentPassCodeError] = useState<boolean>(false);
  const [changePassCodeError, setchangePassCodeError] = useState<boolean>(false);

  //css
  const [checkClass, setCheckClass] = useState<string>('');
  const [currentCheckClass, setCurrentCheckClass] = useState<string>('');
  const [changeCheckClass, setChangeCheckClass] = useState<string>('');

  //top button
  const [topButton, setTopButton] = useState<boolean>(true);

  useEffect(() => {
    if (localCode) {
      //passcode 생성 / 수정
      localStorage.setItem(PASSCODE_LOCAL, localCode);
      localStorage.setItem(AUTO_LOCK_LIMIT, '5');
    }
    if (!localCode) {
      //passcode 삭제
      localStorage.removeItem(PASSCODE_LOCAL);
      localStorage.removeItem(AUTO_LOCK_LIMIT);
    }
    if (localCode && locktime) {
      localStorage.setItem(AUTO_LOCK_LIMIT, locktime);
    }
  }, [localCode, locktime]);

  const resetInputs = () => {
    setPassCode('');
    setPassCodeCheck('');
    setPassCodeCurrent('');
    setError(false);
    setcurrentPassCodeError(false);
    setchangePassCodeError(false);
    setCheckClass('');
    setCurrentCheckClass('');
    setChangeCheckClass('');
    setTopButton(true);
  };

  const clickedTogglePasscodeLock = () => {
    if (localCode) {
      setLocalCode(null);
    } else {
      setPageView('New ');
    }
  };

  //< 상단 뒤로가기 버튼
  const clickNaviEvent = () => {
    if (pageView === '') {
      navigate(-1);
    }
    setPageView('');
    resetInputs();
  };

  //passcode input
  const checkPassCode = () => {
    if (passCode !== passCodeCheck) {
      setError(true);
      setCheckClass('error');
    } else {
      setError(false);
      setCheckClass('');
    }
    if (passCode === passCodeCheck && passCodeCheck.length > 3) {
      setTopButton(false);
    } else {
      setTopButton(true);
    }
  };

  const checkCurrentPassCode = () => {
    if (localCode !== passCodeCurrent) {
      setcurrentPassCodeError(true);
      setCurrentCheckClass('error');
    } else {
      setcurrentPassCodeError(false);
      setCurrentCheckClass('');
    }
  };

  const checkChangePassCode = () => {
    if (passCode !== passCodeCheck) {
      setchangePassCodeError(true);
      setChangeCheckClass('error');
    } else {
      setchangePassCodeError(false);
      setChangeCheckClass('');
    }
    if (!currentPassCodeError && passCode === passCodeCheck && passCode.length > 3) {
      setTopButton(false);
    } else {
      setTopButton(true);
    }
  };

  //top button Done
  const clickTopButton = async () => {
    setLocalCode(passCode);
    setLockTime('5');
    setPageView('');
    resetInputs();
  };

  //Change Passcode
  const clickChangePasscode = () => {
    setPageView('Change ');
    //reset
    resetInputs();
  };

  return (
    <NavbarLayout setting={true}>
      <HeadingWrap>
        <LeftButtonWrapper>
          <button>
            <Icon size={22} src={'/images/icon/ic-prev-22.png'} onClick={() => clickNaviEvent()} />
          </button>
          <Heading4>
            {pageView}
            Passcode
          </Heading4>
          {pageView === 'New ' && (
            <button type="submit" className="text_btn" onClick={() => clickTopButton()} disabled={topButton}>
              Done
            </button>
          )}
          {pageView === 'Change ' && (
            <button type="submit" className="text_btn" onClick={() => clickTopButton()} disabled={topButton}>
              Done
            </button>
          )}
        </LeftButtonWrapper>
      </HeadingWrap>
      {pageView === '' ? (
        <>
          <Wrapper>
            <SideSwitchWrapper>
              <strong>Passcode lock</strong>
              <SideSwitch>
                <Switch className="right_switch" ison={!!localCode} onClick={() => clickedTogglePasscodeLock()} />
              </SideSwitch>
            </SideSwitchWrapper>
          </Wrapper>
          <GrayLine />
          {!!localCode && (
            <>
              <Wrapper className="margin_select">
                <AllButtonWrapper onClick={() => {}}>
                  <strong className="padding_0">Auto lock</strong>
                  <Select
                    className="border_select"
                    width={204}
                    height={32}
                    value={locktime || '5'}
                    onChange={(x) =>
                      setLockTime((lock) => {
                        return x.target.value;
                      })
                    }
                    options={[
                      { label: 'If away for 5 minutes', value: '5' },
                      { label: 'If away for 30 minutes', value: '30' },
                      { label: 'If away for 1 hour', value: '60' },
                      { label: 'If away for 5 hours', value: '300' },
                    ]}
                  />
                </AllButtonWrapper>
              </Wrapper>
              <GrayLine />
              <Wrapper>
                <AllButtonWrapper onClick={() => clickChangePasscode()}>
                  <strong className="padding_0">Change passcode</strong>
                  <Icon size={22} src={'/images/icon/ic-next-22.png'} />
                </AllButtonWrapper>
              </Wrapper>
              <GrayLine />
            </>
          )}
        </>
      ) : (
        <Wrapper>
          {pageView === 'Change ' && (
            <>
              <TextInputWrap>
                <span className="title">Current Passcode</span>
                <PassCodeInput
                  type="password"
                  placeholder={'Enter current passcode (4-digit)'}
                  value={passCodeCurrent}
                  onChange={(e) => {
                    const clean = e.target.value.replace(/[^0-9]/g, '');
                    if (clean.length > 4) {
                      return;
                    }
                    setPassCodeCurrent(clean);
                  }}
                  onKeyUp={() => checkCurrentPassCode()}
                  className={currentCheckClass}
                />
                <ErrorText variant="caption_S_red">
                  {currentPassCodeError ? 'Current passcodes doesn’t match. Please try again.' : ''}
                </ErrorText>
              </TextInputWrap>
              <TextInputWrap>
                <span className="title">New Passcode</span>
                <PassCodeInput
                  type="password"
                  placeholder={'Enter 4-digit new passcode'}
                  value={passCode}
                  onChange={(e) => {
                    const clean = e.target.value.replace(/[^0-9]/g, '');
                    if (clean.length > 4) {
                      return;
                    }
                    setPassCode(clean);
                  }}
                />
              </TextInputWrap>
              <TextInputWrap>
                <PassCodeInput
                  type="password"
                  placeholder={'Re-enter new passcode'}
                  value={passCodeCheck}
                  onChange={(e) => {
                    const clean = e.target.value.replace(/[^0-9]/g, '');
                    if (clean.length > 4) {
                      return;
                    }
                    setPassCodeCheck(clean);
                  }}
                  onKeyUp={() => checkChangePassCode()}
                  className={changeCheckClass}
                />
                <ErrorText variant="caption_S_red">
                  {changePassCodeError ? 'Passcode doesn’t match. Please try again.' : ''}
                </ErrorText>
              </TextInputWrap>
            </>
          )}
          {pageView === 'New ' && (
            <>
              <TextInputWrap>
                <span className="title">New Passcode</span>
                <PassCodeInput
                  type="password"
                  placeholder={'Enter 4-digit new passcode'}
                  value={passCode}
                  onChange={(e) => {
                    const clean = e.target.value.replace(/[^0-9]/g, '');
                    if (clean.length > 4) {
                      return;
                    }
                    setPassCode(clean);
                  }}
                />
              </TextInputWrap>
              <TextInputWrap>
                <PassCodeInput
                  type="password"
                  placeholder={'Re-enter new passcode'}
                  value={passCodeCheck}
                  onChange={(e) => {
                    const clean = e.target.value.replace(/[^0-9]/g, '');
                    if (clean.length > 4) {
                      return;
                    }
                    setPassCodeCheck(clean);
                  }}
                  onKeyUp={() => checkPassCode()}
                  className={checkClass}
                />
                <ErrorText variant="caption_S_red">
                  {error ? 'Passcode doesn’t match. Please try again.' : ''}
                </ErrorText>
              </TextInputWrap>
            </>
          )}
        </Wrapper>
      )}
    </NavbarLayout>
  );
};

export default Passcode;
