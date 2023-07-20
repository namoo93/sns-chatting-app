import { Column, Row } from 'components/layouts';
import NavbarLayout from 'components/layouts/NavbarLayout';
import { TitleHeader } from 'components/molecules';
import { COLOR } from 'constants/COLOR';
import styled from 'styled-components';
import Cat from 'assets/cat1.png';
import Market from 'assets/ic-market.svg';
import Wallet from 'assets/ic-wallet.svg';
import Saved from 'assets/ic-saved.svg';
import Edit from 'assets/ic-edit.svg';
import { FIXED_SIZE_WINDOW_OPTIONS } from 'constants/CONST';
import { useAtomValue } from 'jotai';
import userAtom from '../../stores/userAtom';
import { useNavigate } from 'react-router-dom';

const Container = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;
const ProfileContainer = styled.button`
  width: 100px;
  height: 100px;
  border-radius: 70px;
  overflow: hidden;
  margin: 15px;
`;
const ProfileImage = styled.img`
  width: 100%;
  height: 100%;
`;
const Name = styled.p`
  font-size: 18px;
  font-weight: 500;
  margin: 5px;
  color: ${(props) => (props.theme.dark ? '#ffffff' : '#000000')};
`;
const ID = styled.p`
  font-size: 13px;
  color: ${(props) => props.theme.colors.POINT_GRAY};
`;
const PhoneNumber = styled.p`
  font-size: 13px;
  margin: 5px;
  color: #999999;
`;
const MenuButtonLabel = styled.p`
  text-align: center;
  font-size: 12px;
  /* margin: 5px; */
  line-height: 15px;
  color: ${(props) => (props.theme.dark ? '#ffffff' : '#000000')};
`;

const EditButton = ({ onClick }) => {
  return (
    <button onClick={() => onClick()}>
      <Row style={{ padding: 20 }}>
        <img src={Edit} style={{ width: 12, height: 12 }} alt="" />
        <p style={{ fontSize: 12, color: '#999999' }}>Edit</p>
      </Row>
    </button>
  );
};

const MenuButton = ({ icon, label, onClick }) => {
  return (
    <button
      style={{
        borderColor: COLOR.POINT_GRAY,
        borderWidth: 1,
        borderRadius: 10,
        width: 80,
        height: 89,
      }}
      onClick={() => onClick()}
    >
      <Column>
        <img src={icon} style={{ width: 20, height: 20, margin: 7 }} alt="" />
        {label.map((label) => (
          <MenuButtonLabel>{label}</MenuButtonLabel>
        ))}
      </Column>
    </button>
  );
};
function MoreMain() {
  const me = useAtomValue(userAtom);
  const navigate = useNavigate();
  return (
    <NavbarLayout>
      <TitleHeader
        title="More"
        justify="flex-start"
        border={false}
        button={[<EditButton onClick={() => console.log('/profile-edit')} />]}
      />
      <Container>
        <div style={{ padding: '10%' }} />
        <ProfileContainer onClick={() => {}}>
          {/*TODO: 모바일의 Avatar 처럼 기본 이미지 적용된 형태 필요*/}
          <ProfileImage src={me?.profile_image} />
        </ProfileContainer>
        <Name>{`${me?.first_name} ${me?.last_name}`}</Name>
        <ID>@{me?.uid}</ID>
        <PhoneNumber>{me?.contact}</PhoneNumber>
        <Row className="py-5 w-full max-w-xs" justify="space-evenly">
          <MenuButton icon={Market} label={['Market', 'U & I']} onClick={() => console.log('/market')} />
          <MenuButton icon={Wallet} label={['QR', 'wallet']} onClick={() => {}} />
          <MenuButton
            icon={Saved}
            label={['Saved', 'messages']}
            onClick={() => {
              window.open('/more/saved-messages', 'Saved Messages', FIXED_SIZE_WINDOW_OPTIONS);
            }}
          />
        </Row>
        {process.env.NODE_ENV !== 'production' && (
          <>
            <div className="mb-4">
              <button
                onClick={() => {
                  navigate('/__dev__/page-list');
                }}
              >
                테스트 전용 : 페이지 목록
              </button>
            </div>
            <div>
              <button
                onClick={() => {
                  localStorage.removeItem('token');
                  window.location.href = '/';
                }}
              >
                테스트 전용 : 로그아웃
              </button>
            </div>
          </>
        )}
      </Container>
    </NavbarLayout>
  );
}

export default MoreMain;
