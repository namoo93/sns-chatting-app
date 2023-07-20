import React from 'react';
import styled, { css } from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { COLOR } from 'constants/COLOR';
import { RADIUS } from 'constants/RADIUS';
import { AuthContainer } from 'components/containers';
import { Icon } from 'components/atom/images';
import logo from 'assets/landing/logo.png';
import { useTranslation } from 'react-i18next';

const Wrapper = styled.div`
  padding-top: 90px;
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

//[TODO] 공통 컴포넌트로 교체
const Title = styled.h2`
  color: ${COLOR.BLACK};
  font-size: 26px;
  font-weight: bold;
  margin: 30px 0 10px;
`;

const Description = styled.p`
  color: ${COLOR.TEXT_GRAY};
  font-size: 14px;
  line-height: 1.5;
  margin-bottom: 84px;
`;

const AuthButton = styled.button<{ login?: boolean }>`
  width: 100%;
  height: 60px;
  background: ${COLOR.GRAY};
  color: #fff;
  font-size: 18px;
  font-weight: bold;
  border-radius: ${RADIUS.MD}px;
  ${({ login }) => {
    return (
      login &&
      css`
        background: ${COLOR.PRIMARY};
        margin-bottom: 10px;
      `
    );
  }}
`;

const BottomDesc = styled.div`
  margin-top: 24px;
  display: flex;
`;

const DescButton = styled.button<{ active?: boolean }>`
  font-size: 12px;
  padding: 0 12px;
  color: ${COLOR.TEXT_GRAY};
  &:first-child {
    border-right: 1px solid ${COLOR.LIGHT_GRAY};
  }
  ${({ active }) => {
    return (
      active &&
      css`
        color: ${COLOR.PRIMARY};
      `
    );
  }}
`;

export const Landing = () => {
  const navigate = useNavigate();
  const { t, i18n } = useTranslation();

  return (
    <AuthContainer>
      <Wrapper>
        <Icon src={logo} size={100} />

        <Title>{t('landing.Welcome!')}</Title>
        <Description>{t('landing.Enjoy messenger, voice and video chat for free!')}</Description>
        {process.env.NODE_ENV !== 'production' && (
          <>
            <button
              className="mb-8"
              onClick={() => {
                navigate('/__dev__/page-list');
              }}
            >
              테스트 전용 : 페이지 목록
            </button>
          </>
        )}
        <AuthButton
          login
          onClick={() => {
            navigate('/auth/sign-in');
          }}
        >
          {t('button-common.Login')}
        </AuthButton>
        <AuthButton
          onClick={() => {
            navigate('/auth/sign-up');
          }}
        >
          {t('landing.Register')}
        </AuthButton>
        <BottomDesc>
          <DescButton
            active={i18n.language === 'lo'}
            onClick={() => {
              i18n.changeLanguage('lo');
              localStorage.setItem('lang', 'lo');
            }}
          >
            ພາສາລາວ
          </DescButton>
          <DescButton
            active={i18n.language === 'en'}
            onClick={() => {
              i18n.changeLanguage('en');
              localStorage.setItem('lang', 'en');
            }}
          >
            English
          </DescButton>
        </BottomDesc>
      </Wrapper>
    </AuthContainer>
  );
};
