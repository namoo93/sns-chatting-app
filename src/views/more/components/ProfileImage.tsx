import styled from 'styled-components';

import { Avatar, IconTypeButton } from 'components/atom';

const Container = styled.div`
  border-top: 1px solid #eee;
  background: #f8f8f8;
  display: flex;
  height: 188px;
  justify-content: center;
  padding-top: 30px;
  position: relative;
  width: 100%;
`;
const AvatarContainer = styled.div`
  height: 100px;
  position: relative;
`;

const SelectImgButton = styled(IconTypeButton)<{
  bottom?: number;
  left?: number;
}>`
  background: #fff;
  border-radius: 50%;
  bottom: ${({ bottom }) => bottom || 0}px;
  box-shadow: 3px 3px 10px 0 rgba(0, 0, 0, 0.1);
  height: 32px;
  position: absolute;
  right: 0;
  width: 32px;

  ${({ left }) => (left ? `left: ${left}px;` : '')}
`;

export const ProfileImage = () => {
  const selectAvatar = () => console.log('avatar');
  const selectBackground = () => console.log('bg');

  return (
    <Container>
      <AvatarContainer>
        <Avatar size={100} />
        <SelectImgButton
          iconSrc="profile-edit/ic-camera"
          iconType="svg"
          icSize={15}
          onClick={selectAvatar}
        />
      </AvatarContainer>
      <SelectImgButton
        bottom={12}
        iconSrc="profile-edit/ic-camera"
        icSize={15}
        iconType="svg"
        left={17}
        onClick={selectBackground}
      />
    </Container>
  );
};
