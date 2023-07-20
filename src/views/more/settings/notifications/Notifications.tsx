import { Heading4, IconButton, ButtonVariant, Button, Switch, Icon } from 'components/atom';
import NavbarLayout from 'components/layouts/NavbarLayout';
import { COLOR } from 'constants/COLOR';
import styled from 'styled-components';
import { ModalContext } from 'contexts';
import { Dialog } from 'components/molecules';
import { useCallback, useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import TimePicker from './components/TimePicker';
import useFetch from 'net/useFetch';
import SwrContainer from 'components/containers/SwrContainer';
import { patch } from 'net/rest/api';

const HeadingWrap = styled.div`
  padding: 40px 0 14px;
  text-align: center;
  border-bottom: 1px solid #eee;
`;
const ScrollWrapper = styled.div`
  max-height: calc(100vh - 80px);
  overflow-y: auto;
`;
const AllButtonWrapper = styled.button`
  display: flex;
  width: 100%;
  text-align: left;
  align-items: center;
  justify-content: space-between;
  padding-top: 20px;
`;
const SideButtonWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding-top: 10px;
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
    padding-bottom: 8px;

    &.padding_0 {
      padding-bottom: 0px;
    }
  }

  .notifications_info {
    display: block;
    width: calc(100% - 50px);
    font-size: 13px;
    color: #bbb;
    word-break: keep-all;

    .bold {
      font-weight: bold;
    }
  }

  .reset_all_notifications_btn {
    margin-top: 20px;
    border-radius: 10px;
  }
`;

const InputWrap = styled.div`
  p {
    font-size: 13px;
    color: #999;
  }

  .title {
    font-size: 15px;
    font-weight: 500;
    padding: 8px 0 5px;
  }

  .text_center {
    text-align: center;
  }
`;
// systemNotice
const SystemNoticeContainer = styled.div`
  background-color: #f8f8f8;
  padding: 20px;

  strong {
    font-size: 14px;
    font-weight: normal;
    margin-bottom: 5px;
    color: ${COLOR.BLACK};
  }
  p {
    font-size: 13px;
    color: #999;
  }
