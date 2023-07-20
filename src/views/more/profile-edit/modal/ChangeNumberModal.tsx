import React from 'react';
import styled from 'styled-components';
import { COLOR } from '../../../../constants/COLOR';
import { Row } from '../../../../components/layouts';
import { Button, ButtonVariant } from '../../../../components/atom';
import { ModalContext } from '../../../../contexts';
import { useTranslation } from 'react-i18next';

type ComponentProps = {
  onClick: () => void;
  type: 'number' | 'e-mail';
};

const DialogWrapper = styled.div`
  width: 300px;
`;

const Title = styled.h3`
  margin-bottom: 7px;

  font-weight: 500;
  font-size: 15px;
  line-height: 20px;
  color: ${COLOR.BLACK};
`;

const Description = styled.p`
  margin-bottom: 20px;

  font-size: 13px;
  line-height: 19px;
  color: ${COLOR.TEXT_GRAY};

  .bold {
    font-weight: 700;
  }
`;

export const ChangeNumberModal = ({ onClick, type }: ComponentProps) => {
  const { t } = useTranslation();
  let { closeModal } = React.useContext(ModalContext);
  return (
    <DialogWrapper>
      <Title>{type === 'number' ? `${t('setting.Change Number')}` : `${t('setting.Change E-mail')}`}</Title>
      <Description>
        {type === 'number'
          ? `${t(
              'setting.User will see your new number if they have it in their address book or your privacy settings allow them to see it You can modify this in Settings > Privacy and Security > Phone number',
            )}`
          : `${t(
              'setting.User will see your new E-mail if they have it in their address book or your privacy settings allow them to see it You can modify this in Settings > Privacy and Security > E-mail number',
            )}`}
        {/* <span className="bold">
          Settings &gt; Privacy and Security &gt; {type === 'number' ? 'Phone' : 'E-mail'} number.
        </span> */}
      </Description>
      <Row justify="center">
        <Button
          className={'string'}
          type={'button'}
          onClick={() => {
            closeModal();
          }}
          width={100}
          height={42}
          marginRight={10}
          variant={ButtonVariant.Outlined}
          borderRadius
        >
          {t('button-common.Cancel')}
        </Button>
        <Button
          className={'string'}
          type={'button'}
          onClick={() => {
            onClick();
            closeModal();
          }}
          width={100}
          height={42}
          variant={ButtonVariant.Default}
          borderRadius
        >
          {t('button-common.Confirm')}
        </Button>
      </Row>
    </DialogWrapper>
  );
};
