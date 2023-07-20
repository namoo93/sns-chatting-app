import { Icon } from 'components/atom/images';
import NavbarLayout from 'components/layouts/NavbarLayout';
import { useNavigate } from 'react-router-dom';
import { Heading4, Switch } from '../../../components/atom';
import styled from 'styled-components';
import { COLOR } from '../../../constants/COLOR';
import { useTranslation } from 'react-i18next';
import { Fragment } from 'react';

interface LanguageType {
  label: string;
  key: string;
}

const languageOptions: LanguageType[] = [
  { label: 'ພາສາລາວ', key: 'lo' },
  { label: 'English', key: 'en' },
];

const Language = () => {
  const { t, i18n } = useTranslation();
  return (
    <NavbarLayout setting={true}>
      <HeadingWrap>
        <Heading4>Language</Heading4>
      </HeadingWrap>
      <h1></h1>

      {languageOptions.map((option) => (
        <Fragment key={option.key}>
          <Wrapper>
            <SideSwitchWrapper>
              <strong>{option.label}</strong>
              <p className="notifications_info">{option.label}</p>
              <SideSwitch>
                <Switch
                  className="right_switch"
                  ison={i18n.language === option.key}
                  onClick={() => {
                    i18n.changeLanguage(option.key);
                    localStorage.setItem('lang', option.key);
                  }}
                />
              </SideSwitch>
            </SideSwitchWrapper>
          </Wrapper>
          <GrayLine />
        </Fragment>
      ))}
    </NavbarLayout>
  );
};

export default Language;

const HeadingWrap = styled.div`
  padding: 40px 0 14px;
  text-align: center;
  border-bottom: 1px solid #eee;
`;

const SideSwitchWrapper = styled.div`
  position: relative;
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
