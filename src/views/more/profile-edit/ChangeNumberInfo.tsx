import React, { useContext } from 'react';
import styled from 'styled-components';
import MainLayout from 'components/layouts/MainLayout';
import { PrevHeader } from 'components/molecules';
import { Button, ButtonVariant, Icon } from 'components/atom';
import { COLOR } from 'constants/COLOR';
import { ModalContext } from 'contexts';
import { ChangeNumberModal } from './modal/ChangeNumberModal';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  height: calc(100% - 56px);
  padding: 100px 20px 30px;
`;

const TopContainer = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;

  align-items: center;
`;

const Title = styled.p`
  margin: 10px 0 7px;

  font-weight: 500;
  font-size: 18px;
  line-height: 24px;
  color: ${COLOR.BLACK};

  text-align: center;
`;

const Desc = styled.p`
  font-size: 14px;
  line-height: 20px;
  color: ${COLOR.TEXT_GRAY};

  text-align: center;
`;

export const ChangeNumberInfo = () => {
  const { t } = useTranslation();
  const { openModal } = useContext(ModalContext);
  const navigate = useNavigate();

  const onClickModal = () => {
    openModal(
      <ChangeNumberModal
        type={'number'}
        onClick={() =>
          navigate('/more/profile-edit/phone-number-input', {
            state: { route: 'change-number' },
          })
        }
      />,
    );
  };

  return (
    <MainLayout>
      <PrevHeader title={`${t('setting.Change Number')}`} border />
      <Container>
        <TopContainer>
          <Icon size={92} src={'/images/settings/img-change-number.svg'} />
          <Title>You can change your Number here.</Title>
          <Desc>
            {t(
              'setting.You can change your Number here Your account and your cloud data messages, media, contacts, etc will be moved to the new number',
            )}
          </Desc>
        </TopContainer>
        <Button
          onClick={onClickModal}
          fullWidth
          fontWeight={500}
          height={60}
          variant={ButtonVariant.Outlined}
          blacklined
          borderRadius
        >
          <Icon size={24} src={'/images/settings/phone.svg'} marginRight={10} />
          {t('setting.Change Number')}
        </Button>
      </Container>
    </MainLayout>
  );
};
