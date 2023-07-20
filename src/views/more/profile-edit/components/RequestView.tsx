import { ButtonVariant, Icon, IconButton } from 'components/atom';
import MainLayout from 'components/layouts/MainLayout';
import { TitleHeader } from 'components/molecules';
import { COLOR } from 'constants/COLOR';
import styled from 'styled-components';
import cat from 'assets/cat1.png';
import TextInput from 'components/atom/input/TextInput';
import { useState } from 'react';
import { Column, Row } from 'components/layouts';
import { useTranslation } from 'react-i18next';

const Wrapper = styled.div`
  padding-top: 8vh;
  text-align: center;
  display: flex;
  width: 100%;
  flex-direction: column;
  align-items: center;
  .btn {
    padding-top: 0vh;
    border-radius: 10px;
  }
`;
const Avatar = styled(Icon)`
  width: 120px;
  height: 120px;
  border-radius: 50%;
`;
const UserInfoBox = styled.div`
  margin-top: 12px;
  margin-bottom: 12px;
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
`;
const Name = styled.p`
  font-size: 18px;
  font-weight: 500;
  line-height: normal;
  color: ${COLOR.BLACK};
`;
const Desc = styled.p`
  font-size: 13px;
  margin-top: 7px;
  line-height: normal;
  font-weight: normal;
  color: ${COLOR.TEXT_GRAY};
`;
const EmailInputContainer = styled.div`
  text-align: center;
  display: flex;
  width: 100%;
  flex-direction: column;
  align-items: center;
  padding-top: 50px;
`;
const DescEmail = styled.p`
  font-size: 14px;
  text-align: left;
  width: 100%;
`;
const FormInlineBox = styled.div`
  position: relative;
  width: 330px;
  display: flex;
  flex-direction: column;
  margin-top: 20px;
  div:nth-child(1) {
    margin-right: 10px;
  }
`;
const InvalidEmail = styled.p`
  color: red;
  font-size: 13px;
  height: 13px;
  width: 100%;
  text-align: left;
`;
const EmailTextInput = styled(TextInput)<{ valid: boolean }>`
  border-bottom-color: ${({ valid }) => (valid ? '' : COLOR.RED)};
`;
const StyledIcon = styled(IconButton)`
  position: absolute;
  top: 50%;
  right: 0;
  transform: translateY(-50%);
`;
const ButtonWrapper = styled.div`
  padding-top: 20px;
  text-align: center;
  display: flex;
  width: 100%;
  flex-direction: column;
  align-items: center;
  .btn {
    border-radius: 10px;
  }
`;
export const RequestView = ({ setState }) => {
  const { t } = useTranslation();
  const [email, setEmail] = useState('');

  const regex = /[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*.[a-zA-Z]$/i;

  const request = () => {
    setState('sent');
  };

  return (
    <MainLayout>
      <TitleHeader title={`${t('setting.Verify official account')}`} />
      <Wrapper>
        <Avatar size={120} src={cat} />
        <UserInfoBox>
          <Row align="center" style={{ marginBottom: 5 }}>
            <Name>{t('setting.kokkok_official')}</Name>
            <Icon size={18} src={'/images/profile-edit/ic-verify.svg'} marginLeft={5} />
          </Row>
          <Desc>
            {t(
              'setting.Get a verified badge to make people more easily find and recognize the public figures, celebrities and brands!',
            )}
          </Desc>
        </UserInfoBox>
      </Wrapper>
      <EmailInputContainer>
        <Column>
          <DescEmail>{t('setting.Please enter e-mail address to contact you for verification')}</DescEmail>
          <FormInlineBox>
            <EmailTextInput
              width={330}
              type="text"
              placeholder="mail@mail.com"
              onChange={(e) => setEmail(e.target.value)}
              value={email}
              valid={regex.test(email) || email === ''}
            />
            {email && (
              <StyledIcon
                iconName={'ic_close'}
                width={15}
                height={15}
                iconWidth={15}
                iconHeight={15}
                onClick={() => {
                  setEmail('');
                }}
                borderRadiusRound
                iconOnly
                backgroundColor={`${COLOR.GRAY}`}
              />
            )}
          </FormInlineBox>
          <InvalidEmail>
            {regex.test(email) || email === '' ? ' ' : `${t('setting.Please enter a valid email address')}`}
          </InvalidEmail>
        </Column>
      </EmailInputContainer>
      <ButtonWrapper>
        <IconButton
          className="btn"
          type={'button'}
          onClick={() => request()}
          width={350}
          height={60}
          padding={10}
          iconName={'ic-verify'}
          iconWidth={18}
          iconHeight={18}
          textMarginLeft={8}
          fontWeight={500}
          fontSize={16}
          variant={ButtonVariant.Outlined}
          blacklined
        >
          {t('setting.Request for official account')}
        </IconButton>
      </ButtonWrapper>
    </MainLayout>
  );
};
