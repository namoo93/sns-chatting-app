import { Button, ButtonVariant, Checkbox, Heading4 } from 'components/atom';
import NavbarLayout from 'components/layouts/NavbarLayout';
import { COLOR } from 'constants/COLOR';
import styled, { css } from 'styled-components';
import {ModalContext} from 'contexts';
import {Dialog} from 'components/molecules';
import { useContext, useEffect, useState } from 'react';
import useFetch from 'net/useFetch';
import { remove } from 'net/rest/api';

const HeadingWrap = styled.div`
  padding: 40px 0 14px;
  text-align: center;
  border-bottom: 1px solid #eee;
`
const Wrapper = styled.div<{lock?: boolean}>`
  margin: 16px 20px 23px 20px;

  strong {
    font-size: 14px;
    color: ${COLOR.BLACK};
    font-weight: 500;
    padding-bottom: 8px;
    ${({lock}) => {
      return (
        lock &&
        css`
          color: #ddd;
        `
      );
    }}
  }
  
  .deregister_desktop_btn {
    margin-top: 12px;
    border-radius: 6px;
  }
`;

const ButtonWrap = styled.div`
  &:after {content:''; display:block; clear:both;}
  margin-top: 10px;

  span {
    font-size: 13px;
    color: #262525;
    display: block;
    float: left;
    line-height: 32px;
    width: calc(100% - 60px);
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  button {
     border-radius: 6px;
     display: block;
      float: left;
  }
`

const InputWrap = styled.div<{lock?: boolean}>`
  p {
    font-size: 13px;
    color: #999;
    ${({lock}) => {
      return (
        lock &&
        css`
          color: #ddd;
        `
      );
    }}
  }
`
const DeviceList = ({device, onClick}) => {
  return (
    <ButtonWrap>
      <span>
        {device}
      </span>
      <Button
        type={'button'}
        onClick={() => onClick()}
        width={60}
        height={32}
        padding={10}
        variant={ButtonVariant.Outlined}
        grayText>
          Logout
      </Button>
    </ButtonWrap>
  )
}

const General = () => {
 // * Modal
  const {openModal} = useContext(ModalContext);

  // * Modal
  const onClickModal = () => {
    openModal( 
      <Dialog 
        title={'Deregister Desktop'} 
        text={'You will be logged out if you deregsiter your desktop. You can re-register your desktop device anytime.'} 
        onClick={() => {}}
        buttonText2={'Deregister'}
      />
    );
  };


  const { data, error, mutate } = useFetch('/auth/devices');

  const [keepLogged, setKeepLogged] = useState<boolean>(false);
  const [automaticLogin, setAutomaticLogin] = useState<boolean>(true);
  const AutomaticLogin = () => {
    setAutomaticLogin(!automaticLogin)
    setKeepLogged(automaticLogin)
  }
  useEffect(()=> {
  },[keepLogged,automaticLogin])

  return (
    <NavbarLayout setting={true}>
      <HeadingWrap>
        <Heading4>General</Heading4>
      </HeadingWrap>

      <Wrapper>
        <strong>
          Automatic Login
        </strong>
        <InputWrap>
          <Checkbox
            name={'system_startup'}
            id={'system_startup'}
            value={'system_startup'}
            onClick={() => AutomaticLogin()}
            label={'Start Kokkok on system startup'}
            textMarginLeft={5}
            checkRound
            fontSize={13}
            lineHeight={18}
            iconHeight={18}
            iconWidth={18}
            checked={automaticLogin}
          />
        </InputWrap>
        <InputWrap>
         <Checkbox
            name={'keep_me_logged_in'}
            id={'keep_me_logged_in'}
            value={'keep_me_logged_in'}
            onClick={() => {}}
            label={'Keep me logged in'}
            textMarginLeft={5}
            checkRound
            fontSize={13}
            lineHeight={18}
            iconHeight={18}
            iconWidth={18}
            disabled={keepLogged}
          />
        </InputWrap>
      </Wrapper>
        
      <Wrapper lock>
        <strong>
          Automatic lock 
        </strong>
        <InputWrap lock>
          <p>
            You can manage Automatic Lock on Settings
          </p>
          <p>
            [Privacy and Security &gt; Passcode]
          </p>
        </InputWrap>
      </Wrapper>
      
      <Wrapper>
        <strong>
          Device Management
        </strong>
        <InputWrap>
          <p>
            You can manage your all devices including 
            mobile and desktop.  
          </p>
        </InputWrap>
        {
          data?.map((device)=><DeviceList device={device?.device_name} onClick={() => {
            remove(`/auth/devices/${device?.id}/logout`).then(() => {
              mutate();
            });
          }} />)
        }
      </Wrapper>
        
      <Wrapper>
        <strong>
          Deregister Desktop
        </strong>
        <InputWrap>
          <p>
            You can reregister your desktop if you change 
            your desktop device or if someone is using 
            your Kokkok account without your consent.
          </p>
        </InputWrap>
        <Button
          className="deregister_desktop_btn"
          type={'button'}
          onClick={() => onClickModal()}
          width={132}
          height={32}
          padding={10}
          variant={ButtonVariant.Outlined}
          blacklined>
          Deregister Desktop
        </Button>
        
      </Wrapper>
    </NavbarLayout>
  );
}

export default General;


