import React, { useCallback, useContext, useState } from 'react';
import NavbarLayout from 'components/layouts/NavbarLayout';
import styled from 'styled-components';
import { ModalContext } from 'contexts';
import { useNavigate } from 'react-router-dom';
import { COLOR } from 'constants/COLOR';
import { Heading4, Icon, Switch } from 'components/atom';
import { Dialog } from 'components/molecules';
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
const AllButtonWrapper = styled.button`
  display: flex;
  width: 100%;
  text-align: left;
  align-items: center;
  justify-content: space-between;
`;

const Wrapper = styled.div`
  margin: 20px;
  strong {
    display: block;
    width: calc(100% - 50px);
    font-size: 14px;
    color: ${COLOR.BLACK};
    font-weight: normal;
    padding-bottom: 3px;

    &.padding_0 {
      padding-bottom: 0px;
    }
  }

  .notifications_info {
    width: calc(100% - 50px);
    font-size: 13px;
    color: #bbb;
    word-break: keep-all;
  }
`;

const KokKokMePrivacy = () => {
  const navigate = useNavigate();

  // * Modal
  const { openModal, closeModal } = useContext(ModalContext);
  const [togglePrivateAccount, setTogglePrivateAccount] = useState<boolean>(false);

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

  console.log(notiData);
  const clickedTogglePrivateAccount = () => {
    !togglePrivateAccount
      ? openModal(
          <Dialog
            title={'Switch to Private Account'}
            text={`• With private account, only your followers can see your all activities on Kok Kok Me. \n • People should send you follow requests to follow you.`}
            onClick={async () => {
              await update('sc_sns_account', 'friends');
              await mutateNoti();
              closeModal();
            }}
          />,
        )
      : openModal(
          <Dialog
            title={'Switch to Public Account'}
            text={`• Anyone can see your all activities on Kok Kok Me and follow you without your acceptance.`}
            onClick={async () => {
              await update('sc_sns_account', 'public');
              await mutateNoti();
              closeModal();
            }}
          />,
        );
  };

  return (
    <NavbarLayout setting={true}>
      <HeadingWrap>
        <LeftButtonWrapper>
          <button>
            <Icon size={22} src={'/images/icon/ic-prev-22.png'} onClick={() => navigate(-1)} />
          </button>
          <Heading4>Kok Kok Me</Heading4>
        </LeftButtonWrapper>
      </HeadingWrap>

      <Wrapper>
        <SideSwitchWrapper>
          <strong>Private Account</strong>
          <p className="notifications_info">
            You can restrict people who can see and follow your Kok Kok Me by turning On/Off of Private account.
          </p>
          <SideSwitch>
            <Switch
              className="right_switch"
              ison={notiData?.setting?.sc_sns_account === 'friends'}
              onClick={() => clickedTogglePrivateAccount()}
            />
          </SideSwitch>
        </SideSwitchWrapper>
      </Wrapper>
      <GrayLine />
      <Wrapper>
        <AllButtonWrapper
          onClick={() =>
            navigate('/more/settings/privacy-and-security/kokkokme/privacy-settings', {
              state: { route: 'post', private: togglePrivateAccount },
            })
          }
        >
          <strong className="padding_0">Post</strong>
          <Icon size={22} src={'/images/icon/ic-next-22.png'} />
        </AllButtonWrapper>
      </Wrapper>
      <GrayLine />
      <Wrapper>
        <AllButtonWrapper
          onClick={() =>
            navigate('/more/settings/privacy-and-security/kokkokme/privacy-settings', {
              state: { route: 'live', private: togglePrivateAccount },
            })
          }
        >
          <strong className="padding_0">Live</strong>
          <Icon size={22} src={'/images/icon/ic-next-22.png'} />
        </AllButtonWrapper>
      </Wrapper>
      <GrayLine />
      <Wrapper>
        <AllButtonWrapper
          onClick={() =>
            navigate('/more/settings/privacy-and-security/kokkokme/privacy-settings', {
              state: { route: 'tag', private: togglePrivateAccount },
            })
          }
        >
          <strong className="padding_0">Tag</strong>
          <Icon size={22} src={'/images/icon/ic-next-22.png'} />
        </AllButtonWrapper>
      </Wrapper>
      <GrayLine />
      <Wrapper>
        <AllButtonWrapper
          onClick={() => navigate('/more/settings/privacy-and-security/kokkokme/settings/hide-all-activities')}
        >
          <strong className="padding_0">Hide all activities</strong>
          <Icon size={22} src={'/images/icon/ic-next-22.png'} />
        </AllButtonWrapper>
      </Wrapper>
      <GrayLine />
    </NavbarLayout>
  );
};

export default KokKokMePrivacy;
