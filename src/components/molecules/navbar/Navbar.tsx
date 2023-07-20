import { Icon } from 'components/atom/images';
import { newFixedSizeWindowOptions_1024, noFrameWindowOptions } from 'constants/CONST';
import { useLocation, useNavigate } from 'react-router-dom';
import styled from 'styled-components';

const NavbarContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: ${props =>
    props.theme.dark ? '#464646' : props.theme.colors.LIGHT_GRAY};
  position: fixed;
  top: 0;
  left: 0;
  width: 65px;
  height: 100vh;
`;
const NavButtonContainer = styled.div`
  display: flex;
  margin-top: 25px;
  flex-direction: column;
  flex: 1;
`;
const NavButton = styled.button`
  padding: 15px 10px 15px 10px;
`;
const SettingButtonConatiner = styled.div`
  margin-bottom: 25px;
`;
const IconFilter = styled.div`
  ${props =>
    props.theme.dark ? 'filter: brightness(85%)' : 'filter: brightness(105%)'}
`;
export function Navbar() {
  const navigate = useNavigate();
  const location = useLocation();
  const routeName = location.pathname.split('/')[1];

  const openSetting = () => {
    window.open('/more/settings/general', 'Activity', newFixedSizeWindowOptions_1024);
  };

  return (
    <NavbarContainer>
      <NavButtonContainer>
        <NavButton onClick={() => navigate('/contacts')}>
          <Icon
            size={26}
            src={`/images/ic-contacts-${
              routeName === 'contacts' ? 'on' : 'off'
            }.png`}
          />
        </NavButton>
        <NavButton onClick={() => navigate('/chats')}>
          <Icon
            size={26}
            src={`/images/ic-chats-${routeName === 'chats' ? 'on' : 'off'}.png`}
          />
        </NavButton>
        <NavButton onClick={() => navigate('/kokkokme')}>
          <Icon
            size={26}
            src={`/images/ic-kokkokme-${
              routeName === 'kokkokme' ? 'on' : 'off'
            }.png`}
          />
        </NavButton>
        <NavButton
          onClick={() => {
            try {
              require('shell').openExternal(
                'https://laoedaily.com.la',
              );
            } catch {
              window.open('https://laoedaily.com.la');
            }
          }}>
          <Icon
            size={26}
            src={`/images/ic-media-${routeName === 'media' ? 'on' : 'off'}.png`}
          />
        </NavButton>
        <NavButton onClick={() => navigate('/more')}>
          <Icon
            size={26}
            src={`/images/ic-more-${routeName === 'more' ? 'on' : 'off'}.png`}
          />
        </NavButton>
      </NavButtonContainer>
      <SettingButtonConatiner>
        <NavButton onClick={openSetting}>
          <IconFilter>
            <Icon size={26} src={`/images/ic_set_26@3x.png`} />
          </IconFilter>
        </NavButton>
      </SettingButtonConatiner>
    </NavbarContainer>
  );
}
