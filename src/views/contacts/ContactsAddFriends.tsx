import { useState } from 'react';
import styled from 'styled-components';
import { PrevHeader } from 'components/molecules';
import { Button, ButtonVariant, ContrySelect, IconButton } from 'components/atom';
import { COLOR } from 'constants/COLOR';
import TextInput from 'components/atom/input/TextInput';
import parsePhoneNumber from 'libphonenumber-js';
import { COUNTRIES_DATA } from 'data/countriesData';
import MainLayout from 'components/layouts/MainLayout';
import { useNavigate } from 'react-router-dom';
import { AddFriendsTab } from './components/molecules';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import { AddFriendsShareLink, AddFriendsSuccess } from './components/organisms';
import { toast } from 'react-toastify';
import { post } from 'net/rest/api';
import { useTranslation } from 'react-i18next';

const FormInlineBox = styled.div`
  position: relative;
  width: 100%;

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

const TopWrapper = styled.div`
  padding: 30px;
  padding-bottom: 0px;
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const BottomWrapper = styled.div`
  position: absolute;
  background: #fff;
  bottom: 0;
  width: 100%;
  padding: 15px 30px;
  box-shadow: 0 -5px 15px 0 rgba(0, 0, 0, 0.08);
  display: flex;
  justify-content: center;
`;

const ErrorMessage = styled.span`
  color: #f00;
  font-size: 13px;
  margin-top: 10px;
  margin-left: 30px;
`;

export const ContactsAddFriends = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const [active, setActive] = useState<'PhoneNumber' | 'AppSharing'>('PhoneNumber');

  const [addState, setAddState] = useState<boolean>();
  const [profile, setProfile] = useState();
  const [copied, setCopied] = useState<boolean>();

  const [errorMessage, setErrorMessage] = useState<string>();
  const [phoneNumber, setPhoneNumber] = useState<string>();
  const [contryCode, setContryCode] = useState('82');

  // Const
  // * Tel Url (Not format)
  const _phoneNumber = parsePhoneNumber(`+${contryCode}${phoneNumber}`)?.number;

  // * PhoneNumber inValid
  const IsValidPhoneNumber = parsePhoneNumber(`+${contryCode}${phoneNumber}`)?.isValid();

  const onSubmitLink = () => {
    setCopied(true);
  };

  // console.log(profile, 'pro');

  const onClickAddContactsMutate = () => {
    if (!handleValidation()) {
      return;
    }
    setErrorMessage('');

    post(
      '/auth/contacts',
      {
        contacts: [{ number: _phoneNumber }],
      },
      null,
      (error) => {
        setErrorMessage(error?.response?.data);
      },
    ).then((data: any) => {
      if (data) {
        toast(`${t('contact.Successfully added')}`, { type: 'success' });
        setAddState(true);
        console.log(data, 'succ');
        setProfile(data);
      }
    });
  };

  const handleValidation = () => {
    if (!IsValidPhoneNumber) {
      setErrorMessage(`${t('contact.Please enter a valid phone number')}`);
      return false;
    }
    return true;
  };

  return (
    <MainLayout>
      <PrevHeader title={`${t('contact.Add Friends')}`} border />
      <AddFriendsTab active={active} setActive={setActive} setAddState={setAddState} setCopied={setCopied} />

      {active === 'PhoneNumber' &&
        (addState ? (
          <AddFriendsSuccess profile={profile} />
        ) : (
          <>
            <TopWrapper>
              <FormInlineBox>
                <ContrySelect
                  options={COUNTRIES_DATA}
                  iconName={'ic-phone-16'}
                  width={100}
                  onChange={(e) => {
                    setContryCode(e.target.value);
                  }}
                />
                <TextInput
                  type="number"
                  placeholder="Phone number"
                  onChange={(e) => {
                    setPhoneNumber(e.target.value);
                    setErrorMessage('');
                  }}
                  value={phoneNumber}
                  error={!!errorMessage}
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
                      setErrorMessage('');
                    }}
                    borderRadiusRound
                    iconOnly
                    backgroundColor={`${COLOR.GRAY}`}
                  />
                )}
              </FormInlineBox>
            </TopWrapper>
            {errorMessage && <ErrorMessage>{errorMessage}</ErrorMessage>}
          </>
        ))}

      {active === `${t('contact.app sharing')}` && <AddFriendsShareLink />}

      <BottomWrapper>
        <Button
          className={'string'}
          type={'button'}
          onClick={() => {
            navigate(-1);
          }}
          fullWidth
          height={50}
          marginRight={10}
          variant={ButtonVariant.Outlined}
          fontSize={16}
          borderRadius
        >
          {t('button-common.Cancel')}
        </Button>

        {active === 'PhoneNumber' &&
          (addState ? (
            <Button
              className={'string'}
              type={'button'}
              onClick={() => navigate('/chats')}
              fullWidth
              height={50}
              variant={ButtonVariant.Default}
              fontSize={16}
              borderRadius
              inactive={!phoneNumber}
            >
              {t('contact.1:1 Chat')}
            </Button>
          ) : (
            <Button
              className={'string'}
              type={'button'}
              onClick={onClickAddContactsMutate}
              fullWidth
              height={50}
              variant={ButtonVariant.Default}
              fontSize={16}
              borderRadius
              inactive={!phoneNumber}
            >
              {t('contact.Added')}
            </Button>
          ))}

        {active === 'AppSharing' && (
          <CopyToClipboard text={'https://kokkok/-mmecrJ7MbA'}>
            <Button
              className={'string'}
              type={'button'}
              onClick={() => onSubmitLink()}
              fullWidth
              height={50}
              variant={ButtonVariant.Default}
              fontSize={16}
              borderRadius
            >
              {copied ? `${t('contact.Copied')}` : `${t('contact.Copy Link')}`}
            </Button>
          </CopyToClipboard>
        )}
      </BottomWrapper>
    </MainLayout>
  );
};
