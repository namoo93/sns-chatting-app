import { IconTypeButton } from 'components/atom';
import { Row } from 'components/layouts';
import { Info, InfoContainer, Title } from 'views/more/components/UserInfoInputs';
import { useTranslation } from 'react-i18next';

export const Email = ({ email, onClick }) => {
  const { t } = useTranslation();
  return (
    <InfoContainer align="center" fullWidth justify="space-between">
      <Row fullWidth>
        <Title>{t('sns.Email')}</Title>
        <Info defaultValue={email} placeholder={`${t('sns.Please register your E-mail')}`} readOnly onClick={onClick} />
      </Row>
      <IconTypeButton iconSrc="icon/ic-move" iconType="svg" onClick={onClick} />
    </InfoContainer>
  );
};
