import MainLayout from 'components/layouts/MainLayout';
import styled from 'styled-components';
import { COLOR } from 'constants/COLOR';
import { Icon } from 'components/atom';
import { Column } from 'components/layouts';
import { useTranslation } from 'react-i18next';

const Title = styled.p`
  margin: 10px 0 7px;

  font-weight: 500;
  font-size: 18px;
  line-height: 24px;
  color: ${(props) => (props.theme.dark ? props.theme.colors.WHITE : props.theme.colors.BLACK)};
`;
const DescSentEmail = styled.p`
  font-size: 14px;
  line-height: 20px;
  color: ${COLOR.TEXT_GRAY};
  text-align: center;
`;
const TextButton = styled.button`
  margin-top: 50px;
`;
const TextButtonLabel = styled.p`
  color: #999999;
  text-decoration: underline;
  text-decoration-color: #999999;
`;

export const RequestSentView = () => {
  const { t } = useTranslation();
  return (
    <MainLayout>
      <Column style={{ paddingTop: '20vh' }}>
        <Icon size={92} src={'/images/profile-edit/img-send-mail.svg'} />
        <Title>{t('setting.Request Sent!')}</Title>
        <DescSentEmail>
          {t('setting.kok kok manager will contact you by e-mail and ask you for documents in needed')}
        </DescSentEmail>

        <TextButton onClick={() => console.log('')}>
          <TextButtonLabel>{t('setting.havent received any response?')}</TextButtonLabel>
        </TextButton>
      </Column>
    </MainLayout>
  );
};
