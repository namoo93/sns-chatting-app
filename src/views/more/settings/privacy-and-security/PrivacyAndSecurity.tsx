import { Heading4, Radio } from 'components/atom';
import { Icon } from 'components/atom/images';
import NavbarLayout from 'components/layouts/NavbarLayout';
import { COLOR } from 'constants/COLOR';
import { PASSCODE_LOCAL } from 'constants/CONST';
import { patch } from 'net/rest/api';
import useFetch from 'net/useFetch';
import { useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

const HeadingWrap = styled.div`
  padding: 40px 0 14px;
  text-align: center;
  border-bottom: 1px solid #eee;
`;
const ScrollWrapper = styled.div`
  overflow-y: auto;
  max-height: calc(100vh - 80px);
`;

const Wrapper = styled.div`
  margin: 20px;

  strong {
    display: block;
    width: 100%;
    font-size: 14px;
    color: ${COLOR.BLACK};
    font-weight: normal;
    padding-bottom: 3px;

    &.padding_0 {
      padding-bottom: 0px;
    }
  }
  p {
    font-size: 13px;
    color: #999;
    padding-bottom: 5px;
    word-break: keep-all;
  }

  .notifications_info {
    padding-top: 5px;
  }
  .bold {
    font-weight: bold;
  }
`;

const InputWrap = styled.div`
  .title {
    font-size: 15px;
    font-weight: 500;
    padding: 8px 0 5px;
  }
`;
const AllButtonWrapper = styled.button`
  display: flex;
  width: 100%;
  text-align: left;
  align-items: center;
  justify-content: space-between;

  span {
    color: #bbb;
    font-size: 13px;
    text-align: right;
    width: 100%;
    padding-right: 5px;
  }
`;

const GrayLine = styled.div`
  height: 1px;
  background-color: #eee;
`;

const PrivacyAndSecurity = () => {
  const navigate = useNavigate();

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

  return (
    <NavbarLayout setting={true}>
      <HeadingWrap>
        <Heading4>Privacy and Security</Heading4>
      </HeadingWrap>

      <ScrollWrapper>
        <Wrapper>
          <strong>Recent login</strong>
          <p>You won't see last seen and online statuses for people with whom you don't share yours.</p>
          <InputWrap>
            <Radio
              smallRadio
              onClick={() => notiData?.setting.sc_recent_login !== 'public' && update('sc_recent_login', 'public')}
              marginRight={0}
              marginLeft={0}
              textMarginLeft={22}
              name={'Recent login'}
              label={'Everybody'}
              value={'Everybody'}
              id={'Everybody'}
              fontSize={0}
              lineHeight={18}
              checked={notiData?.setting.sc_recent_login === 'public'}
            />
            <Radio
              smallRadio
              onClick={() => notiData?.setting.sc_recent_login !== 'friends' && update('sc_recent_login', 'friends')}
              marginRight={0}
              marginLeft={15}
              textMarginLeft={22}
              name={'Recent login'}
              label={'My contacts'}
              value={'My contacts'}
              id={'My contacts'}
              fontSize={0}
              lineHeight={18}
              checked={notiData?.setting.sc_recent_login === 'friends'}
            />
            <Radio
              smallRadio
              onClick={() => notiData?.setting.sc_recent_login !== 'private' && update('sc_recent_login', 'private')}
              marginRight={0}
              marginLeft={15}
              textMarginLeft={22}
              name={'Recent login'}
              label={'Nobody'}
              value={'Nobody'}
              id={'Nobody'}
              fontSize={0}
              lineHeight={18}
              checked={notiData?.setting.sc_recent_login === 'private'}
            />
          </InputWrap>
        </Wrapper>
        <GrayLine />
        <Wrapper>
          <strong>Profile photo</strong>
          <p>You can restrict who can see your profile photo.</p>
          <InputWrap>
            <Radio
              smallRadio
              onClick={() => notiData?.setting.sc_profile_photo !== 'public' && update('sc_profile_photo', 'public')}
              checked={notiData?.setting.sc_profile_photo === 'public'}
              marginRight={0}
              marginLeft={0}
              textMarginLeft={22}
              name={'Profile photo'}
              label={'Everybody'}
              value={'Everybody'}
              id={'Everybody'}
              fontSize={0}
              lineHeight={18}
            />
            <Radio
              smallRadio
              onClick={() => notiData?.setting.sc_profile_photo !== 'friends' && update('sc_profile_photo', 'friends')}
              checked={notiData?.setting.sc_profile_photo === 'friends'}
              marginRight={0}
              marginLeft={15}
              textMarginLeft={22}
              name={'Profile photo'}
              label={'My contacts'}
              value={'My contacts'}
              id={'My contacts'}
              fontSize={0}
              lineHeight={18}
            />
            <Radio
              smallRadio
              onClick={() => notiData?.setting.sc_profile_photo !== 'private' && update('sc_profile_photo', 'private')}
              checked={notiData?.setting.sc_profile_photo === 'private'}
              marginRight={0}
              marginLeft={15}
              textMarginLeft={22}
              name={'Profile photo'}
              label={'Nobody'}
              value={'Nobody'}
              id={'Nobody'}
              fontSize={0}
              lineHeight={18}
            />
          </InputWrap>
        </Wrapper>
        <GrayLine />
        <Wrapper>
          <strong>Voice call</strong>
          <p>You can restrict who can call you by voice call.</p>
          <InputWrap>
            <Radio
              smallRadio
              onClick={() => notiData?.setting.sc_voice_call !== 'public' && update('sc_voice_call', 'public')}
              checked={notiData?.setting.sc_voice_call === 'public'}
              marginRight={0}
              marginLeft={0}
              textMarginLeft={22}
              name={'Voice call'}
              label={'Everybody'}
              value={'Everybody'}
              id={'Everybody'}
              fontSize={0}
              lineHeight={18}
            />
            <Radio
              smallRadio
              onClick={() => notiData?.setting.sc_voice_call !== 'friends' && update('sc_voice_call', 'friends')}
              checked={notiData?.setting.sc_voice_call === 'friends'}
              marginRight={0}
              marginLeft={15}
              textMarginLeft={22}
              name={'Voice call'}
              label={'My contacts'}
              value={'My contacts'}
              id={'My contacts'}
              fontSize={0}
              lineHeight={18}
            />
            <Radio
              smallRadio
              onClick={() => notiData?.setting.sc_voice_call !== 'private' && update('sc_voice_call', 'private')}
              checked={notiData?.setting.sc_voice_call === 'private'}
              marginRight={0}
              marginLeft={15}
              textMarginLeft={22}
              name={'Voice call'}
              label={'Nobody'}
              value={'Nobody'}
              id={'Nobody'}
              fontSize={0}
              lineHeight={18}
            />
          </InputWrap>
        </Wrapper>
        <GrayLine />
        <Wrapper>
          <strong>Video call</strong>
          <p>You can restrict who can call you by video call.</p>
          <InputWrap>
            <Radio
              smallRadio
              onClick={() => notiData?.setting.sc_video_call !== 'public' && update('sc_video_call', 'public')}
              checked={notiData?.setting.sc_video_call === 'public'}
              marginRight={0}
              marginLeft={0}
              textMarginLeft={22}
              name={'Video call'}
              label={'Everybody'}
              value={'Everybody'}
              id={'Everybody'}
              fontSize={0}
              lineHeight={18}
            />
            <Radio
              smallRadio
              onClick={() => notiData?.setting.sc_video_call !== 'friends' && update('sc_video_call', 'friends')}
              checked={notiData?.setting.sc_video_call === 'friends'}
              marginRight={0}
              marginLeft={15}
              textMarginLeft={22}
              name={'Video call'}
              label={'My contacts'}
              value={'My contacts'}
              id={'My contacts'}
              fontSize={0}
              lineHeight={18}
            />
            <Radio
              smallRadio
              onClick={() => notiData?.setting.sc_video_call !== 'private' && update('sc_video_call', 'private')}
              checked={notiData?.setting.sc_video_call === 'private'}
              marginRight={0}
              marginLeft={15}
              textMarginLeft={22}
              name={'Video call'}
              label={'Nobody'}
              value={'Nobody'}
              id={'Nobody'}
              fontSize={0}
              lineHeight={18}
            />
          </InputWrap>
        </Wrapper>
        <GrayLine />
        <Wrapper>
          <strong>Group call</strong>
          <p>You can restrict who can add you to groups.</p>
          <InputWrap>
            <Radio
              smallRadio
              onClick={() => notiData?.setting.sc_group_call !== 'public' && update('sc_group_call', 'public')}
              checked={notiData?.setting.sc_group_call === 'public'}
              marginRight={0}
              marginLeft={0}
              textMarginLeft={22}
              name={'Group call'}
              label={'Everybody'}
              value={'Everybody'}
              id={'Everybody'}
              fontSize={0}
              lineHeight={18}
            />
            <Radio
              smallRadio
              onClick={() => notiData?.setting.sc_group_call !== 'friends' && update('sc_group_call', 'friends')}
              checked={notiData?.setting.sc_group_call === 'friends'}
              marginRight={0}
              marginLeft={15}
              textMarginLeft={22}
              name={'Group call'}
              label={'My contacts'}
              value={'My contacts'}
              id={'My contacts'}
              fontSize={0}
              lineHeight={18}
            />
            <Radio
              smallRadio
              onClick={() => notiData?.setting.sc_group_call !== 'private' && update('sc_group_call', 'private')}
              checked={notiData?.setting.sc_group_call === 'private'}
              marginRight={0}
              marginLeft={15}
              textMarginLeft={22}
              name={'Group call'}
              label={'Nobody'}
              value={'Nobody'}
              id={'Nobody'}
              fontSize={0}
              lineHeight={18}
            />
          </InputWrap>
        </Wrapper>
        <GrayLine />
        <Wrapper>
          <strong>Birthday</strong>
          <p>You can restrict who can see your birthday.</p>
          <InputWrap>
            <Radio
              smallRadio
              onClick={() => notiData?.setting.sc_birthday !== 'public' && update('sc_birthday', 'public')}
              checked={notiData?.setting.sc_birthday === 'public'}
              marginRight={0}
              marginLeft={0}
              textMarginLeft={22}
              name={'Birthday'}
              label={'Everybody'}
              value={'Everybody'}
              id={'Everybody'}
              fontSize={0}
              lineHeight={18}
            />
            <Radio
              smallRadio
              onClick={() => notiData?.setting.sc_birthday !== 'friends' && update('sc_birthday', 'friends')}
              checked={notiData?.setting.sc_birthday === 'friends'}
              marginRight={0}
              marginLeft={15}
              textMarginLeft={22}
              name={'Birthday'}
              label={'My contacts'}
              value={'My contacts'}
              id={'My contacts'}
              fontSize={0}
              lineHeight={18}
            />
            <Radio
              smallRadio
              onClick={() => notiData?.setting.sc_birthday !== 'private' && update('sc_birthday', 'private')}
              checked={notiData?.setting.sc_birthday === 'private'}
              marginRight={0}
              marginLeft={15}
              textMarginLeft={22}
              name={'Birthday'}
              label={'Nobody'}
              value={'Nobody'}
              id={'Nobody'}
              fontSize={0}
              lineHeight={18}
            />
          </InputWrap>
        </Wrapper>
        <GrayLine />
        <Wrapper>
          <strong>Show Birthday</strong>
          <p>You can restrict who can see your birthday.</p>
          <InputWrap>
            <Radio
              smallRadio
              onClick={() => notiData?.setting.sc_show_full_birthday !== 1 && update('sc_show_full_birthday', 1)}
              checked={notiData?.setting.sc_show_full_birthday === 1}
              marginRight={0}
              marginLeft={0}
              textMarginLeft={22}
              name={'Show Birthday'}
              label={'full birthday'}
              value={'full birthday'}
              id={'full birthday'}
              fontSize={0}
              lineHeight={18}
            />
            <Radio
              smallRadio
              onClick={() => notiData?.setting.sc_show_full_birthday !== 0 && update('sc_show_full_birthday', 0)}
              checked={notiData?.setting.sc_show_full_birthday === 0}
              marginRight={0}
              marginLeft={15}
              textMarginLeft={22}
              name={'Show Birthday'}
              label={'day and month only'}
              value={'day and month only'}
              id={'day and month only'}
              fontSize={0}
              lineHeight={18}
            />
          </InputWrap>
        </Wrapper>
        <GrayLine />
        <Wrapper>
          <AllButtonWrapper onClick={() => navigate('/more/settings/privacy-and-security/kokkokme')}>
            <strong className="padding_0">Kok kok Me</strong>
            <Icon size={22} src={'/images/icon/ic-next-22.png'} />
          </AllButtonWrapper>
        </Wrapper>
        <GrayLine />
        <Wrapper>
          <AllButtonWrapper onClick={() => navigate('/more/settings/privacy-and-security/bolcked-users')}>
            <strong className="padding_0">Blocked users</strong>
            <Icon size={22} src={'/images/icon/ic-next-22.png'} />
          </AllButtonWrapper>
        </Wrapper>
        <GrayLine />
        <Wrapper>
          <InputWrap>
            <strong className="title">Friends</strong>
          </InputWrap>
          <AllButtonWrapper onClick={() => navigate('')}>
            <strong className="padding_0">Sync Friends List</strong>
            <span>Jan 6 1:19 PM</span>
            <Icon size={22} src={'/images/icon/undo_22.png'} />
          </AllButtonWrapper>
          <InputWrap>
            <p className="notifications_info">Kokkok for desktop will sync your friends list with mobile.</p>
          </InputWrap>
        </Wrapper>
        <GrayLine />
        <Wrapper>
          <AllButtonWrapper onClick={() => navigate('/more/settings/privacy-and-security/passcode')}>
            <strong className="padding_0">Passcode</strong>
            <span>{!!localStorage.getItem(PASSCODE_LOCAL) ? 'on' : 'off'}</span>
            <Icon size={22} src={'/images/icon/ic-next-22.png'} />
          </AllButtonWrapper>
          <InputWrap>
            <p className="notifications_info">
              When you set passcode lock on, this device will be locked automatically on time you set. If you forget the
              passcode, you'll need to delete and reinstall the app.
            </p>
          </InputWrap>
        </Wrapper>
        <GrayLine />
      </ScrollWrapper>
    </NavbarLayout>
  );
};

export default PrivacyAndSecurity;
