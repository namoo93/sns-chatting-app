import React, { useCallback, useState } from 'react';
import NavbarLayout from 'components/layouts/NavbarLayout';
import { useNavigate, useLocation } from 'react-router-dom';
import styled from 'styled-components';
import { Button, ButtonVariant, Heading4, Icon, Radio } from 'components/atom';
import { COLOR } from 'constants/COLOR';
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
    padding-bottom: 3px;

    &.padding_0 {
      padding-bottom: 0px;
    }
  }

  .notifications_info {
    font-size: 13px;
    color: #bbb;
    word-break: keep-all;

    &.margin_top {
      margin-top: -5px;
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
const SideButtonWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding-top: 10px;
`;

type PageType = {
  route: string;
  private: boolean;
};

const PrivacySettings = () => {
  const navigate = useNavigate();
  const location = useLocation();
  //@ts-ignore
  const [pages] = useState<PageType>(location.state);
  const { route } = pages;

  console.log(route);
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

  const [everybodyRadioToggle, setEverybodyRadioToggle] = useState<boolean>(false);
  const [followersRadioToggle, setFollowersRadioToggle] = useState<boolean>(false);
  const [nobodyRadioToggle, setNobodyRadioToggle] = useState<boolean>(false);

  return (
    <NavbarLayout setting={true}>
      <HeadingWrap>
        <LeftButtonWrapper>
          <button>
            <Icon size={22} src={'/images/icon/ic-prev-22.png'} onClick={() => navigate(-1)} />
          </button>
          <Heading4>{route.replace(/^./, route[0].toUpperCase())}</Heading4>
        </LeftButtonWrapper>
      </HeadingWrap>
      {!pages.private && (
        <>
          <Wrapper>
            <AllButtonWrapper onClick={() => setEverybodyRadioToggle(!everybodyRadioToggle)}>
              <strong className="padding_0">Everybody</strong>
              <Radio
                smallRadio
                id={'everybody'}
                name={'everybody'}
                label={' '}
                value={'everybody'}
                checked={notiData.setting?.[`sc_sns_${route}`] === 'public'}
                onClick={() =>
                  notiData.setting?.[`sc_sns_${route}`] !== 'public' && update(`sc_sns_${route}`, 'public')
                }
              />
            </AllButtonWrapper>
          </Wrapper>
          <GrayLine />
        </>
      )}
      <Wrapper>
        <AllButtonWrapper onClick={() => setFollowersRadioToggle(!followersRadioToggle)}>
          <strong className="padding_0">Followers</strong>
          <Radio
            smallRadio
            id={'followers'}
            name={'followers'}
            label={' '}
            value={'followers'}
            checked={notiData.setting?.[`sc_sns_${route}`] === 'friends'}
            onClick={() => notiData.setting?.[`sc_sns_${route}`] !== 'friends' && update(`sc_sns_${route}`, 'friends')}
          />
        </AllButtonWrapper>
        <SideButtonWrapper>
          <p className="notifications_info">Except from...</p>

          <Button
            type={'button'}
            width={68}
            height={32}
            padding={10}
            borderRadius
            variant={ButtonVariant.Outlined}
            blacklined
            onClick={() => navigate('/more/settings/privacy-and-security/kokkokme/settings/except', { state: route })}
          >
            Manage
          </Button>
        </SideButtonWrapper>
      </Wrapper>
      <GrayLine />
      <Wrapper>
        <AllButtonWrapper onClick={() => setNobodyRadioToggle(!nobodyRadioToggle)}>
          <strong className="padding_0">Nobody</strong>
          <Radio
            smallRadio
            id={'nobody'}
            name={'nobody'}
            label={' '}
            value={'nobody'}
            checked={notiData.setting?.[`sc_sns_${route}`] === 'private'}
            onClick={() => notiData.setting?.[`sc_sns_${route}`] !== 'private' && update(`sc_sns_${route}`, 'private')}
          />
        </AllButtonWrapper>
      </Wrapper>
      <GrayLine />
      <Wrapper>
        <p className="notifications_info margin_top">
          {route === 'post' && 'You can manage users who can see your posts on Kok Kok Me.'}
          {route === 'live' && 'You can manage users who can watch your live on Kok Kok Me.'}
          {route === 'tag' && 'You can manage users who can tag you on their post and live.'}
        </p>
      </Wrapper>
    </NavbarLayout>
  );
};

export default PrivacySettings;
