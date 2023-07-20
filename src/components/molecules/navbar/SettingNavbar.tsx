import React from 'react';
import {useLocation, useNavigate} from 'react-router-dom';
import styled from 'styled-components';

const NavbarContainer = styled.div`
  display: flex;
  flex-direction: column;
  background-color: ${props =>
    props.theme.dark ? '#464646' : props.theme.colors.LIGHT_GRAY};
  position: fixed;
  top: 0;
  left: 0;
  width: 185px;
  height: 100vh;
`;
const NavMenuContainer = styled.div`
  display: flex;
  margin-top: 25px;
  flex-direction: column;
  flex: 1;
`;
const SettingsTitle = styled.div`
  padding: 20px 0px 15px 20px;
  text-align: left;
  font-size: 18px;
  font-weight: bold;
  color: ${props => (props.theme.dark ? '#ffffff' : props.theme.colors.BLACK)};
`;
const MenuButton = styled.button`
  text-align: left;
  padding: 10px 0px 0px 20px;
  color: ${props =>
    props.theme.dark ? props.theme.colors.POINT_GRAY : '#999999'};
  &.active {
    color: ${props => props.theme.colors.PRIMARY};
  }
`;
export function SettingNavbar() {
  const navigate = useNavigate();
  const location = useLocation();
  const routeName = location.pathname.split('/')[3];

  return (
    <NavbarContainer>
      <NavMenuContainer>
        <SettingsTitle>Settings</SettingsTitle>
        <MenuButton
          onClick={() => navigate('/more/settings/general')}
          className={`${routeName === 'general' && 'active'}`}>
          General
        </MenuButton>
        <MenuButton
          onClick={() => navigate('/more/settings/notifications-settings')}
          className={`${routeName === 'notifications-settings' && 'active'}`}>
          Notification
        </MenuButton>
        <MenuButton
          onClick={() => navigate('/more/settings/privacy-and-security')}
          className={`${routeName === 'privacy-and-security' && 'active'}`}>
          Privacy and Security
        </MenuButton>
        <MenuButton
          onClick={() => navigate('/more/settings/theme')}
          className={`${routeName === 'theme' && 'active'}`}>
          Theme
        </MenuButton>
        <MenuButton
          onClick={() => navigate('/more/settings/language')}
          className={`${routeName === 'language' && 'active'}`}>
          Language
        </MenuButton>
        <MenuButton
          onClick={() => navigate('/more/settings/chatting')}
          className={`${routeName === 'chatting' && 'active'}`}>
          Chatting
        </MenuButton>
        <MenuButton
          onClick={() => navigate('/more/settings/storage')}
          className={`${routeName === 'storage' && 'active'}`}>
          Storage
        </MenuButton>
        <MenuButton
          onClick={() => navigate('/more/settings/call')}
          className={`${routeName === 'call' && 'active'}`}>
          Call
        </MenuButton>
        <MenuButton
          onClick={() => navigate('/more/settings/help')}
          className={`${routeName === 'help' && 'active'}`}>
          Help
        </MenuButton>
      </NavMenuContainer>
    </NavbarContainer>
  );
}
