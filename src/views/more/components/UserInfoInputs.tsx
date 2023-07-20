import styled from 'styled-components';

import { Button, ButtonVariant, IconTypeButton, ProfileInputContainer } from 'components/atom';
import { COLOR } from 'constants/COLOR';
import { Column, Row } from 'components/layouts';
import { Birthday } from 'views/more/components/Birthday';
import { Number } from 'views/more/components/Number';
import { Email } from 'views/more/components/Email';
import { useTranslation } from 'react-i18next';

export const InfoContainer = styled(Row)`
  border-bottom: 1px solid ${COLOR.LIGHT_GRAY};
  height: 48px;
`;
export const Title = styled.span<{ marginRight?: number }>`
  color: ${COLOR.BLACK};
  font-size: 14px;
  margin-right: ${({ marginRight }) => marginRight || 20}px;
  min-width: 50px;
`;
export const Info = styled.input`
  border: none;
  caret-color: transparent;
  color: ${COLOR.BLACK};
  cursor: pointer;
  font-size: 16px;
  outline: none;
  width: 100%;

  ::placeholder {
    color: ${COLOR.GRAY};
  }
`;

const RestyledButton = styled(Button)`
  color: #088cf1;
  margin-right: 5px;
`;
const RestyledIcBtn = styled(IconTypeButton)`
  transform: rotate(90deg);
`;
const Desc = styled.p`
  color: ${COLOR.TEXT_GRAY};
  font-size: 13px;
  width: 100%;
`;

export const UserInfoInputs = ({ cell, email, changeBirthday, changeNumber, changeEmail }) => {
  const { t } = useTranslation();
  const verifyOfficialAccount = () => console.log('verify');

  return (
    <ProfileInputContainer>
      <Column fullWidth>
        <Birthday onChange={changeBirthday} />
        <Number cell={cell} onClick={changeNumber} />
        <Email email={email} onClick={changeEmail} />
        <Row fullWidth>
          <RestyledButton fontSize={14} fontWeight={500} variant={ButtonVariant.Text} onClick={verifyOfficialAccount}>
            {t('setting.Verify official account')}
          </RestyledButton>
          <RestyledIcBtn iconSrc="profile-edit/btn-move" iconType="svg" size={12} onClick={verifyOfficialAccount} />
        </Row>
        <Desc>
          {t('setting.Get a verified badge to make people find and recognize you easier with official account')}
        </Desc>
      </Column>
    </ProfileInputContainer>
  );
};
