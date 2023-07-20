import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

import { Button, ButtonVariant, Icon } from 'components/atom';
import MainLayout from 'components/layouts/MainLayout';
import { PrevHeader } from 'components/molecules';
import {
  Divider,
  DoneButton,
  KokKokNameInput,
  NameInputs,
  ProfileImage,
  ProfileMessageInput,
  UserInfoInputs,
} from 'views/more/components';

const ButtonContainer = styled.div`
  padding: 0 20px 30px;
`;

const RestyledButton = styled(Button)`
  border-radius: 10px;
  gap: 5px;
`;

export const ProfileEdit = () => {
  const navigate = useNavigate();

  const [user, setUser] = useState({
    firstName: '',
    lastName: '',
    kokkokName: '',
    profileMessage: '',
    birthday: '',
    cell: '',
    email: '',
  });

  const handleChange = (props: string) => event => {
    setUser({
      ...user,
      [props]: event.target.value,
    });
  };

  const changeBirthday = (newBirthday: string) =>
    setUser({ ...user, birthday: newBirthday });
  const changeNumber = () => console.log('number');
  const changeEmail = () => navigate('/more/profile-edit/email-input');

  return (
    <MainLayout>
      <PrevHeader button={[<DoneButton key="done" />]} title="Profile Edit" />
      <ProfileImage />
      <NameInputs
        firstName={user.firstName}
        lastName={user.lastName}
        onChangeFirstName={handleChange('firstName')}
        onChangeLastName={handleChange('lastName')}
      />
      <Divider />
      <KokKokNameInput
        kokkokName={user.kokkokName}
        onChange={handleChange('kokkokName')}
      />
      <Divider />
      <ProfileMessageInput
        profileMsg={user.profileMessage}
        onChange={handleChange('profileMessage')}
      />
      <Divider />
      <UserInfoInputs
        cell={user.cell}
        email={user.email}
        changeBirthday={changeBirthday}
        changeNumber={changeNumber}
        changeEmail={changeEmail}
      />
      <ButtonContainer>
        <RestyledButton
          blacklined
          fontSize={16}
          fontWeight={500}
          fullWidth
          height={60}
          variant={ButtonVariant.Outlined}
          onClick={() => console.log('logout')}>
          <Icon size={24} src="/images/profile-edit/ic-log-out.svg" />
          Logout
        </RestyledButton>
      </ButtonContainer>
    </MainLayout>
  );
};
