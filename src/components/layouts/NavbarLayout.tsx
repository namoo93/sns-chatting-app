import { Navbar, SettingNavbar } from 'components/molecules';
import React from 'react';
import styled from 'styled-components';

type Props = {
  children?: React.ReactNode;
  themeColor?: boolean;
  color?: string;
  setting?: boolean;
  scroll?: boolean;
};

export default function NavbarLayout({
  children,
  themeColor = true,
  color = '#fffff',
  setting = false,
  scroll = false,
}: Props) {
  return (
    <Component
      themeColor={themeColor}
      color={color}
      setting={setting}
      scroll={scroll}
      id={'infiniteScrollDiv'}>
      {setting ? <SettingNavbar /> : <Navbar />}
      {children}
    </Component>
  );
}

const Component = styled.div<{
  themeColor: boolean;
  color: string;
  setting: boolean;
  scroll: boolean;
}>`
  background-color: ${props =>
    props.themeColor ? props.theme.colors.background : props.color};
  height: 100vh;
  margin-left: ${({ setting }) => (setting ? '185px' : '65px')};
  overflow-y: ${({ scroll }) => (scroll ? 'scroll' : '')};
`;
