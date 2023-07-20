import { Heading4, Radio } from 'components/atom';
import { Icon } from 'components/atom/images';
import NavbarLayout from 'components/layouts/NavbarLayout';
import { COLOR } from 'constants/COLOR';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import SystemMode from 'assets/setting/system-mode.svg';
import LightMode from 'assets/setting/system-light.svg';
import ExelMode from 'assets/setting/system-exel.svg';
import DarkMode from 'assets/setting/system-dark.svg';
import { useState } from 'react';

import NextArrow from 'assets/chats/ic_next.svg';

const HeadingWrap = styled.div`
  padding: 40px 0 14px;
  text-align: center;
  border-bottom: 1px solid #eee;
`;
const ScrollWrapper = styled.div`
  overflow-y: auto;
  max-height: calc(100vh - 80px);
`;

const GrayLine = styled.div`
  height: 8px;
  background-color: #eee;
`;

const Wrapper = styled.div`
  margin: 22px 20px 0 20px;
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
  /* ::after {
    width: 100%;
    height: 8px;
    background: #eee;
  } */
`;
const InputWrap = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;

  .title {
    font-size: 15px;
    font-weight: 500;
    padding: 8px 0 5px;
  }
`;

const ThemeWrap = styled.div`
  display: flex;
  align-items: center;
  border-bottom: 1px solid #eee;
  padding: 21px 0;
  cursor: pointer;
  &:last-child {
    border-bottom: none;
  }
  button {
    font-size: 14px;
    display: flex;
    align-items: center;
  }
`;

const ImageWrap = styled.div`
  margin-right: 10px;
  .chat_color {
    width: 36px;
    height: 56px;
    border-radius: 6px;
    background: white;
    border: solid 1px #ededed;
  }
`;

const DescWrap = styled.div`
  display: flex;
  flex-direction: column;
  margin-right: auto;
  &:last-child {
    border-bottom: none;
  }
  .title {
    font-size: 14px;
    color: #262525;
  }
`;

const RadioWrap = styled.div`
  display: flex;
  align-items: center;
`;

const chatThemeList = [
  {
    label: 'System Mode',
    value: 'system',
    img: SystemMode,
    desc: (
      <p className="desc">
        Automatically apply
        <br />
        the display mode(Dark/Light) <br />
        based on system settings.
      </p>
    ),
  },
  {
    label: 'Light Mode',
    value: 'light',
    img: LightMode,
  },
  {
    label: 'Dark Mode',
    value: 'dark',
    img: DarkMode,
  },
  {
    label: 'Excel Theme',
    value: 'exel',
    img: ExelMode,
  },
];

const Theme = () => {
  const navigate = useNavigate();
  const [selectTheme, setTheme] = useState('system');

  return (
    <NavbarLayout setting={true}>
      <HeadingWrap>
        <Heading4>Theme</Heading4>
      </HeadingWrap>
      <ScrollWrapper>
        <Wrapper>
          <strong>Chat Themes</strong>
          <InputWrap>
            {chatThemeList.map((theme) => {
              return (
                <ThemeWrap onClick={() => setTheme(theme.value)}>
                  <ImageWrap>
                    <img src={theme.img} alt="system-mode" />
                  </ImageWrap>
                  <DescWrap>
                    <div className="title">{theme.label}</div>
                    {theme?.desc}
                  </DescWrap>
                  <RadioWrap>
                    <Radio
                      smallRadio
                      onClick={() => {}}
                      marginRight={0}
                      marginLeft={0}
                      name={'Recent login'}
                      label={' '}
                      value={'Everybody'}
                      id={'Everybody'}
                      fontSize={0}
                      lineHeight={18}
                      checked={selectTheme === theme.value}
                    />
                  </RadioWrap>
                </ThemeWrap>
              );
            })}
          </InputWrap>
        </Wrapper>
        <GrayLine />
        <Wrapper>
          <strong>Chat Background</strong>
          <InputWrap>
            <ThemeWrap onClick={() => navigate('/more/settings/theme/chat-background')}>
              <ImageWrap>
                <div className="chat_color"></div>
              </ImageWrap>
              <DescWrap>
                <div className="title"></div>
              </DescWrap>
              <button>
                Select <img src={NextArrow} alt="arrow" />{' '}
              </button>
            </ThemeWrap>
          </InputWrap>
        </Wrapper>
        <GrayLine />
        <Wrapper>
          <strong>Text Size</strong>
        </Wrapper>
      </ScrollWrapper>
    </NavbarLayout>
  );
};

export default Theme;
