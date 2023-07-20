import React, {useCallback, useState} from 'react';
import {useNavigate} from 'react-router-dom';
import NavbarLayout from 'components/layouts/NavbarLayout';
import {Heading4, Icon, Radio, Switch} from 'components/atom';
import styled from 'styled-components';
import {COLOR} from 'constants/COLOR';
import useFetch from 'net/useFetch';
import { patch } from 'net/rest/api';

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
`;
const SideSwitchWrapper = styled.div`
  position: relative;
`;
const SideSwitch = styled.div`
  position: absolute;
  top: 50%;
  right: 0;
  transform: translateY(-50%);
`;
const GrayLine = styled.div`
  height: 1px;
  background: #eee;
`;

const Wrapper = styled.div`
  margin: 16px 20px 23px 20px;
  strong {
    display: block;
    width: calc(100% - 50px);
    font-size: 14px;
    color: ${COLOR.BLACK};
    font-weight: 500;
    padding-bottom: 3px;
  }

  .notifications_info {
    display: block;
    width: calc(100% - 50px);
    font-size: 13px;
    color: #bbb;
    word-break: keep-all;
    padding-bottom: 5px;

    .bold {
      font-weight: bold;
    }
  }
`;
const InputWrap = styled.div``;

const LiveNotifications = () => {

  const { data: notiData, error, mutate: mutateNoti } = useFetch('/auth/me');

  const update = useCallback(
    async (field: string, value: any) => {
      if(field === 'nt_sns_live' && value){
        await patch('/auth/user-setting', {
          ...notiData?.setting,
          [field]: value,
          'nt_sns_live_target':'everybody',
        });
      }
      else{
        await patch('/auth/user-setting', {
          ...notiData?.setting,
          [field]: value,
        });
      }
      await mutateNoti();
    },
    [notiData],
  );

  const navigate = useNavigate();

  console.log(notiData?.setting?.nt_sns_live_target, notiData?.setting?.nt_sns_live_target === 'contacts')
  return (
    <NavbarLayout setting={true}>
      <HeadingWrap>
        <LeftButtonWrapper>
          <button>
            <Icon
              size={22}
              src={'/images/icon/ic-prev-22.png'}
              onClick={() => navigate(-1)}
            />
          </button>
          <Heading4>Live</Heading4>
        </LeftButtonWrapper>
      </HeadingWrap>

      <Wrapper>
        <SideSwitchWrapper>
          <strong>Live Start</strong>
          <p className="notifications_info">
            <span className="bold">username(@eln.gu)</span>
            &nbsp;started a live video.
          </p>
          <SideSwitch>
            <Switch className="right_switch" ison={!!notiData?.setting?.nt_sns_live} 
            onClick={() => {
              update('nt_sns_live', notiData?.setting?.nt_sns_live ? 0 : 1);
            }} />
            
          </SideSwitch>
        </SideSwitchWrapper>
        {!!notiData?.setting?.nt_sns_live && (
          <InputWrap>
            <Radio
              smallRadio
              onClick={() => update('nt_sns_live_target','everybody')}
              textMarginLeft={22}
              name={'Recent login'}
              label={'Everybody'}
              value={'everybody'}
              checked={notiData?.setting?.nt_sns_live_target === 'everybody'}
              id={'Everybody'}
              fontSize={0}
              lineHeight={18}
              marginBottom={2}
              fullWidth
            />
            <Radio
              smallRadio
              onClick={() => update('nt_sns_live_target','contacts')}
              textMarginLeft={22}
              name={'Recent login'}
              label={'My contacts'}
              value={'contacts'}
              checked={notiData?.setting?.nt_sns_live_target === 'contacts'}
              id={'My contacts'}
              fontSize={0}
              lineHeight={18}
              fullWidth
            />
          </InputWrap>
        )}
      </Wrapper>
      <GrayLine />
      <Wrapper>
        <SideSwitchWrapper>
          <strong>Invitation from Live</strong>
          <p className="notifications_info">
            <span className="bold">username(@eln.gu)</span>
            &nbsp;invited you to a live video.
          </p>
          <SideSwitch>
            <Switch className="right_switch" ison={!!notiData?.setting?.nt_sns_live_invitation} onClick={() => update('nt_sns_live_invitation', notiData?.setting?.nt_sns_live_invitation ? 0 : 1)} />
          </SideSwitch>
        </SideSwitchWrapper>
      </Wrapper>
      <GrayLine />
    </NavbarLayout>
  );
};

export default LiveNotifications;
