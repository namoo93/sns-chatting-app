import { useCallback, useState } from 'react';
import styled from 'styled-components';
import { useLocation, useNavigate } from 'react-router-dom';
import { PrevHeader } from 'components/molecules';
import { Button, ButtonVariant, Icon, IconButton } from 'components/atom';
import img_profile from 'assets/auth/img_profile.svg';
import { COLOR } from 'constants/COLOR';
import TextInput from 'components/atom/input/TextInput';
import insertSvg from 'assets/auth/img_insert.svg';
import { toast } from 'react-toastify';
import { uploadS3 } from 'lib/uploadS3';
import { post, rememberToken } from '../../net/rest/api';
import SignUpResponse from '../../types/auth/SignUpResponse';
import SignUpPayload from '../../types/auth/SignUpPayload';
import { useUpdateAtom } from 'jotai/utils';
import tokenAtom from '../../stores/tokenAtom';
import userAtom from '../../stores/userAtom';
import { useCookies } from 'react-cookie';
import { v4 as uuid } from 'uuid';
import { useTranslation } from 'react-i18next';

const ProfileImageWrapper = styled.div`
  text-align: center;
  display: flex;
  flex-direction: column;
  height: 188px;
  align-items: center;
`;

const StyledMainLayout = styled.div`
  background-color: #f8f8f8;
`;

const ImageBox = styled.div`
  margin-top: 32px;
  position: relative;
`;

const Avatar = styled(Icon)`
  vertical-align: middle;
  width: 100px;
  height: 100px;
  border-radius: 50%;
`;

const StyledLabel = styled.label`
  position: absolute;
  bottom: 0;
  right: 0;
  bottom: -20px;
  right: -20px;
  width: 62px;
  height: 62px;
  cursor: pointer;
`;

const ImageDesc = styled.span`
  margin-top: 20px;
  font-size: 13px;
  font-weight: normal;
  line-height: normal;
  text-align: center;
  color: #bbb;
`;

const TopWrapper = styled.div`
  background: #fff;
  height: 205px;
  margin-bottom: 8px;
  padding: 30px 20px;
  span {
    font-size: 14px;
    color: ${COLOR.BLACK};
    margin-bottom: 10px;
  }
`;

const BottomWrapper = styled.div`
  background: #fff;
  height: 273px;
  padding: 30px 20px;
  span {
    font-size: 14px;
    color: ${COLOR.BLACK};
  }
`;
const BottomDesc = styled.p`
  font-size: 13px;
  font-weight: normal;
  text-align: left;
  color: #bbb;
  margin-bottom: 30px;
`;

const StyledCheckIcon = styled(IconButton)`
  position: absolute;
  top: 50%;
  right: 0;
  transform: translateY(-50%);
`;

export const ProfileEnroll = () => {
  const { t } = useTranslation();
  const [cookies] = useCookies(['machineId']);
  const location = useLocation();
  const navigate = useNavigate();
  const { contact }: any = location.state;
  const [profileData, setProfileData] = useState({
    first_name: '',
    last_name: '',
    uid: '',
    profile_image: '',
  });
  const setToken = useUpdateAtom(tokenAtom);
  const setUser = useUpdateAtom(userAtom);

  const onChange = (e) => {
    const { name, value } = e.target;
    setProfileData({
      ...profileData,
      [name]: value,
    });
  };

  const handleFileRead = async (e) => {
    const file = e.target.files[0];
    const { location } = await uploadS3(file);
    setProfileData({ ...profileData, profile_image: location });
  };

  const onSubmit = useCallback(async () => {
    const data = await post<SignUpResponse, SignUpPayload>(
      '/pub/auth/sign-up',
      {
        ...profileData,
        // TODO: 왜인지 모르지만 공백이 있어서 제거중
        contact: contact.replace(/\s/gi, ''),
        device_id: cookies.machineId || uuid().toString(),
        device_name: window.navigator.userAgent,
        push_token: '-',
        mode: 'dev',
      },
      null,
      (error) => {
        toast(error.response.data, { type: 'error' });
        throw new Error(error);
      },
    );

    const {
      token: { token },
      user,
    } = data!;
    rememberToken(token);
    setToken(token);
    setUser(user);
    navigate('/chats');
  }, [contact, navigate, profileData, setToken, setUser]);

  return (
    <StyledMainLayout>
      <PrevHeader title="Set Profile" border={false} />
      <ProfileImageWrapper>
        <ImageBox>
          <Avatar size={100} src={profileData.profile_image ? profileData.profile_image : img_profile} />
          <StyledLabel htmlFor="file-input">
            <Icon src={insertSvg} size={62} />
          </StyledLabel>
          <input
            type="file"
            id="file-input"
            accept="image/*"
            style={{ display: 'none' }}
            onChange={(e) => {
              handleFileRead(e);
            }}
          />
        </ImageBox>
        <ImageDesc>{t('sign-up.Enter your name and add a profile photo(optional)')}</ImageDesc>
      </ProfileImageWrapper>
      <TopWrapper>
        <span>{t('sign-up.User Name(required)')}</span>
        <TextInput marginTop={10} placeholder={`${t('sign-up.First Name')}`} name="first_name" onChange={onChange} />
        <TextInput marginTop={20} placeholder={`${t('sign-up.Last Name')}`} name="last_name" onChange={onChange} />
      </TopWrapper>
      <BottomWrapper>
        <span>
          {/* //Todo_lang (누락) */}
          {t('sign-up.Kok Kok Name (required)')}
        </span>
        <div style={{ position: 'relative' }}>
          <TextInput
            marginTop={10}
            marginBottom={10}
            placeholder={`${t('sign-up.Kok Kok Name')}`}
            name="uid"
            onChange={onChange}
          />
          {profileData.uid && (
            <StyledCheckIcon
              iconName={'ic-input-check'}
              width={20}
              height={20}
              iconWidth={16}
              iconHeight={16}
              borderRadiusRound
              iconOnly
            />
          )}
        </div>

        <BottomDesc>
          {/* //Todo_lang (누락) */}
          {t('sign-up.Kok Kok Name will be shown on your profile and searched by others')}
        </BottomDesc>
        <Button
          className={'string'}
          type={'button'}
          height={60}
          fontSize={18}
          fullWidth
          variant={ButtonVariant.Default}
          margin={10}
          inactive={!profileData.uid || !profileData.first_name || !profileData.last_name}
          borderRadius
          onClick={onSubmit}
        >
          {t('button-common.Next')}
        </Button>
      </BottomWrapper>
    </StyledMainLayout>
  );
};
