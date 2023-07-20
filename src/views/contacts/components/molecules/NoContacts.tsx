import { Avatar } from 'components/atom';
import { Column } from 'components/layouts';
import styled from 'styled-components';
import { COLOR } from 'constants/COLOR';
import { useTranslation } from 'react-i18next';

const Container = styled.div`
  margin-top: 92px;
`;

const StyledColumn = styled(Column)`
  p {
    font-size: 18px;
    margin-top: 15px;
    font-weight: 500;
    color: ${COLOR.BLACK};
  }
  p:last-child {
    font-size: 14px;
    margin-top: 7px;
    color: ${COLOR.TEXT_GRAY};
  }
`;

export const NoContacts = () => {
  const { t } = useTranslation();
  return (
    <Container>
      <StyledColumn>
        <Avatar size={52} src={'/images/contacts/ic-addcontacts-52.svg'} />
        <p>{t('contact.No Contacts')}</p>
        <p>{t('contact.Add friends to chat with them')}</p>
      </StyledColumn>
    </Container>
  );
};
