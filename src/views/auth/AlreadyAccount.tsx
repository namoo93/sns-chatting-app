import React from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { COLOR } from 'constants/COLOR';
import { RADIUS } from 'constants/RADIUS';
import { AuthContainer } from 'components/containers';
import { Icon } from 'components/atom/images';
import logo from 'assets/landing/logo.png';
import ic_phone from 'assets/auth/ic-phone.svg';
import { useTranslation } from 'react-i18next';

const Wrapper = styled.div`
  padding-top: 50px;
  text-align: center;
  display: flex;
  width: 100%;
  flex-direction: column;
  align-items: center;
`;

const UserInfoBox = styled.div`
  margin-top: 12px;
  margin-bottom: 12px;
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Title = styled.p`
  font-size: 16px;
  font-weight: 500;
  line-height: 1.5;
  letter-spacing: normal;
  text-align: center;
  color: ${COLOR.BLACK};
`;

const Name = styled.p`
  font-size: 18px;
  font-weight: 500;
  line-height: normal;
  color: ${COLOR.BLACK};
`;

const Belong = styled.p`
  font-size: 13px;
  margin-top: 3px;
  line-height: normal;
  font-weight: normal;
  color: ${COLOR.TEXT_LIGHT_GRAY};
`;

const Number = styled.p`
  font-size: 13px;
  margin-top: 7px;
  line-height: normal;
  font-weight: normal;
  color: ${COLOR.TEXT_GRAY};
`;

const Avatar = styled(Icon)`
  vertical-align: middle;
  margin-top: 40px;
  width: 120px;
  height: 120px;
  border-radius: 50%;
`;

const AccountNickName = styled.span`
  margin-top: 80px;
  font-size: 14px;
  line-height: 1.57;
  font-weight: normal;
  text-align: center;
  color: ${COLOR.TEXT_GRAY};
  span {
    font-weight: bold;
  }
`;

const RegisterButton = styled.button`
  width: 100%;
  height: 60px;
  background: ${COLOR.PRIMARY};
  color: #fff;
  font-size: 18px;
  font-weight: bold;
  border-radius: ${RADIUS.MD}px;
  margin-bottom: 75px;
`;

const BottomDesc = styled.div`
  display: flex;
  justify-content: center;
`;

const DescButton = styled.button`
  font-size: 13px;
  font-weight: normal;
  text-align: center;
  color: #bbb; ;
`;

export const AlreadyAccount = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  return (
    <AuthContainer>
      <Wrapper>
        <Title>{t('sign-up.This account is already registered')}</Title>
        <Avatar size={120} src={logo}></Avatar>
        <UserInfoBox>
          {/* //Todo_lang (변수처리) */}
          <Name>Kim Jino</Name>
          <Belong>@Belong</Belong>
          <Number>+82 10-2737-6490</Number>
          <AccountNickName>
            If <span>Jin</span> is your account.
          </AccountNickName>
        </UserInfoBox>
        <RegisterButton
          onClick={() => {
            navigate('/auth/sign-in');
          }}
        >
          {t('sign-up.Login to this account')}
        </RegisterButton>
        <BottomDesc>
          <Icon size={20} src={ic_phone} inline></Icon>
          <DescButton
            onClick={() => {
              navigate('/auth/sign-up');
            }}
          >
            {t('sign-up.Using another number')}
          </DescButton>
        </BottomDesc>
      </Wrapper>
    </AuthContainer>
  );
};