`;

const Notifications = () => {
  // * Modal

  const { data: notiData, error, mutate: mutateNoti } = useFetch('/auth/me');

  const update = useCallback(
    async (field: string, value: any) => {
      await patch('/auth/user-setting', {
        ...notiData?.setting,
        [field]: value,
      });
      await mutateNoti();
    },
    [notiData],
  );

  const { openModal, closeModal } = useContext(ModalContext);

  //Live
  const navigate = useNavigate();

  const [systemNotice] = useState<boolean>(false);

  const resetAllNotifications = () => {
    openModal(
      <Dialog
        title={'Are you sure you want to reset all notification settings to default?'}
        onClick={async () => {
          await handleReset();
          closeModal();
        }}
      />,
    );
  };


  const handleReset = async () => {
    await patch('/auth/user-setting', {
      nt_preview: 1,
      nt_group_chat: 1,
      nt_inapp_noti: 1,
      nt_inapp_sound: 1,
      nt_inapp_vibrate: 1,
      nt_disturb: 0,
      nt_market: 1,
      nt_email: 0,
      nt_sns_likes: 1,
      nt_sns_comment: 1,
      nt_sns_tag: 1,
      nt_sns_followers: 1,
      nt_sns_live: 1,
      nt_sns_live_invitation: 1,
    });
    await mutateNoti();
  };

  return (
    <NavbarLayout setting={true}>
      <HeadingWrap>
        <Heading4>Notifications</Heading4>
      </HeadingWrap>

      <ScrollWrapper>
        <SwrContainer data={notiData}>
          <>
            {!systemNotice && (
              <SystemNoticeContainer>
                <strong>Notifications disabled in your device sttings.</strong>
                <p>Please enable the device notifications in order to recieve Kok Kok notifications.</p>
              </SystemNoticeContainer>
            )}
            <Wrapper>
              <SideSwitchWrapper>
                <strong>Preview</strong>
                <p className="notifications_info">When a push notification arrives, it shows a part of the message.</p>
                <SideSwitch>
                  <Switch className="right_switch" ison={!!notiData?.setting?.nt_preview} onClick={() => update('nt_preview', notiData?.setting?.nt_preview ? 0 : 1)} />
                </SideSwitch>
              </SideSwitchWrapper>
            </Wrapper>
            <GrayLine />
            <Wrapper>
              <SideSwitchWrapper>
                <strong>Group chats</strong>
                <p className="notifications_info">Receive notifications from groups</p>
                <SideSwitch>
                  <Switch className="right_switch" ison={!!notiData?.setting?.nt_group_chat} onClick={() => update('nt_group_chat', notiData?.setting?.nt_group_chat ? 0 : 1)} />
                </SideSwitch>
              </SideSwitchWrapper>
            </Wrapper>
            <GrayLine />
            <Wrapper>
              <SideSwitchWrapper>
                <strong className="padding_0">In-app notification</strong>
                <SideSwitch>
                  <Switch className="right_switch" ison={!!notiData?.setting?.nt_inapp_noti} onClick={() => update('nt_inapp_noti', notiData?.setting?.nt_inapp_noti ? 0 : 1)} />
                </SideSwitch>
              </SideSwitchWrapper>
            </Wrapper>
            <GrayLine />
            <Wrapper>
              <SideSwitchWrapper>
                <strong className="padding_0">In-app sounds</strong>
                <SideSwitch>
                  <Switch className="right_switch" ison={!!notiData?.setting?.nt_inapp_sound} onClick={() => update('nt_inapp_sound', notiData?.setting?.nt_inapp_sound ? 0 : 1)} />
                </SideSwitch>
              </SideSwitchWrapper>
            </Wrapper>
            <GrayLine />
            <Wrapper>
              <SideSwitchWrapper>
                <strong className="padding_0">Do not disturb</strong>
                <SideSwitch>
                  <Switch className="right_switch" ison={!!notiData?.setting?.nt_disturb} onClick={() => update('nt_disturb', notiData?.setting?.nt_disturb ? 0 : 1)} />
                </SideSwitch>
              </SideSwitchWrapper>
            </Wrapper>
            <GrayLine />
            <Wrapper>
              <InputWrap>
                <strong className="title">Kok Kok Me</strong>
              </InputWrap>
              <AllButtonWrapper
                onClick={() => navigate('/more/settings/notifications-settings/kokkokme/live-notifications')}
              >
                <strong className="padding_0">Live</strong>
                <Icon size={22} src={'/images/icon/ic-next-22.png'} />
              </AllButtonWrapper>
            </Wrapper>
            <GrayLine />
            <Wrapper>
              <SideSwitchWrapper>
                <strong>Likes</strong>
                <p className="notifications_info">
                  <span className="bold">username(@eln.gu)</span>
                  &nbsp;liked your post.
                </p>
                <SideSwitch>
                  <Switch className="right_switch" ison={!!notiData?.setting?.nt_sns_likes} onClick={() => update('nt_sns_likes', notiData?.setting?.nt_sns_likes ? 0 : 1)} />
                </SideSwitch>
              </SideSwitchWrapper>
            </Wrapper>
            <GrayLine />

            <Wrapper>
              <SideSwitchWrapper>
                <strong>Commnets</strong>
                <p className="notifications_info">
                  <span className="bold">username(@eln.gu)</span>
                  &nbsp;commented on your post.
                </p>
                <SideSwitch>
                  <Switch className="right_switch" ison={!!notiData?.setting?.nt_sns_comment} onClick={() => update('nt_sns_comment', notiData?.setting?.nt_sns_comment ? 0 : 1)} />
                </SideSwitch>
              </SideSwitchWrapper>
            </Wrapper>
            <GrayLine />
            <Wrapper>
              <SideSwitchWrapper>
                <strong>Tags</strong>
                <p className="notifications_info">
                  <span className="bold">username(@eln.gu)</span>
                  &nbsp;tagged you on a post.
                </p>
                <SideSwitch>
                  <Switch className="right_switch" ison={!!notiData?.setting?.nt_sns_tag} onClick={() => update('nt_sns_tag', notiData?.setting?.nt_sns_tag ? 0 : 1)} />
                </SideSwitch>
              </SideSwitchWrapper>
            </Wrapper>
            <GrayLine />
            <Wrapper>
              <SideSwitchWrapper>
                <strong>Follow Requests</strong>
                <p className="notifications_info">
                  <span className="bold">username(@eln.gu)</span>
                  &nbsp;requested to follow you.
                </p>
                <p className="notifications_info">
                  <span className="bold">username(@eln.gu)</span>
                  &nbsp;accepted your follow request.
                </p>
                <SideSwitch>
                  <Switch className="right_switch" ison={!!notiData?.setting?.nt_sns_followers} onClick={() => update('nt_sns_followers', notiData?.setting?.nt_sns_followers ? 0 : 1)} />
                </SideSwitch>
              </SideSwitchWrapper>
            </Wrapper>
            <GrayLine />

            <Wrapper>
              <SideSwitchWrapper>
                <InputWrap>
                  <strong className="title">Market U & I</strong>
                  <p className="notifications_info">Price change, trade completion, suggestion and search alert</p>
                </InputWrap>
                <SideSwitch>
                  <Switch className="right_switch" ison={!!notiData?.setting?.nt_market} onClick={() => update('nt_market', notiData?.setting?.nt_market ? 0 : 1)} />
                </SideSwitch>
              </SideSwitchWrapper>
              <SideButtonWrapper>
                <p className="notifications_info">Keyword alerts</p>

                <Button
                  type={'button'}
                  width={68}
                  height={32}
                  padding={10}
                  borderRadius
                  variant={ButtonVariant.Outlined}
                  blacklined
                >
                  Manage
                </Button>
              </SideButtonWrapper>
            </Wrapper>
            <GrayLine />

            <Wrapper>
              <InputWrap>
                <p className="text_center">Undo all custom notification settings.</p>
              </InputWrap>
              <IconButton
                className="reset_all_notifications_btn"
                type={'button'}
                onClick={() => resetAllNotifications()}
                fullWidth
                height={60}
                padding={10}
                iconName={'ic-back-25'}
                iconWidth={25}
                iconHeight={25}
                textMarginLeft={8}
                fontWeight={500}
                fontSize={16}
                variant={ButtonVariant.Outlined}
                blacklined
              >
                Reset All Notifications
              </IconButton>
            </Wrapper>
          </>
        </SwrContainer>
      </ScrollWrapper>
    </NavbarLayout>
  );
};

export default Notifications;